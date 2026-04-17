import { sanityFetch } from '@/lib/sanity'
import { BRANDS_QUERY } from '@/lib/queries'
import { BrandData } from '@/types/sanity'
import { Metadata } from 'next'
import BrandsGrid from '@/src/components/marcas/brands-grid'
import RevealText from '@/src/components/ui/reveal-text'
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern'

export const metadata: Metadata = {
  title: 'Nuestras Casas | Banū Scents',
  description: 'Explorá las mejores marcas de perfumería árabe disponibles en Banū Scents.'
}

export default async function MarcasPage() {
  const brands = await sanityFetch<BrandData[]>({ 
    query: BRANDS_QUERY 
  })

  const safeBrands = brands ?? []

  return (
    <>
      {/* HERO */}
      <section style={{
        background: 'var(--color-dark)',
        paddingTop: 'calc(var(--navbar-height) + 5rem)',
        paddingBottom: '5rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Patrón árabe de fondo */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none'
        }}>
          <ArabicPatternOverlay opacity={0.03} color="light" />
        </div>

        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.6rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          opacity: 0.7,
          marginBottom: '1.25rem',
          position: 'relative'
        }}>
          Selección de Casas
        </p>

        <RevealText
          text="Nuestras Casas"
          as="h1"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 300,
            color: 'var(--color-cream)',
            letterSpacing: '0.04em',
            marginBottom: '1.25rem',
            position: 'relative'
          }}
        />

        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.8rem',
          color: 'var(--color-cream)',
          opacity: 0.45,
          maxWidth: '380px',
          margin: '0 auto',
          lineHeight: 1.7,
          position: 'relative'
        }}>
          Las mejores marcas de perfumería árabe,
          curadas y disponibles en Argentina.
        </p>
      </section>

      {/* GRID DE MARCAS */}
      <BrandsGrid brands={safeBrands} />
    </>
  )
}
