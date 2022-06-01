import { hentRegistreringFeiletUrl } from './hent-registrering-feilet-url';
import { ErrorTypes } from '../model/error';

describe('hent-registrering-feilet-url', () => {
    it('returnerer "/veiledning/registrering/utvandret/" for død, utvandret eller forsvunnet bruker', () => {
        expect(hentRegistreringFeiletUrl(ErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET, 'registrering')).toBe(
            '/veiledning/registrering/utvandret/'
        );
    });

    it('returnerer "/veiledning/registrering/mangler-arbeidstillatelse/" for bruker som mangler arbeidstillatelse', () => {
        expect(hentRegistreringFeiletUrl(ErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE, 'registrering')).toBe(
            '/veiledning/registrering/mangler-arbeidstillatelse/'
        );
    });

    it('returnerer "/veiledning/reaktivering/utvandret/" for død, utvandret eller forsvunnet bruker', () => {
        expect(hentRegistreringFeiletUrl(ErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET, 'reaktivering')).toBe(
            '/veiledning/reaktivering/utvandret/'
        );
    });

    it('returnerer "/veiledning/reaktivering/mangler-arbeidstillatelse/" for bruker som mangler arbeidstillatelse', () => {
        expect(hentRegistreringFeiletUrl(ErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE, 'reaktivering')).toBe(
            '/veiledning/reaktivering/mangler-arbeidstillatelse/'
        );
    });

    it('returnerer "/feil/" for ukjent bruker', () => {
        expect(hentRegistreringFeiletUrl(ErrorTypes.BRUKER_ER_UKJENT, 'registrering')).toBe('/feil/');
    });

    it('returnerer "/feil/" for bruker som ikke kan reaktiveres', () => {
        expect(hentRegistreringFeiletUrl(ErrorTypes.BRUKER_KAN_IKKE_REAKTIVERES, 'reaktivering')).toBe('/feil/');
    });
});
