'use client';

import React from 'react';
import { ReviewGrid, ReviewItem } from '@/components/ui/ReviewGrid';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { fadeUp } from '@/lib/animation-variants';
import RevealText from '@/src/components/ui/reveal-text';

export interface ReviewsSectionProps {
  reviews?: ReviewItem[] | null;
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const { ref, controls } = useScrollAnimation();

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[var(--color-cream)] py-[clamp(5rem,10vw,8rem)] overflow-hidden flex justify-center">
      <div className="w-full max-w-[1200px] px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          viewport={{ once: true }}
          variants={fadeUp}
          className="w-full flex flex-col items-center mb-16 md:mb-24 text-center"
        >
          <RevealText
            as="h2"
            text="Voces de la Bóveda"
            className="text-[var(--color-dark)] font-serif text-[3.5rem] !mb-4 w-full text-center"
            delay={0.2}
          />
          <span className="font-sans text-[0.65rem] tracking-[0.4em] uppercase text-[var(--color-gold)] font-medium text-center">
            EXPERIENCIAS CONFIDENCIALES
          </span>
          <div className="w-16 h-px bg-[var(--color-gold)] opacity-30 mt-6" />
        </motion.div>

        <div className="w-full flex justify-center">
          <ReviewGrid reviews={reviews} />
        </div>
      </div>
    </section>
  );
}
