import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import useSprak from '../hooks/useSprak';
import { BodyShort, Button, ContentContainer, GuidePanel, Heading } from '@navikt/ds-react';

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

    return (
        <ContentContainer>
            <Heading spacing level="1" size={'medium'}>
                {tekst('tittel')}
            </Heading>
            <GuidePanel>{tekst('maaSokePaaNytt')}</GuidePanel>
            <BodyShort>{tekst('vilDuRegistreres')}</BodyShort>
            <Button>{tekst('ja')}</Button>
            <Button variant={'tertiary'}>{tekst('avbryt')}</Button>
        </ContentContainer>
    );
};

export default Reaktivering;
