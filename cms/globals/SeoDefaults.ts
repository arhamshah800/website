import type { GlobalConfig } from 'payload'

export const SeoDefaults: GlobalConfig = {
  slug: 'seo-defaults',
  fields: [
    { name: 'defaultTitle', type: 'text' },
    { name: 'defaultDescription', type: 'textarea' },
    { name: 'ogImage', type: 'relationship', relationTo: 'media-assets' },
    { name: 'canonicalBase', type: 'text' },
  ],
}
