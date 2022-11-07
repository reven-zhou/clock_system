/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `http://127.0.0.1:9527/api/:path*`,
        },
      ],
    }
  },
}

module.exports = nextConfig