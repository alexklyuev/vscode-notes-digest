import * as vscode from 'vscode';
import { ScanProjectCommand } from './lib/commands/scan-project.command';
import { OpenFileCommand } from './lib/commands/open-file.command';
import { GotoLineCommand } from './lib/commands/goto-line.command';
import { NotesTreeProvider } from './lib/services/notes-tree/notes-tree-provider';
import { AutoScanner } from './lib/services/auto-scanner/auto-scanner';
import { ConfigWrapper } from './lib/services/config-wrapper/config-wrapper';


export function activate(context: vscode.ExtensionContext) {

    const configWrapper = new ConfigWrapper();
    const globPattern = configWrapper.get<string>('globPattern');
    const textMarkers = configWrapper.get<string[]>('textMarkers');

    const notesTreeProvider = new NotesTreeProvider();
    vscode.window.registerTreeDataProvider('notesDigest.view', notesTreeProvider);

    context.subscriptions.push(
        (new GotoLineCommand()).register(),
        (new OpenFileCommand()).register(),
        (new ScanProjectCommand(
            notesTreeProvider,
            textMarkers,
            globPattern,
        )).register(),
    );

    (new AutoScanner()).run();

}

export function deactivate() {
}
