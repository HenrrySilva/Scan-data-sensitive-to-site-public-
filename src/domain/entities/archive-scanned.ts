import { Archive } from "./archive"

export type MatchesContent = { [x: string]: string[] | null }

export class ArchiveScanned {
    public archive: Archive
    public matchesContent: MatchesContent

    constructor(archiveScanned: ArchiveScanned) {
        this.archive = archiveScanned.archive;
        this.matchesContent = archiveScanned.matchesContent;
    }
}
