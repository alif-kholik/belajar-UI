/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    images: {
      allowFutureImage: true,
      unoptimized: true
    }
  },
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'id',
    domains: [
      {
        domain: process.env.NEXT_PUBLIC_DOMAIN + '/en/',
        defaultLocale: 'en'
      },
      {
        domain: process.env.NEXT_PUBLIC_DOMAIN,
        defaultLocale: 'id'
      },
    ],
    localeDetection: false,
  },
}

module.exports = nextConfig