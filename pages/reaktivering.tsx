import { useEffect } from 'react';
import { BodyShort, Button, ContentContainer, GuidePanel, Heading } from '@navikt/ds-react';
import { useRouter } from 'next/router';

import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import useSprak from '../hooks/useSprak';
import { fetcher as api } from '../lib/api-utils';
import { useErrorContext } from '../contexts/error-context';
import { loggStoppsituasjon, loggAktivitet } from '../lib/amplitude';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Du er ikke lenger registrert som arbeidssøker',
        maaSokePaaNytt:
            'Hvis du fortsatt skal motta ytelser må du først bekrefte at du ønsker å være registrert, så søke på nytt.',
        vilDuRegistreres: 'Ønsker du å være registrert som arbeidssøker?',
        ja: 'Ja',
        avbryt: 'Avbryt',
    },
};

const Reaktivering = () => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const router = useRouter();
    const { medFeilHandtering } = useErrorContext();

    const loggAvbrytReaktivering = () => {
        loggAktivitet({ aktivitet: 'Arbeidssøkeren avslår reaktivering' });
    };

    const reaktiverBruker = async () => {
        loggAktivitet({ aktivitet: 'Arbeidssøkeren reaktiverer seg' });
        medFeilHandtering(async () => {
            await api('/api/reaktivering/', { method: 'post', body: JSON.stringify({}) });
            return router.push('/kvittering-reaktivering/');
        });
    };

    useEffect(() => {
        loggStoppsituasjon({
            situasjon: 'Arbeidssøkeren må reaktivere seg',
        });
    }, []);

    return (
        <ContentContainer>
            <Heading spacing level="1" size={'medium'}>
                {tekst('tittel')}
            </Heading>
            <GuidePanel poster>
                <Heading spacing level="2" size={'medium'}>
                    {tekst('tittel')}
                </Heading>
                <BodyShort spacing>{tekst('maaSokePaaNytt')}</BodyShort>
                <BodyShort spacing>{tekst('vilDuRegistreres')}</BodyShort>
            </GuidePanel>
            <section className="flex-center mhl">
                <Button variant={'primary'} className="mrl" onClick={reaktiverBruker}>
                    {tekst('ja')}
                </Button>
                <Button variant={'tertiary'} onClick={() => loggAvbrytReaktivering()}>
                    {tekst('avbryt')}
                </Button>
            </section>
        </ContentContainer>
    );
};

export default Reaktivering;
