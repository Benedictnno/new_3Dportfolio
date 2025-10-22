import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Workaround for React DevTools compatibility
    reactCompiler: false,
  },
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
};

export default nextConfig;
