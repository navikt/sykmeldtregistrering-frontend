import { SykmeldtSkjemaSide } from '../model/skjema';
import { beregnNavigering } from './sykmeldt-registrering-tilstandsmaskin';
import { SykmeldtValg } from '../components/skjema/sykmeldt-fremtidig-situasjon';
import { TilbakeTilJobbValg } from '../components/skjema/tilbake-til-jobb';

describe('Standard registrering tilstandsmaskin', () => {
    describe('Fremtidig situasjon', () => {
        it('returnerer Utdanning som neste for TRENGER_NY_JOBBb', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon, {
                sykmeldtFremtidigSituasjon: SykmeldtValg.TRENGER_NY_JOBB,
            });
            expect(state.neste).toBe(SykmeldtSkjemaSide.Utdanning);
            expect(state.forrige).toBeUndefined();
        });
        it('returnerer Utdanning som neste for USIKKER', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon, {
                sykmeldtFremtidigSituasjon: SykmeldtValg.USIKKER,
            });
            expect(state.neste).toBe(SykmeldtSkjemaSide.Utdanning);
        });
        it('returnerer Oppsummering som neste for INGEN_ALTERNATIVER_PASSER', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon, {
                sykmeldtFremtidigSituasjon: SykmeldtValg.INGEN_ALTERNATIVER_PASSER,
            });
            expect(state.neste).toBe(SykmeldtSkjemaSide.Oppsummering);
        });
        it('returnerer TilbakeTilJobb som neste for TILBAKE_TIL_JOBB', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon, {
                sykmeldtFremtidigSituasjon: SykmeldtValg.TILBAKE_TIL_JOBB,
            });
            expect(state.neste).toBe(SykmeldtSkjemaSide.TilbakeTilJobb);
        });
        it('returnerer TilbakeTilJobb som neste for TILBAKE_TIL_NY_STILLING', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon, {
                sykmeldtFremtidigSituasjon: SykmeldtValg.TILBAKE_TIL_NY_STILLING,
            });
            expect(state.neste).toBe(SykmeldtSkjemaSide.TilbakeTilJobb);
        });
    });

    describe('Utdanning', () => {
        it('returnerer Fremtidig situasjon som forrige', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.Utdanning, {});
            expect(state.forrige).toBe(SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon);
        });
        it('returnerer GodkjentUtdanning som neste', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.Utdanning, {});
            expect(state.neste).toBe(SykmeldtSkjemaSide.GodkjentUtdanning);
        });
    });

    describe('GodkjentUtdanning', () => {
        it('returnerer Utdanning som forrige', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.GodkjentUtdanning, {});
            expect(state.forrige).toBe(SykmeldtSkjemaSide.Utdanning);
        });
        it('returnerer BestaattUtdanning som neste', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.GodkjentUtdanning, {});
            expect(state.neste).toBe(SykmeldtSkjemaSide.BestaattUtdanning);
        });
    });

    describe('BestaattUtdanning', () => {
        it('returnerer GodkjentUtdanning som forrige', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.BestaattUtdanning, {});
            expect(state.forrige).toBe(SykmeldtSkjemaSide.GodkjentUtdanning);
        });
        it('returnerer AndreHensyn som neste', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.BestaattUtdanning, {});
            expect(state.neste).toBe(SykmeldtSkjemaSide.AndreHensyn);
        });
    });

    describe('AndreHensyn', () => {
        it('returnerer BestaattUtdanning som forrige', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.AndreHensyn, {});
            expect(state.forrige).toBe(SykmeldtSkjemaSide.BestaattUtdanning);
        });
        it('returnerer Oppsummering som neste', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.AndreHensyn, {});
            expect(state.neste).toBe(SykmeldtSkjemaSide.Oppsummering);
        });
    });

    describe('TilbakeTilJobb', () => {
        it('returnerer Oppsummering som neste for REDUSERT_STILLING', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.TilbakeTilJobb, {
                tilbakeTilJobb: TilbakeTilJobbValg.REDUSERT_STILLING,
            });
            expect(state.neste).toBe(SykmeldtSkjemaSide.Oppsummering);
        });
        it('returnerer Oppsummering som neste for USIKKER', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.TilbakeTilJobb, {
                tilbakeTilJobb: TilbakeTilJobbValg.USIKKER,
            });
            expect(state.neste).toBe(SykmeldtSkjemaSide.Oppsummering);
        });
        it('returnerer Oppsummering som neste for NEI', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.TilbakeTilJobb, {
                tilbakeTilJobb: TilbakeTilJobbValg.NEI,
            });
            expect(state.neste).toBe(SykmeldtSkjemaSide.Oppsummering);
        });
        it('returnerer SkalTilbakeTilJobb som neste for FULL_STILLING', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.TilbakeTilJobb, {
                tilbakeTilJobb: TilbakeTilJobbValg.FULL_STILLING,
            });
            expect(state.neste).toBe(SykmeldtSkjemaSide.SkalTilbakeTilJobb);
        });
        it('returnerer FremtidigSituasjon som forrige', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.TilbakeTilJobb, {});
            expect(state.forrige).toBe(SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon);
        });
    });
});
