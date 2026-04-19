'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { fadeUp } from '@/lib/animation-variants';
import RevealText from '@/src/components/ui/reveal-text';
import { Marquee } from '@/components/ui/Marquee';
import { ReviewCard } from '@/components/ui/ReviewCard';
import type { ReviewItem } from '@/components/ui/ReviewGrid';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';

export interface ReviewsSectionProps {
  reviews?: ReviewItem[] | null;
}

const MIN_REVIEWS_FOR_CAROUSEL = 5;

function getStaticGridClass(total: number): string {
  if (total <= 1) return 'grid-cols-1 max-w-[620px]';
  if (total === 2) return 'grid-cols-1 md:grid-cols-2 max-w-[1080px]';
  if (total === 3) return 'grid-cols-1 md:grid-cols-3 max-w-[1400px]';
  return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4 max-w-[1680px]';
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const { ref, controls } = useScrollAnimation();
  const reviewsPaddingTop = 'var(--spacing-section-top)';
  const reviewsPaddingBottom = 'var(--spacing-section-bottom)';

  if (!reviews || reviews.length === 0) {
    return null;
  }

  const useCarousel = reviews.length >= MIN_REVIEWS_FOR_CAROUSEL;

  return (
    <section
      className="w-full bg-[var(--color-dark)] overflow-hidden flex justify-center px-[var(--spacing-section-x)] relative"
      style={{ paddingTop: reviewsPaddingTop, paddingBottom: reviewsPaddingBottom }}
    >
      <ArabicPatternOverlay opacity={0.04} color="light" />
      <div className="w-full max-w-[1900px] flex flex-col items-center">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          viewport={{ once: true }}
          variants={fadeUp}
          className="w-full flex flex-col items-center text-center"
          style={{ marginBottom: '5rem' }}
        >
          <RevealText
            as="h2"
            text={'Voces de la B\u00F3veda'}
            className="text-[var(--color-cream)] font-serif text-[clamp(2.8rem,6.2vw,4.3rem)] !mb-6 w-full text-center"
            style={{ justifyContent: 'center', width: '100%' }}
            delay={0.2}
          />
          <span className="font-sans text-[0.68rem] tracking-[0.15em] uppercase text-[var(--color-gold)] font-medium text-center mb-[var(--spacing-lg)]">
            EXPERIENCIAS CONFIDENCIALES
          </span>
          <div className="w-20 h-px bg-[var(--color-gold)] opacity-30" />
        </motion.div>

        {useCarousel ? (
          <div className="w-full">
            <Marquee speed={40} direction="left" align="start" className="hide-scrollbar [--marquee-gap:1.5rem] [--marquee-padding:0px]">
              {reviews.map((review) => (
                <div key={review._id} style={{ width: '420px', height: '420px', flexShrink: 0 }}>
                  <ReviewCard author={review.author} rating={review.rating} text={review.text} />
                </div>
              ))}
            </Marquee>
          </div>
        ) : (
          <div className={`w-full mx-auto grid gap-6 justify-items-center ${getStaticGridClass(reviews.length)}`}>
            {reviews.map((review) => (
              <div key={review._id} style={{ width: '100%', maxWidth: '500px', height: '420px' }}>
                <ReviewCard author={review.author} rating={review.rating} text={review.text} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
