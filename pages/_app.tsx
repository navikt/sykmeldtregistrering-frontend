import '../styles/globals.css';
import NextApp, { AppContext, AppProps } from 'next/app';
import { onLanguageSelect } from '@navikt/nav-dekoratoren-moduler';
import { AmplitudeProvider } from '../contexts/amplitude-context';
import { FeatureToggleProvider } from '../contexts/featuretoggle-context';

function MyApp({ Component, pageProps, router }: AppProps) {
    onLanguageSelect(({ locale }) => router.push(router.asPath, router.asPath, { locale }));

    return (
        <FeatureToggleProvider>
            <AmplitudeProvider>
                <Component {...pageProps} />
            </AmplitudeProvider>
        </FeatureToggleProvider>
    );
}

MyApp.getInitialProps = async function getInitialProps(context: AppContext) {
    return NextApp.getInitialProps(context);
};

export default MyApp;
