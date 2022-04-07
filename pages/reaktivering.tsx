import { useEffect } from 'react';
import { BodyShort, Button, ContentContainer, GuidePanel, Heading } from '@navikt/ds-react';

import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import useSprak from '../hooks/useSprak';
import { fetcher as api } from '../lib/api-utils';
import { useRouter } from 'next/router';
import { useErrorContext } from '../contexts/error-context';
import { loggStoppsituasjon } from '../lib/amplitude';

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

    const reaktiverBruker = async () => {
        medFeilHandtering(async () => {
            await api('/api/reaktivering/', { method: 'post', body: JSON.stringify({}) });
            return router.push('/kvittering-reaktivering/');
        });
    };

    useEffect(() => {
        loggStoppsituasjon({
            situasjon: 'Arbeidssøkeren er må reaktivere seg',
        });
    }, []);

    return (
        <ContentContainer>
            <Heading spacing level="1" size={'medium'}>
                {tekst('tittel')}
            </Heading>
            <GuidePanel>{tekst('maaSokePaaNytt')}</GuidePanel>
            <BodyShort>{tekst('vilDuRegistreres')}</BodyShort>
            <section className="flex-center mhl">
                <Button className="knapp mrl" onClick={reaktiverBruker}>
                    {tekst('ja')}
                </Button>
                <Button variant={'tertiary'}>{tekst('avbryt')}</Button>
            </section>
        </ContentContainer>
    );
};

export default Reaktivering;
