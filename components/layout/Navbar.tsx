"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';
import { BanuLogo } from '@/components/ui/BanuLogo';
import { NavigationDrawer } from '@/components/layout/NavigationDrawer';
import { useSelectionStore, useSelectionCount } from '@/src/store/selection-store';
import { useHydrated } from '@/src/hooks/use-hydrated';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrollState, setScrollState] = useState<0 | 1 | 2>(0);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);

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
    <header className="fixed top-0 left-0 right-0 w-full z-[60] flex flex-col">
      {/* Topbar utilitaria */}
      <div className="bg-[#1A0E08] h-[36px] flex items-center px-6 lg:px-12 w-full justify-start">
        <a
          href="https://wa.me/5493814665503"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link opacity-80 hover:opacity-100 transition-opacity duration-200"
        >
          <span className="text-[var(--color-gold)] mr-1">+</span> CONTACTANOS POR WHATSAPP
        </a>
      </div>

      {/* Navbar Principal */}
      <motion.nav
        className={cn(
          "w-full h-[50px] flex items-center justify-between px-6 lg:px-12 transition-all duration-400 ease-in-out",
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
                  <motion.span
                    key={count}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2, type: "spring" as const, stiffness: 300 }}
                    className="absolute -top-[6px] -right-[6px] w-4 h-4 rounded-full flex items-center justify-center bg-[var(--color-gold)] text-[var(--color-text-light)] font-sans font-semibold leading-none"
                    style={{ fontSize: '0.6rem' }}
                  >
                    {count > 9 ? '9+' : count}
                  </motion.span>
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
    </header>
  );
}
