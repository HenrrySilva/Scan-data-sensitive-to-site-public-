import { isCPF } from 'validation-br';
import { CheckMatch } from '@domain/interfaces/check-match'

export class CPFCheck extends CheckMatch {

    execute(content: string) {
        const matches = content.match(/\d{3}[.-]?\d{3}[.-]?\d{3}[.-]?\d{2}/gm);
        if (matches == null)
            return { cpf: null }

        return {
            cpf: matches.filter(isCPF).length >= 1 ? matches : null
        }
    }


}