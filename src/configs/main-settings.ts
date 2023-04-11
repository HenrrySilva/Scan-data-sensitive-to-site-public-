import path from 'node:path';

export default {
    /** Local de saída do relatório gerado */
    DIRECTORY_OUTPUT_REPORTER: path.resolve('./output'),

    /** URL base do site que sera escaneado */
    URL_TARGET: 'http://itutinga.mg.gov.br/',

    /** Caminho da página do diario oficial */
    PATH_OFFICIAL_DIARY: 'pagina/6907/Poder%20Executivo',

    INT_CAD_GEN: 635
}