'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface RevealImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  delay?: number
  unoptimized?: boolean
  style?: React.CSSProperties
}

export default function RevealImage({ 
  src, alt, width, height, fill, priority, className, delay = 0, unoptimized, style
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [forceVisible, setForceVisible] = useState(false)

  useEffect(() => {
    if (priority || inView) return

    // Fallback defensivo: evita placeholders vacíos si IntersectionObserver falla
    const timeoutId = window.setTimeout(() => setForceVisible(true), 1200)
    return () => window.clearTimeout(timeoutId)
  }, [inView, priority])

  const isInView = Boolean(priority || inView || forceVisible)

  return (
    <motion.div
      ref={ref}
      style={{ overflow: 'hidden', position: fill ? 'absolute' : 'relative', inset: fill ? 0 : undefined }}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={isInView 
        ? { clipPath: 'inset(0% 0% 0% 0%)' } 
        : { clipPath: 'inset(100% 0% 0% 0%)' }
      }
      transition={{ 
        duration: 0.9, 
        delay, 
        ease: [0.76, 0, 0.24, 1] 
      }}
      className={fill ? className : undefined}
    >
      <motion.div
        initial={{ scale: 1.08 }}
        animate={isInView ? { scale: 1 } : { scale: 1.08 }}
        transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
        style={{ width: '100%', height: '100%', position: fill ? 'absolute' : 'relative' }}
      >
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          unoptimized={unoptimized}
          className={className}
          style={{ objectFit: 'cover', objectPosition: 'center', ...style }}
        />
      </motion.div>
    </motion.div>
  )
}
