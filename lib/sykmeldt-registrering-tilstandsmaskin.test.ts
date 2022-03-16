import { SkjemaSide } from '../model/skjema';
import { beregnNavigering } from './sykmeldt-registrering-tilstandsmaskin';
import { FremtidigSituasjon } from '../components/skjema/sykmeldt-fremtidig-situasjon';
import { TilbakeTilJobbValg } from '../components/skjema/tilbake-til-jobb';
import { Utdanningsnivaa } from '../model/sporsmal';

describe('Sykmeldt registrering tilstandsmaskin', () => {
    describe('Fremtidig situasjon', () => {
        it('returnerer Utdanning som neste for TRENGER_NY_JOBBb', () => {
            const state = beregnNavigering(SkjemaSide.SykmeldtFremtidigSituasjon, {
                fremtidigSituasjon: { verdi: FremtidigSituasjon.NY_ARBEIDSGIVER, tekst: '' },
            });
            expect(state.neste).toBe(SkjemaSide.Utdanning);
            expect(state.forrige).toBeUndefined();
        });
        it('returnerer Utdanning som neste for USIKKER', () => {
            const state = beregnNavigering(SkjemaSide.SykmeldtFremtidigSituasjon, {
                fremtidigSituasjon: { verdi: FremtidigSituasjon.USIKKER, tekst: '' },
            });
            expect(state.neste).toBe(SkjemaSide.Utdanning);
        });
        it('returnerer Oppsummering som neste for INGEN_ALTERNATIVER_PASSER', () => {
            const state = beregnNavigering(SkjemaSide.SykmeldtFremtidigSituasjon, {
                fremtidigSituasjon: { verdi: FremtidigSituasjon.INGEN_PASSER, tekst: '' },
            });
            expect(state.neste).toBe(SkjemaSide.Oppsummering);
        });
        it('returnerer TilbakeTilJobb som neste for TILBAKE_TIL_JOBB', () => {
            const state = beregnNavigering(SkjemaSide.SykmeldtFremtidigSituasjon, {
                fremtidigSituasjon: { verdi: FremtidigSituasjon.SAMME_ARBEIDSGIVER, tekst: '' },
            });
            expect(state.neste).toBe(SkjemaSide.TilbakeTilJobb);
        });
        it('returnerer TilbakeTilJobb som neste for TILBAKE_TIL_NY_STILLING', () => {
            const state = beregnNavigering(SkjemaSide.SykmeldtFremtidigSituasjon, {
                fremtidigSituasjon: { verdi: FremtidigSituasjon.SAMME_ARBEIDSGIVER_NY_STILLING, tekst: '' },
            });
            expect(state.neste).toBe(SkjemaSide.TilbakeTilJobb);
        });
    });

    describe('Utdanning', () => {
        it('returnerer Fremtidig situasjon som forrige', () => {
            const state = beregnNavigering(SkjemaSide.Utdanning, {});
            expect(state.forrige).toBe(SkjemaSide.SykmeldtFremtidigSituasjon);
        });
        it('returnerer GodkjentUtdanning som neste for Utdanningsnivaa.HOYERE', () => {
            const state = beregnNavigering(SkjemaSide.Utdanning, {
                utdanning: { verdi: Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER, tekst: '' },
            });
            expect(state.neste).toBe(SkjemaSide.GodkjentUtdanning);
        });
        it('returnerer AndreHensyn som neste for Utdanningsnivaa.INGEN', () => {
            const state = beregnNavigering(SkjemaSide.Utdanning, {
                utdanning: { verdi: Utdanningsnivaa.INGEN_UTDANNING, tekst: '' },
            });
            expect(state.neste).toBe(SkjemaSide.AndreHensyn);
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
        it('returnerer BestaattUtdanning som forrige hvis utdanning==Utdanningsnivaa.HOYERE', () => {
            const state = beregnNavigering(SkjemaSide.AndreHensyn, {
                utdanning: { verdi: Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER, tekst: '' },
            });
            expect(state.forrige).toBe(SkjemaSide.BestaattUtdanning);
        });
        it('returnerer Utdanning som forrige hvis valgt utdanning er Utdanningsnivaa.INGEN', () => {
            const state = beregnNavigering(SkjemaSide.AndreHensyn, {
                utdanning: { verdi: Utdanningsnivaa.INGEN_UTDANNING, tekst: '' },
            });
            expect(state.forrige).toBe(SkjemaSide.Utdanning);
        });
        it('returnerer Oppsummering som neste', () => {
            const state = beregnNavigering(SkjemaSide.AndreHensyn, {});
            expect(state.neste).toBe(SkjemaSide.Oppsummering);
        });
    });

    describe('TilbakeTilJobb', () => {
        it('returnerer Oppsummering som neste for REDUSERT_STILLING', () => {
            const state = beregnNavigering(SkjemaSide.TilbakeTilJobb, {
                tilbakeIArbeid: { verdi: TilbakeTilJobbValg.JA_REDUSERT_STILLING, tekst: '' },
            });
            expect(state.neste).toBe(SkjemaSide.Oppsummering);
        });
        it('returnerer Oppsummering som neste for USIKKER', () => {
            const state = beregnNavigering(SkjemaSide.TilbakeTilJobb, {
                tilbakeIArbeid: { verdi: TilbakeTilJobbValg.USIKKER, tekst: '' },
            });
            expect(state.neste).toBe(SkjemaSide.Oppsummering);
        });
        it('returnerer Oppsummering som neste for NEI', () => {
            const state = beregnNavigering(SkjemaSide.TilbakeTilJobb, {
                tilbakeIArbeid: { verdi: TilbakeTilJobbValg.NEI, tekst: '' },
            });
            expect(state.neste).toBe(SkjemaSide.Oppsummering);
        });
        it('returnerer SkalTilbakeTilJobb som neste for FULL_STILLING', () => {
            const state = beregnNavigering(SkjemaSide.TilbakeTilJobb, {
                tilbakeIArbeid: { verdi: TilbakeTilJobbValg.JA_FULL_STILLING, tekst: '' },
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
                fremtidigSituasjon: { verdi: FremtidigSituasjon.INGEN_PASSER, tekst: '' },
            });
            expect(state.forrige).toBe(SkjemaSide.SykmeldtFremtidigSituasjon);
        });

        it('returnerer TilbakeTilJobb når tilbakeTilJobb er satt i state', () => {
            const state = beregnNavigering(SkjemaSide.Oppsummering, {
                tilbakeIArbeid: { verdi: TilbakeTilJobbValg.JA_REDUSERT_STILLING, tekst: '' },
            });
            expect(state.forrige).toBe(SkjemaSide.TilbakeTilJobb);
        });

        it('returnerer AndreHensyn som default', () => {
            const state = beregnNavigering(SkjemaSide.Oppsummering, {});
            expect(state.forrige).toBe(SkjemaSide.AndreHensyn);
        });
    });
});
