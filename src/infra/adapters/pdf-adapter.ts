import path from 'node:path'
import axios from "axios";
import HTML5ToPDF from "html5-to-pdf";
const PdfParse = require("pdf-parse")
import { Archive } from '@domain/entities/archive';
import { ParserArchiveContract } from '@application/contracts/parser-archive';

export class PDFAdapter implements ParserArchiveContract {

    async convertLinkToArchive(link: string): Promise<Archive> {
        const { data: bufferPDF } = await axios.get(link, { responseType: 'arraybuffer' })
        const { text: content } = await PdfParse(bufferPDF);
        const archiveId = new URL(link).searchParams.get('INT_ARQ');

        if (!archiveId)
            throw new Error('Error getting id of archive.');

        return new Archive({ content, url: link, id: archiveId })
    }

    async create(data: string, options: ParserArchiveContract.OptionsCreate): Promise<void> {
        const html5ToPDF = new HTML5ToPDF({
            outputPath: options.output,
            inputBody: data,
            templateUrl: path.resolve('public'),
            include: [
                path.resolve('public', 'css', 'template-report.css'),
                path.resolve('public', 'images'),
            ],
            pdf: { printBackground: true, margin: { left: 5, bottom: 5, right: 5, top: 5 } }
        });

        await html5ToPDF.start()
        await html5ToPDF.build()
        await html5ToPDF.close()
    }
}