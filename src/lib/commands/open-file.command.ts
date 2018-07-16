import * as vscode from 'vscode';
import { CommandContainer } from './models/command-container.model';
import { COMMANDS } from '../config/constants';


export class OpenFileCommand implements CommandContainer {

    public register(commandName: string) {
        return vscode.commands.registerCommand(
            commandName,
            async (uri: vscode.Uri, lineNumber: number, columnNumber: number) => {
                await vscode.commands.executeCommand('vscode.open', uri);
                return vscode.commands.executeCommand(COMMANDS.gotoLine, lineNumber, columnNumber);
            },
        );
    }

}
