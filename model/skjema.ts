import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { Utdanningsnivaa } from '../components/skjema/utdanning';
import { GodkjentUtdanningValg } from '../components/skjema/utdanning-godkjent';

export enum StandardSkjemaSide {
    DinSituasjon = '0',
    SisteJobb = '1',
    Utdanning = '2',
    GodkjentUtdanning = '3',
    BestaattUtdanning = '4',
    Helseproblemer = '5',
    AndreProblemer = '6',
    Oppsummering = '8',
}

export enum SykmeldtSkjemaSide {
    SykmeldtFremtidigSituasjon = '7',
}

export type SkjemaSide = StandardSkjemaSide | SykmeldtSkjemaSide;

export type Navigering<T extends SkjemaSide> = {
    neste?: T;
    forrige?: T;
};

export type NavigeringsTilstandsMaskin<T extends SkjemaSide> = Record<T, (state: SkjemaState) => Navigering<T>>;

export interface SkjemaState {
    dinSituasjon?: Jobbsituasjon;
    sisteJobb?: string;
    utdanning?: Utdanningsnivaa;
    godkjentUtdanning?: GodkjentUtdanningValg;
    bestaattUtdanning?: string;
    helseproblemer?: string;
    andreProblemer?: string;
    sykmeldtFremtidigSituasjon?: string;
}
