'use client'
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { PerfumeData, BrandData } from '@/types/sanity'
import { ProductCard } from '@/components/ui/ProductCard'
import { EmptyState } from '@/src/components/ui/empty-state'
import CatalogFilters from './catalog-filters'
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern'

const PAGE_SIZE = 8

interface CatalogContentProps {
  products: PerfumeData[]
  brands: BrandData[]
}

interface FiltersState {
  searchQuery: string
  selectedBrands: string[]
  selectedTags: string[]
  onlyOnSale: boolean
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'newest'
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
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

export default function CatalogContent({ products, brands }: CatalogContentProps) {
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<FiltersState>(() => {
    const marca = searchParams.get('marca')
    const q = searchParams.get('q')

    return {
      searchQuery: q ?? '',
      selectedBrands: marca ? [marca] : [],
      selectedTags: [],
      onlyOnSale: false,
      sortBy: 'recommended'
    }
  })

  const [page, setPage] = useState(1)

  // Resetear página al cambiar filtros
  const handleFiltersChange = (f: FiltersState) => {
    setFilters(f)
    setPage(1)
  }

  const filtered = useMemo(() => {
    const base = products.filter((p) => {
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase()
        if (!p.name.toLowerCase().includes(q) && !p.inspiredBy?.toLowerCase().includes(q)) {
          return false
        }
      }

      if (filters.selectedBrands.length > 0) {
        if (!p.brand?.title || !filters.selectedBrands.includes(p.brand.title)) {
          return false
        }
      }

      if (filters.selectedTags.length > 0) {
        const hasAll = filters.selectedTags.every((t) => p.tags?.includes(t))
        if (!hasAll) {
          return false
        }
      }

      if (filters.onlyOnSale && !p.price?.isOnSale) {
        return false
      }

      return true
    })

    if (filters.sortBy === 'price-asc') {
      return [...base].sort(
        (a, b) => (a.price?.discountPrice || a.price?.basePrice || 0) - (b.price?.discountPrice || b.price?.basePrice || 0)
      )
    }

    if (filters.sortBy === 'price-desc') {
      return [...base].sort(
        (a, b) => (b.price?.discountPrice || b.price?.basePrice || 0) - (a.price?.discountPrice || a.price?.basePrice || 0)
      )
    }

    return base
  }, [products, filters])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '60vh', position: 'relative' }}>
      <ArabicPatternOverlay opacity={0.04} color="dark" />
      <div
        style={{
          position: 'sticky',
          top: 'var(--navbar-height)',
          zIndex: 'var(--z-sticky)',
          background: 'var(--color-cream)',
          borderBottom: '1px solid rgba(44,24,16,0.1)',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1rem, 4vw, 3rem)'
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-dark)',
            opacity: 0.45
          }}
        >
          {filtered.length} {filtered.length === 1 ? 'fragancia' : 'fragancias'}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value as FiltersState['sortBy'] }))}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              color: 'var(--color-dark)',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(44,24,16,0.3)',
              cursor: 'pointer',
              paddingBottom: '2px',
              outline: 'none'
            }}
          >
            <option value="recommended">Recomendados</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="newest">{'M\u00e1s recientes'}</option>
          </select>

          <button
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-dark)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            id="catalog-filter-btn"
            className="opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            Filtros
            {(filters.selectedBrands.length + filters.selectedTags.length) > 0 && (
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--color-gold)',
                  display: 'inline-block'
                }}
              />
            )}
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Sin resultados"
          subtitle={'Prob\u00e1 con otros filtros o explor\u00e1 todo el cat\u00e1logo.'}
          action={{ label: 'Ver todo', href: '/catalogo' }}
          theme="light"
        />
      ) : (
        <>
          <motion.div
            key={page}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="catalog-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'clamp(0.75rem, 2vw, 1.5rem)',
              background: 'transparent',
              padding: 'clamp(1rem, 4vw, 2.5rem)',
              paddingTop: '2rem'
            }}
          >
            {paginated.map((product, i) => (
              <motion.div key={product._id} variants={cardVariants}>
                <ProductCard product={product} theme="light" index={i} context="catalog" priority={i < 8} />
              </motion.div>
            ))}
          </motion.div>

          {/* PAGINACIÓN */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              padding: '2.5rem clamp(1rem, 4vw, 2.5rem)',
              borderTop: '1px solid rgba(44,24,16,0.08)',
            }}>
              {/* Flecha izquierda */}
              <button
                onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                disabled={page === 1}
                aria-label="Página anterior"
                style={{
                  width: 40, height: 40,
                  border: '1px solid',
                  borderColor: page === 1 ? 'rgba(44,24,16,0.15)' : 'rgba(44,24,16,0.4)',
                  background: 'transparent',
                  color: page === 1 ? 'rgba(44,24,16,0.25)' : 'var(--color-dark)',
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 250ms ease',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Indicador de página */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{
                      width: n === page ? 28 : 8,
                      height: 8,
                      background: n === page ? 'var(--color-gold)' : 'rgba(44,24,16,0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 350ms ease',
                      flexShrink: 0,
                    }}
                    aria-label={`Ir a página ${n}`}
                    aria-current={n === page ? 'page' : undefined}
                  />
                ))}
              </div>

              {/* Flecha derecha */}
              <button
                onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                disabled={page === totalPages}
                aria-label="Página siguiente"
                style={{
                  width: 40, height: 40,
                  border: '1px solid',
                  borderColor: page === totalPages ? 'rgba(44,24,16,0.15)' : 'rgba(44,24,16,0.4)',
                  background: 'transparent',
                  color: page === totalPages ? 'rgba(44,24,16,0.25)' : 'var(--color-dark)',
                  cursor: page === totalPages ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 250ms ease',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}

      <CatalogFilters brands={brands} filters={filters} onFiltersChange={handleFiltersChange} filteredCount={filtered.length} />
    </div>
  )
}
