import { Archive } from "@domain/entities/archive"

export namespace ParserArchiveContract {
    export type OptionsCreate = {
        output: string
    }
}
export interface ParserArchiveContract {
    convertLinkToArchive(archiveLink: string): Promise<Archive>
    create(data: string, options: ParserArchiveContract.OptionsCreate): Promise<void>
}