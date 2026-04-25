import { MetadataRoute } from 'next'
import { sanityFetch } from '@/lib/sanity'
import { ALL_PRODUCT_SLUGS_QUERY } from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs: string[] = []
  try {
    slugs = (await sanityFetch<string[]>({
      query: ALL_PRODUCT_SLUGS_QUERY
    })) ?? []
  } catch (error) {
    console.warn('[sitemap] No se pudieron cargar slugs desde Sanity:', error)
  }

  const productUrls = slugs.map(slug => ({
    url: `https://banuscents.com/perfume/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  return [
    {
      url: 'https://banuscents.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: 'https://banuscents.com/catalogo',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: 'https://banuscents.com/marcas',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: 'https://banuscents.com/nosotros',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: 'https://banuscents.com/terminos-y-condiciones',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: 'https://banuscents.com/politica-de-privacidad',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    },
    ...productUrls
  ]
}
