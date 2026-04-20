import React from 'react';
import Image from 'next/image';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
  theme?: 'light' | 'dark';
}

export const EmptyState = ({ 
  title, 
  subtitle, 
  action, 
  theme = 'light' 
}: EmptyStateProps) => {
  const textColor = theme === 'dark' ? '#EAE6DF' : '#2C1810';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(var(--app-vh) * 0.6)',
      padding: '5rem 2rem',
      position: 'relative',
      width: '100%',
      textAlign: 'center',
    }}>

      {/* Logo como watermark de fondo */}
      <div style={{ 
        position: 'absolute', 
        pointerEvents: 'none', 
        opacity: 0.04,
        filter: theme === 'dark' ? 'invert(1)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Image 
          src="/logoSVG.svg"
          alt=""
          width={320}
          height={130}
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Línea decorativa superior */}
      <div style={{ 
        width: '40px', 
        height: '1px',
        background: '#8B7355',
        marginBottom: '2.5rem',
        opacity: 0.45
      }} />

      {/* Título */}
      <p style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 300,
        color: textColor,
        textAlign: 'center',
        margin: '0 0 1.25rem 0',
        letterSpacing: '0.01em',
        lineHeight: 1.2,
      }}>
        {title}
      </p>

      {/* Subtítulo */}
      {subtitle && (
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.9rem',
          color: textColor,
          opacity: 0.45,
          textAlign: 'center',
          maxWidth: '360px',
          lineHeight: 1.75,
          margin: 0
        }}>
          {subtitle}
        </p>
      )}

      {/* CTA opcional */}
      {action && (
        <a href={action.href} style={{
          marginTop: '2.5rem',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.72rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: textColor,
          borderBottom: '1px solid currentColor',
          paddingBottom: '3px',
          textDecoration: 'none',
          opacity: 0.65,
          transition: 'opacity 0.2s ease',
          display: 'inline-block',
        }}>
          {action.label}
        </a>
      )}

    </div>
  );
};
