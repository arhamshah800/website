import path from 'node:path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { fileURLToPath } from 'node:url'

import { Projects } from './cms/collections/Projects'
import { Experiences } from './cms/collections/Experiences'
import { Skills } from './cms/collections/Skills'
import { Technologies } from './cms/collections/Technologies'
import { TimelineItems } from './cms/collections/TimelineItems'
import { MediaAssets } from './cms/collections/MediaAssets'
import { Tags } from './cms/collections/Tags'
import { Categories } from './cms/collections/Categories'
import { FeaturedSets } from './cms/collections/FeaturedSets'
import { Certifications } from './cms/collections/Certifications'
import { SiteSettings } from './cms/globals/SiteSettings'
import { SeoDefaults } from './cms/globals/SeoDefaults'
import { Nav } from './cms/globals/Nav'
import { Profile } from './cms/globals/Profile'
import { About } from './cms/globals/About'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProd = process.env.NODE_ENV === 'production'

export default buildConfig({
  admin: {
    user: 'users',
    components: {
      // Custom dashboard — overrides Payload's default dashboard view
      // @ts-expect-error — Payload 3 supports this but generated types may lag
      dashboard: '@/components/admin/dashboard',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/portfolio',
    },
  }),
  collections: [
    {
      slug: 'users',
      auth: {
        loginWithUsername: false,
        maxLoginAttempts: 5,
        lockTime: 60 * 10 * 1000,
        tokenExpiration: 60 * 60 * 4,
        cookies: {
          sameSite: 'Lax',
          secure: isProd,
        },
      },
      fields: [{ name: 'name', type: 'text' }],
    },
    Projects,
    Experiences,
    Skills,
    Technologies,
    TimelineItems,
    MediaAssets,
    Tags,
    Categories,
    Certifications,
    FeaturedSets,
  ],
  globals: [SiteSettings, SeoDefaults, Nav, Profile, About],
  plugins: [
    s3Storage({
      enabled: Boolean(process.env.CLOUDFLARE_R2_ACCESS_KEY_ID),
      collections: {
        'media-assets': {
          disableLocalStorage: true,
        },
      },
      bucket: process.env.CLOUDFLARE_R2_BUCKET!,
      config: {
        endpoint: process.env.CLOUDFLARE_R2_ENDPOINT!,
        credentials: {
          accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
        },
        region: 'auto',
        forcePathStyle: true,
      },
    }),
  ],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'],
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'],
  secret: process.env.PAYLOAD_SECRET || 'replace-in-production',
})
