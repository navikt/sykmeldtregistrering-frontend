import lagHentTekstForSprak, { Tekster, TeksterMedDefinerteNokler } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';
import { JaEllerNei } from '../../model/sporsmal';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Har du andre problemer med å søke eller være i jobb?',
        ingress: 'For eksempel språk, lesing og skriving eller familiesituasjon.',
        JA: 'Ja',
        NEI: 'Nei',
        fortellMer:
            'Svarer du ja, kan du fortelle mer til en veileder i en oppfølgingssamtale. Vi kontakter deg når du har registrert deg.',
    },
};

export type AndreProblemerTekster = TeksterMedDefinerteNokler<
    'tittel' | 'ingress' | 'JA' | 'NEI' | 'fortellMer',
    string
>;

export const lagAndreProblemerKomponent = (teksterMap: AndreProblemerTekster) => {
    return function AndreProblemerKomponent(props: SkjemaKomponentProps<JaEllerNei>) {
        const tekst = lagHentTekstForSprak(teksterMap, useSprak());
        const { onChange, valgt } = props;

        const lagValg = (valg: JaEllerNei) => ({ tekst: tekst(valg), value: valg });
        const valg = [lagValg(JaEllerNei.JA), lagValg(JaEllerNei.NEI)];

        return (
            <>
                <Heading spacing size={'large'} level="1">
                    {tekst('tittel')}
                </Heading>

                <BodyShort>{tekst('ingress')}</BodyShort>

                <form className="mbl">
                    <RadioGruppe valg={valg} onSelect={(val) => onChange(val)} valgt={valgt} />
                </form>

                <Alert variant="info" inline={true}>
                    {tekst('fortellMer')}
                </Alert>
            </>
        );
    };
};

const AndreProblemer = lagAndreProblemerKomponent(TEKSTER);
export default AndreProblemer;
