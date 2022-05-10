import { useEffect, useState } from 'react';
import { BodyLong, Button, GuidePanel, Heading } from '@navikt/ds-react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import useSprak from '../hooks/useSprak';
import { fetcher as api } from '../lib/api-utils';
import { useErrorContext } from '../contexts/error-context';
import { Brukergruppe } from '../model/registrering';
import { loggStoppsituasjon, loggAktivitet } from '../lib/amplitude';
import { fetcher } from '../lib/api-utils';
import beregnBrukergruppe from '../lib/beregn-brukergruppe';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Du er ikke lenger registrert som arbeidssøker',
        maaSokePaaNytt:
            'Hvis du fortsatt skal motta ytelser må du først bekrefte at du ønsker å være registrert, så søke på nytt.',
        vilDuRegistreres: 'Ønsker du å være registrert som arbeidssøker?',
        ja: 'Ja, jeg vil være registrert',
        avbryt: 'Avbryt',
    },
};

const Reaktivering = () => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const router = useRouter();
    const { medFeilHandtering } = useErrorContext();
    const { data, error } = useSWR('api/startregistrering/', fetcher);
    const [brukergruppe, setBrukergruppe] = useState(Brukergruppe.UKJENT);

    const loggAvbrytReaktivering = () => {
        loggAktivitet({ aktivitet: 'Arbeidssøkeren avslår reaktivering', brukergruppe });
        return router.push('/');
    };

    const reaktiverBruker = async () => {
        loggAktivitet({ aktivitet: 'Arbeidssøkeren reaktiverer seg', brukergruppe });
        medFeilHandtering(async () => {
            await api('/api/reaktivering/', { method: 'post', body: JSON.stringify({}) });
            return router.push('/kvittering-reaktivering/');
        });
    };

    useEffect(() => {
        if (data && data.servicegruppe) {
            const { servicegruppe } = data;
            const gruppe = beregnBrukergruppe(servicegruppe);
            setBrukergruppe(gruppe);
            loggStoppsituasjon({
                situasjon: 'Arbeidssøkeren må reaktivere seg',
                brukergruppe: gruppe,
            });
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            router.push('/feil/');
        }
    }, [error, router]);

    return (
        <>
            <Heading level="1" size={'large'} className={'mbl'}>
                {tekst('tittel')}
            </Heading>
            <GuidePanel poster>
                <Heading spacing level="2" size={'medium'}>
                    {tekst('tittel')}
                </Heading>
                <BodyLong>{tekst('maaSokePaaNytt')}</BodyLong>
                <BodyLong>{tekst('vilDuRegistreres')}</BodyLong>
            </GuidePanel>
            <section className="flex-center mhl">
                <Button variant={'primary'} className="mrl" onClick={reaktiverBruker}>
                    {tekst('ja')}
                </Button>
                <Button variant={'secondary'} onClick={() => loggAvbrytReaktivering()}>
                    {tekst('avbryt')}
                </Button>
            </section>
        </>
    );
};

export default Reaktivering;
