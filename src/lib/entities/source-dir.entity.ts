const path = require('path');

export class SourceDir {

        public readonly name: string;
        public readonly relativePath: string;
        public readonly isProjectRoot: boolean;

    constructor(
        public readonly absolutePath: string,
        public readonly projectAbsolutePath: string,
    ) {
        this.name = path.basename(this.absolutePath);
        this.relativePath = this.absolutePath.slice(this.projectAbsolutePath.length + path.sep.length);
        this.isProjectRoot = this.absolutePath === this.projectAbsolutePath;
    }

    public get parentSourceDir(): SourceDir {
        return new SourceDir(
            path.dirname(this.absolutePath),
            this.projectAbsolutePath,
        );
    }

    public toString(): string {
        return this.name;
    }

    public equal(dir: SourceDir): boolean {
        return this.absolutePath === dir.absolutePath;
    }

}