import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { Button, Cell, Grid, Heading } from '@navikt/ds-react';

import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import useSprak from '../hooks/useSprak';
import DineOpplysninger from '../components/forsiden/dine-opplysninger';
import { SkjemaSide } from '../model/skjema';
import RettigheterPanel from '../components/forsiden/rettigheter';
import PlikterPanel from '../components/forsiden/plikter';
import RedirectTilVedlikehold from '../components/redirect-til-vedlikehold';

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
        <>
            <RedirectTilVedlikehold />
            <div>
                <Head>
                    <title>{tekst('metaTittel')}</title>
                    <meta name="description" content={tekst('metaDescription')} />
                </Head>
                <Heading spacing size="xlarge" level="2">
                    {tekst('tittel')}
                </Heading>
                <p>
                    <NextLink href={`/skjema/${SkjemaSide.DinSituasjon}`} passHref>
                        <Button>Standard registrering</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href={`/sykmeldt/${SkjemaSide.SykmeldtFremtidigSituasjon}`} passHref>
                        <Button variant="secondary">Sykmeldt registrering</Button>
                    </NextLink>
                </p>
                <Grid>
                    <Cell xs={12} md={6}>
                        <RettigheterPanel />
                    </Cell>
                    <Cell xs={12} md={6}>
                        <PlikterPanel />
                    </Cell>
                    <Cell xs={12}>
                        <DineOpplysninger />
                    </Cell>
                </Grid>
            </div>
        </>
    );
};

export default Home;
