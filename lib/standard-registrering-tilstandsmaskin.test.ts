import { beregnNavigering } from './standard-registrering-tilstandsmaskin';
import { SkjemaSide } from '../pages/skjema/[side]';
import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { Utdanningsnivaa } from '../components/skjema/utdanning';

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
    describe('siste jobb', () => {
        it('returnerer Utdanning som neste side', () => {
            const state = beregnNavigering(SkjemaSide.SisteJobb, {
                dinSituasjon: Jobbsituasjon.MISTETJOBB,
                sisteJobb: 'Kokk',
            });
            expect(state.neste).toBe(SkjemaSide.Utdanning);
        });
        it('returnerer Din situasjon som forrige side', () => {
            const state = beregnNavigering(SkjemaSide.SisteJobb, {
                dinSituasjon: Jobbsituasjon.MISTETJOBB,
                sisteJobb: 'Kokk',
            });
            expect(state.forrige).toBe(SkjemaSide.DinSituasjon);
        });
    });
    describe('utdanning', () => {
        it('returnerer GodkjentUtdanning som neste side når har høyere utdanning', () => {
            const state = beregnNavigering(SkjemaSide.Utdanning, {
                dinSituasjon: Jobbsituasjon.MISTETJOBB,
                sisteJobb: 'Kokk',
                utdanning: Utdanningsnivaa.HOYERE,
            });
            expect(state.neste).toBe(SkjemaSide.GodkjentUtdanning);
        });
        it('returnerer Helseproblemer som neste side når ingen utdanning', () => {
            const state = beregnNavigering(SkjemaSide.Utdanning, {
                dinSituasjon: Jobbsituasjon.MISTETJOBB,
                sisteJobb: 'Kokk',
                utdanning: Utdanningsnivaa.INGEN,
            });
            expect(state.neste).toBe(SkjemaSide.Helseproblemer);
        });
        it('returnerer DinSituasjon som forrige side når aldri jobbet', () => {
            const state = beregnNavigering(SkjemaSide.Utdanning, {
                dinSituasjon: Jobbsituasjon.ALDRIJOBBET,
                sisteJobb: 'Kokk',
                utdanning: Utdanningsnivaa.HOYERE,
            });
            expect(state.forrige).toBe(SkjemaSide.DinSituasjon);
        });
        it('returnerer SisteJobb som forrige side når mistet jobb', () => {
            const state = beregnNavigering(SkjemaSide.Utdanning, {
                dinSituasjon: Jobbsituasjon.MISTETJOBB,
                sisteJobb: 'Kokk',
                utdanning: Utdanningsnivaa.HOYERE,
            });
            expect(state.forrige).toBe(SkjemaSide.SisteJobb);
        });
    });
});
