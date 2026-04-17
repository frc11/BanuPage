"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useSelectionCount } from '@/src/store/selection-store';

export interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavigationDrawer({ isOpen, onClose }: NavigationDrawerProps) {
  const count = useSelectionCount();

  // En mobile ocupa 100vw
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      document.documentElement.style.setProperty('--nav-drawer-width', isMobile ? '100vw' : '480px');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // En iOS el overflow: hidden no siempre funciona
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => { 
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const primaryLinks = [
    { label: 'Catálogo', href: '/catalogo' },
    { label: 'Marcas', href: '/marcas' },
    { label: 'Nosotros', href: '/nosotros' },
    {
      label: 'Mi Selección',
      href: '/seleccion',
      badge: count > 0 ? count : undefined,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 cursor-pointer"
            style={{ backgroundColor: 'rgba(44, 24, 16, 0.4)', zIndex: 'var(--z-drawer-overlay)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.3, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) onClose();
            }}
            className="fixed top-0 left-0 bottom-0 w-full max-w-[480px] h-full bg-[var(--color-cream)] shadow-2xl flex flex-col overflow-y-auto"
            style={{ width: 'var(--nav-drawer-width, 100vw)', zIndex: 'var(--z-drawer)' }}
          >
            {/* Close */}
            <div className="flex justify-end items-center p-6 lg:p-8">
              <button
                onClick={onClose}
                aria-label="Cerrar navegación"
                className="w-[44px] h-[44px] bg-[var(--color-dark)] text-[var(--color-text-light)] flex items-center justify-center hover:opacity-80 transition-opacity duration-300 rounded-none focus:outline-none"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 px-10 lg:px-16 pt-4 pb-16 flex flex-col justify-center">
              <ul className="flex flex-col space-y-6">
                {primaryLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="nav-link items-center gap-3"
                    >
                      <span className="font-serif text-[clamp(2rem,5vw,2.8rem)] font-normal text-[var(--color-dark)] leading-[1.4]">
                        {item.label}
                      </span>
                      {item.badge !== undefined && (
                        <motion.span
                          key={item.badge}
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="font-sans text-[0.65rem] bg-[var(--color-gold)] text-[var(--color-cream)] px-2 py-0.5 font-medium tracking-wider mb-1 self-end"
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="w-full h-[1px] bg-[var(--color-dark)] opacity-15 my-[1.5rem]" />

              <ul className="flex flex-col space-y-4">
                {[
                  { label: 'Servicios', href: '/nosotros#servicios' },
                  { label: 'Contacto', href: 'https://wa.me/5493814665503' },
                  { label: 'FAQ', href: '/#faq' }
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="nav-link"
                    >
                      <span className="font-sans text-[0.8rem] text-[var(--color-dark)] opacity-60 underline underline-offset-4 decoration-1">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
