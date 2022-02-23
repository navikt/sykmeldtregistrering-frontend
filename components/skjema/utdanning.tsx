import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import Neste from './neste-knapp';
import Avbryt from './avbryt-lenke';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Hva er din høyeste fullførte utdanning?',
        ingen: 'Ingen utdanning',
        grunnskole: 'Grunnskole',
        vgs: 'Videregående grunnutdanning (1 til 2 år)',
        vgsFagbrev: 'Videregående, fagbrev eller svennebrev (3 år eller mer)',
        hoyere: 'Høyere utdanning (1 til 4 år)',
        hoyere5: 'Høyere utdanning (5 år eller mer)',
    },
};

const Utdanning = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const valg = [
        { tekst: tekst('ingen'), value: 'ingen' },
        { tekst: tekst('grunnskole'), value: 'grunnskole' },
        { tekst: tekst('vgs'), value: 'vgs' },
        { tekst: tekst('vgsFagbrev'), value: 'vgsFagbrev' },
        { tekst: tekst('hoyere'), value: 'hoyere' },
        { tekst: tekst('hoyere5'), value: 'hoyere5' },
    ];

    return (
        <>
            <Heading spacing size={'large'} level="1">
                {tekst('tittel')}
            </Heading>

            <form className="mbl">
                <RadioGruppe valg={valg} />
            </form>

            <Neste />
            <Avbryt />
        </>
    );
};

export default Utdanning;
