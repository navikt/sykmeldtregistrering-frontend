import type { NextPage } from 'next';
import Head from 'next/head';
import { Heading } from '@navikt/ds-react';
import lagHentTekstForSprak, { Sprak, Tekster } from '../lib/lag-hent-tekst-for-sprak';
import { useRouter } from 'next/router';

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
    const { locale } = useRouter();
    const tekst = lagHentTekstForSprak(TEKSTER, locale as Sprak);

    return (
        <div>
            <Head>
                <title>{tekst('metaTittel')}</title>
                <meta name="description" content={tekst('metaDescription')} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Heading spacing size="xlarge" level="2">
                {tekst('tittel')}
            </Heading>
        </div>
    );
};

export default Home;
