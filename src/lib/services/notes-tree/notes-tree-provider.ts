import * as vscode from 'vscode';
import { DigestEntry } from './notes-tree.model';
import { Note } from '../../entities/note.entity';
import { SourceFile } from '../../entities/source-file.entity';
import { SourceDir } from '../../entities/source-dir.entity';
import { COMMANDS } from '../../config/constants';


export class NotesTreeProvider implements vscode.TreeDataProvider<DigestEntry> {

    private notes = Array<Note>();
    private files = Array<SourceFile>();
    private dirs = Array<SourceDir>();

    private changeEventEmitter: vscode.EventEmitter<null> = new vscode.EventEmitter<null>();

    public onDidChangeTreeData: vscode.Event<null> = this.changeEventEmitter.event;

    getTreeItem(element: DigestEntry): vscode.TreeItem | Thenable<vscode.TreeItem> {
        const label = element.toString();
        if (element instanceof SourceDir) {
            const collapsibleState = element.isProjectRoot ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.Collapsed;
            return new vscode.TreeItem(label, collapsibleState);
        } else if (element instanceof SourceFile) {
            const fileItem = new vscode.TreeItem(label, vscode.TreeItemCollapsibleState.Collapsed);
            return fileItem;
        } else if (element instanceof Note) {
            const noteItem = new vscode.TreeItem(label);
            noteItem.command = {
                title: 'Open',
                command: COMMANDS.openFile,
                arguments: [
                    element.sourceFile.uri,
                    element.lineNumber,
                    element.columnNumber,
                ],
            };
            return noteItem;
        } else {
            return new vscode.TreeItem(label);
        }
    }

    getChildren(element?: DigestEntry): vscode.ProviderResult<DigestEntry[]> {
        if (!element) {
            return this.dirs.reduce<[SourceDir] | null>((acc, dir) => {
                return dir.isProjectRoot ? [dir] : acc;
            }, null);
        } else if (element instanceof SourceDir) {
            const childDirs = this.dirs.filter(dir => dir.parentSourceDir.equal(element));
            const childFiles = this.files.filter(file => file.parentSourceDir.equal(element));
            return Array().concat(childDirs).concat(childFiles);
        } else if (element instanceof SourceFile) {
            return this.notes.filter(item => item.sourceFile.equal(element));
        } else if (element instanceof Note) {
            return null;
        } else {
            return null;
        }
    }

    getParent(element: DigestEntry): vscode.ProviderResult<DigestEntry> {
        if (element instanceof Note) {
            return element.sourceFile;
        } else if (element instanceof SourceFile) {
            return element.parentSourceDir;
        } else if (element instanceof SourceDir) {
            return element.isProjectRoot ? null : element.parentSourceDir;
        } else {
            return null;
        }
    }

    public setItems(items: Note[]): void {
        this.notes = items;
        this.files = this.notes.reduce<SourceFile[]>((acc, item) => {
            if (acc.indexOf(item.sourceFile) === -1) {
                acc.push(item.sourceFile);
            }
            return acc;
        }, []);
        this.dirs = this.files.reduce<SourceDir[]>((acc, file) => {
            file.sourceDirs.forEach(dir => {
                if (!acc.some(accItem => accItem.equal(dir))) {
                    acc.push(dir);
                }
            });
            return acc;
        }, []);
        this.changeEventEmitter.fire();
    }

}
