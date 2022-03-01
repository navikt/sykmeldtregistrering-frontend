import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import Neste from './neste-knapp';
import Avbryt from './avbryt-lenke';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Har du andre problemer med å søke eller være i jobb?',
        ingress: 'For eksempel språk, lesing og skriving eller familiesituasjon.',
        ja: 'Ja',
        nei: 'Nei',
        fortellMer:
            'Svarer du ja, kan du fortelle mer til en veileder i en oppfølgingssamtale. Vi kontakter deg når du har registrert deg.',
    },
};

const AndreProblemer = (props: SkjemaKomponentProps<string>) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const { onChange, valgt } = props;

    const valg = [
        { tekst: tekst('ja'), value: 'ja' },
        { tekst: tekst('nei'), value: 'nei' },
    ];

    return (
        <>
            <Heading spacing size={'large'} level="1">
                {tekst('tittel')}
            </Heading>

            <BodyShort>{tekst('ingress')}</BodyShort>

            <form className="mbl">
                <RadioGruppe valg={valg} onSelect={onChange} valgt={valgt} />
            </form>

            <Alert variant="info" inline={true}>
                {tekst('fortellMer')}
            </Alert>
        </>
    );
};

export default AndreProblemer;
