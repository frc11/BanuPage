'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/lib/sanity'
import { SUGGESTED_PRODUCTS_QUERY } from '@/lib/queries'
import { PerfumeData } from '@/types/sanity'
import RevealText from '@/src/components/ui/reveal-text'

interface SuggestedProductsProps {
  currentId: string
}

export default function SuggestedProducts({ currentId }: SuggestedProductsProps) {
  const [products, setProducts] = useState<PerfumeData[]>([])

  useEffect(() => {
    sanityFetch<PerfumeData[]>({ query: SUGGESTED_PRODUCTS_QUERY })
      .then(data => {
        // Excluir el producto actual
        const filtered = (data ?? []).filter(p => p._id !== currentId)
        setProducts(filtered.slice(0, 4))
      })
  }, [currentId])

  if (products.length === 0) return null

  return (
    <section style={{
      background: 'var(--color-dark)',
      padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 4vw, 3rem)'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)'
        }}>
          <RevealText
            text="También te puede interesar"
            as="h2"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 300,
              color: 'var(--color-cream)',
              letterSpacing: '0.03em'
            }}
          />
        </div>

        {/* GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          background: 'rgba(234,230,223,0.06)'
        }}
        className="suggested-grid"
        >
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                href={`/perfume/${product.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                {/* IMAGEN */}
                <div style={{
                  aspectRatio: '1/1',
                  background: 'rgba(234,230,223,0.06)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      style={{
                        objectFit: 'contain',
                        padding: '12%',
                        transition: 'transform 500ms ease'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img
                        src="/logoC.png"
                        alt="Banū"
                        style={{ width: '40%', opacity: 0.1 }}
                      />
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div style={{ padding: '1rem 0.25rem 1.5rem' }}>
                  <p style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold)',
                    opacity: 0.6,
                    marginBottom: '0.25rem'
                  }}>
                    {product.brand?.title}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1rem',
                    fontWeight: 400,
                    color: 'var(--color-cream)',
                    marginBottom: '0.375rem'
                  }}>
                    {product.name}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.8rem',
                    color: 'var(--color-cream)',
                    opacity: 0.5
                  }}>
                    {product.price?.basePrice
                      ? `USD ${product.price.basePrice.toLocaleString()}`
                      : 'Consultar'}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
