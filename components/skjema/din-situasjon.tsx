import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { Heading } from '@navikt/ds-react';
import useSprak from '../../hooks/useSprak';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import Neste from './neste-knapp';
import Avbryt from './avbryt-lenke';

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

interface SkjemaKomponentProps {
    onChange: (val: string) => void;
    harVerdi: boolean;
    onNeste: () => void;
}

enum Jobbsituasjon {
    MistetJobb = 'mistet',
    SagtOpp = 'sagtOpp',
    Deltid = 'deltid',
    AldriJobbet = 'aldriJobbet',
    VilBytteJobb = 'vilBytte',
    IkkeJobbetSisteToAar = 'ikkeSisteToAar',
    Permittert = 'permittert',
    Usikker = 'usikker',
    NettoppFullfortUtdanning = 'fullfortUtdanning',
    HarJobb = 'harJobb',
}

const DinSituasjon = (props: SkjemaKomponentProps) => {
    const { onChange, harVerdi, onNeste } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const valg = [
        { tekst: tekst('mistet'), value: Jobbsituasjon.MistetJobb.valueOf() },
        { tekst: tekst('sagtOpp'), value: Jobbsituasjon.SagtOpp.valueOf() },
        { tekst: tekst('deltid'), value: Jobbsituasjon.Deltid.valueOf() },
        { tekst: tekst('aldriJobbet'), value: Jobbsituasjon.AldriJobbet.valueOf() },
        { tekst: tekst('vilBytte'), value: Jobbsituasjon.VilBytteJobb.valueOf() },
        { tekst: tekst('ikkeSisteToAar'), value: Jobbsituasjon.IkkeJobbetSisteToAar.valueOf() },
        { tekst: tekst('permittert'), value: Jobbsituasjon.Permittert.valueOf() },
        { tekst: tekst('usikker'), value: Jobbsituasjon.Usikker.valueOf() },
        { tekst: tekst('fullfortUtdanning'), value: Jobbsituasjon.NettoppFullfortUtdanning.valueOf() },
        { tekst: tekst('harJobb'), value: Jobbsituasjon.HarJobb.valueOf() },
    ];

    return (
        <>
            <Heading spacing size={'large'} level="1">
                {tekst('tittel')}
            </Heading>

            <form className="mbl">
                <RadioGruppe valg={valg} onSelect={onChange} />
            </form>

            <Neste isValid={harVerdi} onClick={onNeste} />
            <Avbryt />
        </>
    );
};

export default DinSituasjon;
export { Jobbsituasjon };
