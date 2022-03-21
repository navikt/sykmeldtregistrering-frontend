import lagHentTekstForSprak, { TeksterMedDefinerteNokler } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';
import { JaEllerNei } from '../../model/sporsmal';

const TEKSTER_STANDARD: AndreProblemerTekster = {
    nb: {
        tittel: 'Har du andre problemer med å søke eller være i jobb?',
        ingress: 'For eksempel språk, lesing og skriving eller familiesituasjon.',
        JA: 'Ja',
        NEI: 'Nei',
        fortellMer:
            'Svarer du ja, kan du fortelle mer til en veileder i en oppfølgingssamtale. Vi kontakter deg når du har registrert deg.',
    },
};

const TEKSTER_SYKMELDT: AndreProblemerTekster = {
    nb: {
        tittel: 'Er det noe annet enn helsen din som NAV bør ta hensyn til?',
        ingress: 'For eksempel språk, lesing og skriving eller familiesituasjon',
        JA: 'Ja',
        NEI: 'Nei',
        fortellMer: 'Svarer du ja, kan du fortelle mer til NAV-veilederen som tar kontakt med deg.',
    },
};

export type AndreProblemerTekster = TeksterMedDefinerteNokler<
    'tittel' | 'ingress' | 'JA' | 'NEI' | 'fortellMer',
    string
>;

type AndreProblemerProps = SkjemaKomponentProps<JaEllerNei> & { skjematype: 'standard' | 'sykmeldt' };

const AndreProblemer = (props: AndreProblemerProps) => {
    const TEKSTER = props.skjematype === 'standard' ? TEKSTER_STANDARD : TEKSTER_SYKMELDT;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
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

export default AndreProblemer;
