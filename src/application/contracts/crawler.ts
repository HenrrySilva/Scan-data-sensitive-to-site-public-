
export interface CrawlerContract {

    getCountOfficialDiaryPages(): Promise<number>

    getLinksArchiveByPageNumber(pageNumber: number): Promise<string[]>
}