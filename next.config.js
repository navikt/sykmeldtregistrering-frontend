/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');
const { buildCspHeader } = require('@navikt/nav-dekoratoren-moduler/ssr');

const basePath = '/arbeid/registrering';

const appSecurityPolicy = {
    'default-src': ["'self'", '*.nav.no', '*.labs.nais.no'],
    'script-src-elem': ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
    'style-src': ["'self'", "'unsafe-inline'", '*.nav.no', '*.labs.nais.no'],
    'style-src-elem': ["'self'", '*.nav.no', '*.labs.nais.no'],
    'img-src': ["'self'", 'data:', '*.difi.no'],
    'connect-src': ["'self'", '*.nav.no', '*.labs.nais.no'],
};

const nextConfig = {
    reactStrictMode: true,
    basePath,
    // i18n: {
    //     locales: ['nb', 'en', 'nn', 'pl'],
    //     defaultLocale: 'nb',
    //     localeDetection: false,
    // },
    trailingSlash: true,
    output: 'standalone',
    publicRuntimeConfig: {
        basePath,
    },
    sentry: {
        hideSourceMaps: true,
    },
    async headers() {
        const dekoratorEnv = process.env.DEKORATOR_ENV;
        const csp = await buildCspHeader(appSecurityPolicy, { env: dekoratorEnv });

        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: csp,
                    },
                ],
            },
        ];
    },
};

const sentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore

    silent: true, // Suppresses all logs
    errorHandler: (error) => {
        // sørger for at deploy til sentry ikke stopper bygget
        console.error(error);
    },
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
