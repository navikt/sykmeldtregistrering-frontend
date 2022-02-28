import { SkjemaSide, SkjemaState } from '../pages/skjema/[side]';

const TILSTANDER = {
    [`${SkjemaSide.DinSituasjon}`]: (valg?: SkjemaState['dinSituasjon']) => {
        if (valg === 'mistet') {
            return {
                neste: SkjemaSide.SisteJobb,
                forrige: undefined,
            };
        }

        return {
            neste: undefined,
            forrige: undefined,
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
