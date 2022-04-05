import { useEffect } from 'react';
import { BodyShort, GuidePanel, Heading, Link } from '@navikt/ds-react';
import NextLink from 'next/link';

import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';

import { loggStoppsituasjon } from '../../lib/amplitude';

const DIALOG_URL = process.env.NEXT_PUBLIC_DIALOG_URL as string;

const TEKSTER: Tekster<string> = {
    nb: {
        overskrift: 'Vi må hjelpe deg videre i andre kanaler',
        innledning: 'For at du skal få registrert deg som arbeidssøker må vi hjelpe deg videre.',
        sendMelding: 'Send melding til veilederen din',
        ringOss: 'eller ring oss på',
        telefonNummer: '55 55 33 33',
    },
    en: {
        overskrift: 'We will need to help you through other channels',
        innledning: 'You will need some assistance to register as a job seeker',
        sendMelding: 'Send a message to your counselor',
        ringOss: 'or call',
        telefonNummer: '55 55 33 33',
    },
};

function AlleredeRegistrert() {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    useEffect(() => {
        loggStoppsituasjon({
            situasjon: 'Arbeidssøkeren er allerede registrert',
        });
    }, []);

    return (
        <GuidePanel poster>
            <Heading spacing size="large" level="1">
                {tekst('overskrift')}
            </Heading>
            <BodyShort>{tekst('innledning')}</BodyShort>
            <BodyShort>
                <NextLink href={DIALOG_URL} passHref>
                    <Link>{tekst('sendMelding')}</Link>
                </NextLink>{' '}
                {tekst('ringOss')} <b>{tekst('telefonNummer')}</b>
            </BodyShort>
        </GuidePanel>
    );
}

export default AlleredeRegistrert;
