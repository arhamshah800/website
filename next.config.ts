import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Payload CMS deps can't be bundled by Turbopack — mark as external
  serverExternalPackages: [
    'payload',
    '@payloadcms/db-postgres',
    '@payloadcms/richtext-lexical',
  ],
  turbopack: {
    resolveAlias: {
      // Redirect @payload-config to a stub so Turbopack doesn't trace
      // into payload.config.ts and its heavy dependency tree
      '@payload-config': './lib/payload-stub.ts',
    },
  },
}

export default nextConfig
