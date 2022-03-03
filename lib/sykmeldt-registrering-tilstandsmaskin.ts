import { Navigering, NavigeringsTilstandsMaskin, SkjemaState, SykmeldtSkjemaSide } from '../model/skjema';
import { SykmeldtValg } from '../components/skjema/sykmeldt-fremtidig-situasjon';

const TILSTANDER: NavigeringsTilstandsMaskin<SykmeldtSkjemaSide> = {
    [SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon]: (state: SkjemaState) => {
        if ([SykmeldtValg.TRENGER_NY_JOBB, SykmeldtValg.USIKKER].includes(state.sykmeldtFremtidigSituasjon!)) {
            return {
                neste: SykmeldtSkjemaSide.Utdanning,
                forrige: undefined,
            };
        }

        if (state.sykmeldtFremtidigSituasjon === SykmeldtValg.INGEN_ALTERNATIVER_PASSER) {
            return {
                neste: SykmeldtSkjemaSide.Oppsummering,
                forrige: undefined,
            };
        }

        return {
            neste: SykmeldtSkjemaSide.TilbakeTilJobb,
            forrige: undefined,
        };
    },
    [SykmeldtSkjemaSide.Utdanning]: () => {
        return {
            neste: SykmeldtSkjemaSide.GodkjentUtdanning,
            forrige: SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon,
        };
    },
    [SykmeldtSkjemaSide.GodkjentUtdanning]: () => {
        return {
            neste: SykmeldtSkjemaSide.BestaattUtdanning,
            forrige: SykmeldtSkjemaSide.Utdanning,
        };
    },
    [SykmeldtSkjemaSide.BestaattUtdanning]: () => {
        return {
            neste: SykmeldtSkjemaSide.AndreHensyn,
            forrige: SykmeldtSkjemaSide.GodkjentUtdanning,
        };
    },
    [SykmeldtSkjemaSide.AndreHensyn]: () => {
        return {
            neste: SykmeldtSkjemaSide.Oppsummering,
            forrige: SykmeldtSkjemaSide.BestaattUtdanning,
        };
    },
    [SykmeldtSkjemaSide.Oppsummering]: () => {
        return {};
    },
    [SykmeldtSkjemaSide.TilbakeTilJobb]: () => {
        return {};
    },
};

export function beregnNavigering(aktivSide: SykmeldtSkjemaSide, state: SkjemaState): Navigering<SykmeldtSkjemaSide> {
    return TILSTANDER[aktivSide](state);
}
