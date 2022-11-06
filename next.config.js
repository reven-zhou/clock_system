/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `http://swpulec.com/api/:path*`,
        },
        {
          source: '/api1/:path*',
          destination: `http://swpulec.com/:path*`,
        }
      ],
    }
  },
}

module.exports = nextConfig