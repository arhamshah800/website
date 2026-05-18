import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  admin: { group: 'Site Identity' },
  fields: [
    {
      name: 'bio',
      type: 'richText',
      label: 'Biography',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media-assets',
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Additional Sections',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'richText' },
      ],
    },
  ],
}
