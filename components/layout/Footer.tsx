"use client";

import React from 'react';
import Link from 'next/link';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';
import { BanuLogo } from '@/components/ui/BanuLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-dark)] pt-[clamp(4rem,8vw,7rem)] pb-[2rem] relative z-10 overflow-hidden w-full">
      <ArabicPatternOverlay opacity={0.04} color="light" />
      
      {/* Separador decorativo al tope */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[rgba(139,115,85,0.3)]" />

      {/* SECCIÓN SUPERIOR (logo centrado) */}
      <div className="relative z-10 flex flex-col items-center mb-16">
        <BanuLogo theme="light" />
        <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-gold)] opacity-70 text-center mt-3">
          PERFUMES ÁRABES
        </span>
      </div>

      {/* GRID DE LINKS - Axial Centered */}
      <div className="relative z-10 w-full flex justify-center px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[800px] w-full text-center">
          {/* Columna 1 */}
          <div className="flex flex-col items-center">
            <h4 className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-text-light)] opacity-40 mb-[1rem]">AYUDA</h4>
            <ul className="flex flex-col gap-3">
              {['Contacto', 'FAQ', 'Devoluciones'].map(item => (
                <li key={item}>
                  <Link href="#" className="nav-link text-[0.8rem] text-[var(--color-text-light)] opacity-70">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Columna 2 */}
          <div className="flex flex-col items-center">
            <h4 className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-text-light)] opacity-40 mb-[1rem]">EMPRESA</h4>
            <ul className="flex flex-col gap-3">
              {['Sobre Nosotros', 'Términos', 'Privacidad'].map(item => (
                <li key={item}>
                  <Link href="#" className="nav-link text-[0.8rem] text-[var(--color-text-light)] opacity-70">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 */}
          <div className="flex flex-col items-center w-full">
            <h4 className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-text-light)] opacity-40 mb-[1rem]">SUSCRIPCIÓN</h4>
            <a 
              href="https://wa.me/5493814665503?text=Hola%20Banū%2C%20quiero%20suscribirme%20a%20las%20novedades"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-cream)',
                opacity: 0.6,
                textDecoration: 'none',
                borderBottom: '1px solid rgba(234,230,223,0.2)',
                paddingBottom: '0.25rem',
                transition: 'opacity 200ms ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6' }}
            >
              + Suscribirse vía WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* SEPARADOR INFERIOR */}
      <div className="relative z-10 w-full h-[1px] bg-[rgba(234,230,223,0.1)] mt-[3rem] mb-[2rem]" />

      {/* SECCIÓN INFERIOR (3 columnas: rrss / copyright / país) */}
      {/* SECCIÓN INFERIOR - Global Axial Center */}
      <div className="relative z-10 w-full flex flex-col items-center px-6 pb-12">
        
        {/* RRSS */}
        <div className="flex items-center justify-center gap-[2rem] mb-10">
          <a href="#" aria-label="Instagram" className="text-[var(--color-text-light)] opacity-40 hover:opacity-100 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="https://wa.me/5493814665503" aria-label="WhatsApp" className="text-[var(--color-text-light)] opacity-40 hover:opacity-100 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </a>
        </div>

        {/* Info bar */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-[0.6rem] tracking-[0.3em] uppercase opacity-30 text-center">
          <span>&copy; {currentYear} BANŪ SCENTS. TODOS LOS DERECHOS RESERVADOS.</span>
          <span className="hidden md:inline h-px w-4 bg-[var(--color-text-light)] opacity-20" />
          <span>ARGENTINA</span>
        </div>
      </div>

    </footer>
  );
}
