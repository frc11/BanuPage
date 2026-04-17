'use client'
import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { PerfumeData, BrandData } from '@/types/sanity'
import { ProductCard } from '@/components/ui/ProductCard'
import { EmptyState } from '@/src/components/ui/empty-state'
import CatalogFilters from './catalog-filters'

interface CatalogContentProps {
  products: PerfumeData[]
  brands: BrandData[]
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
  const [filters, setFilters] = useState<{
    searchQuery: string;
    selectedBrands: string[];
    selectedTags: string[];
    onlyOnSale: boolean;
    sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'newest';
  }>({
    searchQuery: '',
    selectedBrands: [],
    selectedTags: [],
    onlyOnSale: false,
    sortBy: 'recommended'
  })

  // Leer parámetros de URL al montar
  useEffect(() => {
    const marca = searchParams.get('marca')
    const q = searchParams.get('q')
    if (marca) setFilters(f => ({ ...f, selectedBrands: [marca] }))
    if (q) setFilters(f => ({ ...f, searchQuery: q }))
  }, [searchParams])

  const filtered = useMemo(() => {
    let res = products.filter(p => {
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.inspiredBy?.toLowerCase().includes(q)) return false;
      }
      if (filters.selectedBrands.length > 0) {
        if (!p.brand?.title || !filters.selectedBrands.includes(p.brand.title)) return false;
      }
      if (filters.selectedTags.length > 0) {
        const hasAll = filters.selectedTags.every(t => p.tags?.includes(t));
        if (!hasAll) return false;
      }
      if (filters.onlyOnSale) {
        if (!p.price?.isOnSale) return false;
      }
      return true;
    });

    if (filters.sortBy === 'price-asc') {
      res.sort((a,b) => (a.price?.discountPrice || a.price?.basePrice || 0) - (b.price?.discountPrice || b.price?.basePrice || 0));
    } else if (filters.sortBy === 'price-desc') {
      res.sort((a,b) => (b.price?.discountPrice || b.price?.basePrice || 0) - (a.price?.discountPrice || a.price?.basePrice || 0));
    }
    
    return res;
  }, [products, filters]);

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '60vh' }}>

      {/* BARRA STICKY DE FILTROS */}
      <div style={{
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
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-dark)',
          opacity: 0.45
        }}>
          {filtered.length} {filtered.length === 1 ? 'fragancia' : 'fragancias'}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* DROPDOWN ORDENAR */}
          <select
            value={filters.sortBy}
            onChange={e => setFilters(f => ({ 
              ...f, 
              sortBy: e.target.value as typeof filters.sortBy 
            }))}
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
            <option value="newest">Más recientes</option>
          </select>

          {/* BOTÓN FILTROS */}
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
              opacity: 0.7
            }}
            id="catalog-filter-btn"
          >
            Filtros
            {(filters.selectedBrands.length + filters.selectedTags.length) > 0 && (
              <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--color-gold)',
                display: 'inline-block'
              }} />
            )}
          </button>
        </div>
      </div>

      {/* GRID DE PRODUCTOS */}
      {filtered.length === 0 ? (
        <EmptyState
          title="Sin resultados"
          subtitle="Probá con otros filtros o explorá todo el catálogo."
          action={{ label: "Ver todo", href: "/catalogo" }}
          theme="light"
        />
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="catalog-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'rgba(44,24,16,0.06)',
            padding: 'clamp(1rem, 4vw, 2rem)',
            paddingTop: '2rem'
          }}
        >
          {filtered.map((product, i) => (
            <motion.div key={product._id} variants={cardVariants}>
              <ProductCard
                product={product}
                theme="light"
                index={i}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* DRAWER DE FILTROS */}
      <CatalogFilters
        brands={brands}
        filters={filters}
        onFiltersChange={setFilters}
        filteredCount={filtered.length}
      />

    </div>
  )
}
