import { Brukergruppe, Servicegruppe } from '../model/registrering';

function beregnBrukergruppe(servicegruppe: Servicegruppe): Brukergruppe {
    switch (servicegruppe) {
        case (servicegruppe = Servicegruppe.IKVAL): {
            return Brukergruppe.STANDARD;
        }
        case (servicegruppe = Servicegruppe.BFORM): {
            return Brukergruppe.SITUASJONSBESTEMT;
        }
        case (servicegruppe = Servicegruppe.BKART): {
            return Brukergruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING;
        }
        default: {
            return Brukergruppe.UKJENT;
        }
    }
}

export default beregnBrukergruppe;
