import React from 'react';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';

interface SectionDividerProps {
  variant?: 'pattern' | 'ornament' | 'line';
  from?: 'cream' | 'dark';  // color de la sección anterior
  to?: 'cream' | 'dark';    // color de la sección siguiente
}

const COLORS = {
  cream: '#EAE6DF',
  dark: '#2C1810'
};

export const SectionDivider = ({ 
  variant = 'pattern', 
  from = 'cream', 
  to = 'dark' 
}: SectionDividerProps) => {

  if (variant === 'pattern') {
    const fromColor = COLORS[from];
    const toColor = COLORS[to];

    return (
      <div 
        style={{ 
          height: '80px', 
          width: '100%', 
          background: toColor, 
          position: 'relative', 
          overflow: 'hidden' 
        }}
      >
        <ArabicPatternOverlay opacity={0.06} color={to === 'dark' ? 'light' : 'dark'} />
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, ${fromColor} 0%, transparent 40%, transparent 60%, ${toColor} 100%)`
          }}
        />
      </div>
    );
  }

  if (variant === 'ornament') {
    return (
      <div 
        style={{ 
          height: 'auto', 
          width: '100%', 
          padding: '2rem 0', 
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ width: '40px', height: '1px', background: '#8B7355', opacity: 0.4 }} />
        <svg width="8" height="8" viewBox="0 0 8 8">
          <rect 
            x="1" 
            y="1" 
            width="6" 
            height="6" 
            transform="rotate(45 4 4)" 
            fill="none" 
            stroke="#8B7355" 
            strokeWidth="1"
          />
        </svg>
        <div style={{ width: '40px', height: '1px', background: '#8B7355', opacity: 0.4 }} />
      </div>
    );
  }

  if (variant === 'line') {
    const isDarkBg = from === 'dark' || to === 'dark';
    return (
      <div 
        style={{ 
          height: '1px', 
          width: '100%', 
          background: isDarkBg ? 'rgba(234,230,223,0.1)' : 'rgba(44,24,16,0.08)' 
        }} 
      />
    );
  }

  return null;
};
