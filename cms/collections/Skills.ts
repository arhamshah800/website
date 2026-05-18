import type { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: { useAsTitle: 'label' },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'category', type: 'text', required: true },
    { name: 'proficiency', type: 'number', min: 1, max: 5, defaultValue: 3 },
    { name: 'proofLinks', type: 'array', fields: [{ name: 'url', type: 'text', required: true }] },
  ],
}
