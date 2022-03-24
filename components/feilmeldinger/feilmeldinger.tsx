import { Alert, BodyShort, Button, GuidePanel, Heading, Link, Panel } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { useCallback } from 'react';
import { fetcher as api } from '../../lib/api-utils';
import { useRouter } from 'next/router';
import { NextApiResponse } from 'next';

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
        manglerArbeidstillatelseBody: 'Vi har ikke mulighet til å sjekke om du har en godkjent oppholdstillatelse.',
    },
};

const FeilmeldingGenerell = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    return (
        <Alert variant={'error'}>
            <BodyShort spacing>{tekst('feilISystemene')}</BodyShort>
            <BodyShort spacing>{tekst('provIgjen')}</BodyShort>
            <BodyShort>
                <Link href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/teknisk-brukerstotte/kontakt-teknisk-brukerstotte-nav.no">
                    {tekst('kontaktBrukerstotte')}
                </Link>
            </BodyShort>
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

interface FeilmeldingTrengerVeiledningProps {
    manglerArbeidsTillatelse?: boolean;
}
const FeilmeldingTrengerVeiledning = (props: FeilmeldingTrengerVeiledningProps) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const router = useRouter();

    const opprettOppgave = useCallback(async () => {
        try {
            const oppgaveType = props.manglerArbeidsTillatelse ? 'OPPHOLDSTILLATELSE' : 'UTVANDRET';

            const response: NextApiResponse<any> = await api('/api/oppgave', {
                method: 'post',
                body: JSON.stringify({ oppgaveType: oppgaveType }),
            });

            return router.push('/veiledning/kvittering/');
        } catch (e) {}
    }, [props.manglerArbeidsTillatelse, router]);

    return (
        <Panel border>
            <Heading size="medium" spacing={true}>
                {tekst('utvandretHeading')}
            </Heading>
            <BodyShort>
                {tekst(props.manglerArbeidsTillatelse ? 'manglerArbeidstillatelseBody' : 'utvandretBody1')}
            </BodyShort>
            <BodyShort spacing>{tekst('utvandretBody2')}</BodyShort>
            <BodyShort spacing>{tekst('utvandretKontaktOss')}</BodyShort>
            <Button onClick={opprettOppgave}>{tekst('utvandretKontaktKnapp')}</Button>
        </Panel>
    );
};

const FeilmeldingManglerArbeidstillatelse = () => {
    return <FeilmeldingTrengerVeiledning manglerArbeidsTillatelse={true} />;
};
export {
    FeilmeldingGenerell,
    FeilmeldingNoeGikkGalt,
    FeilmeldingTrengerVeiledning,
    FeilmeldingManglerArbeidstillatelse,
};
