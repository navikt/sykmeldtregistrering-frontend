import { BodyShort, GuidePanel, Heading } from '@navikt/ds-react';

import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';

//TODO: linke opp til dialog og ha større telefonnummer

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
    return (
        <GuidePanel poster>
            <Heading spacing size="large" level="1">
                {tekst('overskrift')}
            </Heading>
            <BodyShort>{tekst('innledning')}</BodyShort>
            <BodyShort>{tekst('sendMelding')}</BodyShort>
            <BodyShort>{tekst('ringOss')}</BodyShort>
            <BodyShort>{tekst('telefonNummer')}</BodyShort>
        </GuidePanel>
    );
}

export default AlleredeRegistrert;
