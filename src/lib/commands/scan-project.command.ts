import * as vscode from 'vscode';
import { CommandContainer } from './models/command-container.model';
import { NotesTreeProvider } from '../services/notes-tree/notes-tree-provider';
import { ProjectTreeBuilder } from '../services/project-tree-builder/project-tree-builder';


export class ScanProjectCommand implements CommandContainer {

    public readonly commandName = 'ndi.scan';

    constructor(
        private notesTreeProvider: NotesTreeProvider,
    ) {}

    public register() {
        return vscode.commands.registerCommand(this.commandName, () => {
            if (vscode.workspace.rootPath) {
                (new ProjectTreeBuilder(
                    this.notesTreeProvider,
                    vscode.workspace.rootPath,
                ))
                .run()
                .catch(err => console.error('err', err));
            }
        });
    }

}
