'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { BrandData } from '@/types/sanity'

const TAGS = ['Calor','Frío','Diario','Noche','Cita','Modo Bestia','Sport','Elegante']

interface FiltersState {
  searchQuery: string
  selectedBrands: string[]
  selectedTags: string[]
  onlyOnSale: boolean
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'newest'
}

interface CatalogFiltersProps {
  brands: BrandData[]
  filters: FiltersState
  onFiltersChange: (f: FiltersState) => void
  filteredCount: number
}

export default function CatalogFilters({ 
  brands, filters, onFiltersChange, filteredCount 
}: CatalogFiltersProps) {
  const [open, setOpen] = useState(false)

  // Abrir desde el botón externo
  useEffect(() => {
    const btn = document.getElementById('catalog-filter-btn')
    const handler = () => setOpen(true)
    btn?.addEventListener('click', handler)
    return () => btn?.removeEventListener('click', handler)
  }, [])

  const activeCount = filters.selectedBrands.length + filters.selectedTags.length

  const toggleBrand = (name: string) => {
    const next = filters.selectedBrands.includes(name)
      ? filters.selectedBrands.filter(b => b !== name)
      : [...filters.selectedBrands, name]
    onFiltersChange({ ...filters, selectedBrands: next })
  }

  const toggleTag = (tag: string) => {
    const next = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter(t => t !== tag)
      : [...filters.selectedTags, tag]
    onFiltersChange({ ...filters, selectedTags: next })
  }

  const clearAll = () => onFiltersChange({
    ...filters,
    selectedBrands: [],
    selectedTags: [],
    onlyOnSale: false
  })

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              top: 'var(--navbar-height)',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(44,24,16,0.4)',
              zIndex: 'var(--z-drawer-overlay)'
            }}
          />

          {/* PANEL */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed',
              top: 'var(--navbar-height)',
              right: 0,
              bottom: 0,
              height: 'calc(100vh - var(--navbar-height))',
              width: '320px',
              background: 'var(--color-cream)',
              zIndex: 'var(--z-drawer)',
              overflowY: 'auto',
              padding: '2rem 1.5rem'
            }}
          >
            {/* HEADER */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--color-dark)'
              }}>
                Filtros {activeCount > 0 && `(${activeCount})`}
              </p>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: '44px',
                  height: '44px',
                  border: '1px solid rgba(44,24,16,0.15)',
                  color: 'var(--color-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: 'border-color 200ms ease, opacity 200ms ease',
                  opacity: 0.7,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7'; }}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* MARCAS */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-dark)',
                opacity: 0.4,
                marginBottom: '1rem'
              }}>Marca</p>

              {brands.map(brand => (
                <label key={brand._id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 0',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(44,24,16,0.06)'
                }}>
                  <div style={{
                    width: 14, height: 14,
                    border: '1px solid var(--color-dark)',
                    background: filters.selectedBrands.includes(brand.name)
                      ? 'var(--color-gold)'
                      : 'transparent',
                    flexShrink: 0,
                    transition: 'background 200ms ease'
                  }} />
                  <input
                    type="checkbox"
                    checked={filters.selectedBrands.includes(brand.name)}
                    onChange={() => toggleBrand(brand.name)}
                    style={{ display: 'none' }}
                  />
                  <span style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.8rem',
                    color: 'var(--color-dark)'
                  }}>
                    {brand.name}
                  </span>
                </label>
              ))}
            </div>

            {/* TAGS */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-dark)',
                opacity: 0.4,
                marginBottom: '1rem'
              }}>Ocasión</p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '0.375rem 0.75rem',
                      border: '1px solid',
                      borderColor: filters.selectedTags.includes(tag)
                        ? 'var(--color-gold)'
                        : 'rgba(44,24,16,0.2)',
                      background: filters.selectedTags.includes(tag)
                        ? 'var(--color-gold)'
                        : 'transparent',
                      color: filters.selectedTags.includes(tag)
                        ? 'var(--color-cream)'
                        : 'var(--color-dark)',
                      cursor: 'pointer',
                      transition: 'all 250ms ease'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* SOLO OFERTAS */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: 14, height: 14,
                border: '1px solid var(--color-dark)',
                background: filters.onlyOnSale ? 'var(--color-gold)' : 'transparent',
                transition: 'background 200ms ease'
              }} />
              <input
                type="checkbox"
                checked={filters.onlyOnSale}
                onChange={e => onFiltersChange({ ...filters, onlyOnSale: e.target.checked })}
                style={{ display: 'none' }}
              />
              <span style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.8rem',
                color: 'var(--color-dark)'
              }}>
                Solo ofertas
              </span>
            </label>

            {/* FOOTER — solo si hay filtros activos */}
            {activeCount > 0 && (
              <div style={{
                borderTop: '1px solid rgba(44,24,16,0.1)',
                paddingTop: '1.5rem'
              }}>
                <button
                  onClick={clearAll}
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    background: 'transparent',
                    color: 'var(--color-dark)',
                    border: 'none',
                    cursor: 'pointer',
                    opacity: 0.5,
                    textDecoration: 'underline'
                  }}
                >
                  Limpiar filtros ({activeCount})
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
