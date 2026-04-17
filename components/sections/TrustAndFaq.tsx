'use client';

import React from 'react';
import { TrustItemData, FaqItemData } from '@/types/sanity';
import { TrustGrid } from '@/components/ui/TrustGrid';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { fadeUp } from '@/lib/animation-variants';
import RevealText from '@/src/components/ui/reveal-text';

interface TrustAndFaqProps {
  trustItems?: TrustItemData[] | null;
  faqItems?: FaqItemData[] | null;
}

export function TrustAndFaq({ trustItems, faqItems }: TrustAndFaqProps) {
  const trust = trustItems ?? [];
  const faq = faqItems ?? [];
  const { ref, controls } = useScrollAnimation();

  if (trust.length === 0 && faq.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full bg-[var(--color-dark)] py-[clamp(5rem,10vw,8rem)] overflow-hidden">
      <ArabicPatternOverlay opacity={0.04} color="light" />
      <div className="w-full flex flex-col items-center relative z-10 px-6 lg:px-8">
        {trust.length > 0 && (
          <div className="w-full max-w-[1000px] flex flex-col items-center">
            <div
              style={{
                textAlign: 'center',
                paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
                position: 'relative',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  marginBottom: '2rem',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '1px',
                    background: 'var(--color-gold)',
                    opacity: 0.3,
                  }}
                />
                <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
                  <rect
                    x="1"
                    y="1"
                    width="6"
                    height="6"
                    transform="rotate(45 4 4)"
                    fill="none"
                    stroke="#8B7355"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                </svg>
                <div
                  style={{
                    width: '40px',
                    height: '1px',
                    background: 'var(--color-gold)',
                    opacity: 0.3,
                  }}
                />
              </div>

              <RevealText
                text="Por qué elegir Banū"
                as="h2"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  fontWeight: 300,
                  color: 'var(--color-cream)',
                  letterSpacing: '0.03em',
                  textAlign: 'center',
                  width: '100%',
                }}
              />
            </div>

            <TrustGrid items={trust} />
          </div>
        )}

        {trust.length > 0 && faq.length > 0 && (
          <div className="w-32 h-px bg-[var(--color-gold)] opacity-30 mt-24 mb-20" />
        )}

        {faq.length > 0 && (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeUp}
            viewport={{ once: true }}
            className="w-full max-w-[800px] flex flex-col items-center"
          >
            <RevealText
              as="h2"
              text="Preguntas Frecuentes"
              className="text-[var(--color-text-light)] font-serif text-[3.5rem] !mb-16 text-center"
              delay={0.2}
            />
            <FaqAccordion faqs={faq} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
