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
import { useConfig } from '../contexts/config-context';
import { Config } from '../model/config';
import VeiledningSvg from '../components/veiledningSvg';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Registrer deg som arbeidssøker',
        naarRegistrertTittel: 'Når du har registrert deg',
        hjelpTilJobb: 'får du hjelp til å komme i jobb',
        brukeAktivitetsplan: 'kan du bruke din egen aktivitetsplan',
        sokeOmStotte: 'kan du søke om annen økonomisk støtte',
        sokeOmDagpenger: 'kan du søke om dagpenger hvis du er permittert eller arbeidsledig',
        startRegistrering: 'Start registrering',
    },
    en: {
        tittel: 'Register as job seeker',
        startRegistrering: 'Start registration',
    },
};

const Home: NextPage = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const { enableMock } = useConfig() as Config;
    const brukerMock = enableMock === 'enabled';

    return (
        <>
            <RedirectTilVedlikehold />
            <div className="maxWidth flex-center flex-wrap">
                <Heading className="mbl" size="xlarge" level="1">
                    {tekst('tittel')}
                </Heading>
                <Grid>
                    <Cell xs={12}>
                        <Heading spacing size="medium" level="2" className="text-center">
                            {tekst('naarRegistrertTittel')}
                        </Heading>
                        <div className={'flex-center phs flex-wrap'}>
                            <ul className={'mrl'} style={{ flex: '1', minWidth: '20rem' }}>
                                <li>{tekst('hjelpTilJobb')}</li>
                                <li>{tekst('sokeOmDagpenger')}</li>
                                <li>{tekst('sokeOmStotte')}</li>
                                <li>{tekst('brukeAktivitetsplan')}</li>
                            </ul>
                            <div className={'flex-center'}>
                                <VeiledningSvg />
                            </div>
                        </div>
                    </Cell>
                    <Cell xs={12} md={6}>
                        <RettigheterPanel />
                    </Cell>
                    <Cell xs={12} md={6} className="mbs">
                        <PlikterPanel />
                    </Cell>
                    <Cell xs={12}>
                        <DineOpplysninger />
                    </Cell>
                    <Cell xs={12} className={'text-center phs'}>
                        <NextLink href="/start" passHref locale={false}>
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
