import '../styles/globals.css';
import NextApp, { AppContext, AppProps } from 'next/app';
import { onLanguageSelect } from '@navikt/nav-dekoratoren-moduler';
import { AmplitudeProvider } from '../contexts/amplitude-context';
import { FeatureToggleProvider } from '../contexts/featuretoggle-context';
import { ErrorProvider } from '../contexts/error-context';
import { GlobalFeilmelding } from '../components/feilmeldinger/feilmeldinger';
import Head from 'next/head';
import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import useSprak from '../hooks/useSprak';
import styles from '../styles/app.module.css';
import { ConfigProvider } from '../contexts/config-context';

const TEKSTER: Tekster<string> = {
    nb: {
        metaTittel: 'Arbeidssøkerregistrering',
        metaDescription: 'Skjema for arbeidssøkerregistrering',
    },
    en: {
        metaTittel: 'Job seeker registration',
        metaDescription: 'Register as job seeker',
    },
};

function MyApp({ Component, pageProps, router }: AppProps) {
    onLanguageSelect(({ locale }) => router.push(router.asPath, router.asPath, { locale }));
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    return (
        <main className={styles.main} lang="nb">
            <Head>
                <title>{tekst('metaTittel')}</title>
                <meta name="description" content={tekst('metaDescription')} />
            </Head>
            <ConfigProvider>
                <FeatureToggleProvider>
                    <AmplitudeProvider>
                        <ErrorProvider>
                            <GlobalFeilmelding />
                            <Component {...pageProps} />
                        </ErrorProvider>
                    </AmplitudeProvider>
                </FeatureToggleProvider>
            </ConfigProvider>
        </main>
    );
}

MyApp.getInitialProps = async function getInitialProps(context: AppContext) {
    return NextApp.getInitialProps(context);
};

export default MyApp;
