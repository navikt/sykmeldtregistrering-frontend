import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Tror du at du kommer tilbake i jobb før du har vært sykmeldt i 52 uker?',
        jaFullStilling: 'Ja, i full stilling',
        jaRedusertStilling: 'Ja, i redusert stilling',
        usikker: 'Usikker',
        nei: 'Nei',
    },
};

const TilbakeIJobb = (props: SkjemaKomponentProps<string>) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const { onChange, valgt } = props;

    const valg = [
        { tekst: tekst('jaFullStilling'), value: 'jaFullStilling' },
        { tekst: tekst('jaRedusertStilling'), value: 'jaRedusertStilling' },
        { tekst: tekst('usikker'), value: 'usikker' },
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

export default TilbakeIJobb;
