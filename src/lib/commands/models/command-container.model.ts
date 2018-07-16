import * as vscode from 'vscode';


export interface CommandContainer {
    register(commandName: string): vscode.Disposable;
}
