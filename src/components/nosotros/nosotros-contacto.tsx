'use client'
import { motion } from 'framer-motion'
import RevealText from '@/src/components/ui/reveal-text'
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern'

export default function NosotrosContacto() {
  return (
    <section
      id="contacto"
      style={{
        background: 'var(--color-cream)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <ArabicPatternOverlay opacity={0.035} color="dark" />

      <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
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
            marginBottom: '1.5rem'
          }}
        >
          Contacto
        </motion.p>

        <RevealText
          text="¿Querés asesoramiento personalizado?"
          as="h2"
          className="contacto-title"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300,
            color: 'var(--color-dark)',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
        />


        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 0.5, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.875rem',
            color: 'var(--color-dark)',
            lineHeight: 1.8,
            marginBottom: '3rem'
          }}
        >
          Escribinos por WhatsApp y te ayudamos a encontrar
          tu fragancia ideal. Respondemos en menos de 24 horas.
        </motion.p>

        <motion.a
          href="https://wa.me/5493814665503?text=Hola%20Banū%2C%20quiero%20asesoramiento%20personalizado"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ backgroundColor: 'var(--color-gold)' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'var(--color-dark)',
            color: 'var(--color-cream)',
            padding: '1rem 2.5rem',
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 350ms ease, color 350ms ease'
          }}
        >
          Escribinos por WhatsApp
        </motion.a>
      </div>
    </section>
  )
}
