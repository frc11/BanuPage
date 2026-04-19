'use client'
import { motion } from 'framer-motion'
import RevealText from '@/src/components/ui/reveal-text'
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern'

export default function NosotrosHistoria() {
  return (
    <section style={{
      background: 'var(--color-dark)',
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <ArabicPatternOverlay opacity={0.035} color="light" />
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(3rem, 6vw, 6rem)',
        alignItems: 'center'
      }}
      className="nosotros-historia-grid"
      >
        {/* COLUMNA TEXTO */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              marginBottom: '1.25rem'
            }}
          >
            Quiénes somos
          </motion.p>

          <RevealText
            text="Nacimos de una pasión por el perfume oriental"
            as="h2"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 300,
              color: 'var(--color-cream)',
              marginBottom: '2rem',
              lineHeight: 1.25,
              textAlign: 'center',
            }}
          />

          {[
            'Banū Scents nació de una convicción simple: los perfumes árabes son algunas de las fragancias más complejas, longevas y seductoras del mundo, y merecen llegar a más personas.',
            'Nos especializamos en importar y curar una selección de las mejores casas de perfumería árabe — Lattafa, Creed, Al Haramain, Xerjoff y más — con autenticidad certificada en cada frasco.',
            'Cada perfume que ofrecemos fue seleccionado personalmente. No vendemos volumen, vendemos experiencia olfativa.'
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.875rem',
                color: 'var(--color-cream)',
                opacity: 0.7,
                lineHeight: 1.85,
                marginBottom: '1.25rem'
              }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* COLUMNA VISUAL */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            background: 'rgba(255,255,255,0.05)',
            aspectRatio: '3/4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Placeholder hasta que el cliente provea imagen */}
          <div style={{
            position: 'absolute', inset: 0,
            opacity: 0.06
          }}>
            <ArabicPatternOverlay color="light" />
          </div>
          <img
            src="/logoM.png"
            alt="Banū"
            style={{
              width: '40%',
              opacity: 0.15,
              position: 'relative'
            }}
          />
          {/* TODO: reemplazar por RevealImage con foto real del equipo o productos */}
        </motion.div>
      </div>
    </section>
  )
}
