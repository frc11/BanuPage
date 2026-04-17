'use client'
import { motion } from 'framer-motion'

interface ProductBadgeProps {
  badge?: string
  theme?: 'light' | 'dark'
}

export default function ProductBadge({ badge, theme = 'dark' }: ProductBadgeProps) {
  if (!badge) return null;
  
  const isBeast = badge.toUpperCase() === 'MODO BESTIA';
  const color = isBeast ? 'var(--color-dark)' : 'var(--color-gold)';

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      style={{
        fontFamily: 'var(--font-dm-sans), sans-serif',
        fontSize: '0.55rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: color, 
        display: 'block',
        marginBottom: '0.375rem',
        pointerEvents: 'none'
      }}
    >
      {badge}
    </motion.span>
  )
}
