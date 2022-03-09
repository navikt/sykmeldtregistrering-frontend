import { JaEllerNei, SkjemaSide, SkjemaState, SkjemaVerdi } from '../model/skjema';
import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { Utdanningsnivaa } from '../components/skjema/utdanning';
import { GodkjentUtdanningValg } from '../components/skjema/utdanning-godkjent';
import { Reducer } from 'react';
import { SykmeldtValg } from '../components/skjema/sykmeldt-fremtidig-situasjon';
import { TilbakeTilJobbValg } from '../components/skjema/tilbake-til-jobb';

export type SkjemaReducer = Reducer<SkjemaState, SkjemaAction>;
export type SkjemaAction =
    | { type: SkjemaSide.DinSituasjon; value: SkjemaVerdi<Jobbsituasjon> }
    | { type: SkjemaSide.Utdanning; value: SkjemaVerdi<Utdanningsnivaa> }
    | { type: SkjemaSide.GodkjentUtdanning; value: SkjemaVerdi<GodkjentUtdanningValg> }
    | { type: SkjemaSide.BestaattUtdanning; value: SkjemaVerdi<JaEllerNei> }
    | { type: SkjemaSide.Helseproblemer; value: SkjemaVerdi<JaEllerNei> }
    | { type: SkjemaSide.AndreProblemer; value: SkjemaVerdi<JaEllerNei> }
    | { type: SkjemaSide.SisteJobb; value: SkjemaVerdi<string> }
    | { type: SkjemaSide.SykmeldtFremtidigSituasjon; value: SkjemaVerdi<SykmeldtValg> }
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
                sisteJobb: action.value,
            };
        }
        case SkjemaSide.GodkjentUtdanning: {
            return {
                ...state,
                godkjentUtdanning: action.value,
            };
        }
        case SkjemaSide.BestaattUtdanning: {
            return {
                ...state,
                bestaattUtdanning: action.value,
            };
        }
        case SkjemaSide.Helseproblemer: {
            return {
                ...state,
                helseproblemer: action.value,
            };
        }
        case SkjemaSide.AndreProblemer: {
            return {
                ...state,
                andreProblemer: action.value,
            };
        }
        case SkjemaSide.SykmeldtFremtidigSituasjon: {
            return oppdaterSykmeldtFremtidigSituasjon(state, action.value);
        }
        case SkjemaSide.TilbakeTilJobb: {
            return {
                ...state,
                tilbakeTilJobb: action.value,
            };
        }
    }

    return state;
}

export const oppdaterDinSituasjon = (skjemaState: SkjemaState, dinSituasjon: SkjemaVerdi<Jobbsituasjon>) => {
    if (dinSituasjon.verdi === Jobbsituasjon.ALDRIJOBBET) {
        return {
            ...skjemaState,
            dinSituasjon: dinSituasjon,
            sisteJobb: undefined,
        };
    }
    return {
        ...skjemaState,
        dinSituasjon: dinSituasjon,
    };
};

export const oppdaterUtdanning = (skjemaState: SkjemaState, utdanning: SkjemaVerdi<Utdanningsnivaa>) => {
    if (utdanning.verdi === Utdanningsnivaa.INGEN) {
        return {
            ...skjemaState,
            utdanning: utdanning,
            godkjentUtdanning: undefined,
            bestaattUtdanning: undefined,
        };
    }
    return {
        ...skjemaState,
        utdanning: utdanning,
    };
};

const oppdaterSykmeldtFremtidigSituasjon = (state: SkjemaState, valg: SkjemaVerdi<SykmeldtValg>) => {
    if (valg.verdi === SykmeldtValg.INGEN_ALTERNATIVER_PASSER) {
        return {
            sykmeldtFremtidigSituasjon: valg,
        };
    }

    if ([SykmeldtValg.TILBAKE_TIL_NY_STILLING, SykmeldtValg.TILBAKE_TIL_JOBB].includes(valg.verdi)) {
        return {
            ...state,
            sykmeldtFremtidigSituasjon: valg,
            utdanning: undefined,
            godkjentUtdanning: undefined,
            bestaattUtdanning: undefined,
            andreProblemer: undefined,
        };
    }

    return {
        ...state,
        sykmeldtFremtidigSituasjon: valg,
        tilbakeTilJobb: undefined,
    };
};
