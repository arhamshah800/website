import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'status', 'featured', 'updatedAt'] },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'problem', type: 'textarea' },
    { name: 'approach', type: 'textarea' },
    { name: 'outcomes', type: 'textarea' },
    { name: 'role', type: 'text' },
    { name: 'year', type: 'number' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published', 'archived'],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'motionProfile',
      type: 'select',
      options: ['subtle', 'balanced', 'expressive'],
      defaultValue: 'balanced',
    },
    {
      name: 'accentToken',
      type: 'select',
      options: ['burnt-orange', 'cool-blue', 'neutral'],
      defaultValue: 'burnt-orange',
    },
    { name: 'technologies', type: 'relationship', relationTo: 'technologies', hasMany: true },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
    { name: 'media', type: 'relationship', relationTo: 'media-assets', hasMany: true },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'type', type: 'select', options: ['repo', 'live', 'article'], required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'priority', type: 'number', defaultValue: 0 },
      ],
    },
  ],
}
