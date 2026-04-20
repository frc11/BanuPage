import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div style={{
      minHeight: 'var(--app-vh)',
      background: 'var(--color-cream)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      position: 'relative'
    }}>
      {/* Logo watermark */}
      <Image
        src="/logoM.png"
        alt=""
        width={160}
        height={60}
        style={{
          opacity: 0.05,
          position: 'absolute',
          pointerEvents: 'none'
        }}
      />

      {/* Número 404 */}
      <p style={{
        fontFamily: 'var(--font-cormorant)',
        fontSize: 'clamp(6rem, 15vw, 12rem)',
        fontWeight: 300,
        color: 'var(--color-dark)',
        opacity: 0.08,
        lineHeight: 1,
        marginBottom: '1rem',
        letterSpacing: '0.1em'
      }}>
        404
      </p>

      {/* Separador */}
      <div style={{
        width: 40, height: 1,
        background: 'var(--color-gold)',
        opacity: 0.4,
        marginBottom: '2rem'
      }} />

      {/* Título */}
      <p style={{
        fontFamily: 'var(--font-cormorant)',
        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
        fontWeight: 300,
        color: 'var(--color-dark)',
        marginBottom: '0.875rem',
        letterSpacing: '0.02em'
      }}>
        Esta fragancia no existe
      </p>

      {/* Subtítulo */}
      <p style={{
        fontFamily: 'var(--font-dm-sans)',
        fontSize: '0.8rem',
        color: 'var(--color-dark)',
        opacity: 0.45,
        maxWidth: '280px',
        lineHeight: 1.7,
        marginBottom: '3rem'
      }}>
        La página que buscás no se encontró.
        Explorá nuestro catálogo completo.
      </p>

      {/* CTA */}
      <Link
        href="/catalogo"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-dark)',
          border: '1px solid var(--color-dark)',
          padding: '0.875rem 2.5rem',
          textDecoration: 'none',
          transition: 'all 300ms ease',
          display: 'inline-block'
        }}
      >
        Ir al Catálogo
      </Link>
    </div>
  )
}
