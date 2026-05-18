import type { CollectionConfig } from 'payload'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'issuer', 'date'] },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'issuer', type: 'text' },
    { name: 'date', type: 'text' },
    { name: 'url', type: 'text' },
    { name: 'category', type: 'text' },
  ],
}
