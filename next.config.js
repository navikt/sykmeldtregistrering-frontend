/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');
const securityHeaders = require('./security-headers');

const basePath = '/arbeid/registrering';

const nextConfig = {
    reactStrictMode: true,
    basePath,
    // i18n: {
    //     locales: ['nb', 'en', 'nn', 'pl'],
    //     defaultLocale: 'nb',
    //     localeDetection: false,
    // },
    trailingSlash: true,
    experimental: {
        outputStandalone: true,
    },
    publicRuntimeConfig: {
        basePath,
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: securityHeaders,
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
