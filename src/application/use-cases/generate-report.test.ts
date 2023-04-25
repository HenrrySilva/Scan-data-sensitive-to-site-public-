import { afterAll, describe, expect, it } from "vitest";
import fs from 'node:fs'
import { GenerateReportUseCases } from '../use-cases/generate-report'
import { PDFAdapter } from "../../infra/adapters/pdf-adapter";
import { ArchiveScanned } from '../../domain/entities/archive-scanned'
import { Archive } from '../../domain/entities/archive'

afterAll(() => {
    fs.unlinkSync(GenerateReportUseCases.pathOutput)
});

describe('Tests generate report use cases', () => {

    it('Should generate a report', async () => {

        const archiveMock = new Archive({ url: 'http://google.com', content: 'Conteúdo de teste!' });

        /**
         * Importante: Number of doc CPF was generate by the 4devs
         * Url 4devs: https://www.4devs.com.br
         */
        const scannedFilesMock = [
            new ArchiveScanned({
                archive: archiveMock, matchesContent: {
                    cpf: ['072.237.006-70'], cnh: ['55837578313']
                }
            }),
            new ArchiveScanned({
                archive: archiveMock, matchesContent: {
                    cpf: ['556.785.846-93'], cnh: ['75766712446']
                }
            }),
            new ArchiveScanned({
                archive: archiveMock, matchesContent: {
                    cpf: ['557.990.566-12'], cnh: ['63176418829']
                }
            }),
        ]
        const generatedReport = new GenerateReportUseCases(new PDFAdapter())
            .execute({
                amountFoundPagesToScanned: 2,
                currentNumberPageScanned: 1,
                endsAt: 0,
                linkArchivesWithError: [],
                progress: 10,
                scannedArchives: scannedFilesMock,
                startsAt: 0
            });

        await expect(generatedReport).resolves.not.toThrowError()
    }, { timeout: 1000 * 30 });

});