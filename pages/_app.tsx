import '../styles/globals.css';
import NextApp, { AppContext, AppProps } from 'next/app';
import { onLanguageSelect } from '@navikt/nav-dekoratoren-moduler';
import { AmplitudeProvider } from '../contexts/amplitude-context';
import { NextRouter } from 'next/router';

function useAuth(router: NextRouter) {
    const path = router.pathname;

    if (path === '/' || !document) {
        return;
    }

    if (document && !/selvbetjening-idtoken/.test(document.cookie) && !process.env.NEXT_PUBLIC_ENABLE_MOCK) {
        location.reload();
    }
}

function MyApp({ Component, pageProps, router }: AppProps) {
    onLanguageSelect(({ locale }) => router.push(router.asPath, router.asPath, { locale }));
    useAuth(router);

    return (
        <AmplitudeProvider>
            <Component {...pageProps} />
        </AmplitudeProvider>
    );
}

MyApp.getInitialProps = async function getInitialProps(context: AppContext) {
    return NextApp.getInitialProps(context);
};

export default MyApp;
