import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import {
    Components as DecoratorComponents,
    fetchDecoratorReact,
    Props as DecoratorProps,
} from '@navikt/nav-dekoratoren-moduler/ssr';

const dekoratorEnv = process.env.DEKORATOR_ENV as Exclude<DecoratorProps['env'], 'localhost'>;

const availableLanguages = [
    {
        locale: 'nb',
        url: 'https://www.nav.no/arbeid/registrering-ny/',
        handleInApp: true
    },
    {
        locale: 'en',
        url: 'https://www.nav.no/arbeid/registrering-ny/en',
        handleInApp: true
    }
] as DecoratorProps["availableLanguages"];

const dekoratorProps: DecoratorProps = {
    env: dekoratorEnv ?? 'prod',
    simple: true,
    context: 'privatperson',
    chatbot: false,
    availableLanguages
};

export default class MyDocument extends Document<DecoratorComponents> {
    static async getInitialProps(ctx: DocumentContext) {
        const { locale } = ctx;
        const initialProps = await Document.getInitialProps(ctx);

        const Dekorator: DecoratorComponents = await fetchDecoratorReact({
            ...dekoratorProps,
            //language: locale as any,
        }).catch((err) => {
            console.error(err);
            const empty = () => <></>;
            return {
                Footer: empty,
                Header: empty,
                Scripts: empty,
                Styles: empty,
            };
        });

        return {
            ...initialProps,
            ...Dekorator,
            locale,
        };
    }

    render(): JSX.Element {
        const { Styles, Scripts, Header, Footer, locale } = this.props;
        return (
            <Html lang={locale ?? 'nb'}>
                <Head>
                    <Styles />
                </Head>
                <body>
                    <Scripts />
                    <Header />
                    <Main />
                    <Footer />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
