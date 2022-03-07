import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, Heading } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import useSprak from '../hooks/useSprak';
import DineOpplysninger from '../components/forsiden/dine-opplysninger';
import NextLink from 'next/link';
import { SkjemaSide } from '../model/skjema';

const TEKSTER: Tekster<string> = {
    nb: {
        metaTittel: 'Arbeidssøkerregistrering',
        metaDescription: 'Registrer deg som arbeidssøker',
        tittel: 'Registrer deg som arbeidssøker',
    },
    en: {
        metaTittel: 'Job seeker registration',
        metaDescription: 'Register as job seeker',
        tittel: 'Register as job seeker',
    },
};

const Home: NextPage = (props) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    return (
        <div>
            <Head>
                <title>{tekst('metaTittel')}</title>
                <meta name="description" content={tekst('metaDescription')} />
            </Head>
            <Heading spacing size="xlarge" level="2">
                {tekst('tittel')}
            </Heading>
            <p>
                <NextLink href={`/skjema/${SkjemaSide.DinSituasjon}`}>
                    <Button>Standard registrering</Button>
                </NextLink>
            </p>
            <p>
                <NextLink href={`/sykmeldt/${SkjemaSide.SykmeldtFremtidigSituasjon}`}>
                    <Button variant="secondary">Sykmeldt registrering</Button>
                </NextLink>
            </p>
            <DineOpplysninger />
        </div>
    );
};

export default Home;
