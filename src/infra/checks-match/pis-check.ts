import { isPIS } from "validation-br";
import { CheckMatch } from "@domain/interfaces/check-match";

export class PISCheck extends CheckMatch {


    /** @override */
    execute(content: string) {
        try {
            const matches = content.match(/[0-9]{11}/gm);

            return { pis: matches?.filter(isPIS) ?? null }

        } catch (error) {
            throw error;
        }
    }

}