export class SourceFile {

    public readonly relativePath: string;
    public readonly name: string;

    constructor(
        public readonly absolutePath: string,
        public readonly projectAbsolutePath: string,
    ) {
        this.relativePath = absolutePath.slice(projectAbsolutePath.length + 1);
        this.name = this.absolutePath.slice(this.absolutePath.lastIndexOf('/') + 1);
    }

    toString(): string {
        return this.relativePath;
    }

}
