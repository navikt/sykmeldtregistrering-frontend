import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { NextApiResponse } from 'next';
import { fetcher as api } from '../../lib/api-utils';
import { BodyShort, Button, Heading, Panel } from '@navikt/ds-react';

export type Situasjon = 'utvandret' | 'mangler-arbeidstillatelse';

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'En veileder må hjelpe deg slik at du blir registrert',
        utvandretBody1: 'Du står registrert som utvandret i våre systemer.',
        manglerArbeidstillatelseBody1: 'Vi har ikke mulighet til å sjekke om du har en godkjent oppholdstillatelse.',
        body2: 'Dette gjør at du ikke kan registrere deg som arbeidssøker på nett.',
        kontaktOss: 'Kontakt oss, så hjelper vi deg videre.',
        kontaktKnapp: 'Ta kontakt',
    },
};

const KontaktVeileder = (props: { situasjon: Situasjon }) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const router = useRouter();

    const opprettOppgave = useCallback(async () => {
        try {
            const oppgaveType = props.situasjon === 'utvandret' ? 'UTVANDRET' : 'OPPHOLDSTILLATELSE';

            const response: NextApiResponse<any> = await api('/api/oppgave', {
                method: 'post',
                body: JSON.stringify({ oppgaveType: oppgaveType }),
            });

            return router.push('/veiledning/kvittering/');
        } catch (e) {}
    }, [props.situasjon, router]);

    return (
        <Panel border>
            <Heading size="medium" spacing={true}>
                {tekst('heading')}
            </Heading>
            <BodyShort>
                {tekst(props.situasjon === 'utvandret' ? 'utvandretBody1' : 'manglerArbeidstillatelseBody1')}
            </BodyShort>
            <BodyShort spacing>{tekst('body2')}</BodyShort>
            <BodyShort spacing>{tekst('kontaktOss')}</BodyShort>
            <Button onClick={opprettOppgave}>{tekst('kontaktKnapp')}</Button>
        </Panel>
    );
};

KontaktVeileder.getInitialProps = async (context: any) => {
    const { situasjon } = context.query;
    return { situasjon };
};

export default KontaktVeileder;
