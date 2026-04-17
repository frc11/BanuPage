import { sanityFetch } from '@/lib/sanity'
import { ALL_PRODUCTS_QUERY, BRANDS_QUERY } from '@/lib/queries'
import { PerfumeData, BrandData } from '@/types/sanity'
import CatalogContent from '@/src/components/catalog/catalog-content'
import RevealText from '@/src/components/ui/reveal-text'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catálogo | Banū Scents',
  description: 'Explorá nuestra selección de perfumes árabes auténticos.'
}

export default async function CatalogoPage() {
  const [products, brands] = await Promise.all([
    sanityFetch<PerfumeData[]>({ query: ALL_PRODUCTS_QUERY }),
    sanityFetch<BrandData[]>({ query: BRANDS_QUERY })
  ])

  const safeProducts = products ?? []
  const safeBrands = brands ?? []

  return (
    <>
      {/* HERO DEL CATÁLOGO */}
      <section style={{
        background: 'var(--color-dark)',
        paddingTop: 'calc(var(--navbar-height) + 4rem)',
        paddingBottom: '4rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        textAlign: 'center'
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.6rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          opacity: 0.7,
          marginBottom: '1.25rem'
        }}>
          Perfumes Árabes
        </p>

        <RevealText
          text="Catálogo"
          as="h1"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 300,
            color: 'var(--color-cream)',
            letterSpacing: '0.04em',
            marginBottom: '1rem'
          }}
        />

        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.75rem',
          color: 'var(--color-cream)',
          opacity: 0.4,
          letterSpacing: '0.1em'
        }}>
          {safeProducts.length} {safeProducts.length === 1 ? 'fragancia' : 'fragancias'}
        </p>
      </section>

      {/* CONTENIDO CON FILTROS Y GRID */}
      <CatalogContent products={safeProducts} brands={safeBrands} />
    </>
  )
}
