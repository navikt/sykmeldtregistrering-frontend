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

        return {};
    },
    [SykmeldtSkjemaSide.Utdanning]: () => {
        return {};
    },
};

export function beregnNavigering(aktivSide: SykmeldtSkjemaSide, state: SkjemaState): Navigering<SykmeldtSkjemaSide> {
    return TILSTANDER[aktivSide](state);
}
