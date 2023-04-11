import { describe, expect, it } from "vitest";
import { ScanFullUseCases } from './scan-full'
import { PDFAdapter } from '../../infra/adapters/pdf-adapter'
import { CrawlerPuppeteer } from '../../infra/adapters/crawler-puppeteer'
import MAIN_SETTINGS from '../../configs/main-settings'
import { OutputScanFullUseCases } from "./dtos/output-scan-full-use-cases";
import { CPFCheck } from "../../infra/checks-match/cpf-check";


describe.skip('Tests scan full use cases', () => {

    it('Should scanner a archives', async () => {
        const { URL_TARGET, PATH_OFFICIAL_DIARY, INT_CAD_GEN } = MAIN_SETTINGS;

        const crawlerPuppeteer = new CrawlerPuppeteer(URL_TARGET, PATH_OFFICIAL_DIARY, INT_CAD_GEN);

        const scannedArchives = new ScanFullUseCases(crawlerPuppeteer, new PDFAdapter(), [new CPFCheck()])
            .execute({ maxPage: 4 });

        await scannedArchives.next();
        await scannedArchives.next();
        await scannedArchives.next();
        const { value } = await scannedArchives.next();

        expect(value).toBeInstanceOf(OutputScanFullUseCases)

    }, { timeout: 1000 * 100 });

})