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
      minHeight: '40vh',
      padding: '4rem 2rem',
      position: 'relative',
      width: '100%'
    }}>

      {/* Logo como watermark de fondo */}
      <div style={{ 
        position: 'absolute', 
        pointerEvents: 'none', 
        opacity: 0.05,
        filter: theme === 'dark' ? 'invert(1)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Image 
          src="/logoSVG.svg"
          alt=""
          width={200}
          height={80}
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Línea decorativa superior */}
      <div style={{ 
        width: '32px', 
        height: '1px',
        background: '#8B7355',
        marginBottom: '2rem',
        opacity: 0.5
      }} />

      {/* Título */}
      <p style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
        fontWeight: 300,
        color: textColor,
        textAlign: 'center',
        marginBottom: '0.75rem',
        margin: '0 0 0.75rem 0'
      }}>
        {title}
      </p>

      {/* Subtítulo */}
      {subtitle && (
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.8rem',
          color: textColor,
          opacity: 0.45,
          textAlign: 'center',
          maxWidth: '280px',
          lineHeight: 1.7,
          margin: 0
        }}>
          {subtitle}
        </p>
      )}

      {/* CTA opcional */}
      {action && (
        <a href={action.href} style={{
          marginTop: '2rem',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: textColor,
          borderBottom: '1px solid currentColor',
          paddingBottom: '2px',
          textDecoration: 'none',
          opacity: 0.7,
          transition: 'opacity 0.2s ease'
        }}>
          {action.label}
        </a>
      )}

    </div>
  );
};
