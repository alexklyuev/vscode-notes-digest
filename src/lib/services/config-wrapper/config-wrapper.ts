import * as vscode from 'vscode';
import { ConfigOptions, ConfigOptionsKey } from '../../../config/default-config';
import { NS } from '../../../config/constants';


export class ConfigWrapper {

    private config: vscode.WorkspaceConfiguration;

    constructor(
        private defaultConfig: ConfigOptions,
    ) {
        this.config = vscode.workspace.getConfiguration(NS);
    }

    get<T extends ConfigOptionsKey>(option: T): ConfigOptions[T] {
        const optionValue = this.config.get<ConfigOptions[T]>(option);
        if (!optionValue) {
            const defaultOptionValue: ConfigOptions[T] = this.defaultConfig[option];
            this.config.update(option, defaultOptionValue);
            return defaultOptionValue;
        } else {
            return optionValue;
        }
    }

}
