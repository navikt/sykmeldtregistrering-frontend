import { ErrorTypes } from '../model/error';
import { FullforRegistreringResponse } from '../model/registrering';
import { Side } from '../model/skjema';

export default function hentKvitteringsUrl(response: FullforRegistreringResponse = {}, side: Side = 'standard') {
    const { type } = response;

    if (type === ErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET) {
        return '/veiledning/utvandret/';
    } else if (response.type === ErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE) {
        return '/veiledning/mangler-arbeidstillatelse/';
    } else if (type && [ErrorTypes.BRUKER_ER_UKJENT, ErrorTypes.BRUKER_KAN_IKKE_REAKTIVERES].includes(type)) {
        return '/feil/';
    }

    return side === 'sykmeldt' ? '/kvittering-sykmeldt/' : '/kvittering/';
}
