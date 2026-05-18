import type { GlobalConfig } from 'payload'

export const Profile: GlobalConfig = {
  slug: 'profile',
  label: 'Personal Profile',
  admin: { group: 'Site Identity' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'major', type: 'text' },
    { name: 'tagline', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'linkedin', type: 'text' },
    { name: 'photo', type: 'upload', relationTo: 'media-assets' },
    { name: 'resume', type: 'upload', relationTo: 'media-assets' },
    { name: 'university', type: 'text' },
  ],
}
