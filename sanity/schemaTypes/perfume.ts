import { defineType, defineField } from 'sanity';

export default defineType({
  type: 'document',
  name: 'perfume',
  title: 'Perfumes',
  fields: [
    // ─── DOMINIO COMERCIAL ────────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Marca',
      type: 'reference',
      to: [{ type: 'brand' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'object',
      fields: [
        defineField({
          name: 'basePrice',
          title: 'Precio Base',
          type: 'number',
          validation: (rule) => rule.required().positive(),
        }),
        defineField({
          name: 'discountPrice',
          title: 'Precio con Descuento',
          type: 'number',
          validation: (rule) => rule.positive().lessThan(rule.valueOfField('basePrice') as unknown as number),
        }),
        defineField({
          name: 'isOnSale',
          title: '¿En Oferta?',
          type: 'boolean',
          initialValue: false,
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Insignia (Ej: "BEST SELLER")',
      type: 'string',
    }),

    // ─── DOMINIO OLFATIVO ─────────────────────────────────────────────────────────
    defineField({
      name: 'inspiredBy',
      title: 'Inspirado En (Dupes)',
      type: 'string',
    }),
    defineField({
      name: 'notes',
      title: 'Notas Olfativas',
      type: 'object',
      fields: [
        defineField({
          name: 'top',
          title: 'Notas de Salida',
          type: 'string',
        }),
        defineField({
          name: 'heart',
          title: 'Notas de Corazón',
          type: 'string',
        }),
        defineField({
          name: 'base',
          title: 'Notas de Fondo',
          type: 'string',
        }),
      ],
    }),

    // ─── DOMINIO DE RENDIMIENTO ───────────────────────────────────────────────────
    defineField({
      name: 'performance',
      title: 'Rendimiento',
      type: 'object',
      fields: [
        defineField({
          name: 'longevity',
          title: 'Longevidad (1 a 5)',
          type: 'number',
          validation: (rule) => rule.min(1).max(5).integer(),
        }),
        defineField({
          name: 'projection',
          title: 'Proyección (Estela) (1 a 5)',
          type: 'number',
          validation: (rule) => rule.min(1).max(5).integer(),
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['Calor', 'Frío', 'Diario', 'Noche', 'Cita', 'Modo Bestia', 'Sport', 'Elegante'],
      },
    }),

    // ─── DOMINIO VISUAL Y UX ──────────────────────────────────────────────────────
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'isFeatured',
      title: '¿Destacar en la Home?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
  ],
});
