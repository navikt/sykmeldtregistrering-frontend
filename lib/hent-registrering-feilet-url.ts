import { ErrorTypes } from '../model/error';

export const hentRegistreringFeiletUrl = (feiltype: ErrorTypes, registreringstype: String) => {
    if (feiltype === ErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET) {
        return `/veiledning/${registreringstype}/utvandret/`;
    } else if (feiltype === ErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE) {
        return `/veiledning/${registreringstype}/mangler-arbeidstillatelse/`;
    } else if (feiltype && [ErrorTypes.BRUKER_ER_UKJENT, ErrorTypes.BRUKER_KAN_IKKE_REAKTIVERES].includes(feiltype)) {
        return '/feil/';
    } else {
        return '/feil/';
    }
};
