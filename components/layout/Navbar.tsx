"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';
import { BanuLogo } from '@/components/ui/BanuLogo';
import { NavigationDrawer } from '@/components/layout/NavigationDrawer';
import { useSelectionStore, useSelectionCount } from '@/src/store/selection-store';
import { useHydrated } from '@/src/hooks/use-hydrated';
import { cn } from '@/lib/utils';
import SearchModal from '@/src/components/ui/search-modal';

export function Navbar() {
  const [scrollState, setScrollState] = useState<0 | 1 | 2>(0);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { scrollY } = useScroll();

  // Selectores granulares — solo re-renderiza cuando su slice cambia
  const count = useSelectionCount();
  const openDrawer = useSelectionStore((s) => s.openDrawer);
  const mounted = useHydrated();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80) setScrollState(2);
    else if (latest > 20) setScrollState(1);
    else setScrollState(0);
  });

  return (
    <header className="fixed top-0 left-0 right-0 w-full flex flex-col" style={{ zIndex: 'var(--z-navbar)' }}>
      {/* Topbar utilitaria */}
      {/* Topbar utilitaria */}
      <div style={{
        background: 'var(--color-dark)',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',  /* CENTRADO — no a la izquierda */
        position: 'relative',
        padding: '0 1.5rem'
      }}>
        <a
          href="https://wa.me/5493814665503"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            textDecoration: 'none'
          }}
        >
          {/* Prefijo dorado */}
          <span style={{
            color: 'var(--color-gold)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em'
          }}>+</span>

          {/* Texto */}
          <span style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-cream)',
            opacity: 0.75,
            transition: 'opacity 200ms ease'
          }}>
            Contactanos por WhatsApp
          </span>

          {/* Separador decorativo */}
          <span style={{
            color: 'var(--color-gold)',
            opacity: 0.3,
            fontSize: '0.5rem',
            margin: '0 0.25rem'
          }}>◆</span>

          {/* Horario o tagline */}
          <span style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: 'var(--color-cream)',
            opacity: 0.4
          }}>
            Respuesta en menos de 24hs
          </span>
        </a>
      </div>

      {/* Navbar Principal */}
      <motion.nav
        className={cn(
          "w-full h-[85px] md:h-[130px] flex items-center justify-between px-6 lg:px-12 transition-all duration-400 ease-in-out",
          scrollState === 2
            ? "bg-[var(--color-dark)]"
            : scrollState === 1
            ? "bg-black/20 backdrop-blur-[8px]"
            : "bg-transparent"
        )}
      >
        {/* Placeholder izquierdo para centering */}
        <div className="flex-1 flex justify-start" />

        {/* Logo */}
        <div className="flex-none flex items-center justify-center shrink-0">
          <BanuLogo theme="light" />
        </div>

        {/* Acciones Derechas */}
        <div className="flex-1 flex justify-end items-center gap-[1.5rem] text-[var(--color-text-light)]">
          <button
            aria-label="Buscar"
            onClick={() => setSearchOpen(true)}
            className="opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>

          {/* Mi Selección — abre el MiniSelectionDrawer */}
          <button
            id="navbar-selection-btn"
            aria-label={mounted ? `Mi Selección — ${count} ${count === 1 ? 'item' : 'items'}` : 'Mi Selección'}
            onClick={openDrawer}
            className="relative opacity-80 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {/* Badge: sólo después de hidratación para evitar mismatch con localStorage */}
            {mounted && (
              <AnimatePresence>
                {count > 0 && (
                  <motion.div
                    key={count}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      position: 'absolute',
                      top: '-7px',
                      right: '-7px',
                      width: '16px',
                      height: '16px',
                      background: 'var(--color-gold)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.5rem',
                      fontWeight: 600,
                      color: 'var(--color-cream)',
                      lineHeight: 1
                    }}>
                      {count > 9 ? '9+' : count}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </button>

          <a
            href="https://wa.me/5493814665503"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            </svg>
          </a>

          <button
            onClick={() => setIsNavDrawerOpen(true)}
            className="nav-link opacity-80 hover:opacity-100 transition-opacity duration-200 flex items-center gap-2"
          >
            <span className="hidden md:inline-block">MENÚ</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="4.5" y1="12" x2="21" y2="12" />
              <line x1="6" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Navigation Drawer lateral izquierdo */}
      <NavigationDrawer isOpen={isNavDrawerOpen} onClose={() => setIsNavDrawerOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
