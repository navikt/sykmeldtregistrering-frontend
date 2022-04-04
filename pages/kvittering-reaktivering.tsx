import { BodyShort, Button, GuidePanel, Heading, Link } from '@navikt/ds-react';
import useSprak from '../hooks/useSprak';
import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import NextLink from 'next/link';

const TEKSTER: Tekster<string> = {
    nb: {
        header: 'Du er nå registrert som arbeidssøker',
        dagpengerTittel: 'Du er nå registrert som arbeidssøker',
        permittert: 'Er du permittert eller arbeidsledig må du søke om dagpenger i egen søknad.',
        tidligstFaaDagpenger: 'Du kan tidligst få dagpenger fra den dagen du sender søknaden.',
        sendeSoknaden:
            'For å ikke tape dager med dagpenger må du sende søknaden senest samme dag som du ønsker dagpenger fra.',
        sokDagpenger: 'Søk dagpenger',
        skalIkkeSoke: 'Skal ikke søke nå',
    },
};

const Kvittering = () => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <>
            <Heading spacing size={'medium'}>
                {tekst('header')}
            </Heading>
            <GuidePanel poster>
                <Heading level={'2'} spacing size={'medium'}>
                    {tekst('dagpengerTittel')}
                </Heading>
                <BodyShort>{tekst('permittert')}</BodyShort>
                <BodyShort>{tekst('tidligstFaaDagpenger')}</BodyShort>
                <BodyShort>{tekst('sendeSoknaden')}</BodyShort>
            </GuidePanel>

            <section className="flex-center mhl">
                <NextLink href={'https://www.nav.no/arbeid/dagpenger/soknad-veileder'} passHref>
                    <Button className="mrl">{tekst('sokDagpenger')}</Button>
                </NextLink>

                <NextLink href={'https://www.dev.nav.no/person/dittnav'} passHref>
                    <Link>{tekst('skalIkkeSoke')}</Link>
                </NextLink>
            </section>
        </>
    );
};

export default Kvittering;
