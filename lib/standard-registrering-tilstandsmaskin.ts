import { SkjemaSide, SkjemaState } from '../pages/skjema/[side]';
import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { Utdanningsnivaa } from '../components/skjema/utdanning';

const TILSTANDER = {
    [`${SkjemaSide.DinSituasjon}`]: (skjemaState: SkjemaState) => {
        if (skjemaState.dinSituasjon === Jobbsituasjon.ALDRIJOBBET) {
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
                skjemaState.utdanning === Utdanningsnivaa.INGEN
                    ? SkjemaSide.Helseproblemer
                    : SkjemaSide.GodkjentUtdanning,
            forrige:
                skjemaState.dinSituasjon === Jobbsituasjon.ALDRIJOBBET ? SkjemaSide.DinSituasjon : SkjemaSide.SisteJobb,
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
                skjemaState.utdanning === Utdanningsnivaa.INGEN ? SkjemaSide.Utdanning : SkjemaSide.BestaattUtdanning,
        };
    },
    [SkjemaSide.AndreProblemer]: () => {
        return {
            neste: SkjemaSide.Oppsummering,
            forrige: SkjemaSide.Helseproblemer,
        };
    },
};

export interface Navigering {
    neste?: SkjemaSide;
    forrige?: SkjemaSide;
}

export function beregnNavigering(aktivSide: SkjemaSide, state: SkjemaState): Navigering {
    return TILSTANDER[aktivSide](state);
}
