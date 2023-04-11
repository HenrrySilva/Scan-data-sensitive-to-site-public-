import Puppeteer, { Browser, Page } from "puppeteer";

export class PuppeteerWrapper {

    private browser: Promise<Browser>;

    constructor() {
        this.browser = Puppeteer.launch({ headless: true });
    }
    
    async openPage(pageURL: string, options?: WrapperPuppeteer.OptionsOpenPage): Promise<Page> {
        const page = await (await this.browser).newPage();

        if (options?.method === 'POST') {

            await page.setRequestInterception(true);

            page.once('request', requestIntercepted => {

                const headersPostDefault = { 'Content-Type': 'application/x-www-form-urlencoded' };

                requestIntercepted.continue({
                    headers: options.data ? headersPostDefault : undefined,
                    method: 'POST',
                    postData: options.data
                })
            })
        }
        await page.goto(pageURL);
        return page;
    }

}

namespace WrapperPuppeteer {
    export type OptionsOpenPage = {
        method: 'GET' | 'POST',
        data?: string
    }
}