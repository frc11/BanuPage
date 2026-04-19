'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BrandData } from '@/types/sanity'
import { EmptyState } from '@/src/components/ui/empty-state'
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern'

interface BrandsGridProps {
  brands: BrandData[]
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
  }
}

function BrandCard({ brand }: { brand: BrandData }) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)
  const [logoError, setLogoError] = useState(false)

  return (
    <motion.button
      className="brand-card"
      variants={cardVariants}
      onClick={() => router.push(`/catalogo?marca=${encodeURIComponent(brand.name)}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--color-dark)' : 'var(--color-cream)',
        border: '1px solid rgba(44,24,16,0.08)',
        padding: 'clamp(2rem, 5vw, 3.5rem) 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        cursor: 'pointer',
        transition: 'background 400ms ease',
        width: '100%',
        minHeight: '200px',
        textAlign: 'center'
      }}
    >
      {/* LOGO */}
      <div
        className="brand-card-logo-wrap"
        style={{
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%'
      }}
      >
        {brand.logoUrl && !logoError ? (
          <Image
            className="brand-card-logo-image"
            src={brand.logoUrl}
            alt={brand.name}
            width={120}
            height={60}
            onError={() => setLogoError(true)}
            style={{
              objectFit: 'contain',
              height: '60px',
              width: 'auto',
              maxWidth: '140px',
              filter: hovered ? 'invert(1) brightness(1)' : 'none',
              transition: 'filter 400ms ease',
              opacity: hovered ? 0.9 : 0.75
            }}
          />
        ) : (
          // Fallback: nombre como texto si no hay logo
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '1.5rem',
            fontWeight: 300,
            letterSpacing: '0.1em',
            color: hovered ? 'var(--color-cream)' : 'var(--color-dark)',
            transition: 'color 400ms ease'
          }}>
            {brand.name}
          </p>
        )}
      </div>

      {/* NOMBRE */}
      <p style={{
        fontFamily: 'var(--font-dm-sans)',
        fontSize: '0.6rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: hovered ? 'var(--color-gold)' : 'var(--color-gold)',
        opacity: hovered ? 0.9 : 0.6,
        transition: 'opacity 400ms ease'
      }}>
        {brand.name}
      </p>

      {/* FLECHA — solo visible al hover */}
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ 
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 4
        }}
        transition={{ duration: 0.2 }}
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-cream)',
          opacity: 0.5
        }}
      >
        Ver fragancias →
      </motion.p>
    </motion.button>
  )
}

export default function BrandsGrid({ brands }: BrandsGridProps) {
  if (brands.length === 0) {
    return (
      <div style={{ background: 'var(--color-cream)', padding: '4rem 0' }}>
        <EmptyState
          title="Próximamente"
          subtitle="Estamos sumando marcas a nuestra selección."
          theme="light"
        />
      </div>
    )
  }

  return (
    <section style={{
      background: 'var(--color-cream)',
      padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <ArabicPatternOverlay opacity={0.04} color="dark" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          background: 'rgba(44,24,16,0.06)',
          maxWidth: '1400px',
          margin: '0 auto'
        }}
        className="brands-grid"
      >
        {brands.map(brand => (
          <BrandCard key={brand._id} brand={brand} />
        ))}
      </motion.div>
    </section>
  )
}
