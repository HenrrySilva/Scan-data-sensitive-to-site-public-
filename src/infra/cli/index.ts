import { GenerateReportUseCases } from "@application/use-cases/generate-report";
import { ScanFullUseCases } from "@application/use-cases/scan-full";
import MAIN_SETTINGS from "@configs/main-settings";
import { PDFAdapter } from "@infra/adapters/pdf-adapter";
import { Print } from "./print";
import { CrawlerPuppeteer } from '@infra/adapters/crawler-puppeteer';

/** customs checks */
import { CNHCheck } from "@infra/checks-match/cnh-check";
import { CPFCheck } from "@infra/checks-match/cpf-check";
import { PISCheck } from "@infra/checks-match/pis-check";
import { VoterRegistrationCheck } from "@infra/checks-match/voter-registration";


(async () => {

    const { INT_CAD_GEN, URL_TARGET, PATH_OFFICIAL_DIARY } = MAIN_SETTINGS;

    const crawlerPuppeteer = new CrawlerPuppeteer(URL_TARGET, PATH_OFFICIAL_DIARY, INT_CAD_GEN);

    const scanRun = new ScanFullUseCases(crawlerPuppeteer, new PDFAdapter(),
        [new CPFCheck, new CNHCheck, new PISCheck, new VoterRegistrationCheck()])
        .execute({ maxPage: undefined })

    console.log('Scanner started!')
    console.time('time-scan-full')
    while (true) {
        const { value, done } = await scanRun.next();

        if (done) {
            console.log('Scanner finished!');
            console.log('Generating report...')

            if (!value.startsAt || !value.endsAt)
                throw new Error('Error getting value of startsAt or endsAt');

            await new GenerateReportUseCases(new PDFAdapter).execute({
                ...value,
                startsAt: value.startsAt,
                endsAt: value.endsAt
            });
            console.log('Report generated with success!');
            break;
        }

        Print.run({
            progress: value.progress,
            amountArchiveScanned: value.scannedArchives.length,
            amountArchiveWithError: value.linkArchivesWithError.length
        });
    }
    console.timeEnd('time-scan-full')

})()