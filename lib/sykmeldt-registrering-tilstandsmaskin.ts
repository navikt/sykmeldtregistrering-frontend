import { Navigering, NavigeringsTilstandsMaskin, SkjemaSide, SkjemaState, SykmeldtSkjemaSide } from '../model/skjema';
import { FremtidigSituasjon, Utdanningsnivaa, TilbakeIArbeid } from '../model/sporsmal';

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
                    ? SkjemaSide.AndreProblemer
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
            neste: SkjemaSide.AndreProblemer,
            forrige: SkjemaSide.GodkjentUtdanning,
        };
    },
    [SkjemaSide.AndreProblemer]: (skjemaState: SkjemaState) => {
        return {
            neste: SkjemaSide.Oppsummering,
            forrige:
                skjemaState.utdanning === Utdanningsnivaa.INGEN_UTDANNING
                    ? SkjemaSide.Utdanning
                    : SkjemaSide.BestaattUtdanning,
        };
    },
    [SkjemaSide.TilbakeTilJobb]: (state: SkjemaState) => {
        if (state.tilbakeIArbeid === TilbakeIArbeid.JA_FULL_STILLING) {
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
            forrige: SkjemaSide.AndreProblemer,
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
export type SykmeldtRegistreringTilstandsmaskin = (
    aktivSide: SykmeldtSkjemaSide,
    state: SkjemaState
) => Navigering<SykmeldtSkjemaSide>;
export const beregnNavigering: SykmeldtRegistreringTilstandsmaskin = (aktivSide, state) => {
    return TILSTANDER[aktivSide](state);
};
