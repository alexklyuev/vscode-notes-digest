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
