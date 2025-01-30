/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
      unoptimized: true
  },
  basePath: '/yale-startups-directory', // Assuming your repository will be named 'yale-startups'
}

module.exports = nextConfig
