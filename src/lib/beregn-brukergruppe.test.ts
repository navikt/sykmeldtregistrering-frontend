import beregnBrukergruppe from './beregn-brukergruppe';
import { Brukergruppe, Servicegruppe } from '../model/registrering';

describe('tester beregn-brukergruppe funksjonen', () => {
    test('Returnerer Standard for IKVAL', () => {
        const brukergruppe = beregnBrukergruppe(Servicegruppe.IKVAL, 42);
        expect(brukergruppe).toBe(Brukergruppe.STANDARD);
    });

    test('Returnerer Situasjonsbestemt for BFORM', () => {
        const brukergruppe = beregnBrukergruppe(Servicegruppe.BFORM, 42);
        expect(brukergruppe).toBe(Brukergruppe.SITUASJONSBESTEMT);
    });

    test('Returnerer Behov for arbeidsevnevurdering for BKART', () => {
        const brukergruppe = beregnBrukergruppe(Servicegruppe.BKART, 42);
        expect(brukergruppe).toBe(Brukergruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING);
    });

    test('Returnerer Ikke vurdert for IVURD', () => {
        const brukergruppe = beregnBrukergruppe(Servicegruppe.IVURD, 42);
        expect(brukergruppe).toBe(Brukergruppe.IKKE_VURDERT);
    });

    test('Returnerer Ukjent for VARIG', () => {
        const brukergruppe = beregnBrukergruppe(Servicegruppe.VARIG, 42);
        expect(brukergruppe).toBe(Brukergruppe.UKJENT);
    });
});
