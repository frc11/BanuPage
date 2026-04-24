import { defineType, defineField } from 'sanity';

export default defineType({
  type: 'document',
  name: 'perfume',
  title: 'Perfumes',
  groups: [
    { name: 'commercial', title: 'Comercial' },
    { name: 'olfactive', title: 'Dossier Olfativo' },
    { name: 'performance', title: 'Rendimiento' },
    { name: 'categorization', title: 'Categorización' },
    { name: 'media', title: 'Media' },
    { name: 'ui', title: 'Interfaz & SEO' },
  ],
  fields: [
    // ─── DOMINIO COMERCIAL ────────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      group: 'commercial',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Marca',
      type: 'reference',
      to: [{ type: 'brand' }],
      group: 'commercial',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'object',
      group: 'commercial',
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
      group: 'ui',
    }),

    // ─── DOMINIO OLFATIVO (RESCATE DE DATA) ───────────────────────────────────────
    defineField({
      name: 'inspiredBy',
      title: 'Inspirado En (Dupes)',
      type: 'string',
      group: 'olfactive',
    }),
    defineField({
      name: 'topNotes',
      title: 'Notas de Salida',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'olfactive',
    }),
    defineField({
      name: 'heartNotes',
      title: 'Notas de Corazón',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'olfactive',
    }),
    defineField({
      name: 'baseNotes',
      title: 'Notas de Fondo',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'olfactive',
    }),

    // ─── DOMINIO DE RENDIMIENTO (DIRECTOS) ────────────────────────────────────────
    defineField({
      name: 'longevity',
      title: 'Longevidad (1 a 5)',
      type: 'number',
      group: 'performance',
      validation: (rule) => rule.min(1).max(5).integer(),
    }),
    defineField({
      name: 'projection',
      title: 'Proyección (Estela) (1 a 5)',
      type: 'number',
      group: 'performance',
      validation: (rule) => rule.min(1).max(5).integer(),
    }),

    // ─── DOMINIO DE CATEGORIZACIÓN ────────────────────────────────────────────────
    defineField({
      name: 'clima',
      title: 'Clima Ideal',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'categorization',
      options: {
        list: ['CALOR', 'FRÍO'],
      },
    }),
    defineField({
      name: 'vibe',
      title: 'Ocasión / Vibe',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'categorization',
      options: {
        list: [
          'NOCHE DE SALIDA',
          'EVENTO / GALA',
          'MODO BESTIA',
          'DIARIO',
          'CITA',
        ],
      },
    }),

    // ─── DOMINIO VISUAL Y UX ──────────────────────────────────────────────────────
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      type: 'array',
      group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'isFeatured',
      title: '¿Destacar en la Home?',
      type: 'boolean',
      group: 'ui',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'ui',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
  ],
});
