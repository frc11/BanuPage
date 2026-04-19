'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (images.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', opacity: 0.2 }}>
        <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: 'var(--color-dark)' }}>
          {productName}
        </p>
      </div>
    )
  }

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={productName}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
      />
    )
  }

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-cream-dark)' }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${productName} view ${currentIndex + 1}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', position: 'absolute', top: 0, left: 0 }}
        />
      </AnimatePresence>

      {/* Controles Nav */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', pointerEvents: 'none' }}>
        <button
          onClick={handlePrev}
          className="transition-opacity duration-300 hover:opacity-100 opacity-80"
          style={{
            pointerEvents: 'auto',
            background: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            mixBlendMode: 'difference',
            padding: '1rem'
          }}
        >
          <ChevronLeft size={36} strokeWidth={1} />
        </button>
        <button
          onClick={handleNext}
          className="transition-opacity duration-300 hover:opacity-100 opacity-80"
          style={{
            pointerEvents: 'auto',
            background: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            mixBlendMode: 'difference',
            padding: '1rem'
          }}
        >
          <ChevronRight size={36} strokeWidth={1} />
        </button>
      </div>

      {/* Indicadores */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '0.6rem', pointerEvents: 'none' }}>
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              pointerEvents: 'auto',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: idx === currentIndex ? '#fff' : 'rgba(255, 255, 255, 0.4)',
              mixBlendMode: 'difference',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              transform: idx === currentIndex ? 'scale(1.2)' : 'scale(1)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }}
            aria-label={`Ir a imagen ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
