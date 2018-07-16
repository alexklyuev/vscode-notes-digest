import * as vscode from 'vscode';
import { CommandContainer } from './models/command-container.model';
import { NotesTreeProvider } from '../services/notes-tree/notes-tree-provider';
import { ProjectTreeBuilder } from '../services/project-tree-builder/project-tree-builder';


export class ScanProjectCommand implements CommandContainer {

    constructor(
        public notesTreeProvider: NotesTreeProvider,
    ) {}

    public register(commandName: string) {
        return vscode.commands.registerCommand(
            commandName, 
            () => {
                if (vscode.workspace.rootPath) {
                    (new ProjectTreeBuilder(
                        this.notesTreeProvider,
                        vscode.workspace.rootPath,
                    ))
                    .run()
                    .catch(error => console.error('ScanProjectCommand error', error));
                }
            },
        );
    }

}
