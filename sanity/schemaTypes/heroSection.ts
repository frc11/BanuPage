import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      description: 'Título breve, generalmente el nombre de la colección.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      description: 'Texto secundario opcional debajo del título principal.',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Imagen de Fondo (Editorial)',
      type: 'image',
      options: {
        hotspot: true, // Permite encuadre y recortes dinámicos en diferentes devices
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          description: 'Importante para accesibilidad y SEO.',
        })
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Sin Título',
        subtitle: subtitle || 'Sin subtítulo',
        media: media,
      };
    },
  },
});
