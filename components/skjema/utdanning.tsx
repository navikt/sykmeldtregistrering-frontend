import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';

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

export enum Utdanningsnivaa {
    INGEN = 'ingen',
    GRUNNSKOLE = 'grunnskole',
    VGS = 'vgs',
    VGSFAGBREV = 'vgsFagbrev',
    HOYERE = 'hoyere',
    HOYEREOVER5AAR = 'hoyere5',
}

const Utdanning = (props: SkjemaKomponentProps<Utdanningsnivaa>) => {
    const { onChange, valgt } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const valg = [
        { tekst: tekst('ingen'), value: Utdanningsnivaa.INGEN.valueOf() },
        { tekst: tekst('grunnskole'), value: Utdanningsnivaa.GRUNNSKOLE.valueOf() },
        { tekst: tekst('vgs'), value: Utdanningsnivaa.VGS.valueOf() },
        { tekst: tekst('vgsFagbrev'), value: Utdanningsnivaa.VGSFAGBREV.valueOf() },
        { tekst: tekst('hoyere'), value: Utdanningsnivaa.HOYERE.valueOf() },
        { tekst: tekst('hoyere5'), value: Utdanningsnivaa.HOYEREOVER5AAR.valueOf() },
    ];

    return (
        <>
            <Heading spacing size={'large'} level="1">
                {tekst('tittel')}
            </Heading>

            <form className="mbl">
                <RadioGruppe valg={valg} onSelect={onChange} valgt={valgt} />
            </form>
        </>
    );
};

export default Utdanning;
