import React from 'react';
import { motion, Variants } from 'framer-motion';

export interface ReviewCardProps {
  author: string;
  rating: number;
  text: string;
  variants?: Variants;
}

const MAX_CHARS = 220;

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max).trimEnd() + '…';
}

export function ReviewCard({ author, rating, text, variants }: ReviewCardProps) {
  const safeRating = Math.min(Math.max(Math.floor(rating), 0), 5);
  const displayText = truncate(text, MAX_CHARS);

  return (
    <motion.div
      variants={variants}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        background: '#FFFFFF',
        border: '1px solid rgba(139,115,85,0.1)',
        width: '100%',
        height: '100%',
        paddingTop: '2.8rem',
        paddingBottom: '2.8rem',
        paddingLeft: '2.5rem',
        paddingRight: '2.5rem',
        boxSizing: 'border-box',
      }}
    >
      {/* Estrellas arriba */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill={i < safeRating ? 'var(--color-gold)' : 'transparent'}
            stroke="var(--color-gold)"
            strokeWidth="2"
            strokeLinejoin="round"
            style={{ opacity: i >= safeRating ? 0.3 : 1 }}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      {/* Texto del testimonio — centrado verticalmente */}
      <p
        style={{
          fontFamily: 'var(--font-serif, Georgia, serif)',
          fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
          fontStyle: 'italic',
          color: 'var(--color-dark)',
          lineHeight: '1.8',
          maxWidth: '90%',
          textAlign: 'center',
          margin: '0',
        }}
      >
        &ldquo;{displayText}&rdquo;
      </p>

      {/* Nombre del autor */}
      <span
        style={{
          fontFamily: 'var(--font-sans, sans-serif)',
          fontWeight: 500,
          fontSize: '0.78rem',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--color-gold)',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {author}
      </span>
    </motion.div>
  );
}
