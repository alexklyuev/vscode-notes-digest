import * as vscode from 'vscode';
import { DigestEntry } from './notes-tree.model';

export class NotesTreeProvider implements vscode.TreeDataProvider<DigestEntry> {

    private items: DigestEntry[] = [];

    private changeEventEmitter: vscode.EventEmitter<null> = new vscode.EventEmitter<null>();
    onDidChangeTreeData: vscode.Event<null> = this.changeEventEmitter.event;
    
    getTreeItem(element: DigestEntry): vscode.TreeItem | Thenable<vscode.TreeItem> {
        const label = element.toString();
        const item = new vscode.TreeItem(label);
        return item;
    }

    getChildren(element?: DigestEntry): vscode.ProviderResult<DigestEntry[]> {
        return element ? null : this.items;
    }

    public setItems(items: DigestEntry[]): void {
        this.items = items;
        this.changeEventEmitter.fire();
    }

}
