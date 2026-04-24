'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';
import { BanuLogo } from '@/components/ui/BanuLogo';
import { NavigationDrawer } from '@/components/layout/NavigationDrawer';
import { useSelectionStore, useSelectionCount } from '@/src/store/selection-store';
import { useHydrated } from '@/src/hooks/use-hydrated';
import { cn } from '@/lib/utils';
import SearchModal from '@/src/components/ui/search-modal';
import { usePathname } from 'next/navigation';
import { useUiOverlayStore } from '@/src/store/ui-overlay-store';

export function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [scrollState, setScrollState] = useState<0 | 1 | 2>(0);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navScheme, setNavScheme] = useState<'light' | 'dark'>('dark');

  const { scrollY } = useScroll();

  const count = useSelectionCount();
  const openDrawer = useSelectionStore((s) => s.openDrawer);
  const mounted = useHydrated();
  const pathname = usePathname();
  const setNavDrawerOpen = useUiOverlayStore((s) => s.setNavDrawerOpen);
  const setSearchModalOpen = useUiOverlayStore((s) => s.setSearchOpen);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 80) setScrollState(2);
    else if (latest > 20) setScrollState(1);
    else setScrollState(0);
  });

  // Detecta secciones con data-navtheme para alternar íconos en estado transparente.
  // Se re-ejecuta en cada cambio de ruta para no heredar el scheme de la página anterior.
  React.useEffect(() => {
    // Reset siempre al oscuro (default seguro)
    setNavScheme('dark');

    const elements = document.querySelectorAll('[data-navtheme]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const theme = (visible[0].target as HTMLElement).dataset.navtheme as 'light' | 'dark';
          setNavScheme(theme || 'dark');
        }
      },
      { threshold: 0, rootMargin: '0px 0px -60% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  React.useEffect(() => {
    setNavDrawerOpen(isNavDrawerOpen);
  }, [isNavDrawerOpen, setNavDrawerOpen]);

  React.useEffect(() => {
    setSearchModalOpen(searchOpen);
  }, [searchOpen, setSearchModalOpen]);

  React.useEffect(() => {
    return () => {
      setNavDrawerOpen(false);
      setSearchModalOpen(false);
    };
  }, [setNavDrawerOpen, setSearchModalOpen]);

  React.useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const root = document.documentElement;
    const updateNavbarHeight = () => {
      root.style.setProperty('--navbar-height', `${headerEl.offsetHeight}px`);
    };

    updateNavbarHeight();

    const resizeObserver = new ResizeObserver(updateNavbarHeight);
    resizeObserver.observe(headerEl);
    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  // Cuando scrollState > 0 el navbar tiene fondo oscuro — siempre usar íconos claros
  const isTransparent = scrollState === 0;
  const useDarkIcons = isTransparent && navScheme === 'light';
  const iconColorClass = useDarkIcons ? 'text-[var(--color-dark)]' : 'text-[var(--color-text-light)]';

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 w-full flex flex-col" style={{ zIndex: 'var(--z-navbar)' }}>
      <div
        style={{
          background: 'var(--color-dark)',
          minHeight: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '0.6rem var(--spacing-md)',
        }}
      >
        <a
          href="https://wa.me/5493814665503"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)',
            textDecoration: 'none',
            width: '100%',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              color: 'var(--color-gold)',
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
            }}
          >
            +
          </span>

          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.62rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-cream)',
              opacity: 0.75,
              transition: 'opacity 200ms ease',
            }}
          >
            Contactanos por WhatsApp
          </span>

          <span
            style={{
              color: 'var(--color-gold)',
              opacity: 0.3,
              fontSize: '0.5rem',
              margin: '0 var(--spacing-sm)',
            }}
          >
            {'\u25C6'}
          </span>

          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
              color: 'var(--color-cream)',
              opacity: 0.4,
            }}
          >
            RESPUESTA INMEDIATA
          </span>
        </a>
      </div>

      <motion.nav
        className={cn(
          'navbar-main w-full min-h-[72px] h-[85px] md:h-[130px] mx-auto px-[var(--spacing-section-x)] transition-all duration-400 ease-in-out',
          'flex items-center justify-between',
          scrollState === 2 ? 'bg-[var(--color-dark)]' : scrollState === 1 ? 'bg-black/20 backdrop-blur-[8px]' : 'bg-transparent',
        )}
      >
        <div className="navbar-left-spacer flex-1 flex justify-start" style={{ paddingLeft: 'clamp(1.2rem, 4vw, 3rem)' }} />

        <div className="navbar-logo-wrap flex-none flex items-center justify-center shrink-0 py-4">
          <BanuLogo theme={useDarkIcons ? 'gold-dark' : 'light'} />
        </div>

        <div className={`navbar-actions flex-1 flex justify-end items-center gap-6 ${iconColorClass}`} style={{ paddingRight: 'clamp(1.2rem, 4vw, 3rem)' }}>
          <button
            aria-label="Buscar"
            onClick={() => setSearchOpen(true)}
            className="shrink-0 inline-flex items-center justify-center leading-none opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>

          <button
            id="navbar-selection-btn"
            aria-label={mounted ? `Mi Selecci\u00F3n \u2014 ${count} ${count === 1 ? 'item' : 'items'}` : 'Mi Selecci\u00F3n'}
            onClick={openDrawer}
            className="relative shrink-0 inline-flex items-center justify-center leading-none opacity-80 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
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
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: '0.5rem',
                        fontWeight: 600,
                        color: 'var(--color-cream)',
                        lineHeight: 1,
                      }}
                    >
                      {count > 9 ? '9+' : count}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </button>

          <button
            onClick={() => setIsNavDrawerOpen(true)}
            className="nav-link !inline-flex items-center flex-nowrap gap-[var(--spacing-xs)] !pb-0 whitespace-nowrap leading-none shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            <span className="hidden md:inline-block leading-none whitespace-nowrap">{'MEN\u00DA'}</span>
            <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="4.5" y1="12" x2="21" y2="12" />
              <line x1="6" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </motion.nav>

      <NavigationDrawer isOpen={isNavDrawerOpen} onClose={() => setIsNavDrawerOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
