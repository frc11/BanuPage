'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelectionStore } from '@/src/store/selection-store'

function ToastItem({ 
  id, message, variant 
}: { 
  id: string
  message: string
  variant: 'success' | 'info' | 'error'
}) {
  const removeToast = useSelectionStore(s => s.removeToast)

  const borderColor = {
    success: 'var(--color-gold)',
    info: 'transparent',
    error: '#c0392b'
  }[variant]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: 'var(--color-dark)',
        color: 'var(--color-cream)',
        padding: '0.875rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        borderLeft: `2px solid ${borderColor}`,
        minWidth: '240px',
        maxWidth: '320px',
        cursor: 'pointer'
      }}
      onClick={() => removeToast(id)}
    >
      <p style={{
        fontFamily: 'var(--font-dm-sans)',
        fontSize: '0.75rem',
        letterSpacing: '0.05em',
        color: 'var(--color-cream)'
      }}>
        {message}
      </p>
      <span style={{
        color: 'var(--color-cream)',
        opacity: 0.4,
        fontSize: '0.875rem',
        flexShrink: 0
      }}>
        ×
      </span>
    </motion.div>
  )
}

export default function ToastContainer() {
  const toasts = useSelectionStore(s => s.toasts)

  return (
    <div style={{
      position: 'fixed',
      bottom: '5rem',
      right: '1.5rem',
      zIndex: 9500,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      pointerEvents: 'none'
    }}>
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <div key={toast.id} style={{ pointerEvents: 'all' }}>
            <ToastItem {...toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
