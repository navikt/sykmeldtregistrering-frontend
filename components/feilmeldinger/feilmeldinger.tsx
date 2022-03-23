import { Alert, BodyShort, Button, GuidePanel, Heading, Panel } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';

const TEKSTER: Tekster<string> = {
    nb: {
        feilISystemene: 'På grunn av feil i systemene våre kan du ikke registrere deg akkurat nå.',
        provIgjen: 'Vennligst prøv igjen litt senere.',
        //TODO: Link til kontakt brukerstøtte:
        kontaktBrukerstotte: 'Kontakt teknisk brukerstøtte dersom problemene vedvarer.',
        //TODO: Fjerne "We're having trouble" her når vi har lagt inn engelske tekster:
        noeGikkGalt: "Noe gikk galt / We're having trouble",
        klarteIkkeMottaHenvendelse:
            'Vi klarte ikke å ta imot henvendelsen din. Vennligst forsøk igjen senere. Opplever du dette flere ganger kan du ringe oss på 55 55 33 33.',
        //TODO: Fjerne troubleWithYourRequest-teksten når vi har oversatt til engelsk:
        troubleWithYourRequest:
            'We’re having trouble with your request right now. Please try again later. If you are still having problems, you can call us on 55 55 33 33.',
        utvandretHeading: 'En veileder må hjelpe deg slik at du blir registrert',
        utvandretBody1: 'Du står registrert som utvandret i våre systemer.',
        utvandretBody2: 'Dette gjør at du ikke kan registrere deg som arbeidssøker på nett.',
        utvandretKontaktOss: 'Kontakt oss, så hjelper vi deg videre.',
        utvandretKontaktKnapp: 'Ta kontakt',
    },
};

const FeilmeldingGenerell = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    return (
        <Alert variant={'error'}>
            <BodyShort>{tekst('feilISystemene')}</BodyShort>
            <BodyShort>{tekst('provIgjen')}</BodyShort>
            <BodyShort>{tekst('kontaktBrukerstotte')}</BodyShort>
        </Alert>
    );
};

const FeilmeldingNoeGikkGalt = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    return (
        <GuidePanel>
            <Alert variant={'error'} className="mbm">
                <BodyShort>{tekst('noeGikkGalt')}</BodyShort>
            </Alert>
            <BodyShort spacing>{tekst('klarteIkkeMottaHenvendelse')}</BodyShort>
            <BodyShort>{tekst('troubleWithYourRequest')}</BodyShort>
        </GuidePanel>
    );
};

const FeilmeldingDodUtvandretEllerForsvunnet = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    return (
        <Panel border>
            <Heading size="medium" spacing={true}>
                {tekst('utvandretHeading')}
            </Heading>
            <BodyShort>{tekst('utvandretBody')}</BodyShort>
            <BodyShort>{tekst('utvandretBody1')}</BodyShort>
            <BodyShort spacing>{tekst('utvandretBody2')}</BodyShort>
            <BodyShort spacing>{tekst('utvandretKontaktOss')}</BodyShort>
            <Button>{tekst('utvandretKontaktKnapp')}</Button>
        </Panel>
    );
};
export { FeilmeldingGenerell, FeilmeldingNoeGikkGalt, FeilmeldingDodUtvandretEllerForsvunnet };
