import { NotesTreeProvider } from '../notes-tree/notes-tree-provider';
import { FileScanner } from '../file-scanner/file-scanner';
import { SourceFile } from '../../entities/source-file.entity';
import { TextScanner } from '../text-scanner/text-scanner';
import { TextMarker } from '../../entities/text-marker.entity';


export class ProjectTreeBuilder {

        private textMarkers: TextMarker[];

    constructor(
        public notesTreeProvider: NotesTreeProvider,
        public projectPath: string,
    ) {
        this.textMarkers = this.notesTreeProvider.textMarkers.map(text => new TextMarker(text));
    }

    public async run() {
        const fileScanner = new FileScanner(this.projectPath, this.notesTreeProvider.globPattern);
        try {
            const files = await fileScanner.findAll();
            const noteCollections = await Promise.all(
                files
                .map(file => new SourceFile(file, this.projectPath))
                .map(sourceFile => new TextScanner(sourceFile, this.textMarkers, this.notesTreeProvider.noteFormat))
                .map(scanner => scanner.notes)
            );
            const notes = noteCollections.reduce((acc, coll) => acc.concat(coll), []);
            this.notesTreeProvider.setItems(notes);
        } catch (err) {
            console.error('ProjectTreeBuilder#run error', err);
            this.notesTreeProvider.setItems([]);
        }
    }

}
