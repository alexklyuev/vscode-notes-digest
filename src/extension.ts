import * as vscode from 'vscode';
import { ScanProjectCommand } from './lib/commands/scan-project.command';
import { OpenFileCommand } from './lib/commands/open-file.command';
import { GotoLineCommand } from './lib/commands/goto-line.command';
import { NotesTreeProvider } from './lib/services/notes-tree/notes-tree-provider';
import { AutoScanner } from './lib/services/auto-scanner/auto-scanner';
import { ConfigWrapper } from './lib/services/config-wrapper/config-wrapper';
import { COMMANDS, VIEWS } from './lib/config/constants';


export function activate(context: vscode.ExtensionContext) {

    const configWrapper = new ConfigWrapper();
    const globPattern = configWrapper.get<string>('globPattern');
    const textMarkers = configWrapper.get<string[]>('textMarkers');

    const notesTreeProvider = new NotesTreeProvider(textMarkers, globPattern);
    vscode.window.registerTreeDataProvider(VIEWS.treeView, notesTreeProvider);

    context.subscriptions.push(
        (new GotoLineCommand()).register(COMMANDS.gotoLine),
        (new OpenFileCommand()).register(COMMANDS.openFile),
        (new ScanProjectCommand(notesTreeProvider)).register(COMMANDS.scan),
    );

    (new AutoScanner()).run();

}

export function deactivate() {
}
