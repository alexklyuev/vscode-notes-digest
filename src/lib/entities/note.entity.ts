import { TextMarker } from './text-marker.entity';
import { SourceFile } from './source-file.entity';


export class Note {

        public readonly columnNumber: number;
        public readonly formatted: string;

    constructor(
        public readonly sourceFile: SourceFile,
        public readonly line: string,
        public readonly lineNumber: number = -1,
        public readonly textMarker: TextMarker,
    ) {
        this.columnNumber = this.line.indexOf(this.textMarker.text) + this.textMarker.text.length;
        this.formatted = this.format();
    }

    toString(): string {
        return this.formatted;
    }

    private format(): string {
        const text = this.line.slice(this.columnNumber);
        return `${this.textMarker.text.toLowerCase()} [${this.lineNumber}:${this.columnNumber}] ${text}`;
    }

}
