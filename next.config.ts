/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'static.tildacdn.com'
  ]
  },
  experimental: {
    allowedDevOrigins: [
      'https://groundlessly-special-anoa.cloudpub.ru',
      '*.cloudpub.ru',
    ],
  },
};

module.exports = nextConfig;
