"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface HeroProps {
  title?: string;
  subtitle?: string;
  videoUrls?: string[];
  ctaText?: string;
  ctaLink?: string;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const copyVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const, delay },
  }),
};

const videoVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 1.5, ease: 'easeInOut' } },
  exit: { opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } },
};

// ─── Sub-component: HeroVideoBackground ──────────────────────────────────────

interface HeroVideoBackgroundProps {
  videoUrls: string[];
}

function HeroVideoBackground({ videoUrls }: HeroVideoBackgroundProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload the next video URL
  useEffect(() => {
    if (videoUrls.length < 2) return;
    const nextUrl = videoUrls[(currentIndex + 1) % videoUrls.length];
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = nextUrl;
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, [currentIndex, videoUrls]);

  return (
    <div className="absolute inset-0 bg-[var(--color-dark)] -z-10">
      {videoUrls && videoUrls.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.video
            key={videoUrls[currentIndex]} // CRÍTICO para que React cambie el source
            src={videoUrls[currentIndex]}
            autoPlay
            loop={videoUrls.length === 1} // Solo loopear si hay 1 solo video
            muted // CRÍTICO para Autoplay en todos los navegadores
            playsInline // CRÍTICO para iOS
            onEnded={() => {
              if (videoUrls.length > 1) {
                setCurrentIndex((prev) => (prev + 1) % videoUrls.length);
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </AnimatePresence>
      ) : (
        // Fallback actual (fondo oscuro con patrón)
        <div className="absolute inset-0 bg-[var(--color-dark)] flex items-center justify-center z-0">
           <ArabicPatternOverlay opacity={0.07} color="light" />
        </div>
      )}
    </div>
  );
}

// ─── Main Hero Component ──────────────────────────────────────────────────────

export function Hero({
  title = "BANŪ",
  subtitle = "La dualidad de la sombra y la luz.",
  videoUrls = [],
  ctaText = "DESCUBRIR",
  ctaLink = "#explore",
}: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[var(--color-dark)]">
      
      {/* CAPA 1: FONDO / FALLBACK */}
      <ArabicPatternOverlay opacity={0.07} color="light" className="z-0" />

      {/* CAPA 2: VIDEOS (CROSS-FADE) */}
      {videoUrls && videoUrls.length > 0 && (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          {videoUrls.map((url, index) => (
            <video
              key={url}
              src={url}
              autoPlay
              muted
              playsInline
              loop={videoUrls.length === 1}
              onEnded={() => {
                if (videoUrls.length > 1 && index === currentIndex) {
                  setCurrentIndex((prev) => (prev + 1) % videoUrls.length);
                }
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      )}

      {/* CAPA 3: CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 60%, rgba(44,24,16,0.05) 0%, rgba(44,24,16,0.45) 100%), linear-gradient(to bottom, transparent 50%, rgba(44,24,16,0.85) 100%)',
        }}
      />

      {/* CAPA 4: CONTENT */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-4xl px-6 text-center">
        <motion.h1
          custom={0.3}
          variants={copyVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-[var(--color-cream)] font-light text-[clamp(3.5rem,10vw,8rem)] tracking-[0.1em] leading-[0.9] mb-8"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            custom={0.65}
            variants={copyVariants}
            initial="hidden"
            animate="visible"
            className="font-sans text-[var(--color-cream)] text-[clamp(0.75rem,1.5vw,0.9rem)] tracking-[0.35em] uppercase opacity-70 mb-12 max-w-[80%] mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          custom={1.0}
          variants={copyVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center"
        >
          <Link
            href={ctaLink}
            className="group relative inline-flex items-center justify-center border border-[var(--color-cream)]/30 text-[var(--color-cream)] bg-transparent px-14 py-4 font-sans text-[0.7rem] tracking-[0.3em] uppercase transition-all duration-500 hover:border-[var(--color-cream)]"
          >
            <div className="absolute inset-0 bg-[var(--color-cream)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <span className="relative z-10 group-hover:text-[var(--color-dark)] transition-colors duration-300">
              {ctaText}
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
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
            animate={{ scaleY: [0, 1, 0], translateY: ["-100%", "0%", "100%"] }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
