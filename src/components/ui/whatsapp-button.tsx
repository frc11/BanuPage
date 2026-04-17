'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'calc(2rem + env(safe-area-inset-bottom))',
        right: '1.75rem',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'var(--color-dark)',
              padding: '0.5rem 0.875rem',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-cream)',
              }}
            >
              Hablá con nosotros
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'relative' }}>
        <motion.div
          animate={{
            scale: [1, 1.7, 1.7],
            opacity: [0.35, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'var(--color-gold)',
            pointerEvents: 'none',
          }}
        />

        <motion.a
          href="https://wa.me/5493814665503"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--color-dark)',
            border: '1px solid rgba(139,115,85,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            textDecoration: 'none',
            transition: 'background 300ms ease',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-cream)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </motion.a>
      </div>
    </div>
  )
}
