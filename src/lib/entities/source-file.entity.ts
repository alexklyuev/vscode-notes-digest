export class SourceFile {

    public readonly relativePath: string;

    constructor(
        public readonly absolutePath: string,
        public readonly projectAbsolutePath: string,
    ) {
        this.relativePath = absolutePath.slice(projectAbsolutePath.length);
    }

    toString(): string {
        return this.absolutePath.slice(this.projectAbsolutePath.length);
    }

}
