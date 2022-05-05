import beregnBrukergruppe from './beregn-brukergruppe';
import { Brukergruppe, Servicegruppe } from '../model/registrering';

describe('tester beregn-brukergruppe funksjonen', () => {
    test('Returnerer Standard for IKVAL', () => {
        const brukergruppe = beregnBrukergruppe(Servicegruppe.IKVAL);
        expect(brukergruppe).toBe(Brukergruppe.STANDARD);
    });

    test('Returnerer Situasjonsbestemt for BFORM', () => {
        const brukergruppe = beregnBrukergruppe(Servicegruppe.BFORM);
        expect(brukergruppe).toBe(Brukergruppe.SITUASJONSBESTEMT);
    });

    test('Returnerer Behov for arbeidsevnevurdering for BKART', () => {
        const brukergruppe = beregnBrukergruppe(Servicegruppe.BKART);
        expect(brukergruppe).toBe(Brukergruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING);
    });

    test('Returnerer Ukjent IVURD', () => {
        const brukergruppe = beregnBrukergruppe(Servicegruppe.IVURD);
        expect(brukergruppe).toBe(Brukergruppe.UKJENT);
    });
});
