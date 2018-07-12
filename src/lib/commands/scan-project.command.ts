import * as vscode from 'vscode';
import { CommandContainer } from './models/command-container.model';
import { NotesTreeProvider } from '../services/notes-tree/notes-tree-provider';
import { ProjectTreeBuilder } from '../services/project-tree-builder/project-tree-builder';
import { COMMANDS } from '../config/constants';


export class ScanProjectCommand implements CommandContainer {

    public readonly commandName = COMMANDS.scan;

    constructor(
        public notesTreeProvider: NotesTreeProvider,
        public textMarkersConfig: string[],
        public globPattern: string,
    ) {}

    public register() {
        return vscode.commands.registerCommand(this.commandName, () => {
            if (vscode.workspace.rootPath) {
                (new ProjectTreeBuilder(
                    this.notesTreeProvider,
                    vscode.workspace.rootPath,
                    this.textMarkersConfig,
                    this.globPattern,
                ))
                .run()
                .catch(err => console.error('err', err));
            }
        });
    }

}
