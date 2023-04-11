import { describe, expect, it } from "vitest";
import { Archive } from "./archive";
import { ArchiveScanned } from "./archive-scanned";
import { CPFCheck } from "../../infra/checks-match/cpf-check";
import { CNHCheck } from "../../infra/checks-match/cnh-check";
import { PISCheck } from "../../infra/checks-match/pis-check";
import { Scanner } from './scanner';


describe('Tests entities scanner', () => {

    it('Should run scanner', () => {

        const archive = new Archive({ content: 'testee 616.953.996-84 dfsf 616.953.996-84 teste 30089908303 ab', url: 'http://google.com' });
        const scanner = new Scanner();
        scanner.scan([archive], [new CPFCheck(), new CNHCheck(), new PISCheck()]);

        expect(scanner.listArchiveScanned[0]).toBeInstanceOf(ArchiveScanned)
    });

})