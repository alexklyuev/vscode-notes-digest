import { TextMarker } from './text-marker.entity';
import { SourceFile } from './source-file.entity';


export class Note {

    constructor(
        public readonly sourceFile: SourceFile,
        public readonly line: string,
        public readonly lineNumber: number = -1,
        public readonly textMarker: TextMarker,
    ) {}

    toString(): string {
        const textStartIndex = this.line.indexOf(this.textMarker.text) + this.textMarker.text.length;
        const text = this.line.slice(textStartIndex);
        return `${this.lineNumber}: ${text}`;
    }

}
