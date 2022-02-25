import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import Neste from './neste-knapp';
import Avbryt from './avbryt-lenke';
import {SkjemaKomponentProps} from "./skjema-felleskomponenter";

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Er utdanningen din bestått?',
        ja: 'Ja',
        nei: 'Nei',
    },
};

const BestattUtdanning = (props: SkjemaKomponentProps) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const { onChange, valgt} = props;

    const valg = [
        { tekst: tekst('ja'), value: 'ja' },
        { tekst: tekst('nei'), value: 'nei' },
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

export default BestattUtdanning;
