import { SourceFile } from '../../entities/source-file.entity';
import { Note } from '../../entities/note.entity';


export enum TreeStatus {
    IDLE = 1,
    PROGRESS,
    DONE,
}

export class TreeStatusElement {

    constructor(
        public readonly status: TreeStatus,
        public readonly message: string,
    ) {}

    toString(): string {
        return this.message;
    }

}

export type DigestEntry = SourceFile | Note | TreeStatusElement;

export function isSourceFile(entry: DigestEntry): entry is SourceFile {
    return entry instanceof SourceFile;
}

export function isNote(entry: DigestEntry): entry is Note {
    return entry instanceof Note;
}
