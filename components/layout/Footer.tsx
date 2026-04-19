"use client";

import React from 'react';
import Link from 'next/link';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';
import { BanuLogo } from '@/components/ui/BanuLogo';

const NAV_LINKS = {
  ayuda: [
    { label: 'Contacto', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Devoluciones', href: '#' },
  ],
  empresa: [
    { label: 'Sobre Nosotros', href: '#' },
    { label: 'Términos y Condiciones', href: '#' },
    { label: 'Política de Privacidad', href: '#' },
  ],
};

const WHATSAPP_URL =
  'https://wa.me/5493814665503?text=Hola%20Ban%C5%AB%2C%20quiero%20suscribirme%20a%20las%20novedades';
const WHATSAPP_CHAT = 'https://wa.me/5493814665503';
const INSTAGRAM_URL = 'https://instagram.com';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--color-dark)',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <ArabicPatternOverlay opacity={0.04} color="light" />

      {/* Línea superior */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'rgba(139,115,85,0.3)' }} />

      {/* Contenido principal */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '5rem 2.5rem 0',
        }}
      >
        {/* Fila superior: Logo centrado */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '3.5rem',
          }}
        >
          <BanuLogo theme="light" className="h-[52px] md:h-[68px]" />
          <span
            style={{
              fontFamily: 'var(--font-sans, sans-serif)',
              fontSize: '0.62rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              opacity: 0.65,
              marginTop: '0.75rem',
            }}
          >
            Perfumes Árabes · Argentina
          </span>
        </div>

        {/* Línea divisoria */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(234,230,223,0.08)', marginBottom: '3.5rem' }} />

        {/* Grid: 3 columnas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            width: '100%',
          }}
        >
          {/* Columna Ayuda */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4
              style={{
                fontFamily: 'var(--font-sans, sans-serif)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                opacity: 0.55,
                marginBottom: '1.6rem',
                fontWeight: 500,
              }}
            >
              Ayuda
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem', alignItems: 'center' }}>
              {NAV_LINKS.ayuda.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: 'var(--font-sans, sans-serif)',
                      fontSize: '0.88rem',
                      color: 'rgba(234,230,223,0.7)',
                      textDecoration: 'none',
                      letterSpacing: '0.02em',
                      transition: 'color 200ms ease, opacity 200ms ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-cream)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(234,230,223,0.7)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna Empresa */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4
              style={{
                fontFamily: 'var(--font-sans, sans-serif)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                opacity: 0.55,
                marginBottom: '1.6rem',
                fontWeight: 500,
              }}
            >
              Empresa
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem', alignItems: 'center' }}>
              {NAV_LINKS.empresa.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: 'var(--font-sans, sans-serif)',
                      fontSize: '0.88rem',
                      color: 'rgba(234,230,223,0.7)',
                      textDecoration: 'none',
                      letterSpacing: '0.02em',
                      transition: 'color 200ms ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-cream)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(234,230,223,0.7)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna Contacto / Redes */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4
              style={{
                fontFamily: 'var(--font-sans, sans-serif)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                opacity: 0.55,
                marginBottom: '1.6rem',
                fontWeight: 500,
              }}
            >
              Seguinos
            </h4>

            {/* Redes sociales */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1.2rem', marginBottom: '1.8rem' }}>
              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: 'rgba(234,230,223,0.5)', transition: 'color 200ms ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(234,230,223,1)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(234,230,223,0.5)')}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href={WHATSAPP_CHAT}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{ color: 'rgba(234,230,223,0.5)', transition: 'color 200ms ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(234,230,223,1)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(234,230,223,0.5)')}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>

            {/* CTA WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-sans, sans-serif)',
                fontSize: '0.68rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                opacity: 0.75,
                textDecoration: 'none',
                border: '1px solid rgba(139,115,85,0.35)',
                padding: '0.55rem 1.1rem',
                transition: 'opacity 200ms ease, border-color 200ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.borderColor = 'rgba(139,115,85,0.8)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '0.75';
                e.currentTarget.style.borderColor = 'rgba(139,115,85,0.35)';
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Recibir novedades
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: '4rem',
            paddingTop: '1.8rem',
            paddingBottom: '2rem',
            borderTop: '1px solid rgba(234,230,223,0.08)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans, sans-serif)',
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(234,230,223,0.28)',
            }}
          >
            © {currentYear} Banū Scents
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans, sans-serif)',
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(234,230,223,0.28)',
            }}
          >
            Todos los derechos reservados
          </span>
        </div>
      </div>
    </footer>
  );
}
