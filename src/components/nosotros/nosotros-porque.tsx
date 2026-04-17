'use client'
import { motion } from 'framer-motion'
import RevealText from '@/src/components/ui/reveal-text'
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern'

const RAZONES = [
  {
    numero: '01',
    titulo: 'Longevidad excepcional',
    texto: 'Las fragancias árabes están formuladas con aceites de alta concentración. Un solo spray dura entre 12 y 24 horas en la piel.'
  },
  {
    numero: '02',
    titulo: 'Materias primas únicas',
    texto: 'Oud, rosa de Taif, ambar, azafrán, mirra. Ingredientes que no encontrás en la perfumería occidental convencional.'
  },
  {
    numero: '03',
    titulo: 'Historia de siglos',
    texto: 'El perfume árabe tiene más de 1000 años de tradición. Cada fragancia lleva consigo una herencia cultural profunda.'
  }
]

export default function NosotrosPorQue() {
  return (
    <section style={{
      background: 'var(--color-dark)',
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        opacity: 0.03, pointerEvents: 'none'
      }}>
        <ArabicPatternOverlay color="light" />
      </div>

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
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
            Por qué el perfume árabe
          </motion.p>

          <RevealText
            text="Una tradición milenaria de lujo olfativo"
            as="h2"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--color-cream)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(2rem, 4vw, 4rem)'
        }}
        className="porque-grid"
        >
          {RAZONES.map((razon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '3rem',
                fontWeight: 300,
                color: 'var(--color-gold)',
                opacity: 0.3,
                marginBottom: '1rem',
                lineHeight: 1
              }}>
                {razon.numero}
              </p>

              <div style={{
                width: '32px',
                height: '1px',
                background: 'var(--color-gold)',
                opacity: 0.4,
                marginBottom: '1.25rem'
              }} />

              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1.25rem',
                fontWeight: 400,
                color: 'var(--color-cream)',
                marginBottom: '0.875rem',
                lineHeight: 1.3
              }}>
                {razon.titulo}
              </p>

              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.8rem',
                color: 'var(--color-cream)',
                opacity: 0.55,
                lineHeight: 1.8
              }}>
                {razon.texto}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
