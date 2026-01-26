import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Domain configuration
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://assetstoolshub.com',
  },

  // Production optimizations
  compress: true,
  poweredByHeader: false,
  output: 'export',
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
