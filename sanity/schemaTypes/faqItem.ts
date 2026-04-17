import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faqItem',
  title: 'Pregunta Frecuente',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Pregunta', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Respuesta', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: 'question' },
  },
});
