import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Hva tenker du om din fremtidige situasjon?',
        tilbakeTilJobb: 'Jeg skal tilbake til jobben jeg har',
        tilbakeTilNyStilling: 'Jeg skal tilbake til arbeidsgiveren min, men i ny stilling',
        trengerNyJobb: 'Jeg trenger ny jobb',
        usikker: 'Jeg er usikker',
        ingenAlternativerPasser: 'Ingen av disse alternativene passer',
    },
};

const SykmeldtFremtidigSituasjon = (props: SkjemaKomponentProps<string>) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const { onChange, valgt } = props;

    const valg = [
        { tekst: tekst('tilbakeTilJobb'), value: 'tilbakeTilJobb' },
        { tekst: tekst('tilbakeTilNyStilling'), value: 'tilbakeTilNyStilling' },
        { tekst: tekst('trengerNyJobb'), value: 'trengerNyJobb' },
        { tekst: tekst('usikker'), value: 'usikker' },
        { tekst: tekst('ingenAlternativerPasser'), value: 'ingenAlternativerPasser' },
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

export default SykmeldtFremtidigSituasjon;
