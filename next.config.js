const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
   
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
  },
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };

  //   return config;
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  }
   
  module.exports = withBundleAnalyzer(nextConfig)