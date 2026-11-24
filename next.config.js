/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: '/images/rak-catalog/:path*',
        destination: '/api/rak-image/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
