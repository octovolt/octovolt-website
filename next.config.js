/** @type {import('next').NextConfig} */

module.exports = {
  async redirects() {
    return [
      {
        source: '/product',
        destination: '/',
        permanent: true,
      },
    ]
  },
  experimental: {
    serverActions: true,
  },
}