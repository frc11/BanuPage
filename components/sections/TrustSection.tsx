"use client";

import React from 'react';
import { TrustItemData } from '@/types/sanity';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';
import { motion } from 'framer-motion';
import {
  Truck, ShieldCheck, MessageCircle, Lock,
  CheckCircle, CreditCard, Sparkles, Package,
} from 'lucide-react';
import { staggerContainer, fadeUp } from '@/lib/animation-variants';
import RevealText from '@/src/components/ui/reveal-text';

const IconMap: Record<string, React.ElementType> = {
  Truck, ShieldCheck, MessageCircle, CreditCard, Sparkles, Package, Lock,
};

const FALLBACK_TRUST: TrustItemData[] = [
  { _id: '1', title: 'Envíos Nacionales', description: 'Logística discreta y asegurada a todo el territorio con tracking prioritario.', iconName: 'Truck' },
  { _id: '2', title: 'Autenticidad 100%', description: 'Distribuidores oficiales. Cada fragancia incluye su sello inalterable de fábrica.', iconName: 'ShieldCheck' },
  { _id: '3', title: 'Asesoría Privada', description: 'Atención personalizada 1 a 1 para guiar tu viaje olfativo desde el primer contacto.', iconName: 'MessageCircle' },
  { _id: '4', title: 'Seguridad Total', description: 'Transacciones y datos estrictamente resguardados bajo grado militar.', iconName: 'Lock' },
];

interface TrustSectionProps {
  trustItems?: TrustItemData[] | null;
}

export function TrustSection({ trustItems }: TrustSectionProps) {
  const trust = trustItems && trustItems.length > 0 ? trustItems : FALLBACK_TRUST;

  return (
    <section
      className="relative w-full bg-[var(--color-cream)] overflow-hidden"
      style={{ paddingTop: 'var(--spacing-section-top)', paddingBottom: 'var(--spacing-section-bottom)', paddingLeft: 'var(--spacing-section-x)', paddingRight: 'var(--spacing-section-x)' }}
    >
      <ArabicPatternOverlay opacity={0.04} color="dark" />

      <div className="w-full flex flex-col items-center relative z-10">

        {/* Ornamento superior */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '1.25rem', marginBottom: '2.5rem',
        }}>
          <div style={{ width: '60px', height: '1px', background: 'var(--color-gold)', opacity: 0.3 }} />
          <svg width="10" height="10" viewBox="0 0 8 8" aria-hidden="true">
            <rect x="1" y="1" width="6" height="6" transform="rotate(45 4 4)"
              fill="none" stroke="#8B7355" strokeWidth="1" opacity="0.5" />
          </svg>
          <div style={{ width: '60px', height: '1px', background: 'var(--color-gold)', opacity: 0.3 }} />
        </div>

        {/* Título */}
        <RevealText
          text="¿Por qué elegir Banū?"
          as="h2"
          className="w-full"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 300,
            color: 'var(--color-dark)',
            letterSpacing: '0.02em',
            textAlign: 'center',
            justifyContent: 'center',
            width: '100%',
            marginBottom: '1rem',
          }}
        />

        {/* Subtítulo */}
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 'clamp(0.78rem, 1.2vw, 0.9rem)',
          color: 'var(--color-dark)',
          opacity: 0.45,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: 'clamp(4rem, 7vw, 6rem)',
        }}>
          Alta perfumería árabe y nicho en Argentina
        </p>

        {/* Grid de características */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
          }}
        >
          {trust.map((item) => {
            const IconComponent = IconMap[item.iconName] || CheckCircle;
            return (
              <motion.div
                key={item._id}
                variants={fadeUp}
                className="group"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: 'clamp(2rem, 3vw, 3rem) clamp(1rem, 2vw, 2rem)',
                  border: '1px solid rgba(44,24,16,0.12)',
                  transition: 'border-color 400ms ease, background 400ms ease, box-shadow 400ms ease',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{
                  y: -6,
                  borderColor: 'var(--color-gold)',
                  background: 'rgba(139,115,85,0.03)',
                  boxShadow: '0 22px 44px -12px rgba(44,24,16,0.12), 0 0 30px 0 rgba(139,115,85,0.1), inset 0 1px 0 rgba(139,115,85,0.25)',
                }}
              >
                {/* Glow corner top-left */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(139,115,85,0.6), transparent)',
                  opacity: 0,
                  transition: 'opacity 400ms ease',
                }} className="group-hover:opacity-100" />

                {/* Ícono */}
                <motion.div
                  style={{ position: 'relative', marginBottom: '1.75rem' }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    style={{
                      position: 'absolute', inset: '-12px',
                      background: 'radial-gradient(circle, rgba(139,115,85,0.35) 0%, transparent 70%)',
                      opacity: 0,
                      transition: 'opacity 400ms ease',
                      borderRadius: '50%',
                    }}
                    className="group-hover:opacity-100"
                  />
                  <IconComponent
                    style={{ width: '44px', height: '44px', color: 'var(--color-gold)', position: 'relative', zIndex: 1, transition: 'filter 400ms ease' }}
                    strokeWidth={1.2}
                    className="group-hover:drop-shadow-[0_0_12px_rgba(139,115,85,0.8)]"
                  />
                </motion.div>

                {/* Línea dorada decorativa */}
                <div style={{
                  width: '28px', height: '1px',
                  background: 'var(--color-gold)',
                  opacity: 0.4,
                  marginBottom: '1.25rem',
                  transition: 'width 400ms ease, opacity 400ms ease',
                }} className="group-hover:w-[48px] group-hover:opacity-70" />

                {/* Título */}
                <h3 style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-dark)',
                  marginBottom: '0.875rem',
                  transition: 'color 300ms ease',
                }} className="group-hover:text-[var(--color-gold)]">
                  {item.title}
                </h3>

                {/* Descripción */}
                <p style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 'clamp(0.82rem, 1.1vw, 0.92rem)',
                  color: 'var(--color-dark)',
                  opacity: 0.5,
                  lineHeight: 1.75,
                  maxWidth: '220px',
                  transition: 'opacity 300ms ease',
                }} className="group-hover:opacity-80">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
