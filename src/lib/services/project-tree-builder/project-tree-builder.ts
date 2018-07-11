import { NotesTreeProvider } from '../notes-tree/notes-tree-provider';
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

    public async run() {
        const fileScanner = new FileScanner(this.projectPath, settings.globPattern);
        const textMarkers = settings.textMarkers.map(marker => new TextMarker(marker));
        try {
            const files = await fileScanner.findAll();
            const noteCollections = await Promise.all(
                files
                .map(file => new SourceFile(file, this.projectPath))
                .map(sourceFile => new TextScanner(sourceFile, textMarkers))
                .map(scanner => scanner.notes)
            );
            const notes = noteCollections.reduce((acc, coll) => acc.concat(coll), []);
            this.notesTreeProvider.setItems(notes);
        } catch (err) {
            console.info('ProjectTreeBuilder#run error', err);
            this.notesTreeProvider.setItems([]);
        }
    }

}
