import { beregnNavigering } from './standard-registrering-tilstandsmaskin';
import { SkjemaSide } from '../pages/skjema/[side]';

describe('Standard registrering tilstandsmaskin', () => {
    describe('din situasjon', () => {
        it('har ingen neste når ingen state', () => {
            const state = beregnNavigering(SkjemaSide.DinSituasjon, {});
            expect(state.neste).toBeUndefined();
        });

        it('returnerer SisteJobb som neste når mistet jobb', () => {
            const state = beregnNavigering(SkjemaSide.DinSituasjon, { dinSituasjon: 'mistet' });
            expect(state.neste).toBe(SkjemaSide.SisteJobb);
        });
    });
});
