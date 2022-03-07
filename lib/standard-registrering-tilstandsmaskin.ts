import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { Utdanningsnivaa } from '../components/skjema/utdanning';
import { Navigering, NavigeringsTilstandsMaskin, SkjemaSide, SkjemaState, StandardSkjemaSide } from '../model/skjema';

const TILSTANDER: NavigeringsTilstandsMaskin<StandardSkjemaSide> = {
    [SkjemaSide.DinSituasjon]: (skjemaState: SkjemaState) => {
        if (skjemaState.dinSituasjon?.verdi === Jobbsituasjon.ALDRIJOBBET) {
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
                skjemaState.utdanning?.verdi === Utdanningsnivaa.INGEN
                    ? SkjemaSide.Helseproblemer
                    : SkjemaSide.GodkjentUtdanning,
            forrige:
                skjemaState.dinSituasjon?.verdi === Jobbsituasjon.ALDRIJOBBET
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
                skjemaState.utdanning?.verdi === Utdanningsnivaa.INGEN
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
            neste: undefined,
            forrige: undefined,
        };
    },
};

export function beregnNavigering(aktivSide: StandardSkjemaSide, state: SkjemaState): Navigering<StandardSkjemaSide> {
    return TILSTANDER[aktivSide](state);
}
