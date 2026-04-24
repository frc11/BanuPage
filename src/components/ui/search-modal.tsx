'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { sanityFetch } from '@/lib/sanity'
import { ALL_PRODUCTS_QUERY } from '@/lib/queries'
import { PerfumeData } from '@/types/sanity'
import { X } from 'lucide-react'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [allProducts, setAllProducts] = useState<PerfumeData[]>([])
  const [loading, setLoading] = useState(false)
  const scrollYRef = useRef(0)

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo({ top: scrollYRef.current, behavior: 'instant' as ScrollBehavior });
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Fetch productos una sola vez al abrir
  useEffect(() => {
    if (!isOpen || allProducts.length > 0) return
    setLoading(true)
    sanityFetch<PerfumeData[]>({ query: ALL_PRODUCTS_QUERY })
      .then(data => setAllProducts(data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [isOpen, allProducts.length])

  // Autofocus al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setDebouncedQuery('')
    }
  }, [isOpen])

  // Debounce 300ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(timer)
  }, [query])

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Filtrar resultados manualmente para no usar hook y mantener params desacoplados
  const filtered = useMemo(() => {
    if (!debouncedQuery) return allProducts;
    const q = debouncedQuery.toLowerCase();
    return allProducts.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.inspiredBy?.toLowerCase().includes(q) ||
      p.brand?.title?.toLowerCase().includes(q)
    );
  }, [allProducts, debouncedQuery]);

  const results = filtered.slice(0, 6)
  const hasMore = filtered.length > 6

  const handleResultClick = (slug: string) => {
    onClose()
    router.push(`/perfume/${slug}`)
  }

  const handleVerTodos = () => {
    onClose()
    router.push(`/catalogo?q=${encodeURIComponent(debouncedQuery)}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(44,24,16,0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 'var(--z-modal)'
            }}
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] as const }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: 'var(--nav-drawer-width, 480px)',
              maxWidth: '100vw',
              height: '100%',
              background: 'var(--color-cream)',
              zIndex: 'calc(var(--z-modal) + 1)',
              padding: '1.5rem',
              paddingTop: '2.5rem',
              overflowY: 'auto',
              boxShadow: '4px 0 24px rgba(44,24,16,0.12)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* HEADER */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--color-dark)',
                opacity: 0.4
              }}>
                Buscar
              </p>
              <button
                onClick={onClose}
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

            {/* INPUT */}
            <div style={{
              borderBottom: '1px solid var(--color-dark)',
              marginBottom: '1.5rem',
              paddingBottom: '0.75rem'
            }}>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscá tu fragancia..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 300,
                  color: 'var(--color-dark)',
                  letterSpacing: '0.02em'
                }}
              />
            </div>

            {/* RESULTADOS */}
            {loading && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                  }}>
                    <div className="banu-skeleton" style={{ 
                      width: 48, height: 48, flexShrink: 0 
                    }} />
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.375rem',
                      flex: 1
                    }}>
                      <div className="banu-skeleton" style={{ 
                        height: 8, width: '60%' 
                      }} />
                      <div className="banu-skeleton" style={{ 
                        height: 8, width: '30%' 
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && debouncedQuery.length > 0 && results.length === 0 && (
              <div style={{ padding: '1rem 0' }}>
                <p style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.8rem',
                  color: 'var(--color-dark)',
                  opacity: 0.45,
                  textAlign: 'center'
                }}>
                  Sin coincidencias para "{debouncedQuery}"
                </p>
              </div>
            )}

            {!loading && results.length > 0 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0'
              }}>
                {results.map((product, i) => (
                  <motion.button
                    key={product._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleResultClick(product.slug)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.875rem 0',
                      borderBottom: '1px solid rgba(44,24,16,0.06)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      transition: 'background 200ms ease'
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.currentTarget.style.background = 'var(--color-cream-dark)'
                      e.currentTarget.style.margin = '0 -2rem'
                      e.currentTarget.style.padding = '0.875rem 2rem'
                      e.currentTarget.style.width = 'calc(100% + 4rem)'
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.margin = '0'
                      e.currentTarget.style.padding = '0.875rem 0'
                      e.currentTarget.style.width = '100%'
                    }}
                  >
                    {/* IMAGEN */}
                    <div style={{
                      width: 48,
                      height: 48,
                      background: 'var(--color-cream-dark)',
                      flexShrink: 0,
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          style={{ objectFit: 'contain', padding: '4px' }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Image
                            src="/logoM.png"
                            alt="Banū"
                            width={24}
                            height={10}
                            style={{ opacity: 0.2 }}
                          />
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-gold)',
                        opacity: 0.7,
                        marginBottom: '0.2rem'
                      }}>
                        {product.brand?.title}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: '1rem',
                        fontWeight: 400,
                        color: 'var(--color-dark)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {product.name}
                      </p>
                    </div>

                    {/* PRECIO */}
                    <p style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.8rem',
                      color: 'var(--color-dark)',
                      flexShrink: 0
                    }}>
                      {product.price?.basePrice 
                        ? `ARS ${product.price.basePrice.toLocaleString("es-AR")}` 
                        : 'Consultar'}
                    </p>
                  </motion.button>
                ))}

                {/* VER TODOS */}
                {hasMore && (
                  <button
                    onClick={handleVerTodos}
                    style={{
                      marginTop: '1rem',
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-dark)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      opacity: 0.5,
                      textDecoration: 'underline',
                      textAlign: 'center',
                      width: '100%'
                    }}
                  >
                    Ver todos los resultados ({filtered.length}) →
                  </button>
                )}
              </div>
            )}

            {/* ESTADO INICIAL — sin búsqueda */}
            {!loading && debouncedQuery.length === 0 && (
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.75rem',
                color: 'var(--color-dark)',
                opacity: 0.35,
                textAlign: 'center',
                padding: '1rem 0'
              }}>
                Escribí el nombre de un perfume o marca
              </p>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
