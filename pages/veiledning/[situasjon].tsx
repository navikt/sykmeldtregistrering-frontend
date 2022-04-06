import { useCallback, useEffect, useState } from 'react';
import { BodyShort, Button, Heading, Panel } from '@navikt/ds-react';

import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { loggStoppsituasjon } from '../../lib/amplitude';
import { fetcher as api } from '../../lib/api-utils';
import {
    KvitteringOppgaveIkkeOpprettet,
    KvitteringOppgaveOpprettet,
    Opprettelsesfeil,
} from '../../components/KvitteringOppgave';

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
    en: {
        //TODO: Oversetting
    },
};

const KontaktVeileder = (props: { situasjon: Situasjon }) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const [responseMottatt, settResponseMottatt] = useState<boolean>(false);
    const [feil, settFeil] = useState<Opprettelsesfeil | undefined>(undefined);
    const opprettOppgave = useCallback(async () => {
        try {
            const oppgaveType = props.situasjon === 'utvandret' ? 'UTVANDRET' : 'OPPHOLDSTILLATELSE';

            await api('/api/oppgave', {
                method: 'post',
                body: JSON.stringify({ oppgaveType: oppgaveType }),
                onError: (res) => {
                    if (res.status === 403) {
                        settFeil('finnesAllerede');
                    } else {
                        throw Error(res.statusText);
                    }
                },
            });
        } catch (e) {
            settFeil('opprettelseFeilet');
        }
        settResponseMottatt(true);
    }, [props.situasjon]);

    useEffect(() => {
        loggStoppsituasjon({
            situasjon: 'Arbeidssøkeren mangler arbeidstillatelse eller er utvandret',
        });
    }, []);

    if (responseMottatt) {
        return feil ? <KvitteringOppgaveIkkeOpprettet feil={feil} /> : <KvitteringOppgaveOpprettet />;
    } else
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
