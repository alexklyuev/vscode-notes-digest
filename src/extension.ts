import * as vscode from 'vscode';
import { NotesTreeProvider } from './lib/services/notes-tree/notes-tree-provider';
import { ProjectTreeBuilder } from './lib/services/project-tree-builder/project-tree-builder';


export function activate(context: vscode.ExtensionContext) {

    const notesTreeProvider = new NotesTreeProvider();
    vscode.window.registerTreeDataProvider('notes-digest.view', notesTreeProvider);

    const openFileDisposable = vscode.commands.registerCommand('ndi.openFile', (uri: vscode.Uri, lineNumber: number, column: number) => {
        vscode.commands.executeCommand('vscode.open', uri)
        .then(() => {
            const editor = vscode.window.activeTextEditor!;
            const position = editor.selection.active;
            const newPosition = position.with(lineNumber - 1, column);
            const newSelection = new vscode.Selection(newPosition, newPosition);
            editor.selection = newSelection;
        });
    });

    const scanDisponsable = vscode.commands.registerCommand('ndi.scan', () => {
        if (vscode.workspace.rootPath) {
            (new ProjectTreeBuilder(
                notesTreeProvider,
                vscode.workspace.rootPath,
            ))
            .run()
            .catch(err => console.error('err', err));
        }
    });

    context.subscriptions.push(scanDisponsable, openFileDisposable);
}

export function deactivate() {
}
