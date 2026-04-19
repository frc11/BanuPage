"use client";

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelectionCount } from '@/src/store/selection-store';

export interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const linkVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: 0.1 + i * 0.07, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const bottomVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.45 } },
};

export function NavigationDrawer({ isOpen, onClose }: NavigationDrawerProps) {
  const count = useSelectionCount();
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      document.documentElement.style.setProperty('--nav-drawer-width', isMobile ? '100vw' : '480px');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo({ top: scrollYRef.current, behavior: 'instant' as ScrollBehavior });
    }
    return () => {
      // Solo limpiar estilos en unmount, sin scrollTo para evitar doble restauración
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const primaryLinks = [
    { label: 'Catálogo', href: '/catalogo', sub: 'Explorá todas las fragancias' },
    { label: 'Marcas', href: '/marcas', sub: 'Casas exclusivas del Medio Oriente' },
    { label: 'Nosotros', href: '/nosotros', sub: 'Nuestra historia y valores' },
    { label: 'Mi Selección', href: '/seleccion', sub: 'Tu lista de favoritos', badge: count > 0 ? count : undefined },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 cursor-pointer"
            style={{ 
              background: 'rgba(44, 24, 16, 0.65)', 
              backdropFilter: 'blur(4px)',
              zIndex: 'var(--z-drawer-overlay)' 
            }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.3, right: 0 }}
            onDragEnd={(_, info) => { if (info.offset.x < -80) onClose(); }}
            className="fixed top-0 left-0 bottom-0 w-full max-w-[480px] h-full shadow-2xl flex flex-col overflow-y-auto"
            style={{
              width: 'var(--nav-drawer-width, 100vw)',
              zIndex: 'var(--z-drawer)',
              background: 'var(--color-dark)',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Subtle pattern overlay */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(139,115,85,0.08) 0%, transparent 60%), radial-gradient(circle at 10% 90%, rgba(139,115,85,0.06) 0%, transparent 50%)',
            }} />

            {/* Close button */}
            <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10 }}>
              <button
                onClick={onClose}
                aria-label="Cerrar navegación"
                style={{
                  width: '44px', height: '44px',
                  border: '1px solid rgba(234,230,223,0.15)',
                  color: 'var(--color-cream)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: 'border-color 200ms ease, opacity 200ms ease',
                  opacity: 0.7,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7'; }}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* ── TOP: Logo ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              style={{
                padding: 'clamp(1.25rem, 5vw, 2.5rem) clamp(1rem, 5vw, 2.5rem) 0',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Link href="/" onClick={onClose} aria-label="Inicio" style={{ display: 'inline-block' }}>
                <motion.div
                  whileHover={{ filter: 'drop-shadow(0 0 18px rgba(139,115,85,0.9)) drop-shadow(0 0 36px rgba(139,115,85,0.45))' }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/logoC.png"
                    alt="BANŪ"
                    width={300}
                    height={80}
                    style={{ width: 'auto', height: 'clamp(62px, 18vw, 100px)', opacity: 0.92 }}
                    priority
                    unoptimized
                  />
                </motion.div>
              </Link>

              {/* Thin gold divider */}
              <div style={{
                marginTop: '2rem',
                height: '1px',
                width: '100%',
                background: 'linear-gradient(90deg, rgba(139,115,85,0) 0%, rgba(139,115,85,0.6) 50%, rgba(139,115,85,0) 100%)',
              }} />
            </motion.div>

            {/* ── CENTER: Nav links ── */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 clamp(1rem, 5vw, 2.5rem)',
            }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {primaryLinks.map((item, i) => (
                  <motion.li
                    key={item.label}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ marginBottom: i < primaryLinks.length - 1 ? '0.25rem' : 0 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      style={{ display: 'block', padding: '0.7rem 0', textDecoration: 'none', borderBottom: '1px solid rgba(234,230,223,0.06)' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.2rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-cormorant)',
                          fontSize: 'clamp(1.7rem, 7vw, 2.75rem)',
                          fontWeight: 300,
                          color: 'var(--color-cream)',
                          lineHeight: 1.1,
                          letterSpacing: '0.01em',
                          transition: 'color 200ms ease',
                        }}
                          onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.color = 'var(--color-gold)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = 'var(--color-cream)'; }}
                        >
                          {item.label}
                        </span>
                        {item.badge !== undefined && (
                          <motion.span
                            key={item.badge}
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{
                              fontFamily: 'var(--font-dm-sans)',
                              fontSize: '0.6rem',
                              background: 'var(--color-gold)',
                              color: 'var(--color-cream)',
                              padding: '0.2rem 0.5rem',
                              fontWeight: 600,
                              letterSpacing: '0.1em',
                            }}
                          >
                            {item.badge}
                          </motion.span>
                        )}
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: 'clamp(0.56rem, 1.9vw, 0.62rem)',
                        letterSpacing: '0.08em',
                        color: 'var(--color-cream)',
                        opacity: 0.35,
                      }}>
                        {item.sub}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* ── BOTTOM: Info + socials ── */}
            <motion.div
              variants={bottomVariants}
              initial="hidden"
              animate="visible"
              style={{
                padding: '1.25rem clamp(1rem, 5vw, 2.5rem) calc(1.75rem + env(safe-area-inset-bottom))',
                borderTop: '1px solid rgba(234,230,223,0.08)',
                position: 'relative',
              }}
            >
              {/* Frase */}
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '0.85rem',
                fontStyle: 'italic',
                color: 'var(--color-gold)',
                opacity: 0.7,
                marginBottom: '1.25rem',
                letterSpacing: '0.02em',
              }}>
                &ldquo;El perfume es el arte que hace memoria de las cosas invisibles.&rdquo;
              </p>

              {/* Ubicación */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  style={{ color: 'var(--color-gold)', opacity: 0.6, flexShrink: 0 }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                <span style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 'clamp(0.54rem, 1.8vw, 0.62rem)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-cream)',
                  opacity: 0.45,
                }}>
                  Yerba Buena, Tucumán
                </span>
              </div>

              {/* Socials + WhatsApp */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', columnGap: '0.85rem', rowGap: '0.65rem' }}>
                {/* WhatsApp */}
                <a
                  href="https://wa.me/5493814665503"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.45rem',
                    color: 'var(--color-cream)', opacity: 0.55,
                    textDecoration: 'none', transition: 'opacity 200ms ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.55'; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(0.52rem, 1.7vw, 0.6rem)', letterSpacing: '0.11em', textTransform: 'uppercase' }}>
                    WhatsApp
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/banuscents"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.45rem',
                    color: 'var(--color-cream)', opacity: 0.55,
                    textDecoration: 'none', transition: 'opacity 200ms ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.55'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(0.52rem, 1.7vw, 0.6rem)', letterSpacing: '0.11em', textTransform: 'uppercase' }}>
                    Instagram
                  </span>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com/@banuscents"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.45rem',
                    color: 'var(--color-cream)', opacity: 0.55,
                    textDecoration: 'none', transition: 'opacity 200ms ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.55'; }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.69a4.85 4.85 0 0 1-1.01-.0z"/>
                  </svg>
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(0.52rem, 1.7vw, 0.6rem)', letterSpacing: '0.11em', textTransform: 'uppercase' }}>
                    TikTok
                  </span>
                </a>
              </div>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

