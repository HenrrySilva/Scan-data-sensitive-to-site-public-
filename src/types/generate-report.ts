import { OutputScanFullUseCases } from "@application/use-cases/dtos/output-scan-full-use-cases"
import { MatchesContent } from "@domain/entities/archive-scanned";
export type InputExecuteGenerateReport = OutputScanFullUseCases & { startsAt: number, endsAt: number };

export type DataMatchesContent = {
    [x: string]: string[]
}

export type LinkAndAmountMatchOfArchive = {
    linkPDF: string, amount: number
}

export type DataReportScannerProcessed = {
    linksPDFWithErros: string[]
    startsAt: string,
    endsAt: string,
    totalOfPagesScanned: number
    totalOfPagesWithDataSensitive: number
    totalOfPagesWithErros: number
    linksAndAmountMatchOfArchive: LinkAndAmountMatchOfArchive[]
    datasMatch: MatchesContent,
    archiveIds: string[],
    urlTarget: string
}