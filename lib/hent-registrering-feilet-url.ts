import { ErrorTypes } from '../model/error';

export const hentRegistreringFeiletUrl = (feiltype: ErrorTypes) => {
    if (feiltype === ErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET) {
        return '/veiledning/utvandret/';
    } else if (feiltype === ErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE) {
        return '/veiledning/mangler-arbeidstillatelse/';
    } else if (feiltype && [ErrorTypes.BRUKER_ER_UKJENT, ErrorTypes.BRUKER_KAN_IKKE_REAKTIVERES].includes(feiltype)) {
        return '/feil/';
    }
};
