import Skjema, { SkjemaSide, SkjemaState } from '../pages/skjema/[side]';
import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { Utdanningsnivaa } from '../components/skjema/utdanning';

const TILSTANDER = {
    [`${SkjemaSide.DinSituasjon}`]: (skjemaState: SkjemaState) => {
        if (skjemaState.dinSituasjon === undefined) {
            return {
                neste: undefined,
                forrige: undefined,
            };
        } else if (skjemaState.dinSituasjon === Jobbsituasjon.ALDRIJOBBET) {
            return {
                neste: SkjemaSide.Utdanning,
                forrige: undefined,
            };
        } else {
            return {
                neste: SkjemaSide.SisteJobb,
                forrige: undefined,
            };
        }
    },
    [`${SkjemaSide.SisteJobb}`]: (skjemaState: SkjemaState) => {
        return {
            neste: SkjemaSide.Utdanning,
            forrige: SkjemaSide.DinSituasjon,
        };
    },
    [`${SkjemaSide.Utdanning}`]: (skjemaState: SkjemaState) => {
        return {
            neste:
                skjemaState.utdanning === Utdanningsnivaa.INGEN
                    ? SkjemaSide.Helseproblemer
                    : SkjemaSide.GodkjentUtdanning,
            forrige:
                skjemaState.dinSituasjon === Jobbsituasjon.ALDRIJOBBET ? SkjemaSide.DinSituasjon : SkjemaSide.SisteJobb,
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
