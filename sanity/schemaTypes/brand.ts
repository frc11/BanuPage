import { defineType, defineField } from 'sanity';

export default defineType({
  type: 'document',
  name: 'brand',
  title: 'Marcas',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ],
});
