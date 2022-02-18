/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/arbeid/registrering-ny',
  i18n: {
    locales: ['nb', 'en', 'nn', 'pl'],
    defaultLocale: 'nb',
    localeDetection: false,
  },
  trailingSlash: true,
}

module.exports = nextConfig
