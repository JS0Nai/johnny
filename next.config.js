/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['imagedelivery.net'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'imagedelivery.net',
          pathname: '/**',
        },
      ],
    },
  }
  
  module.exports = nextConfig
