import { PerfumeData } from '@/types/sanity';

/**
 * Filtro de Normalización de Sanity a Componentes UI.
 * Aisla la aplicación estructurando dominios y previene fallos por campos faltantes.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapSanityPerfume(raw: any): PerfumeData {
  if (!raw) {
    return {
      _id: '',
      name: 'Perfume Desconocido',
      slug: '',
      price: { basePrice: 0, isOnSale: false },
      notes: { top: '', heart: '', base: '' },
      performance: { longevity: 3, projection: 3 },
      tags: [],
      isFeatured: false,
    };
  }

  try {
    // Normalización de notas (de array en CMS a string en UI)
    const normalizeNotes = (notes: string[] | undefined) => 
      Array.isArray(notes) ? notes.join(', ') : (typeof notes === 'string' ? notes : '');

    // Unificación de tags (mantenemos legacy tags + vibe + clima para máxima compatibilidad)
    const unifiedTags = [
      ...(Array.isArray(raw.tags) ? raw.tags : []),
      ...(Array.isArray(raw.vibe) ? raw.vibe : []),
      ...(Array.isArray(raw.clima) ? raw.clima : [])
    ].filter((v, i, a) => v && a.indexOf(v) === i); // Remover duplicados y falsy

    return {
      _id: raw._id || '',
      name: raw.name || 'Perfume',
      slug: raw.slug || '',
      badge: raw.badge || undefined,
      inspiredBy: raw.inspiredBy || undefined,

      // Dominio Comercial - Precio Seguro
      price: {
        basePrice: raw.price?.basePrice && typeof raw.price.basePrice === 'number' && raw.price.basePrice > 0 ? raw.price.basePrice : 0,
        discountPrice: raw.price?.discountPrice && typeof raw.price.discountPrice === 'number' ? raw.price.discountPrice : undefined,
        isOnSale: !!raw.price?.isOnSale,
      },

      // Dominio Olfativo (Mapeo de nuevos campos)
      notes: {
        top: normalizeNotes(raw.topNotes || raw.notes?.top),
        heart: normalizeNotes(raw.heartNotes || raw.notes?.heart),
        base: normalizeNotes(raw.baseNotes || raw.notes?.base),
      },

      // Dominio Rendimiento (Mapeo de nuevos campos directos)
      performance: {
        longevity: raw.longevity || raw.performance?.longevity || 3,
        projection: raw.projection || raw.performance?.projection || 3,
      },

      // Extracción segura de array unificado
      tags: unifiedTags,

      isFeatured: !!raw.isFeatured,
      imageUrl: raw.imageUrl || undefined,
      gallery: Array.isArray(raw.gallery) ? raw.gallery : undefined,

      // Extracción de Marca
      brand: raw.brand ? {
        title: raw.brand.title || '',
        logoUrl: raw.brand.logoUrl,
      } : undefined
    };
  } catch (err) {
    console.log("Error en Mapper:", raw, err);
    return {
      _id: '',
      name: 'Perfume Desconocido',
      slug: '',
      price: { basePrice: 0, isOnSale: false },
      notes: { top: '', heart: '', base: '' },
      performance: { longevity: 3, projection: 3 },
      tags: [],
      isFeatured: false,
    };
  }
}
