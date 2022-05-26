import { hentRegistreringFeiletUrl } from './hent-registrering-feilet-url';
import { ErrorTypes } from '../model/error';

describe('hent-registrering-feilet-url', () => {
    it('returnerer "/veiledning/utvandret/" for død, utvandret eller forsvunnet bruker', () => {
        expect(hentRegistreringFeiletUrl(ErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET)).toBe(
            '/veiledning/utvandret/'
        );
    });

    it('returnerer "/veiledning/mangler-arbeidstillatelse/" for bruker som mangler arbeidstillatelse', () => {
        expect(hentRegistreringFeiletUrl(ErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE)).toBe(
            '/veiledning/mangler-arbeidstillatelse/'
        );
    });

    it('returnerer "/feil/" for ukjent bruker', () => {
        expect(hentRegistreringFeiletUrl(ErrorTypes.BRUKER_ER_UKJENT)).toBe('/feil/');
    });

    it('returnerer "/feil/" for bruker som ikke kan reaktiveres', () => {
        expect(hentRegistreringFeiletUrl(ErrorTypes.BRUKER_KAN_IKKE_REAKTIVERES)).toBe('/feil/');
    });
});
