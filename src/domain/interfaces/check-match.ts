import { MatchesContent } from "@domain/entities/archive-scanned";

export abstract class CheckMatch {

    abstract execute(content: string): MatchesContent
}