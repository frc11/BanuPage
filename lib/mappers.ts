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

      // Dominio Olfativo
      notes: {
        top: raw.notes?.top || '',
        heart: raw.notes?.heart || '',
        base: raw.notes?.base || '',
      },

      // Dominio Rendimiento
      performance: {
        longevity: raw.performance?.longevity && typeof raw.performance.longevity === 'number' && raw.performance.longevity >= 1 && raw.performance.longevity <= 5 ? raw.performance.longevity : 3,
        projection: raw.performance?.projection && typeof raw.performance.projection === 'number' && raw.performance.projection >= 1 && raw.performance.projection <= 5 ? raw.performance.projection : 3,
      },

      // Extracción segura de array
      tags: Array.isArray(raw.tags) ? raw.tags : [],

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
