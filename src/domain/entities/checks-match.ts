import { CheckMatch } from "@domain/interfaces/check-match";
import { MatchesContent } from "./archive-scanned";

export class ChecksMatch extends CheckMatch {

    private children: CheckMatch[] = []

    add(...children: CheckMatch[]) {
        children.forEach(children => this.children.push(children))
        return this;
    }

    execute(content: string): MatchesContent {
        return this.children.reduce((previous: MatchesContent, current: CheckMatch) => {

            const dataMatches = current.execute(content)

            const data = Object.keys(dataMatches).reduce((previousOfKeys: MatchesContent, currentKey: string) => {
                const [dataMatch, dataPreviousMatches] = [dataMatches[currentKey], previous[currentKey]];
                return {
                    ...previousOfKeys,
                    [currentKey]: dataMatch || dataPreviousMatches ?
                        [...dataPreviousMatches ?? [], ...dataMatch ?? []] : null
                }
            }, {})

            return { ...previous, ...data, }
        }, {})
    }
}