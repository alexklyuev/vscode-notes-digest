import * as vscode from 'vscode';
import { ScanProjectCommand } from './lib/commands/scan-project.command';
import { OpenFileCommand } from './lib/commands/open-file.command';
import { GotoLineCommand } from './lib/commands/goto-line.command';
import { NotesTreeProvider } from './lib/services/notes-tree/notes-tree-provider';
import { AutoScanner } from './lib/services/auto-scanner/auto-scanner';
import { defaultConfig } from './config/default-config';
import { ConfigWrapper } from './lib/services/config-wrapper/config-wrapper';


export function activate(context: vscode.ExtensionContext) {

    const configWrapper = new ConfigWrapper(defaultConfig);
    const globPattern = configWrapper.get<'globPattern'>('globPattern');
    const textMarkers = configWrapper.get<'textMarkers'>('textMarkers');

    const notesTreeProvider = new NotesTreeProvider();
    vscode.window.registerTreeDataProvider('notes-digest.view', notesTreeProvider);

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
