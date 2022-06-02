import { useCallback, useEffect, useState } from 'react';
import { BodyLong, Button, GuidePanel, Heading } from '@navikt/ds-react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../../hooks/useSprak';
import { loggAktivitet, loggStoppsituasjon } from '../../../lib/amplitude';
import { fetcher, fetcher as api } from '../../../lib/api-utils';
import {
    KvitteringOppgaveIkkeOpprettet,
    KvitteringOppgaveOpprettet,
    Opprettelsesfeil,
} from '../../../components/KvitteringOppgave';

type Situasjonstype = 'utvandret' | 'mangler-arbeidstillatelse';
export type OppgaveRegistreringstype = 'registrering' | 'reaktivering';

interface Feilsituasjon {
    registreringstype: OppgaveRegistreringstype;
    situasjon: Situasjonstype;
}

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'En veileder må hjelpe deg slik at du blir registrert',
        utvandretBody1: 'Du står registrert som utvandret i våre systemer.',
        manglerArbeidstillatelseBody1: 'Vi har ikke mulighet til å sjekke om du har en godkjent oppholdstillatelse.',
        body2: 'Dette gjør at du ikke kan registrere deg som arbeidssøker på nett.',
        kontaktOss: 'Kontakt oss, så hjelper vi deg videre.',
        kontaktOssMedTlfnr: 'Kontakt oss på 55 55 33 33, så hjelper vi deg videre.',
        kontaktKnapp: 'Ta kontakt',
        avbryt: 'Avbryt',
    },
    en: {
        //TODO: Oversetting
    },
};

const KontaktVeileder = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const [responseMottatt, settResponseMottatt] = useState<boolean>(false);
    const [feil, settFeil] = useState<Opprettelsesfeil | undefined>(undefined);
    const Router = useRouter();

    const { registreringstype, situasjon } = Object.entries(Router.query).map(
        ([key, value]): Feilsituasjon => ({
            registreringstype: key as OppgaveRegistreringstype,
            situasjon: value as Situasjonstype,
        })
    )[0];
    console.log('Registreringstype:' + registreringstype + ' Feilsituasjon:' + situasjon);

    const opprettOppgave = useCallback(async () => {
        loggAktivitet({ aktivitet: 'Oppretter kontakt meg oppgave' });
        try {
            const oppgaveType = situasjon === 'utvandret' ? 'UTVANDRET' : 'OPPHOLDSTILLATELSE';

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
    }, [situasjon]);

    const avbrytKontaktMeg = () => {
        loggAktivitet({ aktivitet: 'Avbryter kontakt meg' });
        Router.push('/');
    };

    useEffect(() => {
        loggStoppsituasjon({
            situasjon: 'Arbeidssøkeren mangler arbeidstillatelse eller er utvandret',
        });
    }, []);

    // initialiser for <Kvittering>
    useSWR('api/kontaktinformasjon/', fetcher);

    if (responseMottatt) {
        return feil ? <KvitteringOppgaveIkkeOpprettet feil={feil} /> : <KvitteringOppgaveOpprettet />;
    } else
        return (
            <>
                <GuidePanel poster>
                    <Heading size="medium" spacing={true} level="1">
                        {tekst('heading')}
                    </Heading>
                    <BodyLong>
                        {tekst(situasjon === 'utvandret' ? 'utvandretBody1' : 'manglerArbeidstillatelseBody1')}
                    </BodyLong>
                    <BodyLong spacing>{tekst('body2')}</BodyLong>
                    <BodyLong>
                        {registreringstype === 'registrering' ? tekst('kontaktOss') : tekst('kontaktOssMedTlfnr')}
                    </BodyLong>
                </GuidePanel>
                {registreringstype === 'registrering' && (
                    <section className="flex-center mhl">
                        <Button onClick={opprettOppgave} className="mrl">
                            {tekst('kontaktKnapp')}
                        </Button>
                        <Button variant="tertiary" onClick={avbrytKontaktMeg}>
                            {tekst('avbryt')}
                        </Button>
                    </section>
                )}
            </>
        );
};

KontaktVeileder.getInitialProps = async (context: any) => {
    const { situasjon } = context.query;
    return { situasjon };
};

export default KontaktVeileder;
