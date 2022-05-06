import { Navigering, NavigeringsTilstandsMaskin, SkjemaSide, SkjemaState, SykmeldtSkjemaSide } from '../model/skjema';
import { FremtidigSituasjon, TilbakeIArbeid, Utdanningsnivaa } from '../model/sporsmal';

const TILSTANDER: NavigeringsTilstandsMaskin<SykmeldtSkjemaSide> = {
    [SkjemaSide.SykmeldtFremtidigSituasjon]: (state: SkjemaState) => {
        if (
            state.fremtidigSituasjon &&
            [FremtidigSituasjon.NY_ARBEIDSGIVER, FremtidigSituasjon.USIKKER].includes(state.fremtidigSituasjon)
        ) {
            return {
                neste: SkjemaSide.Utdanning,
                forrige: undefined,
                fremdrift: 1 / 8,
            };
        }

        if (state.fremtidigSituasjon === FremtidigSituasjon.INGEN_PASSER) {
            return {
                neste: SkjemaSide.Oppsummering,
                forrige: undefined,
                fremdrift: 1 / 8,
            };
        }

        return {
            neste: SkjemaSide.TilbakeTilJobb,
            forrige: undefined,
            fremdrift: 1 / 8,
        };
    },
    [SkjemaSide.Utdanning]: (skjemaState: SkjemaState) => {
        return {
            neste:
                skjemaState.utdanning === Utdanningsnivaa.INGEN_UTDANNING
                    ? SkjemaSide.AndreProblemer
                    : SkjemaSide.GodkjentUtdanning,
            forrige: SkjemaSide.SykmeldtFremtidigSituasjon,
            fremdrift: 2 / 8,
        };
    },
    [SkjemaSide.GodkjentUtdanning]: () => {
        return {
            neste: SkjemaSide.BestaattUtdanning,
            forrige: SkjemaSide.Utdanning,
            fremdrift: 3 / 8,
        };
    },
    [SkjemaSide.BestaattUtdanning]: () => {
        return {
            neste: SkjemaSide.AndreProblemer,
            forrige: SkjemaSide.GodkjentUtdanning,
            fremdrift: 4 / 8,
        };
    },
    [SkjemaSide.AndreProblemer]: (skjemaState: SkjemaState) => {
        return {
            neste: SkjemaSide.Oppsummering,
            forrige:
                skjemaState.utdanning === Utdanningsnivaa.INGEN_UTDANNING
                    ? SkjemaSide.Utdanning
                    : SkjemaSide.BestaattUtdanning,
            fremdrift: 5 / 8,
        };
    },
    [SkjemaSide.TilbakeTilJobb]: (state: SkjemaState) => {
        if (state.tilbakeIArbeid === TilbakeIArbeid.JA_FULL_STILLING) {
            return {
                neste: SkjemaSide.SkalTilbakeTilJobb,
                forrige: SkjemaSide.SykmeldtFremtidigSituasjon,
                fremdrift: 2 / 4,
            };
        }
        return {
            neste: SkjemaSide.Oppsummering,
            forrige: SkjemaSide.SykmeldtFremtidigSituasjon,
            fremdrift: 2 / 4,
        };
    },
    [SkjemaSide.Oppsummering]: (state: SkjemaState) => {
        if (state.fremtidigSituasjon === FremtidigSituasjon.INGEN_PASSER) {
            return {
                forrige: SkjemaSide.SykmeldtFremtidigSituasjon,
                neste: SkjemaSide.FullforRegistrering,
                fremdrift: 6 / 8,
            };
        }
        if (state.tilbakeIArbeid) {
            return {
                forrige: SkjemaSide.TilbakeTilJobb,
                neste: SkjemaSide.FullforRegistrering,
                fremdrift: 6 / 8,
            };
        }
        return {
            forrige: SkjemaSide.AndreProblemer,
            neste: SkjemaSide.FullforRegistrering,
            fremdrift: 6 / 8,
        };
    },
    [SkjemaSide.SkalTilbakeTilJobb]: () => {
        return {
            fremdrift: 1,
            forrige: SkjemaSide.TilbakeTilJobb,
        };
    },
    [SkjemaSide.FullforRegistrering]: () => {
        return {
            neste: undefined,
            forrige: SkjemaSide.Oppsummering,
            fremdrift: 7 / 8,
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
