import { SykmeldtSkjemaSide } from '../model/skjema';
import { beregnNavigering } from './sykmeldt-registrering-tilstandsmaskin';
import { SykmeldtValg } from '../components/skjema/sykmeldt-fremtidig-situasjon';

describe('Standard registrering tilstandsmaskin', () => {
    describe('Fremtidig situasjon', () => {
        it('returnerer Utdanning som neste for TRENGER_NY_JOBBb', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon, {
                sykmeldtFremtidigSituasjon: SykmeldtValg.TRENGER_NY_JOBB,
            });
            expect(state.neste).toBe(SykmeldtSkjemaSide.Utdanning);
            expect(state.forrige).toBeUndefined();
        });

        it('returnerer Utdanning som neste for USIKKER', () => {
            const state = beregnNavigering(SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon, {
                sykmeldtFremtidigSituasjon: SykmeldtValg.USIKKER,
            });

            expect(state.neste).toBe(SykmeldtSkjemaSide.Utdanning);
        });
    });
});
