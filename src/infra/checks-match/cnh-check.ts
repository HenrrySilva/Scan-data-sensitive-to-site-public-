import { isCNH } from 'validation-br';
import { CheckMatch } from '@domain/interfaces/check-match';

export class CNHCheck extends CheckMatch {


    /** @override */
    execute(content: string) {
        try {
            const matches = content.match(/[0-9]{11}/gm);

            return { cnh: matches?.filter(isCNH) ?? null }

        } catch (error) {
            throw error;
        }
    }

}