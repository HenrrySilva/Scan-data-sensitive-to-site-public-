import parse from "node-html-parser";
import path from 'node:path'
import { CrawlerContract } from "@application/contracts/crawler";
import MAIN_SETTINGS from "@configs/main-settings";
import { PuppeteerWrapper } from "./puppeteer-wrapper";

export class CrawlerPuppeteer implements CrawlerContract {

    private puppeteerWrapper: PuppeteerWrapper;

    constructor(private urlBase: string, private pathOfficialDiary: string,
        private INTCadGen: number) {
        this.puppeteerWrapper = new PuppeteerWrapper();
    }

    async getCountOfficialDiaryPages() {
        const page = await (this.puppeteerWrapper.openPage(path.join(this.urlBase, this.pathOfficialDiary)))
        if (page === null)
            throw new Error('Cannot page found!');

        await page.waitForSelector('select');
        const content = await page.content();
        page.close()
        const [elementHTMLSelect] = parse(content).getElementsByTagName('select');

        const options = elementHTMLSelect.childNodes;
        return options.length;
    }

    async getLinksArchiveByPageNumber(pageNumber: number): Promise<string[]> {
        const END_POINT = `ws_consulta/Conteudo_Generico.php?DataHora=${Date.now()}`
        const page = await this.puppeteerWrapper.openPage(path.join(this.urlBase, END_POINT), {
            method: 'POST',
            data: `INT_CAD_GEN=${this.INTCadGen}&STR_BSC_CAD_GEN=&LG_ADM=&INT_PAG=${pageNumber}`
        });
        const content = await page.content();
        page.close()
        const spanElements = parse(content).getElementsByTagName('span');

        const spansWithCodeScript = spanElements.map(element => element.getElementById('nome_arquivo_registro_generico'))
            .filter(element => element !== null)

        return spansWithCodeScript.map(element => {
            const attrValueOnclick = element.getAttribute('onclick');

            const valueRegexMatch = attrValueOnclick?.match(/\d/g);
            if (!valueRegexMatch)
                throw new Error('Cannot found pattern in string');

            return `${MAIN_SETTINGS.URL_TARGET}/Obter_Arquivo_Cadastro_Generico.php?INT_ARQ=${valueRegexMatch.join('')}&LG_ADM=undefined`
        })
    }

}