import {
    Navigering,
    NavigeringsTilstandsMaskin,
    SkjemaSide,
    SkjemaState,
    StandardSkjemaSide,
    SykmeldtSkjemaSide,
} from '../model/skjema';
import { DinSituasjon, Utdanningsnivaa } from '../model/sporsmal';

const TILSTANDER: NavigeringsTilstandsMaskin<StandardSkjemaSide> = {
    [SkjemaSide.DinSituasjon]: (skjemaState: SkjemaState) => {
        if (skjemaState.dinSituasjon === DinSituasjon.ALDRI_HATT_JOBB) {
            return {
                neste: SkjemaSide.Utdanning,
                forrige: undefined,
            };
        }

        return {
            neste: SkjemaSide.SisteJobb,
            forrige: undefined,
        };
    },
    [SkjemaSide.SisteJobb]: () => {
        return {
            neste: SkjemaSide.Utdanning,
            forrige: SkjemaSide.DinSituasjon,
        };
    },
    [SkjemaSide.Utdanning]: (skjemaState: SkjemaState) => {
        return {
            neste:
                skjemaState.utdanning === Utdanningsnivaa.INGEN_UTDANNING
                    ? SkjemaSide.Helseproblemer
                    : SkjemaSide.GodkjentUtdanning,
            forrige:
                skjemaState.dinSituasjon === DinSituasjon.ALDRI_HATT_JOBB
                    ? SkjemaSide.DinSituasjon
                    : SkjemaSide.SisteJobb,
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
            neste: SkjemaSide.Helseproblemer,
            forrige: SkjemaSide.GodkjentUtdanning,
        };
    },
    [SkjemaSide.Helseproblemer]: (skjemaState: SkjemaState) => {
        return {
            neste: SkjemaSide.AndreProblemer,
            forrige:
                skjemaState.utdanning === Utdanningsnivaa.INGEN_UTDANNING
                    ? SkjemaSide.Utdanning
                    : SkjemaSide.BestaattUtdanning,
        };
    },
    [SkjemaSide.AndreProblemer]: () => {
        return {
            neste: SkjemaSide.Oppsummering,
            forrige: SkjemaSide.Helseproblemer,
        };
    },
    [SkjemaSide.Oppsummering]: () => {
        return {
            neste: SkjemaSide.FullforRegistrering,
            forrige: SkjemaSide.AndreProblemer,
        };
    },
    [SkjemaSide.FullforRegistrering]: () => {
        return {
            neste: undefined,
            forrige: SkjemaSide.Oppsummering,
        };
    },
};

export type StandardRegistreringTilstandsmaskin = (
    aktivSide: StandardSkjemaSide,
    state: SkjemaState
) => Navigering<StandardSkjemaSide>;
export const beregnNavigering: StandardRegistreringTilstandsmaskin = (aktivSide, state) => {
    return TILSTANDER[aktivSide](state);
};
