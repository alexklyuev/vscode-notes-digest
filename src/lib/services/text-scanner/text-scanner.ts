import { SourceFile } from '../../entities/source-file.entity';
import { Note } from '../../entities/note.entity';
import { TextMarker } from '../../entities/text-marker.entity';

const readline = require('readline');
const fs = require('fs');


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
                // TODO: filter
                .forEach(textMarker => {
                    const test = textMarker.pattern.test(line);
                    if (test) {
                        const note = new Note(this.sourceFile, line, counter, textMarker);
                        notes.push(note);
                    }
                });
            });
            readInterface.on('close', () => resolve(notes));
        });
    }

}
