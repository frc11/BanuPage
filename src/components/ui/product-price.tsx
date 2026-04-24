import React from 'react'

interface ProductPriceProps {
  basePrice: number | null
  discountPrice?: number | null
  isOnSale?: boolean
  theme?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

export default function ProductPrice({ 
  basePrice, discountPrice, isOnSale, theme = 'dark', size = 'md' 
}: ProductPriceProps) {
  
  const fontSizeMap = {
    sm: '0.8rem',
    md: '0.875rem',
    lg: '1.1rem'
  }
  const fontSize = fontSizeMap[size]
  const color = theme === 'dark' ? 'var(--color-cream)' : 'var(--color-dark)'

  // ESTADO 3 — sin precio
  if (!basePrice || basePrice <= 0) {
    return (
      <span style={{
        fontFamily: 'var(--font-dm-sans), sans-serif',
        fontSize,
        color,
        opacity: 0.5,
        letterSpacing: '0.1em',
        textTransform: 'uppercase'
      }}>
        Consultar
      </span>
    )
  }

  // ESTADO 2 — precio con descuento
  if (isOnSale && discountPrice && discountPrice > 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
        <span style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize,
          color,
          opacity: 0.35,
          textDecoration: 'line-through',
          textDecorationColor: 'var(--color-gold)',
          fontWeight: 400
        }}>
          ARS {basePrice.toLocaleString('es-AR')}
        </span>
        <span style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize,
          color: 'var(--color-gold)',
          fontWeight: 500
        }}>
          ARS {discountPrice.toLocaleString('es-AR')}
        </span>
      </div>
    )
  }

  // ESTADO 1 — precio normal
  return (
    <span style={{
      fontFamily: 'var(--font-dm-sans), sans-serif',
      fontSize,
      color,
      fontWeight: 400
    }}>
      ARS {basePrice.toLocaleString('es-AR')}
    </span>
  )
}
