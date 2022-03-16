import lagHentTekstForSprak, { Sprak, Tekster } from '../lib/lag-hent-tekst-for-sprak';

export enum SporsmalId {
    dinSituasjon = 'dinSituasjon',
    utdanning = 'utdanning',
    utdanningGodkjent = 'utdanningGodkjent',
    utdanningBestatt = 'utdanningBestatt',
    andreForhold = 'andreForhold',
    sisteStilling = 'sisteStilling',
    helseHinder = 'helseHinder',
    fremtidigSituasjon = 'fremtidigSituasjon',
    tilbakeIArbeid = 'tilbakeIArbeid',
}
export enum DinSituasjon {
    MISTET_JOBBEN = 'MISTET_JOBBEN',
    HAR_SAGT_OPP = 'HAR_SAGT_OPP',
    DELTIDSJOBB_VIL_MER = 'DELTIDSJOBB_VIL_MER',
    ALDRI_HATT_JOBB = 'ALDRI_HATT_JOBB',
    VIL_BYTTE_JOBB = 'VIL_BYTTE_JOBB',
    JOBB_OVER_2_AAR = 'JOBB_OVER_2_AAR',
    ER_PERMITTERT = 'ER_PERMITTERT',
    USIKKER_JOBBSITUASJON = 'USIKKER_JOBBSITUASJON',
    AKKURAT_FULLFORT_UTDANNING = 'AKKURAT_FULLFORT_UTDANNING',
    VIL_FORTSETTE_I_JOBB = 'VIL_FORTSETTE_I_JOBB',
}

const TEKSTER: Tekster<string> = {
    nb: {
        [SporsmalId.dinSituasjon]: 'Velg den situasjonen som passer deg best',
        [DinSituasjon.MISTET_JOBBEN]: 'Har mistet eller kommer til å miste jobben',
        [DinSituasjon.HAR_SAGT_OPP]: 'Har sagt opp eller kommer til å si opp',
        [DinSituasjon.DELTIDSJOBB_VIL_MER]: 'Har deltidsjobb, men vil jobbe mer',
        [DinSituasjon.ALDRI_HATT_JOBB]: 'Har aldri vært i jobb',
        [DinSituasjon.VIL_BYTTE_JOBB]: 'Har jobb, men vil bytte',
        [DinSituasjon.JOBB_OVER_2_AAR]: 'Har ikke vært i jobb de siste 2 årene',
        [DinSituasjon.ER_PERMITTERT]: 'Er permittert eller kommer til å bli permittert',
        [DinSituasjon.USIKKER_JOBBSITUASJON]: 'Er usikker på jobbsituasjonen min',
        [DinSituasjon.AKKURAT_FULLFORT_UTDANNING]: 'Har akkurat fullført utdanning, militærtjeneste eller annet',
        [DinSituasjon.VIL_FORTSETTE_I_JOBB]: 'Har jobb og ønsker å fortsette i den jobben jeg er i',
    },
};

export function hentTekst(sprak: Sprak, key: string) {
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return tekst(key);
}
