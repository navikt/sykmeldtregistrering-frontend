import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { Utdanningsnivaa } from '../components/skjema/utdanning';
import { Navigering, NavigeringsTilstandsMaskin, StandardSkjemaState, StandardSkjemaSide } from '../model/skjema';

const TILSTANDER: NavigeringsTilstandsMaskin<StandardSkjemaSide> = {
    [StandardSkjemaSide.DinSituasjon]: (skjemaState: StandardSkjemaState) => {
        if (skjemaState.dinSituasjon === Jobbsituasjon.ALDRIJOBBET) {
            return {
                neste: StandardSkjemaSide.Utdanning,
                forrige: undefined,
            };
        }

        return {
            neste: StandardSkjemaSide.SisteJobb,
            forrige: undefined,
        };
    },
    [StandardSkjemaSide.SisteJobb]: () => {
        return {
            neste: StandardSkjemaSide.Utdanning,
            forrige: StandardSkjemaSide.DinSituasjon,
        };
    },
    [StandardSkjemaSide.Utdanning]: (skjemaState: StandardSkjemaState) => {
        return {
            neste:
                skjemaState.utdanning === Utdanningsnivaa.INGEN
                    ? StandardSkjemaSide.Helseproblemer
                    : StandardSkjemaSide.GodkjentUtdanning,
            forrige:
                skjemaState.dinSituasjon === Jobbsituasjon.ALDRIJOBBET
                    ? StandardSkjemaSide.DinSituasjon
                    : StandardSkjemaSide.SisteJobb,
        };
    },
    [StandardSkjemaSide.GodkjentUtdanning]: () => {
        return {
            neste: StandardSkjemaSide.BestaattUtdanning,
            forrige: StandardSkjemaSide.Utdanning,
        };
    },
    [StandardSkjemaSide.BestaattUtdanning]: () => {
        return {
            neste: StandardSkjemaSide.Helseproblemer,
            forrige: StandardSkjemaSide.GodkjentUtdanning,
        };
    },
    [StandardSkjemaSide.Helseproblemer]: (skjemaState: StandardSkjemaState) => {
        return {
            neste: StandardSkjemaSide.AndreProblemer,
            forrige:
                skjemaState.utdanning === Utdanningsnivaa.INGEN
                    ? StandardSkjemaSide.Utdanning
                    : StandardSkjemaSide.BestaattUtdanning,
        };
    },
    [StandardSkjemaSide.AndreProblemer]: () => {
        return {
            neste: StandardSkjemaSide.Oppsummering,
            forrige: StandardSkjemaSide.Helseproblemer,
        };
    },
    [StandardSkjemaSide.Oppsummering]: () => {
        return {
            neste: undefined,
            forrige: undefined,
        };
    },
};

export function beregnNavigering(
    aktivSide: StandardSkjemaSide,
    state: StandardSkjemaState
): Navigering<StandardSkjemaSide> {
    return TILSTANDER[aktivSide](state);
}
