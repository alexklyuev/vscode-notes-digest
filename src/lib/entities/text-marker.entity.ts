export class TextMarker {

    public readonly textLowerCase: string;
    public readonly textUpperCase: string;

    constructor(
        public readonly text: string,
    ) {
        this.textLowerCase = this.text.toLowerCase();
        this.textUpperCase = this.text.toUpperCase();
    }

    testLine(line: string): boolean {
        return line.indexOf(this.text) > -1;
    }

}