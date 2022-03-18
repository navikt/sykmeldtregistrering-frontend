import { Accordion, Button, ConfirmationPanel, ContentContainer, GuidePanel, Heading } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { useState } from 'react';
import { SkjemaState } from '../../model/skjema';
import { fetcher as api } from '../../lib/api-utils';
import { useRouter } from 'next/router';
import { hentTekst } from '../../model/sporsmal';

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

interface FullforProps {
    skjemaState: SkjemaState;
}
const FullforRegistrering = (props: FullforProps) => {
    const { skjemaState } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const [checked, setChecked] = useState<boolean>(false);
    const router = useRouter();

    const fullforRegistrering = async () => {
        try {
            const skjema = Object.keys(skjemaState)
                .filter((key) => key !== 'sisteJobb')
                .reduce(
                    (resultat, key) => {
                        const svarKey = (skjemaState as any)[key];

                        resultat.besvarelse[key] = svarKey;
                        resultat.teksterForBesvarelse.push({
                            sporsmalId: key,
                            sporsmal: hentTekst('nb', key),
                            svar: hentTekst('nb', svarKey),
                        });
                        return resultat;
                    },
                    { besvarelse: {}, teksterForBesvarelse: [] } as {
                        besvarelse: Record<string, string>;
                        teksterForBesvarelse: { sporsmalId: string; sporsmal: string; svar: string }[];
                    }
                );

            const body = {
                besvarelse: skjema.besvarelse,
                sisteStilling: skjemaState.sisteJobb,
                teksterForBesvarelse: skjema.teksterForBesvarelse,
            };

            await api('/api/fullforregistrering', { method: 'post', body: JSON.stringify(body) });
            return router.push('/kvittering');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <ContentContainer>
                <Heading spacing size={'large'}>
                    {tekst('tittel')}
                </Heading>
                <GuidePanel poster>
                    <Heading level={'2'} size={'xsmall'}>
                        {tekst('naarDuFullforer')}
                    </Heading>
                    <ul>
                        <li> {tekst('sendeMeldekort')} </li>
                        <li>{tekst('registrereCV')}</li>
                        <li>{tekst('aktivJobbsoker')}</li>
                        <li>{tekst('brukeAktivitetsplan')}</li>
                    </ul>
                </GuidePanel>
                <div style={{ maxWidth: '34rem', margin: '2em 0' }}>
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Header>{tekst('lesMer')}</Accordion.Header>
                            <Accordion.Content>
                                <ul>
                                    <li>
                                        <Heading level={'3'} size={'xsmall'}>
                                            {tekst('okonomi')}
                                        </Heading>
                                        {tekst('okonomiInfo')}
                                    </li>
                                    <li>
                                        <Heading level={'3'} size={'xsmall'}>
                                            {tekst('meldekort')}
                                        </Heading>
                                        {tekst('meldekortInfo')}
                                    </li>
                                    <li>
                                        <Heading level={'3'} size={'xsmall'}>
                                            {tekst('aktivitetsplan')}
                                        </Heading>
                                        {tekst('aktivitetsplanInfo')}
                                    </li>
                                    <li>
                                        <Heading level={'3'} size={'xsmall'}>
                                            {tekst('CV')}
                                        </Heading>
                                        {tekst('CVInfo')}
                                    </li>
                                </ul>
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                </div>

                <ConfirmationPanel
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    label={tekst('lestOgForstaatt')}
                ></ConfirmationPanel>

                <Button onClick={fullforRegistrering} disabled={!checked}>
                    {tekst('fullfor')}
                </Button>
            </ContentContainer>
        </>
    );
};

export default FullforRegistrering;
