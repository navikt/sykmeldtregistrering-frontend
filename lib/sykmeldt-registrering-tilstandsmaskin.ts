import { Navigering, NavigeringsTilstandsMaskin, SkjemaSide, SykmeldtSkjemaSide, SkjemaState } from '../model/skjema';
import { SykmeldtValg } from '../components/skjema/sykmeldt-fremtidig-situasjon';
import { TilbakeTilJobbValg } from '../components/skjema/tilbake-til-jobb';

const TILSTANDER: NavigeringsTilstandsMaskin<SykmeldtSkjemaSide> = {
    [SkjemaSide.SykmeldtFremtidigSituasjon]: (state: SkjemaState) => {
        if ([SykmeldtValg.TRENGER_NY_JOBB, SykmeldtValg.USIKKER].includes(state.sykmeldtFremtidigSituasjon!.verdi)) {
            return {
                neste: SkjemaSide.Utdanning,
                forrige: undefined,
            };
        }

        if (state.sykmeldtFremtidigSituasjon?.verdi === SykmeldtValg.INGEN_ALTERNATIVER_PASSER) {
            return {
                neste: SkjemaSide.Oppsummering,
                forrige: undefined,
            };
        }

        return {
            neste: SkjemaSide.TilbakeTilJobb,
            forrige: undefined,
        };
    },
    [SkjemaSide.Utdanning]: () => {
        return {
            neste: SkjemaSide.GodkjentUtdanning,
            forrige: SkjemaSide.SykmeldtFremtidigSituasjon,
        };
    },
    [SkjemaSide.GodkjentUtdanning]: () => {
        return {
            neste: SkjemaSide.BestaattUtdanning,
            forrige: SkjemaSide.Utdanning,
        };
    },
    [SkjemaSide.BestaattUtdanning]: () => {
        return {
            neste: SkjemaSide.AndreHensyn,
            forrige: SkjemaSide.GodkjentUtdanning,
        };
    },
    [SkjemaSide.AndreHensyn]: () => {
        return {
            neste: SkjemaSide.Oppsummering,
            forrige: SkjemaSide.BestaattUtdanning,
        };
    },
    [SkjemaSide.TilbakeTilJobb]: (state: SkjemaState) => {
        if (state.tilbakeTilJobb?.verdi === TilbakeTilJobbValg.FULL_STILLING) {
            return {
                neste: SkjemaSide.SkalTilbakeTilJobb,
                forrige: SkjemaSide.SykmeldtFremtidigSituasjon,
            };
        }
        return {
            neste: SkjemaSide.Oppsummering,
            forrige: SkjemaSide.SykmeldtFremtidigSituasjon,
        };
    },
    [SkjemaSide.Oppsummering]: (state: SkjemaState) => {
        if (state.sykmeldtFremtidigSituasjon?.verdi === SykmeldtValg.INGEN_ALTERNATIVER_PASSER) {
            return {
                forrige: SkjemaSide.SykmeldtFremtidigSituasjon,
            };
        }
        if (state.tilbakeTilJobb) {
            return {
                forrige: SkjemaSide.TilbakeTilJobb,
            };
        }
        return {
            forrige: SkjemaSide.AndreHensyn,
        };
    },
    [SkjemaSide.SkalTilbakeTilJobb]: () => {
        return {};
    },
};

export function beregnNavigering(aktivSide: SykmeldtSkjemaSide, state: SkjemaState): Navigering<SykmeldtSkjemaSide> {
    return TILSTANDER[aktivSide](state);
}
