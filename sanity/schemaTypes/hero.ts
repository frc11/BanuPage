import { defineType, defineField } from 'sanity';

export default defineType({
  type: 'document',
  name: 'hero',
  title: 'Hero Section',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'backgroundVideos',
      title: 'Videos de Fondo',
      type: 'array',
      of: [{ type: 'file', options: { accept: 'video/mp4,video/webm' } }],
      description: 'Sube uno o más videos (mp4/webm). Se reproducirán en loop secuencial con fundido.',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image (Légacy)',
      type: 'image',
      hidden: true,
      description: 'Campo legado. Fue reemplazado por backgroundVideos.',
    }),
  ],
});
