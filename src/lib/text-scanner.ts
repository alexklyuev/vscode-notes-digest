export class TextScanner {
    public readonly pattern = /.*TODO.*/g;

    public selectAll(text: string): string[] {
        const matches = text.match(this.pattern);
        return matches ? matches : [];
    }

}