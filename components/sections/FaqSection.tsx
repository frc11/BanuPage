"use client";

import React from 'react';
import { FaqItemData } from '@/types/sanity';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { fadeUp } from '@/lib/animation-variants';
import RevealText from '@/src/components/ui/reveal-text';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';

const FALLBACK_FAQ: FaqItemData[] = [
  { _id: 'f1', question: '¿Las fragancias son originales?', answer: 'Absolutamente. Banū Scents opera como eslabón oficial de distribución de las casas nicho y árabes más prestigiosas. Cada pieza conserva su celofán original, códigos de lote verificables internacionalmente y sellos holográficos de importación.' },
  { _id: 'f2', question: '¿Cómo funciona el envío?', answer: 'Procesamos los pedidos en un máximo de 24 horas hábiles. Utilizamos paquetería de primer nivel con seguro de valor declarado. Todos los envíos cuentan con empaques estructurales de triple capa para proteger la integridad de los envases.' },
  { _id: 'f3', question: '¿Ofrecen asesoramiento olfativo?', answer: 'Sí. Comprendemos que adquirir alta perfumería a ciegas es un desafío. A través de nuestro canal privado de WhatsApp, nuestros curadores pueden guiarte basándose en las notas aromáticas que más te atraen.' },
];

interface FaqSectionProps {
  faqItems?: FaqItemData[] | null;
  theme?: 'dark' | 'light';
}

export function FaqSection({ faqItems, theme = 'dark' }: FaqSectionProps) {
  const faq = faqItems && faqItems.length > 0 ? faqItems : FALLBACK_FAQ;
  const { ref, controls } = useScrollAnimation();
  const isLight = theme === 'light';
  const bg = isLight ? 'var(--color-cream)' : 'var(--color-dark)';
  const titleColor = isLight ? 'var(--color-dark)' : 'var(--color-cream)';

  return (
    <section
      id="faq"
      className="relative w-full"
      style={{
        paddingTop: 'var(--spacing-section-top)',
        paddingBottom: 'var(--spacing-section-bottom)',
        paddingLeft: 'var(--spacing-section-x)',
        paddingRight: 'var(--spacing-section-x)',
        background: bg,
        scrollMarginTop: 'calc(var(--navbar-height) + 1rem)',
      }}
    >
      <ArabicPatternOverlay opacity={0.04} color={isLight ? 'dark' : 'light'} />
      {/* Línea decorativa superior */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        marginBottom: '3rem',
      }}>
        <div style={{ width: '60px', height: '1px', background: 'var(--color-gold)', opacity: 0.25 }} />
        <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
          <rect x="1" y="1" width="6" height="6" transform="rotate(45 4 4)"
            fill="none" stroke="#8B7355" strokeWidth="1" opacity="0.45" />
        </svg>
        <div style={{ width: '60px', height: '1px', background: 'var(--color-gold)', opacity: 0.25 }} />
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeUp}
        viewport={{ once: true }}
        style={{
          width: '100%',
          maxWidth: '860px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Eyebrow */}
        <span style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.62rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          opacity: 0.7,
          marginBottom: '1.25rem',
          display: 'block',
        }}>
          Todo lo que necesitás saber
        </span>

        {/* Título */}
        <RevealText
          as="h2"
          text="Preguntas Frecuentes"
          className="w-full"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
            fontWeight: 300,
            color: titleColor,
            letterSpacing: '0.02em',
            textAlign: 'center',
            justifyContent: 'center',
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
          }}
          delay={0.1}
        />

        {/* Acordeón */}
        <div style={{ width: '100%' }}>
          <FaqAccordion faqs={faq} theme={isLight ? 'light' : 'dark'} />
        </div>
      </motion.div>
    </section>
  );
}
