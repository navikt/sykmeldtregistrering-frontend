import hentKvitteringsUrl from './hent-kvitterings-url';
import { ErrorTypes } from '../model/error';

describe('hent-kvitterings-url', () => {
    it('returnerer "/veiledning/utvandret/" for død, utvandret eller forsvunnet bruker', () => {
        expect(hentKvitteringsUrl({ type: ErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET })).toBe(
            '/veiledning/utvandret/'
        );
    });

    it('returnerer "/veiledning/mangler-arbeidstillatelse/" for bruker som mangler arbeidstillatelse', () => {
        expect(hentKvitteringsUrl({ type: ErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE })).toBe(
            '/veiledning/mangler-arbeidstillatelse/'
        );
    });

    it('returnerer "/feil/" for ukjent bruker', () => {
        expect(hentKvitteringsUrl({ type: ErrorTypes.BRUKER_ER_UKJENT })).toBe('/feil/');
    });

    it('returnerer "/feil/" for bruker som ikke kan reaktiveres', () => {
        expect(hentKvitteringsUrl({ type: ErrorTypes.BRUKER_KAN_IKKE_REAKTIVERES })).toBe('/feil/');
    });

    it('returnerer "/kvittering/" for responser uten type', () => {
        expect(hentKvitteringsUrl()).toBe('/kvittering/');
    });

    it('returnerer "/kvittering-sykmeldt/ for sykmeldt-side', () => {
        expect(hentKvitteringsUrl({}, 'sykmeldt')).toBe('/kvittering-sykmeldt/');
    });
});
