// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // PDF and static file handling
  async headers() {
    return [
      {
        source: '/Pitchbook.pdf',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
          {
            key: 'Content-Disposition',
            value: 'inline; filename="Pitchbook.pdf"',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
