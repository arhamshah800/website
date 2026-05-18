import type { CollectionConfig } from 'payload'

export const FeaturedSets: CollectionConfig = {
  slug: 'featured-sets',
  admin: { useAsTitle: 'name' },
  versions: { drafts: true },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      required: true,
    },
    {
      name: 'experiences',
      type: 'relationship',
      relationTo: 'experiences',
      hasMany: true,
    },
  ],
}
