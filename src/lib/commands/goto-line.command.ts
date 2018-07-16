import * as vscode from 'vscode';
import { CommandContainer } from './models/command-container.model';


export class GotoLineCommand implements CommandContainer {

    public register(commandName: string) {
        return vscode.commands.registerCommand(
            commandName,
            (lineNumber: number, columnNumber: number = 0) => {
                const editor = vscode.window.activeTextEditor!;
                const position = editor.selection.active;
                const newPosition = position.with(lineNumber - 1, columnNumber);
                const newSelection = new vscode.Selection(newPosition, newPosition);
                editor.selection = newSelection;
                // TODO: try executeCommand('editorScroll', {to: 'up', by: 'line', value: 10, revealCursor?: false})
                return vscode.commands.executeCommand('revealLine', {lineNumber, at: 'center'});
            }
        );
    }

}
