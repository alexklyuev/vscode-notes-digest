import { SourceFile } from '../../entities/source-file.entity';
import { Note } from '../../entities/note.entity';
import { TreeStatusElement } from '../../entities/tree-status.entity';


export type DigestEntry = SourceFile | Note | TreeStatusElement;

export function isSourceFile(entry: DigestEntry): entry is SourceFile {
    return entry instanceof SourceFile;
}

export function isNote(entry: DigestEntry): entry is Note {
    return entry instanceof Note;
}
