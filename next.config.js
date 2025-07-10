/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true,
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
