import { AndreProblemerTekster, lagAndreProblemerKomponent } from './andre-problemer';

const TEKSTER: AndreProblemerTekster = {
    nb: {
        tittel: 'Er det noe annet enn helsen din som NAV bør ta hensyn til?',
        ingress: 'For eksempel språk, lesing og skriving eller familiesituasjon',
        ja: 'Ja',
        nei: 'Nei',
        fortellMer: 'Svarer du ja, kan du fortelle mer til NAV-veilederen som tar kontakt med deg.',
    },
};

const AndreHensyn = lagAndreProblemerKomponent(TEKSTER);

export default AndreHensyn;
