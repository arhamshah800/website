import type { CollectionConfig } from 'payload'

export const MediaAssets: CollectionConfig = {
  slug: 'media-assets',
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'card', width: 1200, height: 800, position: 'centre' },
      { name: 'thumb', width: 480, height: 320, position: 'centre' },
    ],
    adminThumbnail: 'thumb',
    mimeTypes: ['image/*'],
  },
  fields: [
    { name: 'alt', type: 'text' },
    { name: 'focalPoint', type: 'text' },
    { name: 'blurData', type: 'text' },
    { name: 'category', type: 'text' },
  ],
}
