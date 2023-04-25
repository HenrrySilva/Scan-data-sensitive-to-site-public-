import { isTituloEleitor } from "validation-br";
import { CheckMatch } from "@domain/interfaces/check-match";

export class VoterRegistrationCheck extends CheckMatch {

    /** @override */
    execute(content: string) {
        const matches = content.match(/[0-9]{11}/gm);
        return { "Título de eleitor": matches?.filter(isTituloEleitor) ?? null }
    }

} 