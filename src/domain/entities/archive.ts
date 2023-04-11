import { uuidAdapter } from "@domain/adapters/uuid";
import { ArchiveContentException } from "@domain/exceptions/archive-content-exception";
import { OptionalsValues } from "@types-customs/helpers";

export class Archive {

    public id: string;
    public url: string;
    public content: string;

    constructor(archive: OptionalsValues<Archive, 'id'>) {
        try {

            new URL(archive.url)
            if (!archive.content || archive.content.length <= 0)
                throw new ArchiveContentException('You need inform a value to attribute content');

            this.id = archive.id ?? uuidAdapter();
            this.url = archive.url;
            this.content = archive.content

        } catch (error) {
            throw error;
        }
    }

}