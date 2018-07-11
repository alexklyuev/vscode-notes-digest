import * as vscode from 'vscode';
import { ScanProjectCommand } from './lib/commands/scan-project.command';
import { OpenFileCommand } from './lib/commands/open-file.command';
import { GotoLineCommand } from './lib/commands/goto-line.command';


export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        (new GotoLineCommand()).register(),
        (new ScanProjectCommand()).register(),
        (new OpenFileCommand()).register(),
    );

}

export function deactivate() {
}
