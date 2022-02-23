import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import Neste from './neste-knapp';
import Avbryt from './avbryt-lenke';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Er utdanningen din godkjent i Norge?',
        ja: 'Ja',
        nei: 'Nei',
        vetIkke: 'Vet ikke',
    },
};

const GodkjentUtdanning = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const valg = [
        { tekst: tekst('ja'), value: 'ja' },
        { tekst: tekst('nei'), value: 'nei' },
        { tekst: tekst('vetIkke'), value: 'vetIkke' },
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

export default GodkjentUtdanning;
