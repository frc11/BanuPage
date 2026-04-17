import { ProductCardSkeleton } from '@/src/components/ui/product-card-skeleton'

export default function CatalogoLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div style={{
        background: 'var(--color-dark)',
        paddingTop: 'calc(var(--navbar-height) + 5rem)',
        paddingBottom: '4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div className="banu-skeleton" style={{ width: 80, height: 8 }} />
        <div className="banu-skeleton" style={{ width: 240, height: 48 }} />
        <div className="banu-skeleton" style={{ width: 80, height: 8 }} />
      </div>

      {/* Barra de filtros skeleton */}
      <div style={{
        height: 48,
        background: 'var(--color-cream)',
        borderBottom: '1px solid rgba(44,24,16,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem'
      }}>
        <div className="banu-skeleton" style={{ width: 100, height: 8 }} />
        <div className="banu-skeleton" style={{ width: 80, height: 8 }} />
      </div>

      {/* Grid skeleton */}
      <div style={{
        background: 'var(--color-cream)',
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '1px'
      }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
