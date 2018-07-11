import * as vscode from 'vscode';
import { CommandContainer } from './models/command-container.model';


export class OpenFileCommand implements CommandContainer {

    public readonly commandName = 'ndi.openFile';

    public register() {
        return vscode.commands.registerCommand(this.commandName, async (uri: vscode.Uri, lineNumber: number, columnNumber: number) => {
            await vscode.commands.executeCommand('vscode.open', uri);
            return vscode.commands.executeCommand('ndi.gotoLine', lineNumber, columnNumber);
        });
    }

}
