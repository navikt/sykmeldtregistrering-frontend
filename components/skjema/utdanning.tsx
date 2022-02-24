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

interface SkjemaKomponentProps {
    onChange: (val: string) => void;
    harVerdi: boolean;
    onNeste: () => void;
}

enum Utdanningsnivaa {
    Ingen = 'ingen',
    Grunnskole = 'grunnskole',
    Vgs = 'vgs',
    VgsFagbrev = 'vgsFagbrev',
    Hoyere = 'hoyere',
    HoyereOver5Aar = 'hoyere5',
}

const Utdanning = (props: SkjemaKomponentProps)  => {
    const { onChange, harVerdi, onNeste } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const valg = [
        { tekst: tekst('ingen'), value: Utdanningsnivaa.Ingen.valueOf() },
        { tekst: tekst('grunnskole'), value: Utdanningsnivaa.Grunnskole.valueOf() },
        { tekst: tekst('vgs'), value: Utdanningsnivaa.Vgs.valueOf() },
        { tekst: tekst('vgsFagbrev'), value: Utdanningsnivaa.VgsFagbrev.valueOf() },
        { tekst: tekst('hoyere'), value: Utdanningsnivaa.Hoyere.valueOf() },
        { tekst: tekst('hoyere5'), value: Utdanningsnivaa.HoyereOver5Aar.valueOf() },
    ];

    return (
        <>
            <Heading spacing size={'large'} level="1">
                {tekst('tittel')}
            </Heading>

            <form className="mbl">
                <RadioGruppe valg={valg}  onSelect={onChange} />
            </form>

            <Neste isValid={harVerdi} onClick={onNeste}/>
            <Avbryt />
        </>
    );
};

export default Utdanning;
export {Utdanningsnivaa};