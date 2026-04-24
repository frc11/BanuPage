'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { sanityFetch } from '@/lib/sanity'
import { ProductCard } from '@/components/ui/ProductCard'
import { ALL_PRODUCTS_QUERY } from '@/lib/queries'
import { PerfumeData } from '@/types/sanity'
import RevealText from '@/src/components/ui/reveal-text'
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern'

interface SuggestedProductsProps {
  currentId: string
}

export default function SuggestedProducts({ currentId }: SuggestedProductsProps) {
  const [products, setProducts] = useState<PerfumeData[]>([])

  useEffect(() => {
    sanityFetch<PerfumeData[]>({ query: ALL_PRODUCTS_QUERY })
      .then(data => {
        const allProducts = data || []
        const currentProduct = allProducts.find(p => p._id === currentId)
        
        if (!currentProduct) {
          // Fallback seguro: devolver 5 recientes
          setProducts(allProducts.filter(p => p._id !== currentId).slice(0, 5))
          return
        }

        // Algoritmo de similitud
        const scored = allProducts
          .filter(p => p._id !== currentId)
          .map(p => {
            let score = 0;
            // 1. Mismo fabricante (Prioridad Máxima)
            if (p.brand?.title && p.brand.title === currentProduct.brand?.title) score += 50;
            
            // 2. Coincidencias olfativas y perceptivas (Vibe, Familia OLF, Clima)
            const commonTags = p.tags?.filter(t => currentProduct.tags?.includes(t)) || [];
            score += commonTags.length * 10;
            // 3. Afinidad de jerarquía de precio (Si están a <= ARS 30 de diferencia)
            if (p.price?.basePrice && currentProduct.price?.basePrice) {
               if (Math.abs(p.price.basePrice - currentProduct.price.basePrice) <= 30) score += 5;
            }

            return { product: p, score };
          });

        // Ordenar por score decreciente, desempatar por isFeatured (novedades)
        const sorted = scored.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return (b.product.isFeatured ? 1 : 0) - (a.product.isFeatured ? 1 : 0);
        });

        // Garantizar 5 resultados
        setProducts(sorted.map(s => s.product).slice(0, 5))
      })
  }, [currentId])

  if (products.length === 0) return null

  return (
    <section style={{
      background: 'var(--color-dark)',
      padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 4vw, 3rem)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <ArabicPatternOverlay opacity={0.04} color="light" />
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
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'flex-start',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
          overflowX: 'auto',
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          paddingBottom: '2rem',
          scrollbarWidth: 'none', // Para Firefox
        }}
        className="suggested-grid hide-scrollbar"
        >
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{
                flex: '0 0 auto',
                width: 'calc(85vw - 2rem)',
                maxWidth: 'calc((100% - (clamp(1rem, 2vw, 1.5rem) * 4)) / 5)', // 5 items exactos en Desktop
                minWidth: '240px',
                scrollSnapAlign: 'start',
              }}
            >
              <ProductCard product={product} theme="dark" index={i} context="default" fluidWidth />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
