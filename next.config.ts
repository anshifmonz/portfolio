import type { NextConfig } from 'next';

type WebpackRule = {
  test: RegExp;
  use: string | string[] | { loader: string; options?: unknown };
};

type WebpackConfig = {
  module?: { rules?: WebpackRule[] };
};

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js'
      }
    }
  },

  images: {
    domains: [],
    unoptimized: false
  },

  webpack: (config: WebpackConfig) => {
    // Initialize module.rules if undefined
    config.module = config.module || { rules: [] };
    config.module.rules = config.module.rules || [];

    // Handle SVG files via SVGR
    const svgRule: WebpackRule = {
      test: /\.svg$/,
      use: ['@svgr/webpack']
    };

    config.module.rules.push(svgRule);

    return config;
  },

  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || ''
  },

  async redirects() {
    return [];
  },

  async rewrites() {
    return [];
  }
};

export default nextConfig;
