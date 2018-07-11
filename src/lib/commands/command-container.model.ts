import * as vscode from 'vscode';


export interface CommandContainer {
    readonly commandName: string;
    register(...args: any[]): vscode.Disposable;
}
