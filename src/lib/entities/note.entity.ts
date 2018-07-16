import { TextMarker } from './text-marker.entity';
import { SourceFile } from './source-file.entity';


interface NoteFormat {
    '%textMarkerBase': never;
    '%textMarkerLowerCase': never;
    '%textMarkerUpperCase': never;
    '%lineNumber': never;
    '%columnNumber': never;
    '%noteText': never;
}

type NoteFormatVars = keyof NoteFormat;


export class Note {

        public readonly columnNumber: number;
        public readonly text: string;
        public readonly formatted: string;
        public readonly replaceMapStr: Map<NoteFormatVars, string>;
        public readonly replaceMapRegExp: Map<RegExp, string>;

    constructor(
        public readonly sourceFile: SourceFile,
        public readonly line: string,
        public readonly lineNumber: number = -1,
        public readonly textMarker: TextMarker,
        public readonly noteFormat: string,
    ) {
        this.columnNumber = this.line.indexOf(this.textMarker.text) + this.textMarker.text.length;
        this.text = this.line.slice(this.columnNumber);
        this.replaceMapStr = this.buildReplaceMapStr();
        this.replaceMapRegExp = this.buildReplaceMapRegExp();
        this.formatted = this.format();
    }

    toString(): string {
        return this.formatted;
    }

    private buildReplaceMapStr(): Map<NoteFormatVars, string> {
        return new Map<NoteFormatVars, string>([
            ['%textMarkerBase', this.textMarker.text],
            ['%textMarkerLowerCase', this.textMarker.textLowerCase],
            ['%textMarkerUpperCase', this.textMarker.textUpperCase],
            ['%lineNumber', this.lineNumber.toString()],
            ['%columnNumber', this.columnNumber.toString()],
            ['%noteText', this.text],
        ]);
    }

    private buildReplaceMapRegExp(): Map<RegExp, string> {
        const entries = new Array<[RegExp, string]>();
        this.replaceMapStr.forEach((val, key) => {
            entries.push([RegExp(key, 'g'), val]);
        });
        return new Map(entries);
    }

    private format(): string {
        let result = this.noteFormat;
        this.replaceMapRegExp.forEach((value, key) => {
            result = result.replace(key, value);
        });
        return result;
    }

}
