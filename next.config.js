/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `http://101.43.184.218:9527/api/:path*`,
        },
        {
          source: '/api1/:path*',
          destination: `http://101.43.184.218:9527/:path*`,
        }
      ],
    }
  },
}

module.exports = nextConfig