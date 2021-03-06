import * as vscode from 'vscode';
import { CommandContainer } from './models/command-container.model';
import { NotesTreeProvider } from '../services/notes-tree/notes-tree-provider';
import { ProjectTreeBuilder } from '../services/project-tree-builder/project-tree-builder';
import { ConfigWrapper } from '../services/config-wrapper/config-wrapper';


export class ScanProjectCommand implements CommandContainer {

    constructor(
        public readonly notesTreeProvider: NotesTreeProvider,
        public readonly configWrapper: ConfigWrapper,
    ) {}

    /**
     * TODO: rootPath is deprecated, should use workspaceFolders
     */
    public register(commandName: string) {
        return vscode.commands.registerCommand(
            commandName, 
            () => {
                if (vscode.workspace.rootPath) {
                    (new ProjectTreeBuilder(
                        this.notesTreeProvider,
                        this.configWrapper,
                        vscode.workspace.rootPath,
                    ))
                    .run()
                    .catch(error => console.error('ScanProjectCommand error', error));
                }
            },
        );
    }

}
