import * as vscode from 'vscode';
import { SourceDir } from './source-dir.entity';
const path = require('path');

export class SourceFile {

        public readonly relativePath: string;
        public readonly name: string;
        public readonly uri: vscode.Uri;
        public readonly sourceDirs: ReadonlyArray<SourceDir>;
        public readonly parentSourceDir: SourceDir;

    constructor(
        public readonly absolutePath: string,
        public readonly projectAbsolutePath: string,
    ) {
        this.relativePath = absolutePath.slice(projectAbsolutePath.length + path.sep.length);
        this.name = path.basename(this.absolutePath);
        this.uri = vscode.Uri.parse(`file://${this.absolutePath}`);
        this.sourceDirs = this.getInnerDirs();
        this.parentSourceDir = this.sourceDirs[this.sourceDirs.length - 1];
    }

    toString(): string {
        return this.name;
    }

    equal(file: SourceFile): boolean {
        return this.absolutePath === file.absolutePath;
    }

    private getInnerDirs(): ReadonlyArray<SourceDir> {
        const dirs = Array<SourceDir>();
        let cursor: string = this.absolutePath;
        while (true) {
            cursor = path.dirname(cursor);
            dirs.unshift(new SourceDir(cursor, this.projectAbsolutePath));
            if (cursor.length <= this.projectAbsolutePath.length) {
                break;
            }
        }
        return Object.freeze(dirs);
    }

}
