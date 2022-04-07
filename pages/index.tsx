import type { NextPage } from 'next';
import NextLink from 'next/link';
import { Button, Cell, Grid, Heading } from '@navikt/ds-react';

import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import useSprak from '../hooks/useSprak';
import DineOpplysninger from '../components/forsiden/dine-opplysninger';
import RettigheterPanel from '../components/forsiden/rettigheter';
import PlikterPanel from '../components/forsiden/plikter';
import RedirectTilVedlikehold from '../components/redirect-til-vedlikehold';
import DemoPanel from '../components/forsiden/demo-panel';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Registrer deg som arbeidssøker',
        startRegistrering: 'Start registrering',
    },
    en: {
        tittel: 'Register as job seeker',
        startRegistrering: 'Start registration',
    },
};

const Home: NextPage = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const brukerMock = process.env.NEXT_PUBLIC_ENABLE_MOCK === 'enabled';

    return (
        <>
            <RedirectTilVedlikehold />
            <div className="maxWidth">
                <Heading spacing size="xlarge" level="2">
                    {tekst('tittel')}
                </Heading>
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
                    <Cell xs={12} className={'text-center phs'}>
                        <NextLink href="/start" passHref>
                            <Button>{tekst('startRegistrering')}</Button>
                        </NextLink>
                    </Cell>
                </Grid>
                <DemoPanel brukerMock={brukerMock} />
            </div>
        </>
    );
};

export default Home;
