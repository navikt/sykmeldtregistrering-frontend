import { JaEllerNei, StandardSkjemaState, StandardSkjemaSide, SykmeldtSkjemaSide } from '../model/skjema';
import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { Utdanningsnivaa } from '../components/skjema/utdanning';
import { GodkjentUtdanningValg } from '../components/skjema/utdanning-godkjent';
import { Reducer } from 'react';

export type SkjemaReducer = Reducer<StandardSkjemaState, SkjemaAction>;
export type SkjemaAction =
    | { type: StandardSkjemaSide.DinSituasjon; value: Jobbsituasjon }
    | { type: StandardSkjemaSide.Utdanning; value: Utdanningsnivaa }
    | { type: StandardSkjemaSide.GodkjentUtdanning; value: GodkjentUtdanningValg }
    | { type: StandardSkjemaSide.BestaattUtdanning; value: JaEllerNei }
    | { type: StandardSkjemaSide.Helseproblemer; value: JaEllerNei }
    | { type: StandardSkjemaSide.AndreProblemer; value: JaEllerNei }
    | { type: StandardSkjemaSide.SisteJobb; value: string };

export function skjemaReducer(state: StandardSkjemaState, action: SkjemaAction): StandardSkjemaState {
    switch (action.type) {
        case StandardSkjemaSide.DinSituasjon: {
            return {
                ...state,
                dinSituasjon: action.value,
            };
        }
        case StandardSkjemaSide.Utdanning: {
            return {
                ...state,
                utdanning: action.value,
            };
        }

        case StandardSkjemaSide.SisteJobb: {
            return {
                ...state,
                sisteJobb: action.value,
            };
        }

        case StandardSkjemaSide.GodkjentUtdanning: {
            return {
                ...state,
                godkjentUtdanning: action.value,
            };
        }
        case StandardSkjemaSide.BestaattUtdanning: {
            return {
                ...state,
                bestaattUtdanning: action.value,
            };
        }
        case StandardSkjemaSide.Helseproblemer: {
            return {
                ...state,
                helseproblemer: action.value,
            };
        }
        case StandardSkjemaSide.AndreProblemer: {
            return {
                ...state,
                andreProblemer: action.value,
            };
        }
    }

    return state;
}
