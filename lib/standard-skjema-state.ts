import { JaEllerNei, SkjemaVerdi, SkjemaSide, SkjemaState } from '../model/skjema';
import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { Utdanningsnivaa } from '../components/skjema/utdanning';
import { GodkjentUtdanningValg } from '../components/skjema/utdanning-godkjent';
import { Reducer } from 'react';
import { SykmeldtValg } from '../components/skjema/sykmeldt-fremtidig-situasjon';
import { TilbakeTilJobbValg } from '../components/skjema/tilbake-til-jobb';

export type SkjemaReducer = Reducer<SkjemaState, SkjemaAction>;
export type SkjemaAction =
    | { type: SkjemaSide.DinSituasjon; value: SkjemaVerdi<Jobbsituasjon> }
    | { type: SkjemaSide.Utdanning; value: Utdanningsnivaa }
    | { type: SkjemaSide.GodkjentUtdanning; value: GodkjentUtdanningValg }
    | { type: SkjemaSide.BestaattUtdanning; value: JaEllerNei }
    | { type: SkjemaSide.Helseproblemer; value: JaEllerNei }
    | { type: SkjemaSide.AndreProblemer; value: JaEllerNei }
    | { type: SkjemaSide.SisteJobb; value: string }
    | { type: SkjemaSide.SykmeldtFremtidigSituasjon; value: SykmeldtValg }
    | { type: SkjemaSide.TilbakeTilJobb; value: TilbakeTilJobbValg };

export function skjemaReducer(state: SkjemaState, action: SkjemaAction): SkjemaState {
    switch (action.type) {
        case SkjemaSide.DinSituasjon: {
            return {
                ...state,
                dinSituasjon: {
                    ...action.value,
                },
            };
        }
        case SkjemaSide.Utdanning: {
            return {
                ...state,
                utdanning: action.value,
            };
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
            return {
                ...state,
                sykmeldtFremtidigSituasjon: action.value,
            };
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
