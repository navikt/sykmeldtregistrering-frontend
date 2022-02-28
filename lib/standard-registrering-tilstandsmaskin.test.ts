import { beregnNavigering } from './standard-registrering-tilstandsmaskin';
import { SkjemaSide } from '../pages/skjema/[side]';
import { Jobbsituasjon } from '../components/skjema/din-situasjon';

describe('Standard registrering tilstandsmaskin', () => {
    describe('din situasjon', () => {
        it('har ingen neste når ingen state', () => {
            const state = beregnNavigering(SkjemaSide.DinSituasjon, {});
            expect(state.neste).toBeUndefined();
        });
        it('returnerer SisteJobb som neste når mistet jobb', () => {
            const state = beregnNavigering(SkjemaSide.DinSituasjon, { dinSituasjon: Jobbsituasjon.MISTETJOBB });
            expect(state.neste).toBe(SkjemaSide.SisteJobb);
        });
        it('returnerer Utdanning som neste når aldri jobbet', () => {
            const state = beregnNavigering(SkjemaSide.DinSituasjon, { dinSituasjon: Jobbsituasjon.ALDRIJOBBET });
            expect(state.neste).toBe(SkjemaSide.Utdanning);
        });
    });
});
