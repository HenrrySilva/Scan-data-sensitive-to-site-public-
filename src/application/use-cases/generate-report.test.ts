import { describe, expect, it } from "vitest";
import { GenerateReportUseCases } from '../use-cases/generate-report'
import { PDFAdapter } from "../../infra/adapters/pdf-adapter";
import { ArchiveScanned } from '../../domain/entities/archive-scanned'
import { Archive } from '../../domain/entities/archive'

describe('Tests generate report use cases', () => {

    it('Should generate a report', async () => {

        const archive = new Archive({ url: 'http://google.com', content: 'dd' });

        const generatedReport = new GenerateReportUseCases(new PDFAdapter())
            .execute({
                amountFoundPagesToScanned: 2,
                currentNumberPageScanned: 1,
                endsAt: 0,
                linkArchivesWithError: ['d'],
                progress: 10,
                scannedArchives: [
                    new ArchiveScanned({ archive, matchesContent: { cpf: ['5475'], cnh: ['55'] } }),
                    new ArchiveScanned({ archive, matchesContent: { cpf: ['ddsds'], cnh: ['dsdf'] } }),
                    new ArchiveScanned({ archive, matchesContent: { cpf: ['ddsds'], cnh: ['dsdf'] } }),
                ],
                startsAt: 0
            });

        await expect(generatedReport).resolves.not.toThrowError()
    }, { timeout: 1000 * 35 });

})