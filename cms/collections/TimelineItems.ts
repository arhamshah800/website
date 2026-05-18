import type { CollectionConfig } from 'payload'

export const TimelineItems: CollectionConfig = {
  slug: 'timeline-items',
  admin: { useAsTitle: 'narrativeLabel' },
  fields: [
    { name: 'date', type: 'date', required: true },
    { name: 'narrativeLabel', type: 'text', required: true },
    { name: 'weight', type: 'number', defaultValue: 0 },
    {
      name: 'entryType',
      type: 'select',
      options: ['project', 'experience'],
      required: true,
    },
    {
      name: 'reference',
      type: 'relationship',
      relationTo: ['projects', 'experiences'],
      required: true,
    },
  ],
}
