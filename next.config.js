/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    images: {
      unoptimized: true, // Must be true when using output: 'export'
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
