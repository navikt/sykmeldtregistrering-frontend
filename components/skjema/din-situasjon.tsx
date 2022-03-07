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
    MISTETJOBB = 'mistet',
    SAGTOPP = 'sagtOpp',
    DELTID = 'deltid',
    ALDRIJOBBET = 'aldriJobbet',
    VILBYTTEJOBB = 'vilBytte',
    IKKEJOBBETSISTETOAAR = 'ikkeSisteToAar',
    PERMITTERT = 'permittert',
    USIKKER = 'usikker',
    NETTOPPFULLFORTUTDANNING = 'fullfortUtdanning',
    HARJOBB = 'harJobb',
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
        { tekst: hentSvartekst(sprak, Jobbsituasjon.MISTETJOBB), value: Jobbsituasjon.MISTETJOBB },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.SAGTOPP), value: Jobbsituasjon.SAGTOPP },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.DELTID), value: Jobbsituasjon.DELTID },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.ALDRIJOBBET), value: Jobbsituasjon.ALDRIJOBBET },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.VILBYTTEJOBB), value: Jobbsituasjon.VILBYTTEJOBB },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.IKKEJOBBETSISTETOAAR), value: Jobbsituasjon.IKKEJOBBETSISTETOAAR },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.PERMITTERT), value: Jobbsituasjon.PERMITTERT },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.USIKKER), value: Jobbsituasjon.USIKKER },
        {
            tekst: hentSvartekst(sprak, Jobbsituasjon.NETTOPPFULLFORTUTDANNING),
            value: Jobbsituasjon.NETTOPPFULLFORTUTDANNING,
        },
        { tekst: hentSvartekst(sprak, Jobbsituasjon.HARJOBB), value: Jobbsituasjon.HARJOBB },
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
