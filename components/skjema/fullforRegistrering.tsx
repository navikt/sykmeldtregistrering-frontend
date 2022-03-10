import { Accordion, ContentContainer, GuidePanel, Heading, Ingress, Link, Table } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Fullfør registreringen',
        naarDuFullforer: 'Når du fullfører, godtar du kravene under fra NAV. Du må',
        sendeMeldekort: 'sende meldekort hver 14. dag',
        registrereCV: 'registrere CV-en din og holde den oppdatert',
        aktivJobbsoker: 'være en aktiv jobbsøker',
        brukeAktivitetsplan: 'bruke aktivitetsplanen din',
        lesMer: 'Les mer om kravene',
        okonomi: 'Økonomi',
        okonomiInfo:
            'Hvis du skal søke om dagpenger eller annen støtte fra NAV, må du gjøre det i en egen søknad ' +
            'etter at du har fullført registreringen. For å motta støtte, må du oppfylle kravene NAV stiller.',
        meldekort: 'Meldekort',
        meldekortInfo:
            'For å få oppfølging og støtte må du hver 14. dag melde fra at du fortsatt ønsker å være registrert som arbeidssøker. ' +
            'Dette gjør du ved å sende meldekort. Sender du meldekort for sent, kan det føre til at utbetalingen din blir redusert eller stanset.',
        aktivitetsplan: 'Aktivitetsplanen',
        aktivitetsplanInfo:
            'I aktivitetsplanen kan du holde orden på aktiviteter du gjør i samarbeid med NAV. ' +
            'Du kan også kommunisere med veilederen din. Når du fullfører registreringen, vil det ligge oppgaver til deg i aktivitetsplanen.',
        CV: 'CV',
        CVInfo:
            'Når du fullfører registreringen, vil du få en oppgave i aktivitetsplanen om at du må fylle ut CV-en din. ' +
            'Det er viktig at du holder CV-en din oppdatert slik at du er synlig for arbeidsgivere.',
        lestOgForstaatt: 'Jeg har lest og forstått kravene',
        fullfor: 'Fullfør',
    },
};

const FullforRegistrering = () => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <>
            <ContentContainer>
                <Heading size={'large'}>{tekst('tittel')}</Heading>
                <GuidePanel poster>
                    <Heading size={'xsmall'}>{tekst('naarDuFullforer')}</Heading>
                    <ul>
                        <li>{tekst('sendeMeldekort')}</li>
                        <li>{tekst('registrereCV')}</li>
                        <li>{tekst('aktivJobbsoker')}</li>
                        <li>{tekst('brukeAktivitetsplan')}</li>
                    </ul>
                </GuidePanel>
                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header>{tekst('lesMer')}</Accordion.Header>
                        <Accordion.Content>
                            <ul>
                                <li>
                                    <Heading size={'xsmall'}>{tekst('okonomi')}</Heading>
                                    {tekst('okonomiInfo')}
                                </li>
                                <li>
                                    <Heading size={'xsmall'}>{tekst('meldekort')}</Heading>
                                    {tekst('meldekortInfo')}
                                </li>
                                <li>
                                    <Heading size={'xsmall'}>{tekst('aktivitetsplan')}</Heading>
                                    {tekst('aktivitetsplanInfo')}
                                </li>
                                <li>
                                    <Heading size={'xsmall'}>{tekst('CV')}</Heading>
                                    {tekst('CVInfo')}
                                </li>
                            </ul>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </ContentContainer>
        </>
    );
};

export default FullforRegistrering;
