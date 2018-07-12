import * as vscode from 'vscode';
import { NS } from '../../config/constants';


export class ConfigWrapper {

    private config: vscode.WorkspaceConfiguration;

    constructor(
    ) {
        this.config = vscode.workspace.getConfiguration(NS);
    }

    get<T>(option: string): T {
        return this.config.get<T>(option) !;
    }

}
