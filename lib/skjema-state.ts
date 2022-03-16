import { JaEllerNei, SkjemaSide, SkjemaState, SkjemaVerdi } from '../model/skjema';
import { GodkjentUtdanningValg } from '../components/skjema/utdanning-godkjent';
import { Reducer } from 'react';
import { FremtidigSituasjon } from '../components/skjema/sykmeldt-fremtidig-situasjon';
import { TilbakeTilJobbValg } from '../components/skjema/tilbake-til-jobb';
import { DinSituasjon, Utdanningsnivaa } from '../model/sporsmal';

export type SkjemaReducer = Reducer<SkjemaState, SkjemaAction>;
export type SkjemaAction =
    | { type: SkjemaSide.DinSituasjon; value: SkjemaVerdi<DinSituasjon> }
    | { type: SkjemaSide.Utdanning; value: SkjemaVerdi<Utdanningsnivaa> }
    | { type: SkjemaSide.GodkjentUtdanning; value: SkjemaVerdi<GodkjentUtdanningValg> }
    | { type: SkjemaSide.BestaattUtdanning; value: SkjemaVerdi<JaEllerNei> }
    | { type: SkjemaSide.Helseproblemer; value: SkjemaVerdi<JaEllerNei> }
    | { type: SkjemaSide.AndreProblemer; value: SkjemaVerdi<JaEllerNei> }
    | { type: SkjemaSide.SisteJobb; value: SkjemaVerdi<string> }
    | { type: SkjemaSide.SykmeldtFremtidigSituasjon; value: SkjemaVerdi<FremtidigSituasjon> }
    | { type: SkjemaSide.TilbakeTilJobb; value: SkjemaVerdi<TilbakeTilJobbValg> };

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

export const oppdaterDinSituasjon = (skjemaState: SkjemaState, dinSituasjon: SkjemaVerdi<DinSituasjon>) => {
    if (dinSituasjon.verdi === DinSituasjon.ALDRI_HATT_JOBB) {
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

export const oppdaterUtdanning = (skjemaState: SkjemaState, utdanning: SkjemaVerdi<Utdanningsnivaa>) => {
    if (utdanning.verdi === Utdanningsnivaa.INGEN_UTDANNING) {
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

const oppdaterFremtidigSituasjon = (state: SkjemaState, valg: SkjemaVerdi<FremtidigSituasjon>) => {
    if (valg.verdi === FremtidigSituasjon.INGEN_PASSER) {
        return {
            fremtidigSituasjon: valg,
        };
    }

    if (
        [FremtidigSituasjon.SAMME_ARBEIDSGIVER_NY_STILLING, FremtidigSituasjon.SAMME_ARBEIDSGIVER].includes(valg.verdi)
    ) {
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
