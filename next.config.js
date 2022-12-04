const prod = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: prod ? '' : '',
  pageExtensions: ['page.js', 'page.ts'],
};

module.exports = nextConfig;
