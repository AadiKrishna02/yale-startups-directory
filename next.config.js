/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/yale-startups-directory',
  assetPrefix: '/yale-startups-directory/'
}

module.exports = nextConfig
