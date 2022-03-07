import { SkjemaSide } from '../model/skjema';
import { beregnNavigering } from './sykmeldt-registrering-tilstandsmaskin';
import { SykmeldtValg } from '../components/skjema/sykmeldt-fremtidig-situasjon';
import { TilbakeTilJobbValg } from '../components/skjema/tilbake-til-jobb';

describe('Standard registrering tilstandsmaskin', () => {
    describe('Fremtidig situasjon', () => {
        it('returnerer Utdanning som neste for TRENGER_NY_JOBBb', () => {
            const state = beregnNavigering(SkjemaSide.SykmeldtFremtidigSituasjon, {
                sykmeldtFremtidigSituasjon: SykmeldtValg.TRENGER_NY_JOBB,
            });
            expect(state.neste).toBe(SkjemaSide.Utdanning);
            expect(state.forrige).toBeUndefined();
        });
        it('returnerer Utdanning som neste for USIKKER', () => {
            const state = beregnNavigering(SkjemaSide.SykmeldtFremtidigSituasjon, {
                sykmeldtFremtidigSituasjon: SykmeldtValg.USIKKER,
            });
            expect(state.neste).toBe(SkjemaSide.Utdanning);
        });
        it('returnerer Oppsummering som neste for INGEN_ALTERNATIVER_PASSER', () => {
            const state = beregnNavigering(SkjemaSide.SykmeldtFremtidigSituasjon, {
                sykmeldtFremtidigSituasjon: SykmeldtValg.INGEN_ALTERNATIVER_PASSER,
            });
            expect(state.neste).toBe(SkjemaSide.Oppsummering);
        });
        it('returnerer TilbakeTilJobb som neste for TILBAKE_TIL_JOBB', () => {
            const state = beregnNavigering(SkjemaSide.SykmeldtFremtidigSituasjon, {
                sykmeldtFremtidigSituasjon: SykmeldtValg.TILBAKE_TIL_JOBB,
            });
            expect(state.neste).toBe(SkjemaSide.TilbakeTilJobb);
        });
        it('returnerer TilbakeTilJobb som neste for TILBAKE_TIL_NY_STILLING', () => {
            const state = beregnNavigering(SkjemaSide.SykmeldtFremtidigSituasjon, {
                sykmeldtFremtidigSituasjon: SykmeldtValg.TILBAKE_TIL_NY_STILLING,
            });
            expect(state.neste).toBe(SkjemaSide.TilbakeTilJobb);
        });
    });

    describe('Utdanning', () => {
        it('returnerer Fremtidig situasjon som forrige', () => {
            const state = beregnNavigering(SkjemaSide.Utdanning, {});
            expect(state.forrige).toBe(SkjemaSide.SykmeldtFremtidigSituasjon);
        });
        it('returnerer GodkjentUtdanning som neste', () => {
            const state = beregnNavigering(SkjemaSide.Utdanning, {});
            expect(state.neste).toBe(SkjemaSide.GodkjentUtdanning);
        });
    });

    describe('GodkjentUtdanning', () => {
        it('returnerer Utdanning som forrige', () => {
            const state = beregnNavigering(SkjemaSide.GodkjentUtdanning, {});
            expect(state.forrige).toBe(SkjemaSide.Utdanning);
        });
        it('returnerer BestaattUtdanning som neste', () => {
            const state = beregnNavigering(SkjemaSide.GodkjentUtdanning, {});
            expect(state.neste).toBe(SkjemaSide.BestaattUtdanning);
        });
    });

    describe('BestaattUtdanning', () => {
        it('returnerer GodkjentUtdanning som forrige', () => {
            const state = beregnNavigering(SkjemaSide.BestaattUtdanning, {});
            expect(state.forrige).toBe(SkjemaSide.GodkjentUtdanning);
        });
        it('returnerer AndreHensyn som neste', () => {
            const state = beregnNavigering(SkjemaSide.BestaattUtdanning, {});
            expect(state.neste).toBe(SkjemaSide.AndreHensyn);
        });
    });

    describe('AndreHensyn', () => {
        it('returnerer BestaattUtdanning som forrige', () => {
            const state = beregnNavigering(SkjemaSide.AndreHensyn, {});
            expect(state.forrige).toBe(SkjemaSide.BestaattUtdanning);
        });
        it('returnerer Oppsummering som neste', () => {
            const state = beregnNavigering(SkjemaSide.AndreHensyn, {});
            expect(state.neste).toBe(SkjemaSide.Oppsummering);
        });
    });

    describe('TilbakeTilJobb', () => {
        it('returnerer Oppsummering som neste for REDUSERT_STILLING', () => {
            const state = beregnNavigering(SkjemaSide.TilbakeTilJobb, {
                tilbakeTilJobb: TilbakeTilJobbValg.REDUSERT_STILLING,
            });
            expect(state.neste).toBe(SkjemaSide.Oppsummering);
        });
        it('returnerer Oppsummering som neste for USIKKER', () => {
            const state = beregnNavigering(SkjemaSide.TilbakeTilJobb, {
                tilbakeTilJobb: TilbakeTilJobbValg.USIKKER,
            });
            expect(state.neste).toBe(SkjemaSide.Oppsummering);
        });
        it('returnerer Oppsummering som neste for NEI', () => {
            const state = beregnNavigering(SkjemaSide.TilbakeTilJobb, {
                tilbakeTilJobb: TilbakeTilJobbValg.NEI,
            });
            expect(state.neste).toBe(SkjemaSide.Oppsummering);
        });
        it('returnerer SkalTilbakeTilJobb som neste for FULL_STILLING', () => {
            const state = beregnNavigering(SkjemaSide.TilbakeTilJobb, {
                tilbakeTilJobb: TilbakeTilJobbValg.FULL_STILLING,
            });
            expect(state.neste).toBe(SkjemaSide.SkalTilbakeTilJobb);
        });
        it('returnerer FremtidigSituasjon som forrige', () => {
            const state = beregnNavigering(SkjemaSide.TilbakeTilJobb, {});
            expect(state.forrige).toBe(SkjemaSide.SykmeldtFremtidigSituasjon);
        });
    });
    describe('Oppsummering', () => {
        it('returnerer SykmeldtFremtidigSituasjon når sykmeldtFremtidigSituasjon=SykmeldtValg.INGEN_ALTERNATIVER_PASSER', () => {
            const state = beregnNavigering(SkjemaSide.Oppsummering, {
                sykmeldtFremtidigSituasjon: SykmeldtValg.INGEN_ALTERNATIVER_PASSER,
            });
            expect(state.forrige).toBe(SkjemaSide.SykmeldtFremtidigSituasjon);
        });

        it('returnerer TilbakeTilJobb når tilbakeTilJobb er satt i state', () => {
            const state = beregnNavigering(SkjemaSide.Oppsummering, {
                tilbakeTilJobb: TilbakeTilJobbValg.REDUSERT_STILLING,
            });
            expect(state.forrige).toBe(SkjemaSide.TilbakeTilJobb);
        });

        it('returnerer AndreHensyn som default', () => {
            const state = beregnNavigering(SkjemaSide.Oppsummering, {});
            expect(state.forrige).toBe(SkjemaSide.AndreHensyn);
        });
    });
});
