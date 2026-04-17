import React from 'react';
import { motion, Variants } from 'framer-motion';

export interface ReviewCardProps {
  author: string;
  rating: number;
  text: string;
  variants?: Variants;
}

export function ReviewCard({ author, rating, text, variants }: ReviewCardProps) {
  const safeRating = Math.min(Math.max(Math.floor(rating), 0), 5);

  return (
    <motion.div 
      variants={variants}
      className="flex flex-col items-center justify-start text-center bg-[#FFFFFF] rounded-none p-10 border border-[rgba(139,115,85,0.1)] shadow-none h-full w-full"
    >
      {/* Estrellas llenas - Explícitamente centradas */}
      <div className="flex flex-row items-center justify-center gap-[3px] mb-6 w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg 
            key={i} 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill={i < safeRating ? "var(--color-gold)" : "transparent"} 
            stroke="var(--color-gold)"
            strokeWidth="2"
            strokeLinejoin="round"
            className={i >= safeRating ? "opacity-30" : ""}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      
      {/* Texto Tipográfico - Explícitamente centrado */}
      <p className="font-serif text-[1.1rem] italic text-[var(--color-dark)] leading-[1.8] mb-8 flex-grow max-w-[95%] text-center">
        "{text}"
      </p>

      {/* Separador estricto - Centrado */}
      <div className="w-12 h-[1px] bg-[var(--color-gold)] opacity-30 mb-6" />

      {/* Nombre - Explícitamente centrado */}
      <span className="font-sans font-medium text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-gold)] text-center w-full">
        {author}
      </span>
    </motion.div>
  );
}


