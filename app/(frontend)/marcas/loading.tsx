export default function MarcasLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div style={{
        background: 'var(--color-dark)',
        paddingTop: 'calc(var(--navbar-height) + 5rem)',
        paddingBottom: '5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div className="banu-skeleton" style={{ width: 100, height: 8 }} />
        <div className="banu-skeleton" style={{ width: 280, height: 56 }} />
        <div className="banu-skeleton" style={{ width: 220, height: 8 }} />
      </div>

      {/* Grid skeleton */}
      <div style={{
        background: 'var(--color-cream)',
        padding: '3rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1px'
      }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="banu-skeleton"
            style={{ height: '200px' }}
          />
        ))}
      </div>
    </div>
  )
}
