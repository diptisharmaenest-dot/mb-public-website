import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
    rules: {
      '*.mp4': {
        type: 'asset',
      },
    },
  },
  // Enable static export only when explicitly requested (e.g. OUTPUT_EXPORT=true).
  // In development and standard server mode, dynamic SSR allows live stores to load on demand.
  ...(process.env.OUTPUT_EXPORT === 'true' ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
}

export default nextConfig
