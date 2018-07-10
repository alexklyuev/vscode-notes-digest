import { NotesTreeProvider } from '../notes-tree/notes-tree-provider';
import { TreeStatus } from '../../entities/tree-status.entity';
import { FileScanner } from '../file-scanner/file-scanner';
import { settings } from '../../../settings';
import { SourceFile } from '../../entities/source-file.entity';
import { TextScanner } from '../text-scanner/text-scanner';
import { TextMarker } from '../../entities/text-marker.entity';


export class ProjectTreeBuilder {

    constructor(
        public notesTreeProvider: NotesTreeProvider,
        public projectPath: string,
    ) {}

    public run() {
        const fileScanner = new FileScanner(this.projectPath, settings.globPattern);
        this.notesTreeProvider.setStatus(TreeStatus.PROGRESS);
        const textMarkers = settings.textMarkers.map(marker => new TextMarker(marker));
        return fileScanner.findAll().then(files => {
            Promise.all(
                files
                .map(file => new SourceFile(file, this.projectPath))
                .map(sourceFile => new TextScanner(sourceFile, textMarkers))
                .map(scanner => scanner.notes)
            )
            .then(colls => {
                const notes = colls.reduce((acc, coll) => acc.concat(coll), []);
                this.notesTreeProvider.setItems(notes);
                this.notesTreeProvider.setStatus(TreeStatus.DONE);
            })
            .catch(err => {
                console.info('ProjectTreeBuilder#run error', err);
                this.notesTreeProvider.setItems([]);
                this.notesTreeProvider.setStatus(TreeStatus.DONE);
            });
        });
    }

}
