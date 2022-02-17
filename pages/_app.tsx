import '../styles/globals.css'
import NextApp, { AppContext, AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async function getInitialProps(context: AppContext) {
  return NextApp.getInitialProps(context);
}

export default MyApp

