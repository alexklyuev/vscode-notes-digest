import * as vscode from 'vscode';
import { DigestEntry, TreeStatus, TreeStatusElement } from './notes-tree.model';
import { Note } from '../../entities/note.entity';
import { SourceFile } from '../../entities/source-file.entity';


export class NotesTreeProvider implements vscode.TreeDataProvider<DigestEntry> {

    private items = new Array<Note>();

    private changeEventEmitter: vscode.EventEmitter<null> = new vscode.EventEmitter<null>();

    /**
     * //
     */
    public onDidChangeTreeData: vscode.Event<null> = this.changeEventEmitter.event;

    constructor(
        private status: TreeStatus = TreeStatus.IDLE,
    ) {
    }
    
    getTreeItem(element: DigestEntry): vscode.TreeItem | Thenable<vscode.TreeItem> {
        const label = element.toString();
        if (element instanceof SourceFile) {
            return new vscode.TreeItem(label, vscode.TreeItemCollapsibleState.Collapsed);
        } else {
            return new vscode.TreeItem(label);
        }
    }

    getChildren(element?: DigestEntry): vscode.ProviderResult<DigestEntry[]> {
        if (!element) {
            switch (this.status) {
                case TreeStatus.IDLE:
                    return [new TreeStatusElement(TreeStatus.IDLE, '<idle>')];
                case TreeStatus.PROGRESS:
                    return [new TreeStatusElement(TreeStatus.IDLE, '<progress...>')];
                case TreeStatus.DONE:
                return this.items.reduce<SourceFile[]>((acc, item) => {
                    if (acc.indexOf(item.sourceFile) === -1) {
                        acc.push(item.sourceFile);
                    }
                    return acc;
                }, []);
            }
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
    }

    public setStatus(status: TreeStatus): void {
        this.status = status;
        this.changeEventEmitter.fire();
    }

}
