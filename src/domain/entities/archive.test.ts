import { describe, expect, it } from "vitest";
import { Archive } from "./archive";
import { ArchiveContentException } from '../exceptions/archive-content-exception'

describe('Tests entities archive', () => {

    it('Should create a archive', () => {
        const archiveCreated = new Archive({ content: 'conteúdo', url: 'http://google.com' })
        expect(archiveCreated).instanceOf(Archive)
    });

    it('Should return a exception because the content of archive is empty', () => {
        expect(() => new Archive({ content: '', url: 'http://google.com' }))
            .toThrowError(ArchiveContentException)
    });

    it('Should return a exception because the url of archive is invalid', () => {
        expect(() => new Archive({ content: 'Conteúdo', url: 'd' }))
            .toThrowError(TypeError)
    });
})