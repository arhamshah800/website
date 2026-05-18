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
const isVercelProduction = process.env.VERCEL_ENV === 'production'

function requiredEnv(name: string): string {
  const value = process.env[name]
  if (value && value.trim()) return value
  if (isProd) {
    throw new Error(`[payload-config] Missing required environment variable: ${name}`)
  }
  console.warn(`[payload-config] ${name} is not set. Using local development fallback.`)
  return ''
}

const databaseUrl =
  isProd
    ? requiredEnv('DATABASE_URL')
    : process.env.DATABASE_URL?.trim() || 'postgresql://localhost:5432/portfolio'
const payloadSecret = process.env.PAYLOAD_SECRET?.trim() || 'replace-in-production'

function getR2Value(name: string): string | null {
  const value = process.env[name]?.trim()
  if (value) return value
  return null
}

const r2Bucket = getR2Value('CLOUDFLARE_R2_BUCKET')
const r2Endpoint = getR2Value('CLOUDFLARE_R2_ENDPOINT')
const r2AccessKeyId = getR2Value('CLOUDFLARE_R2_ACCESS_KEY_ID')
const r2SecretAccessKey = getR2Value('CLOUDFLARE_R2_SECRET_ACCESS_KEY')

const hasAnyR2Config = Boolean(
  r2Bucket || r2Endpoint || r2AccessKeyId || r2SecretAccessKey,
)

if (
  isVercelProduction &&
  hasAnyR2Config &&
  !(r2Bucket && r2Endpoint && r2AccessKeyId && r2SecretAccessKey)
) {
  throw new Error(
    '[payload-config] Partial R2 configuration detected. Set all CLOUDFLARE_R2_* vars or none.',
  )
}

const storagePlugins =
  r2Bucket && r2Endpoint && r2AccessKeyId && r2SecretAccessKey
    ? [
        s3Storage({
          enabled: true,
          collections: {
            'media-assets': {
              disableLocalStorage: true,
            },
          },
          bucket: r2Bucket,
          config: {
            endpoint: r2Endpoint,
            credentials: {
              accessKeyId: r2AccessKeyId,
              secretAccessKey: r2SecretAccessKey,
            },
            region: 'auto',
            forcePathStyle: true,
          },
        }),
      ]
    : []

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
      connectionString: databaseUrl,
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
  plugins: storagePlugins,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'],
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'],
  secret: isProd ? requiredEnv('PAYLOAD_SECRET') : payloadSecret,
})
