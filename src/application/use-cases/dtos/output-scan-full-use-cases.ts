import { ArchiveScanned } from "@domain/entities/archive-scanned";

export class OutputScanFullUseCases {

    public progress: number;
    public startsAt: number | null;
    public endsAt: number | null;
    public amountFoundPagesToScanned: number;
    public currentNumberPageScanned: number;
    public linkArchivesWithError: string[];
    public scannedArchives: ArchiveScanned[]

    constructor(outputScanFullUseCases: OutputScanFullUseCases) {
        this.progress = outputScanFullUseCases.progress;
        this.startsAt = outputScanFullUseCases.startsAt;
        this.endsAt = outputScanFullUseCases.endsAt;
        this.amountFoundPagesToScanned = outputScanFullUseCases.amountFoundPagesToScanned;
        this.currentNumberPageScanned = outputScanFullUseCases.currentNumberPageScanned;
        this.linkArchivesWithError = outputScanFullUseCases.linkArchivesWithError;
        this.scannedArchives = outputScanFullUseCases.scannedArchives;
    }

}