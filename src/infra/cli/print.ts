import { CLIUtils } from "./utils";

export namespace Print {
    export type ParamsRun = {
        progress: number,
        amountArchiveScanned: number
        amountArchiveWithError: number
    }
}
export class Print {

    static run({ progress, amountArchiveScanned, amountArchiveWithError }: Print.ParamsRun) {
        console.clear();
        console.log('#####################################################################################');
        console.log('#                        Scanner data public sensitive                              #');
        console.log('#####################################################################################');
        console.log('')
        console.log('#####################################################################################');
        console.log('#                       Informação em tempo real do scanner                         #');
        console.log(`#    Arquivos escaneados: ${amountArchiveScanned}              -          Arquivos com erros: ${amountArchiveWithError}           #`);
        console.log('#####################################################################################');
        console.log('')
        console.log('Barra de progresso...')
        console.log(CLIUtils.barProgress(progress))
    }
}