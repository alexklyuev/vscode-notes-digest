import * as glob from 'glob';


export class FileScanner {

    public readonly options = Object.freeze({
        absolute: true,
    });
    
    constructor(
        public readonly projectDir: string,
        public readonly pattern: string,
    ) {}
    
    public findAll(): Promise<string[]> {
        process.chdir(this.projectDir);
        return new Promise((resolve, reject) => {
            glob(this.pattern, this.options, (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        });
    }

}
