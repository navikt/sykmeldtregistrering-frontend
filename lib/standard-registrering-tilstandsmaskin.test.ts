import { beregnNavigering } from './standard-registrering-tilstandsmaskin';
import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { Utdanningsnivaa } from '../components/skjema/utdanning';
import { StandardSkjemaSide } from '../model/skjema';

describe('Standard registrering tilstandsmaskin', () => {
    describe('din situasjon', () => {
        it('returnerer SisteJobb som neste når mistet jobb', () => {
            const state = beregnNavigering(StandardSkjemaSide.DinSituasjon, { dinSituasjon: Jobbsituasjon.MISTETJOBB });
            expect(state.neste).toBe(StandardSkjemaSide.SisteJobb);
        });
        it('returnerer Utdanning som neste når aldri jobbet', () => {
            const state = beregnNavigering(StandardSkjemaSide.DinSituasjon, {
                dinSituasjon: Jobbsituasjon.ALDRIJOBBET,
            });
            expect(state.neste).toBe(StandardSkjemaSide.Utdanning);
        });
    });
    describe('siste jobb', () => {
        it('returnerer Utdanning som neste side', () => {
            const state = beregnNavigering(StandardSkjemaSide.SisteJobb, {
                dinSituasjon: Jobbsituasjon.MISTETJOBB,
                sisteJobb: 'Kokk',
            });
            expect(state.neste).toBe(StandardSkjemaSide.Utdanning);
        });
        it('returnerer Din situasjon som forrige side', () => {
            const state = beregnNavigering(StandardSkjemaSide.SisteJobb, {
                dinSituasjon: Jobbsituasjon.MISTETJOBB,
                sisteJobb: 'Kokk',
            });
            expect(state.forrige).toBe(StandardSkjemaSide.DinSituasjon);
        });
    });
    describe('utdanning', () => {
        it('returnerer GodkjentUtdanning som neste side når har høyere utdanning', () => {
            const state = beregnNavigering(StandardSkjemaSide.Utdanning, {
                dinSituasjon: Jobbsituasjon.MISTETJOBB,
                sisteJobb: 'Kokk',
                utdanning: Utdanningsnivaa.HOYERE,
            });
            expect(state.neste).toBe(StandardSkjemaSide.GodkjentUtdanning);
        });
        it('returnerer Helseproblemer som neste side når ingen utdanning', () => {
            const state = beregnNavigering(StandardSkjemaSide.Utdanning, {
                dinSituasjon: Jobbsituasjon.MISTETJOBB,
                sisteJobb: 'Kokk',
                utdanning: Utdanningsnivaa.INGEN,
            });
            expect(state.neste).toBe(StandardSkjemaSide.Helseproblemer);
        });
        it('returnerer DinSituasjon som forrige side når aldri jobbet', () => {
            const state = beregnNavigering(StandardSkjemaSide.Utdanning, {
                dinSituasjon: Jobbsituasjon.ALDRIJOBBET,
                sisteJobb: 'Kokk',
                utdanning: Utdanningsnivaa.HOYERE,
            });
            expect(state.forrige).toBe(StandardSkjemaSide.DinSituasjon);
        });
        it('returnerer SisteJobb som forrige side når mistet jobb', () => {
            const state = beregnNavigering(StandardSkjemaSide.Utdanning, {
                dinSituasjon: Jobbsituasjon.MISTETJOBB,
                sisteJobb: 'Kokk',
                utdanning: Utdanningsnivaa.HOYERE,
            });
            expect(state.forrige).toBe(StandardSkjemaSide.SisteJobb);
        });
    });
    describe('GodkjentUtdanning', () => {
        it('returnerer BestattUtdanning som neste', () => {
            const { neste } = beregnNavigering(StandardSkjemaSide.GodkjentUtdanning, {});
            expect(neste).toBe(StandardSkjemaSide.BestaattUtdanning);
        });

        it('returnerer Utdanning som forrige', () => {
            const { forrige } = beregnNavigering(StandardSkjemaSide.GodkjentUtdanning, {});
            expect(forrige).toBe(StandardSkjemaSide.Utdanning);
        });
    });

    describe('BestattUtdanning', () => {
        it('returnerer Helseproblemer som neste', () => {
            const { neste } = beregnNavigering(StandardSkjemaSide.BestaattUtdanning, {});
            expect(neste).toBe(StandardSkjemaSide.Helseproblemer);
        });

        it('returnerer GodkjentUtdanning som forrige', () => {
            const { forrige } = beregnNavigering(StandardSkjemaSide.BestaattUtdanning, {});
            expect(forrige).toBe(StandardSkjemaSide.GodkjentUtdanning);
        });
    });

    describe('Helseproblemer', () => {
        it('returnerer AndreProblemer som neste', () => {
            const { neste } = beregnNavigering(StandardSkjemaSide.Helseproblemer, {});
            expect(neste).toBe(StandardSkjemaSide.AndreProblemer);
        });

        it('returnerer Utdanning som forrige når ingen utdanning', () => {
            const { forrige } = beregnNavigering(StandardSkjemaSide.Helseproblemer, {
                utdanning: Utdanningsnivaa.INGEN,
            });
            expect(forrige).toBe(StandardSkjemaSide.Utdanning);
        });

        it('returnerer BestattUtdanning som forrige når man har utdanning', () => {
            const { forrige } = beregnNavigering(StandardSkjemaSide.Helseproblemer, {
                utdanning: Utdanningsnivaa.GRUNNSKOLE,
            });
            expect(forrige).toBe(StandardSkjemaSide.BestaattUtdanning);
        });
    });

    describe('AndreProblemer', () => {
        it('returnerer Helseproblemer som forrige', () => {
            const { forrige } = beregnNavigering(StandardSkjemaSide.AndreProblemer, {});
            expect(forrige).toBe(StandardSkjemaSide.Helseproblemer);
        });

        it('returnerer Oppsummering som neste', () => {
            const { neste } = beregnNavigering(StandardSkjemaSide.AndreProblemer, {});
            expect(neste).toBe(StandardSkjemaSide.Oppsummering);
        });
    });
});
