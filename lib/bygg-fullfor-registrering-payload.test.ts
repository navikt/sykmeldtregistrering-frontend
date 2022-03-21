import byggFullforRegistreringPayload, { aldriJobbet } from './bygg-fullfor-registrering-payload';
import { DinSituasjon, SisteStillingValg } from '../model/sporsmal';
import { expect } from '@jest/globals';

describe('bygg-fullfor-registrering-payload', () => {
    describe('sisteStilling', () => {
        it('returnerer "aldriJobbet" hvis dinSituasjon er aldri har hatt jobb', () => {
            const { sisteStilling } = byggFullforRegistreringPayload({ dinSituasjon: DinSituasjon.ALDRI_HATT_JOBB });
            expect(sisteStilling).toBe(aldriJobbet);
        });

        it('returnerer "aldriJobbet" sisteStilling er HAR_IKKE_HATT_JOBB', () => {
            const { sisteStilling } = byggFullforRegistreringPayload({
                sisteStilling: SisteStillingValg.HAR_IKKE_HATT_JOBB,
            });
            expect(sisteStilling).toBe(aldriJobbet);
        });
    });
});
