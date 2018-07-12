import * as vscode from 'vscode';


export class AutoScanner {

    private readonly callback = (_event?: any) => {
        vscode.commands.executeCommand('ndi.scan');
    }

    /**
     * TODO: `add vscode.workspace.onDidChangeTextDocument(this.callback)` and search for notes in opened/active files
     */
    public run() {
        this.callback();
        vscode.workspace.onDidSaveTextDocument(this.callback);
        vscode.workspace.onDidChangeConfiguration(this.callback);
        vscode.workspace.onDidChangeWorkspaceFolders(this.callback);
    }

}