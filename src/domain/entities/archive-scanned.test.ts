import { describe, expect, it } from "vitest";
import { Archive } from "./archive";
import { ArchiveScanned } from "./archive-scanned";


describe('Tests entities archive scanned', () => {

    it('Should create a archive scanned', () => {

        const archive = new Archive({ content: 'conteúdo', url: 'http://google.com' })

        const archiveScannedCreated = new ArchiveScanned({ archive, matchesContent: null })
        expect(archiveScannedCreated).toBeInstanceOf(ArchiveScanned)
    });

})