import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: { useAsTitle: 'label' },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'colorToken', type: 'text', defaultValue: 'burnt-orange' },
  ],
}
