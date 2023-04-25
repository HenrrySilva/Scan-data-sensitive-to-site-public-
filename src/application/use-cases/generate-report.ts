import fs from 'node:fs'
import path from 'node:path'
import handlebars from 'handlebars';
import { DateUtils } from '@utils/date-utils';
import { PDFAdapter } from '@infra/adapters/pdf-adapter';
import { ArchiveScanned, MatchesContent } from '@domain/entities/archive-scanned';
import { DataReportScannerProcessed, InputExecuteGenerateReport, LinkAndAmountMatchOfArchive } from '@types-customs/generate-report';
import { ParserArchiveContract } from '@application/contracts/parser-archive';
import mainSettings from '@configs/main-settings';

export class GenerateReportUseCases {

    public static pathOutput: string = path.resolve(`${mainSettings.DIRECTORY_OUTPUT_REPORTER}/report-${Date.now()}.pdf`);

    constructor(private pdfAdapter: PDFAdapter) { }

    private getTotalOfPagesWithDataSensitive(scannedArchives: ArchiveScanned[]) {
        return scannedArchives.map(scannedArchive => {
            return Object.values(scannedArchive?.matchesContent)
                .flat(1)
                .filter(match => match !== null)
                .length
        }).reduce((previousCount, currentAmountData) => previousCount + currentAmountData)
    }

    private getDataMatchesContent(scannedArchives: ArchiveScanned[]): MatchesContent {

        const ab = scannedArchives.reduce((previous: MatchesContent, current: ArchiveScanned) => {
            const dataMatches = current.matchesContent;

            const data = Object.keys(dataMatches).reduce((previousOfKeys: MatchesContent, currentKey: string) => {
                const [previousDataMatch, currentDataMatch] = [previous[currentKey], dataMatches[currentKey]];

                return {
                    ...previousOfKeys,
                    [currentKey]: !!previousDataMatch?.length || currentDataMatch ? [...previousDataMatch ?? [], ...currentDataMatch ?? []] : null
                }
            }, {})

            return { ...previous, ...data }
        }, {})

        return ab
    }

    private getLinksAndAmountMatchOfArchive(scannedArchives: ArchiveScanned[]): LinkAndAmountMatchOfArchive[] {

        return scannedArchives.map<LinkAndAmountMatchOfArchive>(scannedArchive => {

            const { archive: { url: linkPDF } } = scannedArchive;
            const amountMatchContentByArchive = Object.values(scannedArchive.matchesContent)
                .map(matchContent => matchContent?.length ?? 0)
                .reduce((previousCount, currentAmountMatch) => previousCount + currentAmountMatch);

            return { linkPDF, amount: amountMatchContentByArchive };

        }).filter(linkAndAmountMatchOfArchive => linkAndAmountMatchOfArchive.amount >= 1)
            .sort(({ amount: amountA }, { amount: amountB }) => amountB - amountA)
    }

    private getDataToArchivePrint(scan: InputExecuteGenerateReport): DataReportScannerProcessed {

        return {
            startsAt: DateUtils.convertTimeToDate(scan.startsAt),
            endsAt: DateUtils.convertTimeToDate(scan.endsAt),
            totalOfPagesScanned: scan.scannedArchives.length,
            totalOfPagesWithErros: scan.linkArchivesWithError.length,
            datasMatch: this.getDataMatchesContent(scan.scannedArchives),
            linksAndAmountMatchOfArchive: this.getLinksAndAmountMatchOfArchive(scan.scannedArchives),
            totalOfPagesWithDataSensitive: this.getTotalOfPagesWithDataSensitive(scan.scannedArchives),
            linksPDFWithErros: scan.linkArchivesWithError,
            archiveIds: scan.scannedArchives.map(scanned => scanned.archive.id),
            urlTarget: new URL(scan.scannedArchives[0].archive.url).origin
        }
    }

    async execute(scan: InputExecuteGenerateReport) {
        const options: ParserArchiveContract.OptionsCreate = {
            output: GenerateReportUseCases.pathOutput
        }
        const strTemplate = fs.readFileSync(path.resolve('public', 'template-report.html'), 'utf-8');
        const template = handlebars.compile(strTemplate);
        await this.pdfAdapter.create(template(this.getDataToArchivePrint(scan)), options);
    }
}