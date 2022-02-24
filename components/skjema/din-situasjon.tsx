import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { Heading } from '@navikt/ds-react';
import useSprak from '../../hooks/useSprak';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import Neste from './neste-knapp';
import Avbryt from './avbryt-lenke';
import {SkjemaKomponentProps} from "./skjema-felleskomponenter";
import {Knapperad} from "./knapperad";

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

const DinSituasjon = (props: SkjemaKomponentProps) => {
    const { onChange, valgt } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const valg = [
        { tekst: tekst('mistet'), value: Jobbsituasjon.MISTETJOBB.valueOf() },
        { tekst: tekst('sagtOpp'), value: Jobbsituasjon.SAGTOPP.valueOf() },
        { tekst: tekst('deltid'), value: Jobbsituasjon.DELTID.valueOf() },
        { tekst: tekst('aldriJobbet'), value: Jobbsituasjon.ALDRIJOBBET.valueOf() },
        { tekst: tekst('vilBytte'), value: Jobbsituasjon.VILBYTTEJOBB.valueOf() },
        { tekst: tekst('ikkeSisteToAar'), value: Jobbsituasjon.IKKEJOBBETSISTETOAAR.valueOf() },
        { tekst: tekst('permittert'), value: Jobbsituasjon.PERMITTERT.valueOf() },
        { tekst: tekst('usikker'), value: Jobbsituasjon.USIKKER.valueOf() },
        { tekst: tekst('fullfortUtdanning'), value: Jobbsituasjon.NETTOPPFULLFORTUTDANNING.valueOf() },
        { tekst: tekst('harJobb'), value: Jobbsituasjon.HARJOBB.valueOf() },
    ];

    return (
        <>
            <Heading spacing size={'large'} level="1">
                {tekst('tittel')}
            </Heading>

            <form className="mbl">
                <RadioGruppe valg={valg} onSelect={onChange} valgt={valgt} />
            </form>

            <Avbryt />
        </>
    );
};

export default DinSituasjon;
