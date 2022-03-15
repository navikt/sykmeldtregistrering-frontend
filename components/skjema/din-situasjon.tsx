import lagHentTekstForSprak, { Sprak, Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { Heading } from '@navikt/ds-react';
import useSprak from '../../hooks/useSprak';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Velg den situasjonen som passer deg best',
        MISTET_JOBBEN: 'Har mistet eller kommer til å miste jobben',
        HAR_SAGT_OPP: 'Har sagt opp eller kommer til å si opp',
        DELTIDSJOBB_VIL_MER: 'Har deltidsjobb, men vil jobbe mer',
        ALDRI_HATT_JOBB: 'Har aldri vært i jobb',
        VIL_BYTTE_JOBB: 'Har jobb, men vil bytte',
        JOBB_OVER_2_AAR: 'Har ikke vært i jobb de siste 2 årene',
        ER_PERMITTERT: 'Er permittert eller kommer til å bli permittert',
        USIKKER_JOBBSITUASJON: 'Er usikker på jobbsituasjonen min',
        AKKURAT_FULLFORT_UTDANNING: 'Har akkurat fullført utdanning, militærtjeneste eller annet',
        VIL_FORTSETTE_I_JOBB: 'Har jobb og ønsker å fortsette i den jobben jeg er i',
    },
};

export enum Jobbsituasjon {
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
