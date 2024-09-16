/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'media.discordapp.net',
      'shawk.xyz',
      'uxwing.com',
      'cdn.prod.website-files.com',
    ],
  },
};

module.exports = nextConfig;