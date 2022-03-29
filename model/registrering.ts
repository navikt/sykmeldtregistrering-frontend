import { ErrorTypes } from './error';

export enum RegistreringType {
    REAKTIVERING = 'REAKTIVERING',
    SPERRET = 'SPERRET',
    ALLEREDE_REGISTRERT = 'ALLEREDE_REGISTRERT',
    SYKMELDT_REGISTRERING = 'SYKMELDT_REGISTRERING',
    ORDINAER_REGISTRERING = 'ORDINAER_REGISTRERING',
}

export enum Formidlingsgruppe {
    ISERV = 'ISERV',
    ARBS = 'ARBS',
    IARBS = 'IARBS',
    PARBS = 'PARBS',
    RARBS = 'RARBS',
}

export enum Servicegruppe {
    BATT = 'BATT',
    BFORM = 'BFORM',
    BKART = 'BKART',
    IKVAL = 'IKVAL',
    IVURD = 'IVURD',
    OPPFI = 'OPPFI',
    VARIG = 'VARIG',
    VURDI = 'VURDI',
    VURDU = 'VURDU',
}

export interface FullforRegistreringResponse {
    type?: ErrorTypes;
}
