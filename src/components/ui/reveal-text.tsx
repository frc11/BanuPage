'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface RevealTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  className?: string
  delay?: number
  stagger?: number
}

export default function RevealText({
  text,
  as: Tag = 'h2',
  className,
  delay = 0,
  stagger = 0.06
}: RevealTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  }

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 24,
      rotateX: 12 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 0.65, 
        ease: [0.76, 0, 0.24, 1]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ perspective: '800px' }}
    >
      <Tag className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  )
}
