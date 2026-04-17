"use client";

import React from 'react';
import { ReviewGrid, ReviewItem } from '@/components/ui/ReviewGrid';
import { Typography } from '@/components/ui/Typography';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { fadeUp } from '@/lib/animation-variants';

const FALLBACK_REVIEWS: ReviewItem[] = [
  {
    _id: 'r1',
    author: 'Valentina M.',
    rating: 5,
    text: 'Lattafa Khamrah es una obra maestra. Llegó en tiempo récord y en perfecto estado. La atención fue extraordinaria de principio a fin.',
  },
  {
    _id: 'r2',
    author: 'Sebastián R.',
    rating: 5,
    text: 'Por fin encontré Layton Exclusif en Argentina sin precios absurdos. La fragancia es exactamente como la describieron. Cien por ciento original.',
  },
  {
    _id: 'r3',
    author: 'Carolina L.',
    rating: 5,
    text: 'El servicio de asesoría me ayudó a elegir entre tres opciones. Elegí Nishane Ani y fue la mejor decisión olfativa de mi vida.',
  },
];

export interface ReviewsSectionProps {
  reviews: ReviewItem[] | null;
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const data = reviews && reviews.length > 0 ? reviews : FALLBACK_REVIEWS;
  const { ref, controls } = useScrollAnimation();

  return (
    <section className="w-full bg-[var(--color-cream)] py-[clamp(5rem,10vw,8rem)] overflow-hidden flex justify-center">
      <div className="w-full max-w-[1200px] px-6 lg:px-8 flex flex-col items-center">
        
        {/* Título unificado - Axial Centered */}
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          viewport={{ once: true }}
          variants={fadeUp}
          className="w-full flex flex-col items-center mb-16 md:mb-24 text-center"
        >
          <Typography variant="heading" className="text-[var(--color-dark)] !mb-4 w-full">
            Voces de la Bóveda
          </Typography>
          <span className="font-sans text-[0.65rem] tracking-[0.4em] uppercase text-[var(--color-gold)] font-medium text-center">
            EXPERIENCIAS CONFIDENCIALES
          </span>
          <div className="w-16 h-px bg-[var(--color-gold)] opacity-30 mt-6" />
        </motion.div>
        
        {/* Grid Wrapper - Enforcing Center */}
        <div className="w-full flex justify-center">
          <ReviewGrid reviews={data} />
        </div>
      </div>
    </section>
  );
}


