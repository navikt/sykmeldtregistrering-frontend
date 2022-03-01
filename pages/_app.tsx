import '../styles/globals.css'
import NextApp, { AppContext, AppProps } from "next/app";
import { onLanguageSelect } from "@navikt/nav-dekoratoren-moduler";
import { AmplitudeProvider } from '../contexts/amplitude-context'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

function MyApp({ Component, pageProps, router }: AppProps) {
  onLanguageSelect(({ locale }) =>
      router.push(router.asPath, router.asPath, { locale })
  );

  return (
    <AmplitudeProvider>
      <Component {...pageProps} />
    </AmplitudeProvider>
  )
}

MyApp.getInitialProps = async function getInitialProps(context: AppContext) {
  return NextApp.getInitialProps(context);
}

export default MyApp

