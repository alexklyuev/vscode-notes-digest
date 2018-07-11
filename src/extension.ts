import * as vscode from 'vscode';
import { ScanProjectCommand } from './lib/commands/scan-project.command';
import { OpenFileCommand } from './lib/commands/open-file.command';
import { GotoLineCommand } from './lib/commands/goto-line.command';
import { NotesTreeProvider } from './lib/services/notes-tree/notes-tree-provider';


export function activate(context: vscode.ExtensionContext) {

    const notesTreeProvider = new NotesTreeProvider();
    vscode.window.registerTreeDataProvider('notes-digest.view', notesTreeProvider);

    context.subscriptions.push(
        (new GotoLineCommand()).register(),
        (new OpenFileCommand()).register(),
        (new ScanProjectCommand(notesTreeProvider)).register(),
    );

    vscode.commands.executeCommand('ndi.scan');

}

export function deactivate() {
}
