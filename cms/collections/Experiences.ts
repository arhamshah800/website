import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: { useAsTitle: 'org' },
  versions: { drafts: true },
  fields: [
    { name: 'org', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'period', type: 'text', required: true },
    { name: 'bullets', type: 'array', fields: [{ name: 'item', type: 'textarea', required: true }] },
    { name: 'achievements', type: 'array', fields: [{ name: 'item', type: 'text' }] },
    { name: 'relatedTech', type: 'relationship', relationTo: 'technologies', hasMany: true },
    { name: 'media', type: 'relationship', relationTo: 'media-assets', hasMany: true },
  ],
}
