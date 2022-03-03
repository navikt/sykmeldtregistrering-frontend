import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { Utdanningsnivaa } from '../components/skjema/utdanning';
import { GodkjentUtdanningValg } from '../components/skjema/utdanning-godkjent';
import { SykmeldtValg } from '../components/skjema/sykmeldt-fremtidig-situasjon';
import { TilbakeTilJobbValg } from '../components/skjema/tilbake-til-jobb';

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
    SykmeldtFremtidigSituasjon = '0',
    Utdanning = '1',
    GodkjentUtdanning = '2',
    BestaattUtdanning = '3',
    AndreHensyn = '4',
    Oppsummering = '5',
    TilbakeTilJobb = '6',
    SkalTilbakeTilJobb = '7',
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
    bestaattUtdanning?: JaEllerNei;
    helseproblemer?: JaEllerNei;
    andreProblemer?: JaEllerNei;
    sykmeldtFremtidigSituasjon?: SykmeldtValg;
    tilbakeTilJobb?: TilbakeTilJobbValg;
}

export enum JaEllerNei {
    JA = 'ja',
    NEI = 'nei',
}
