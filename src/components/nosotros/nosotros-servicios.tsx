'use client'
import { motion } from 'framer-motion'
import RevealText from '@/src/components/ui/reveal-text'

const SERVICIOS = [
  {
    icono: '◈',
    titulo: 'Envíos Nacionales',
    texto: 'Logística discreta y asegurada a todo el país con tracking prioritario.'
  },
  {
    icono: '◇',
    titulo: 'Autenticidad 100%',
    texto: 'Distribuidores oficiales. Cada fragancia incluye su sello inalterable de fábrica.'
  },
  {
    icono: '◉',
    titulo: 'Asesoría Privada',
    texto: 'Atención personalizada 1 a 1 para guiar tu viaje olfativo.'
  },
  {
    icono: '◈',
    titulo: 'Bóveda Cifrada',
    texto: 'Transacciones y datos estrictamente resguardados bajo grado militar.'
  }
]

export default function NosotrosServicios() {
  return (
    <section
      id="servicios"
      style={{
        background: 'var(--color-cream)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)'
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.6rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              marginBottom: '1.25rem'
            }}
          >
            Lo que ofrecemos
          </motion.p>

          <RevealText
            text="Nuestros Servicios"
            as="h2"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--color-dark)'
            }}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          background: 'rgba(44,24,16,0.06)'
        }}
        className="servicios-grid"
        >
          {SERVICIOS.map((servicio, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: 'var(--color-cream)',
                padding: 'clamp(2rem, 4vw, 3rem) 1.5rem',
                textAlign: 'center'
              }}
            >
              <p style={{
                fontSize: '1.5rem',
                color: 'var(--color-gold)',
                opacity: 0.6,
                marginBottom: '1.25rem'
              }}>
                {servicio.icono}
              </p>

              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-dark)',
                fontWeight: 500,
                marginBottom: '0.875rem'
              }}>
                {servicio.titulo}
              </p>

              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.8rem',
                color: 'var(--color-dark)',
                opacity: 0.55,
                lineHeight: 1.75
              }}>
                {servicio.texto}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
