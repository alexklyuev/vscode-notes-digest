export interface ConfigOptions {
    globPattern: string;
    textMarkers: string[];
}

export type ConfigOptionsKey = keyof ConfigOptions;

export const defaultConfig: ConfigOptions = {
    globPattern: '{!(node_modules)/**/*.js,!(node_modules)/**/*.ts,*.js,*.ts}',
    textMarkers: ['TODO:', 'FIXME:'],
};

