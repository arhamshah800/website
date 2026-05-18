import type { CollectionConfig } from 'payload'

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'icon', type: 'text' },
    { name: 'group', type: 'text' },
    { name: 'url', type: 'text' },
  ],
}
