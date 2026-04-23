import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  webpack: (config, { dev }) => {
    if (dev) {
      // Suppress React DevTools version warnings in development
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-dom/client': 'react-dom/client',
      };
    }
    return config;
  },
  turbopack: {}, // Enable custom webpack config compatibility in Next.js 16
};

export default nextConfig;
