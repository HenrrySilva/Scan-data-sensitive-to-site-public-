import { CrawlerContract } from "@application/contracts/crawler";
import { ParserArchiveContract } from "@application/contracts/parser-archive";
import { Scanner } from '@domain/entities/scanner'
import { InputScanFullUseCases } from "./dtos/input-scan-full-use-cases";
import { OutputScanFullUseCases } from "./dtos/output-scan-full-use-cases";
import { ArchiveScanned } from "@domain/entities/archive-scanned";
import { Archive } from "@domain/entities/archive";
import { CheckMatch } from "@domain/interfaces/check-match";

export class ScanFullUseCases {

    private linkArchivesWithError: string[];
    private currentNumberPageScanned: number
    private amountFoundPagesToScanned: number | null;
    private scannedArchives: ArchiveScanned[];

    constructor(private crawler: CrawlerContract, private parserArchive: ParserArchiveContract,
        private checkMatchComponents: CheckMatch[]) {
        this.linkArchivesWithError = [];
        this.currentNumberPageScanned = 0;
        this.amountFoundPagesToScanned = null;
        this.scannedArchives = [];
    }

    async* execute(input?: InputScanFullUseCases): AsyncGenerator<OutputScanFullUseCases, OutputScanFullUseCases> {
        try {
            const numberPagesFound = await this.crawler.getCountOfficialDiaryPages();
            this.amountFoundPagesToScanned = input?.maxPage && input.maxPage <= numberPagesFound ? input.maxPage : numberPagesFound

            let oldOutput: OutputScanFullUseCases | null = null;
            const startsAt = Date.now();

            for (let i = 1; this.amountFoundPagesToScanned >= i; i++) {
                this.currentNumberPageScanned = i;
                const linkArchivesFound = await this.crawler.getLinksArchiveByPageNumber(i);

                const asyncLinksConvertedToArchives = linkArchivesFound.map<Promise<Archive | string>>(async linkArchiveFound => {
                    try {
                        const archiveConverted = await this.parserArchive.convertLinkToArchive(linkArchiveFound);
                        return archiveConverted
                    } catch (error) {
                        return linkArchiveFound
                    }
                })

                const linksConvertedToArchives = await Promise.all(asyncLinksConvertedToArchives);

                const archivesFounds = linksConvertedToArchives.filter(linkConvertedToArchive =>
                    typeof linkConvertedToArchive !== 'string') as Archive[]

                const linkArchivesWithError = linksConvertedToArchives.filter(linkConvertedToArchive =>
                    typeof linkConvertedToArchive === 'string') as string[]

                this.linkArchivesWithError = [...this.linkArchivesWithError, ...linkArchivesWithError];

                const scannedArchives = new Scanner()
                    .scan(archivesFounds, this.checkMatchComponents)
                    .listArchiveScanned;

                this.scannedArchives = [...this.scannedArchives, ...scannedArchives];

                oldOutput = new OutputScanFullUseCases({
                    progress: Number(((this.currentNumberPageScanned / this.amountFoundPagesToScanned) * 100)
                        .toFixed(1)),
                    startsAt,
                    endsAt: Date.now(),
                    amountFoundPagesToScanned: this.amountFoundPagesToScanned,
                    linkArchivesWithError: this.linkArchivesWithError,
                    currentNumberPageScanned: this.currentNumberPageScanned,
                    scannedArchives: this.scannedArchives
                });

                yield oldOutput;
            }

            return oldOutput as OutputScanFullUseCases;
        } catch (error) {
            throw error;
        }
    }
}