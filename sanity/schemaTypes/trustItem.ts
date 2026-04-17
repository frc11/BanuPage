import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'trustItem',
  title: 'Ítem de Confianza',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'iconName',
      title: 'Nombre del Ícono',
      type: 'string',
      description: 'Nombre exacto del ícono de lucide-react. Opciones: Truck, ShieldCheck, MessageCircle, Lock, Package, Sparkles, CreditCard',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'iconName' },
  },
});
