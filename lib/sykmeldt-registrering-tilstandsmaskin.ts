import { Navigering, NavigeringsTilstandsMaskin, SkjemaSide, SkjemaState, SykmeldtSkjemaSide } from '../model/skjema';
import { TilbakeTilJobbValg } from '../components/skjema/tilbake-til-jobb';
import { FremtidigSituasjon, Utdanningsnivaa } from '../model/sporsmal';

const TILSTANDER: NavigeringsTilstandsMaskin<SykmeldtSkjemaSide> = {
    [SkjemaSide.SykmeldtFremtidigSituasjon]: (state: SkjemaState) => {
        if (
            state.fremtidigSituasjon &&
            [FremtidigSituasjon.NY_ARBEIDSGIVER, FremtidigSituasjon.USIKKER].includes(state.fremtidigSituasjon)
        ) {
            return {
                neste: SkjemaSide.Utdanning,
                forrige: undefined,
            };
        }

        if (state.fremtidigSituasjon === FremtidigSituasjon.INGEN_PASSER) {
            return {
                neste: SkjemaSide.Oppsummering,
                forrige: undefined,
            };
        }

        return {
            neste: SkjemaSide.TilbakeTilJobb,
            forrige: undefined,
        };
    },
    [SkjemaSide.Utdanning]: (skjemaState: SkjemaState) => {
        return {
            neste:
                skjemaState.utdanning === Utdanningsnivaa.INGEN_UTDANNING
                    ? SkjemaSide.AndreHensyn
                    : SkjemaSide.GodkjentUtdanning,
            forrige: SkjemaSide.SykmeldtFremtidigSituasjon,
        };
    },
    [SkjemaSide.GodkjentUtdanning]: () => {
        return {
            neste: SkjemaSide.BestaattUtdanning,
            forrige: SkjemaSide.Utdanning,
        };
    },
    [SkjemaSide.BestaattUtdanning]: () => {
        return {
            neste: SkjemaSide.AndreHensyn,
            forrige: SkjemaSide.GodkjentUtdanning,
        };
    },
    [SkjemaSide.AndreHensyn]: (skjemaState: SkjemaState) => {
        return {
            neste: SkjemaSide.Oppsummering,
            forrige:
                skjemaState.utdanning === Utdanningsnivaa.INGEN_UTDANNING
                    ? SkjemaSide.Utdanning
                    : SkjemaSide.BestaattUtdanning,
        };
    },
    [SkjemaSide.TilbakeTilJobb]: (state: SkjemaState) => {
        if (state.tilbakeIArbeid === TilbakeTilJobbValg.JA_FULL_STILLING) {
            return {
                neste: SkjemaSide.SkalTilbakeTilJobb,
                forrige: SkjemaSide.SykmeldtFremtidigSituasjon,
            };
        }
        return {
            neste: SkjemaSide.Oppsummering,
            forrige: SkjemaSide.SykmeldtFremtidigSituasjon,
        };
    },
    [SkjemaSide.Oppsummering]: (state: SkjemaState) => {
        if (state.fremtidigSituasjon === FremtidigSituasjon.INGEN_PASSER) {
            return {
                forrige: SkjemaSide.SykmeldtFremtidigSituasjon,
                neste: SkjemaSide.FullforRegistrering,
            };
        }
        if (state.tilbakeIArbeid) {
            return {
                forrige: SkjemaSide.TilbakeTilJobb,
                neste: SkjemaSide.FullforRegistrering,
            };
        }
        return {
            forrige: SkjemaSide.AndreHensyn,
            neste: SkjemaSide.FullforRegistrering,
        };
    },
    [SkjemaSide.SkalTilbakeTilJobb]: () => {
        return {};
    },
    [SkjemaSide.FullforRegistrering]: () => {
        return {
            neste: undefined,
            forrige: SkjemaSide.Oppsummering,
        };
    },
};

export function beregnNavigering(aktivSide: SykmeldtSkjemaSide, state: SkjemaState): Navigering<SykmeldtSkjemaSide> {
    return TILSTANDER[aktivSide](state);
}
