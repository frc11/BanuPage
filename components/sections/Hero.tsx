'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';
import RevealText from '@/src/components/ui/reveal-text';

export interface HeroProps {
  title?: string;
  subtitle?: string;
  videoUrls?: string[];
  ctaText?: string;
  ctaLink?: string;
  showContent?: boolean;
}

export function Hero({
  title,
  subtitle,
  videoUrls = [],
  ctaText = 'Ver Catálogo',
  ctaLink = '/catalogo',
  showContent = true,
}: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeVideos = videoUrls.filter((url) => Boolean(url));

  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.muted = true;
      currentVideo.play().catch(() => {
        // Ignore autoplay errors from browser policies.
      });
    }
  }, [currentIndex, activeVideos]);

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-[var(--color-dark)] py-[var(--spacing-section-y)]"
      style={{ minHeight: 'var(--app-vh)', height: 'var(--app-vh)' }}
    >
      <ArabicPatternOverlay opacity={0.07} color="light" className="z-0" />

      {activeVideos.length > 0 && (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          {activeVideos.map((url, index) => (
            <video
              key={url}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={url}
              muted
              playsInline
              loop={activeVideos.length === 1}
              onEnded={() => {
                if (activeVideos.length > 1 && index === currentIndex) {
                  setCurrentIndex((prev) => (prev + 1) % activeVideos.length);
                }
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out scale-[1.1] ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 60%, rgba(44,24,16,0.05) 0%, rgba(44,24,16,0.45) 100%), linear-gradient(to bottom, transparent 50%, rgba(44,24,16,0.85) 100%)',
        }}
      />

      {showContent && (
        <div className="relative z-20 flex h-full w-full flex-col px-[var(--spacing-section-x)] py-[var(--spacing-section-y)]">
          <div className="mx-auto mt-auto flex w-full max-w-4xl flex-col items-center pb-[var(--spacing-xl)] text-center">
            {title && (
              <RevealText
                as="h1"
                text={title}
                className="font-serif text-[var(--color-cream)] font-light text-[clamp(3.5rem,10vw,8rem)] tracking-[0.1em] leading-[0.9] mb-8 whitespace-pre-line"
                delay={0.3}
              />
            )}

            {subtitle && (
              <RevealText
                as="p"
                text={subtitle}
                className="font-sans text-[var(--color-cream)] text-[clamp(0.75rem,1.5vw,0.9rem)] tracking-[0.35em] uppercase opacity-70 mb-12 max-w-[80%] mx-auto"
                delay={0.65}
              />
            )}
          </div>
        </div>
      )}

      {ctaText && ctaLink && (
        <motion.div
          className="absolute left-1/2 z-20 -translate-x-1/2"
          style={{ bottom: 'clamp(6rem, 12vh, 8.5rem)' }}
          initial={{ opacity: 0, y: 18, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
          transition={{
            delay: showContent ? 1.15 : 0.8,
            duration: 0.9,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <Link
            href={ctaLink}
            className="cta-catalog cta-catalog--over-media"
          >
            <span className="cta-catalog__label">
              {ctaText}
            </span>
          </Link>
        </motion.div>
      )}

      {showContent && (
        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-4 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[var(--color-cream-dark)]">
            Scroll
          </span>
          <div className="w-[1px] h-14 bg-[var(--color-cream-dark)]/20 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-[var(--color-gold)] origin-top"
              animate={{ scaleY: [0, 1, 0], translateY: ['-100%', '0%', '100%'] }}
              transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
