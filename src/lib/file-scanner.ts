const glob = require('glob');

export class FileScanner {
    public readonly pattern = '*.js';
    public readonly options = Object.freeze({
        absolute: true,
    });
    
    public findAll(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            glob(this.pattern, this.options, (err: Error, files: string[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        });
    }

}
