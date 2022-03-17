import {SisteStilling, SkjemaSide, SkjemaState} from '../model/skjema';
import { Reducer } from 'react';
import { TilbakeTilJobbValg } from '../components/skjema/tilbake-til-jobb';
import {
    DinSituasjon,
    UtdanningGodkjentValg,
    JaEllerNei,
    Utdanningsnivaa,
    FremtidigSituasjon,
} from '../model/sporsmal';

export type SkjemaReducer = Reducer<SkjemaState, SkjemaAction>;
export type SkjemaAction =
    | { type: SkjemaSide.DinSituasjon; value: DinSituasjon }
    | { type: SkjemaSide.Utdanning; value: Utdanningsnivaa }
    | { type: SkjemaSide.GodkjentUtdanning; value: UtdanningGodkjentValg }
    | { type: SkjemaSide.BestaattUtdanning; value: JaEllerNei }
    | { type: SkjemaSide.Helseproblemer; value: JaEllerNei }
    | { type: SkjemaSide.AndreProblemer; value: JaEllerNei }
    | { type: SkjemaSide.SisteJobb; value: SisteStilling }
    | { type: SkjemaSide.SykmeldtFremtidigSituasjon; value: FremtidigSituasjon }
    | { type: SkjemaSide.TilbakeTilJobb; value: TilbakeTilJobbValg };

export function skjemaReducer(state: SkjemaState, action: SkjemaAction): SkjemaState {
    switch (action.type) {
        case SkjemaSide.DinSituasjon: {
            return oppdaterDinSituasjon(state, action.value);
        }
        case SkjemaSide.Utdanning: {
            return oppdaterUtdanning(state, action.value);
        }
        case SkjemaSide.SisteJobb: {
            return {
                ...state,
                sisteStilling: action.value,
            };
        }
        case SkjemaSide.GodkjentUtdanning: {
            return {
                ...state,
                utdanningGodkjent: action.value,
            };
        }
        case SkjemaSide.BestaattUtdanning: {
            return {
                ...state,
                utdanningBestatt: action.value,
            };
        }
        case SkjemaSide.Helseproblemer: {
            return {
                ...state,
                helseHinder: action.value,
            };
        }
        case SkjemaSide.AndreProblemer: {
            return {
                ...state,
                andreForhold: action.value,
            };
        }
        case SkjemaSide.SykmeldtFremtidigSituasjon: {
            return oppdaterFremtidigSituasjon(state, action.value);
        }
        case SkjemaSide.TilbakeTilJobb: {
            return {
                ...state,
                tilbakeIArbeid: action.value,
            };
        }
    }

    return state;
}

export const oppdaterDinSituasjon = (skjemaState: SkjemaState, dinSituasjon: DinSituasjon) => {
    if (dinSituasjon === DinSituasjon.ALDRI_HATT_JOBB) {
        return {
            ...skjemaState,
            dinSituasjon: dinSituasjon,
            sisteStilling: undefined,
        };
    }
    return {
        ...skjemaState,
        dinSituasjon: dinSituasjon,
    };
};

export const oppdaterUtdanning = (skjemaState: SkjemaState, utdanning: Utdanningsnivaa) => {
    if (utdanning === Utdanningsnivaa.INGEN_UTDANNING) {
        return {
            ...skjemaState,
            utdanning: utdanning,
            utdanningGodkjent: undefined,
            utdanningBestatt: undefined,
        };
    }
    return {
        ...skjemaState,
        utdanning: utdanning,
    };
};

const oppdaterFremtidigSituasjon = (state: SkjemaState, valg: FremtidigSituasjon) => {
    if (valg === FremtidigSituasjon.INGEN_PASSER) {
        return {
            fremtidigSituasjon: valg,
        };
    }

    if ([FremtidigSituasjon.SAMME_ARBEIDSGIVER_NY_STILLING, FremtidigSituasjon.SAMME_ARBEIDSGIVER].includes(valg)) {
        return {
            ...state,
            fremtidigSituasjon: valg,
            utdanning: undefined,
            utdanningGodkjent: undefined,
            utdanningBestatt: undefined,
            andreProblemer: undefined,
        };
    }

    return {
        ...state,
        fremtidigSituasjon: valg,
        tilbakeIArbeid: undefined,
    };
};
