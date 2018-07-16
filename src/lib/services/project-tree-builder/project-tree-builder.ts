import { NotesTreeProvider } from '../notes-tree/notes-tree-provider';
import { FileScanner } from '../file-scanner/file-scanner';
import { SourceFile } from '../../entities/source-file.entity';
import { TextScanner } from '../text-scanner/text-scanner';
import { TextMarker } from '../../entities/text-marker.entity';
import { ConfigWrapper } from '../config-wrapper/config-wrapper';


export class ProjectTreeBuilder {

        private readonly textMarkers: TextMarker[];
        private readonly globPattern: string;
        private readonly noteFormat: string;

    constructor(
        public readonly notesTreeProvider: NotesTreeProvider,
        public readonly configWrapper: ConfigWrapper,
        public readonly projectPath: string,
    ) {
        this.textMarkers = this.configWrapper.get<string[]>('textMarkers').map(text => new TextMarker(text));
        this.globPattern = this.configWrapper.get<string>('globPattern');
        this.noteFormat = this.configWrapper.get<string>('noteFormat');

    }

    public async run() {
        const fileScanner = new FileScanner(this.projectPath, this.globPattern);
        try {
            const files = await fileScanner.findAll();
            const noteCollections = await Promise.all(
                files
                .map(file => new SourceFile(file, this.projectPath))
                .map(sourceFile => new TextScanner(sourceFile, this.textMarkers, this.noteFormat))
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
