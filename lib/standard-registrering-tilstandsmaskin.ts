import { SkjemaSide, SkjemaState } from '../pages/skjema/[side]';
import { Jobbsituasjon } from '../components/skjema/din-situasjon';

const TILSTANDER = {
    [`${SkjemaSide.DinSituasjon}`]: (valg?: SkjemaState['dinSituasjon']) => {
        if (valg === undefined) {
            return {
                neste: undefined,
                forrige: undefined,
            };
        } else if (valg === Jobbsituasjon.ALDRIJOBBET) {
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

        return {
            neste: nesteSide,
            forrige: SkjemaSide.DinSituasjon,
        };
    },
};

export interface Navigering {
    neste?: SkjemaSide;
    forrige?: SkjemaSide;
}

export function beregnNavigering(aktivSide: SkjemaSide, state: SkjemaState): Navigering {
    return TILSTANDER[aktivSide](state.dinSituasjon);
}
