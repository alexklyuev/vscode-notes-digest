export class Note {

    constructor(
        public readonly line: string,
        public readonly lineNumber: number = -1,
    ) {}

    toString(): string {
        return `${this.lineNumber}: ${this.line}`;
    }

}
