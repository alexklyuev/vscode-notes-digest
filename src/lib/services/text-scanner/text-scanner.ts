import { SourceFile } from '../../entities/source-file.entity';
import { Note } from '../../entities/note.entity';
import { TextMarker } from '../../entities/text-marker.entity';
import * as readline from 'readline';
import * as fs from 'fs';


export class TextScanner {

        public readonly notes: Promise<Note[]>;

    constructor(
        public readonly sourceFile: SourceFile,
        public readonly textMarkers: TextMarker[],
    ) {
        this.notes = this.read();
    }

    private read() {
        return new Promise<Note[]>(resolve => {
            const input = fs.createReadStream(this.sourceFile.absolutePath);
            const readInterface = readline.createInterface({ input });
            let counter = 0;
            const notes = new Array<Note>();
            readInterface.on('line', (line: string) => {
                counter += 1;
                this.textMarkers
                .filter(textMarker => textMarker.pattern.test(line))
                .forEach(textMarker => {
                    const note = new Note(this.sourceFile, line, counter, textMarker);
                    notes.push(note);
                });
            });
            readInterface.on('close', () => resolve(notes));
        });
    }

}
