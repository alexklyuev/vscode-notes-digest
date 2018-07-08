import * as vscode from 'vscode';
import { DigestEntry } from './notes-tree.model';
import { Note } from '../../entities/note.entity';
import { SourceFile } from '../../entities/source-file.entity';


export class NotesTreeProvider implements vscode.TreeDataProvider<DigestEntry> {

    private items = new Array<Note>();

    private changeEventEmitter: vscode.EventEmitter<null> = new vscode.EventEmitter<null>();

    /**
     * //
     */
    public onDidChangeTreeData: vscode.Event<null> = this.changeEventEmitter.event;
    
    getTreeItem(element: DigestEntry): vscode.TreeItem | Thenable<vscode.TreeItem> {
        const label = element.toString();
        if (element instanceof SourceFile) {
            return new vscode.TreeItem(label, vscode.TreeItemCollapsibleState.Expanded);
        }
        else if (element instanceof Note) {
            return new vscode.TreeItem(label);
        } else {
            return new vscode.TreeItem(label);
        }
    }

    getChildren(element?: DigestEntry): vscode.ProviderResult<DigestEntry[]> {
        if (!element) {
            return this.items.reduce<SourceFile[]>((acc, item) => {
                if (acc.indexOf(item.sourceFile) === -1) {
                    acc.push(item.sourceFile);
                }
                return acc;
            }, []);
        }
        if (element instanceof SourceFile) {
            return this.items.filter(item => item.sourceFile === element);
        }
        if (element instanceof Note) {
            return null;
        }
    }

    getParent(element: DigestEntry): vscode.ProviderResult<DigestEntry> {
        if (element instanceof Note) {
            return element.sourceFile;
        } else {
            return null;
        }
    }

    public setItems(items: Note[]): void {
        this.items = items;
        this.changeEventEmitter.fire();
    }

}
