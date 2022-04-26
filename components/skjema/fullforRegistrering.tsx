import { Alert, Button, ConfirmationPanel, GuidePanel, Heading, ReadMore } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { useCallback, useState } from 'react';
import { Side, SkjemaState } from '../../model/skjema';
import { fetcher as api } from '../../lib/api-utils';
import { useRouter } from 'next/router';

import byggFullforRegistreringPayload from '../../lib/bygg-fullfor-registrering-payload';
import { FeilmeldingGenerell } from '../feilmeldinger/feilmeldinger';
import { FullforRegistreringResponse, RegistreringType } from '../../model/registrering';
import hentKvitteringsUrl from '../../lib/hent-kvitterings-url';
import { loggAktivitet } from '../../lib/amplitude';

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
        lestKravFeilmelding: 'Du må huke av at du har lest og forstått kravene for å kunne fullføre registreringen.',
        fullfor: 'Fullfør',
    },
};

interface FullforProps {
    skjemaState: SkjemaState;
    side: Side;
    onSubmit(): void;
}

const beregnTidBrukt = (skjemaState: SkjemaState) => {
    if (!skjemaState.startTid) {
        return;
    }

    return (Date.now() - skjemaState.startTid) / 1000;
};

const FullforRegistrering = (props: FullforProps) => {
    const { skjemaState, onSubmit } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const [lestKravChecked, setLestKravChecked] = useState<boolean>(false);
    const [senderSkjema, settSenderSkjema] = useState<boolean>(false);
    const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);
    const [visFeilmeldingLestKrav, settVisFeilmeldingLestKrav] = useState<boolean>(false);
    const [visFeilmeldingTeller, settVisFeilmeldingTeller] = useState<number>(0);
    const router = useRouter();

    const validerOgFullfor = () => {
        if (!lestKravChecked) {
            settVisFeilmeldingLestKrav(true);
            return;
        }
        return fullforRegistrering();
    };

    const fullforRegistrering = useCallback(async () => {
        try {
            const body = byggFullforRegistreringPayload(skjemaState, props.side);
            settSenderSkjema(true);
            settVisFeilmelding(false);
            onSubmit();

            const response: FullforRegistreringResponse = await api(
                `api/fullforregistrering${props.side === 'sykmeldt' ? 'sykmeldt' : ''}/`,
                {
                    method: 'post',
                    body: JSON.stringify(body),
                }
            );

            loggAktivitet({
                aktivitet: 'Utfylling av skjema fullført',
                tidBruktForAaFullforeSkjema: beregnTidBrukt(skjemaState),
                registreringstype:
                    props.side === 'sykmeldt'
                        ? RegistreringType.SYKMELDT_REGISTRERING
                        : RegistreringType.ORDINAER_REGISTRERING,
            });

            return router.push(hentKvitteringsUrl(response, props.side));
        } catch (e) {
            settVisFeilmeldingTeller(visFeilmeldingTeller + 1);
            settVisFeilmelding(true);

            if (visFeilmeldingTeller >= 3) {
                return router.push('/feil/');
            }
        } finally {
            settSenderSkjema(false);
        }
    }, [onSubmit, props.side, router, skjemaState, visFeilmeldingTeller]);

    return (
        <>
            <div style={{ width: '100%' }}>
                <Heading size={'large'} level={'1'} className="text-center mbm">
                    {tekst('tittel')}
                </Heading>
                <GuidePanel poster className="mbm">
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
                <ReadMore header={tekst('lesMer')}>
                    <ul>
                        <li className="mbs">
                            <Heading level={'3'} size={'xsmall'}>
                                {tekst('okonomi')}
                            </Heading>
                            {tekst('okonomiInfo')}
                        </li>
                        <li className="mbs">
                            <Heading level={'3'} size={'xsmall'}>
                                {tekst('meldekort')}
                            </Heading>
                            {tekst('meldekortInfo')}
                        </li>
                        <li className="mbs">
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
                </ReadMore>
                <ConfirmationPanel
                    checked={lestKravChecked}
                    onChange={() => {
                        settVisFeilmeldingLestKrav(false);
                        setLestKravChecked(!lestKravChecked);
                    }}
                    label={tekst('lestOgForstaatt')}
                    className="mhl"
                />

                {visFeilmelding && (
                    <div className="mbm">
                        <FeilmeldingGenerell />
                    </div>
                )}
                {visFeilmeldingLestKrav && (
                    <div className="mbm">
                        <Alert variant={'warning'}>{tekst('lestKravFeilmelding')}</Alert>
                    </div>
                )}
                <Button onClick={validerOgFullfor} loading={senderSkjema}>
                    {tekst('fullfor')}
                </Button>
            </div>
        </>
    );
};

export default FullforRegistrering;
