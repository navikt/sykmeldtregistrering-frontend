import '../styles/globals.css'
import NextApp, { AppContext, AppProps } from "next/app";
import { onLanguageSelect } from "@navikt/nav-dekoratoren-moduler";

function MyApp({ Component, pageProps, router }: AppProps) {
  onLanguageSelect(({ locale }) =>
      router.push(router.asPath, router.asPath, { locale })
  );

  return <Component {...pageProps} />
}

MyApp.getInitialProps = async function getInitialProps(context: AppContext) {
  return NextApp.getInitialProps(context);
}

export default MyApp

