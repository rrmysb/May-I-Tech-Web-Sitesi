import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/May-I-Tech-Web-Sitesi',
  assetPrefix: '/May-I-Tech-Web-Sitesi',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;