import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    { name: 'siteTitle', type: 'text', required: true },
    { name: 'tagline', type: 'text' },
    { name: 'primaryAccent', type: 'text', defaultValue: '#bf5700' },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'headline', type: 'text' },
        { name: 'subhead', type: 'textarea' },
      ],
    },
  ],
}
