'use client'
import Image from 'next/image'

export default function CatalogoError({
  reset
}: {
  reset: () => void
}) {
  return (
    <div style={{
      minHeight: '60vh',
      background: 'var(--color-cream)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '4rem 2rem'
    }}>
      <Image
        src="/logoM.png"
        alt="Banū"
        width={80}
        height={30}
        style={{ opacity: 0.2 }}
      />
      <p style={{
        fontFamily: 'var(--font-cormorant)',
        fontSize: '1.75rem',
        fontWeight: 300,
        color: 'var(--color-dark)'
      }}>
        Algo salió mal
      </p>
      <button
        onClick={reset}
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-dark)',
          border: '1px solid var(--color-dark)',
          background: 'transparent',
          padding: '0.875rem 2rem',
          cursor: 'pointer'
        }}
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
