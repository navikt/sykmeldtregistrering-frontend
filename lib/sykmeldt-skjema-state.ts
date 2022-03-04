import { JaEllerNei, StandardSkjemaState, SykmeldtSkjemaSide, SykmeldtSkjemaState } from '../model/skjema';
import { Utdanningsnivaa } from '../components/skjema/utdanning';
import { GodkjentUtdanningValg } from '../components/skjema/utdanning-godkjent';
import { Reducer } from 'react';
import { SykmeldtValg } from '../components/skjema/sykmeldt-fremtidig-situasjon';
import { TilbakeTilJobbValg } from '../components/skjema/tilbake-til-jobb';

export type SykmeldtSkjemaReducer = Reducer<StandardSkjemaState, SykmeldtSkjemaAction>;

export type SykmeldtSkjemaAction =
    | { type: SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon; value: SykmeldtValg }
    | { type: SykmeldtSkjemaSide.TilbakeTilJobb; value: TilbakeTilJobbValg }
    | { type: SykmeldtSkjemaSide.Utdanning; value: Utdanningsnivaa }
    | { type: SykmeldtSkjemaSide.GodkjentUtdanning; value: GodkjentUtdanningValg }
    | { type: SykmeldtSkjemaSide.BestaattUtdanning; value: JaEllerNei }
    | { type: SykmeldtSkjemaSide.AndreHensyn; value: JaEllerNei };

export function sykmeldtSkjemaReducer(state: SykmeldtSkjemaState, action: SykmeldtSkjemaAction): SykmeldtSkjemaState {
    switch (action.type) {
        case SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon: {
            return {
                ...state,
                sykmeldtFremtidigSituasjon: action.value,
            };
        }
        case SykmeldtSkjemaSide.TilbakeTilJobb: {
            return {
                ...state,
                tilbakeTilJobb: action.value,
            };
        }
        case SykmeldtSkjemaSide.Utdanning: {
            return {
                ...state,
                utdanning: action.value,
            };
        }
        case SykmeldtSkjemaSide.GodkjentUtdanning: {
            return {
                ...state,
                godkjentUtdanning: action.value,
            };
        }
        case SykmeldtSkjemaSide.BestaattUtdanning: {
            return {
                ...state,
                bestaattUtdanning: action.value,
            };
        }
        case SykmeldtSkjemaSide.AndreHensyn: {
            return {
                ...state,
                andreProblemer: action.value,
            };
        }
    }

    return state;
}
