import lagHentTekstForSprak, { Sprak, Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { Heading } from '@navikt/ds-react';
import useSprak from '../../hooks/useSprak';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Velg den situasjonen som passer deg best',
        mistet: 'Har mistet eller kommer til å miste jobben',
        sagtOpp: 'Har sagt opp eller kommer til å si opp',
        deltid: 'Har deltidsjobb, men vil jobbe mer',
        aldriJobbet: 'Har aldri vært i jobb',
        vilBytte: 'Har jobb, men vil bytte',
        ikkeSisteToAar: 'Har ikke vært i jobb de siste 2 årene',
        permittert: 'Er permittert eller kommer til å bli permittert',
        usikker: 'Er usikker på jobbsituasjonen min',
        fullfortUtdanning: 'Har akkurat fullført utdanning, militærtjeneste eller annet',
        harJobb: 'Har jobb og ønsker å fortsette i den jobben jeg er i',
    },
};

export enum Jobbsituasjon {
    MISTET_JOBBEN = 'mistet',
    HAR_SAGT_OPP = 'sagtOpp',
    DELTIDSJOBB_VIL_MER = 'deltid',
    ALDRI_HATT_JOBB = 'aldriJobbet',
    VIL_BYTTE_JOBB = 'vilBytte',
    JOBB_OVER_2_AAR = 'ikkeSisteToAar',
    ER_PERMITTERT = 'permittert',
    USIKKER_JOBBSITUASJON = 'usikker',
    AKKURAT_FULLFORT_UTDANNING = 'fullfortUtdanning',
    VIL_FORTSETTE_I_JOBB = 'harJobb',
}

export function hentSvartekst(sprak: Sprak, svar: string) {
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return tekst(svar);
}

const DinSituasjon = (props: SkjemaKomponentProps<Jobbsituasjon>) => {
    const { onChange, valgt } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const sprak = useSprak();

    const valg = [
        { tekst: hentSvartekst(sprak, Jobbsituasjon.MISTET_JOBBEN), value: Jobbsituasjon.MISTET_JOBBEN },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.HAR_SAGT_OPP), value: Jobbsituasjon.HAR_SAGT_OPP },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.DELTIDSJOBB_VIL_MER), value: Jobbsituasjon.DELTIDSJOBB_VIL_MER },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.ALDRI_HATT_JOBB), value: Jobbsituasjon.ALDRI_HATT_JOBB },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.VIL_BYTTE_JOBB), value: Jobbsituasjon.VIL_BYTTE_JOBB },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.JOBB_OVER_2_AAR), value: Jobbsituasjon.JOBB_OVER_2_AAR },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.ER_PERMITTERT), value: Jobbsituasjon.ER_PERMITTERT },
        {
            tekst: hentSvartekst(sprak, Jobbsituasjon.USIKKER_JOBBSITUASJON),
            value: Jobbsituasjon.USIKKER_JOBBSITUASJON,
        },
        {
            tekst: hentSvartekst(sprak, Jobbsituasjon.AKKURAT_FULLFORT_UTDANNING),
            value: Jobbsituasjon.AKKURAT_FULLFORT_UTDANNING,
        },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.VIL_FORTSETTE_I_JOBB), value: Jobbsituasjon.VIL_FORTSETTE_I_JOBB },
    ];

    return (
        <>
            <Heading spacing size={'large'} level="1">
                {tekst('tittel')}
            </Heading>

            <form className="mbl">
                <RadioGruppe
                    valg={valg}
                    onSelect={(val) => onChange({ verdi: val, tekst: tekst(val) })}
                    valgt={valgt}
                />
            </form>
        </>
    );
};

export default DinSituasjon;
