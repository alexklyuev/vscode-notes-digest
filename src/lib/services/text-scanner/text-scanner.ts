import { SourceFile } from '../../entities/source-file.entity';
import { Note } from '../../entities/note.entity';

const readline = require('readline');
const fs = require('fs');

export class TextScanner {
    public readonly pattern = /.*TODO.*/;
    public readonly notes: Promise<Note[]>;

    constructor(
        public readonly sourceFile: SourceFile,
    ) {
        this.notes = this.read();
    }

    private read() {
        return new Promise<Note[]>(resolve => {
            const input = fs.createReadStream(this.sourceFile.absolutePath);
            const readInterface = readline.createInterface({input});
            let counter = 0;
            const notes = new Array<Note>();
            readInterface.on('line', (line: string) => {
                counter += 1;
                const test = this.pattern.test(line);
                if (test) {
                    notes.push(new Note(line, counter));
                }
            });
            readInterface.on('close', () => resolve(notes));
        });
    }

}
