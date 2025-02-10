// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  }
  // Remove these lines:
  // basePath: '/yale-startups-directory',
  // assetPrefix: '/yale-startups-directory/'
}

module.exports = nextConfig
