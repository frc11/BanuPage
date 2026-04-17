import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'review',
  title: 'Reseña',
  type: 'document',
  fields: [
    defineField({ name: 'author', title: 'Autor', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'rating',
      title: 'Calificación',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({ name: 'text', title: 'Texto de la Reseña', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: 'author', subtitle: 'rating' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `${'★'.repeat(subtitle)}` };
    },
  },
});
