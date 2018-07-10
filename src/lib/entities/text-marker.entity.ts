export class TextMarker {

        public readonly pattern: RegExp;

    constructor(
        public readonly text: string,
    ) {
        this.pattern = new RegExp(`.*${this.text}.*`);
    }

}