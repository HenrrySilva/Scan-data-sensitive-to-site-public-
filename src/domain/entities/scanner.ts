import { CheckMatch } from "@domain/interfaces/check-match";
import { Archive } from "./archive"
import { ArchiveScanned } from "./archive-scanned";
import { ChecksMatch } from "./checks-match";

export class Scanner {

    public _listArchiveScanned: ArchiveScanned[]


    constructor() {
        this._listArchiveScanned = [];
    }

    scan(archives: Archive[], checksMatch: CheckMatch[]) {
        this._listArchiveScanned = archives.map(archive => {

            return new ArchiveScanned({
                archive,
                matchesContent: new ChecksMatch().add(...checksMatch)
                    .execute(archive.content)
            })
        })
        return this;
    }

    get listArchiveScanned() {
        return this._listArchiveScanned;
    }

}