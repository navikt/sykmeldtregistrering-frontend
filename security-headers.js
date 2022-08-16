const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.nav.no account.psplugin.com www.googletagmanager.com www.google-analytics.com static.hotjar.com script.hotjar.com in2.taskanalytics.com;
  child-src 'self';
  style-src 'self' 'unsafe-inline' *.nav.no;
  img-src 'self' data: *.nav.no www.google-analytics.com;
  font-src 'self' data: se-content-a.psplugin.com se-content-b.psplugin.com content.psplugin.com;
  connect-src 'self' *.nav.no nav.psplugin.com www.google-analytics.com ta-survey-v2.herokuapp.com in2.taskanalytics.com in.hotjar.com;
  worker-src 'self' blob:;
  frame-src 'self' vars.hotjar.com
`;

const securityHeaders = [
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
        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
    },
];

module.exports = securityHeaders;
