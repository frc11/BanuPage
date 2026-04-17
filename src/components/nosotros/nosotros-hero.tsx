'use client'
import { motion } from 'framer-motion'
import RevealText from '@/src/components/ui/reveal-text'
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern'

export default function NosotrosHero() {
  return (
    <section style={{
      background: 'var(--color-dark)',
      paddingTop: 'calc(var(--navbar-height) + 6rem)',
      paddingBottom: '6rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        opacity: 0.03, pointerEvents: 'none'
      }}>
        <ArabicPatternOverlay color="light" />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.6rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          marginBottom: '1.5rem',
          position: 'relative'
        }}
      >
        Nuestra Historia
      </motion.p>

      <RevealText
        text="El arte del perfume árabe en Argentina"
        as="h1"
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 300,
          color: 'var(--color-cream)',
          letterSpacing: '0.03em',
          maxWidth: '800px',
          margin: '0 auto 2rem',
          lineHeight: 1.2,
          position: 'relative'
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 0.55, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.875rem',
          color: 'var(--color-cream)',
          maxWidth: '480px',
          margin: '0 auto',
          lineHeight: 1.8,
          position: 'relative'
        }}
      >
        Traemos las fragancias más icónicas del Medio Oriente
        directamente a vos, con autenticidad garantizada
        y asesoramiento personalizado.
      </motion.p>
    </section>
  )
}
