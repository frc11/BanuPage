import React from 'react';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';

export const ProductCardSkeleton = () => {
  return (
    <div 
      className="flex flex-col bg-transparent w-[220px] md:w-[280px] shrink-0 overflow-hidden"
    >
      {/* Imagen placeholder */}
      <div 
        className="banu-skeleton" 
        style={{ 
          aspectRatio: '3/4',
          position: 'relative',
          width: '100%'
        }}
      >
        {/* ArabicPattern centrado como watermark */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArabicPatternOverlay opacity={0.04} color="dark" />
        </div>
      </div>

      {/* Info placeholder */}
      <div style={{ padding: '0.875rem 0.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {/* Línea marca */}
        <div className="banu-skeleton" style={{ height: '8px', width: '40%', borderRadius: 0 }} />
        {/* Línea nombre */}
        <div className="banu-skeleton" style={{ height: '12px', width: '80%', borderRadius: 0 }} />
        {/* Línea precio */}
        <div className="banu-skeleton" style={{ height: '10px', width: '25%', borderRadius: 0, marginTop: '0.25rem' }} />
      </div>

      {/* Botón placeholder */}
      <div 
        className="banu-skeleton" 
        style={{ 
          height: '42px', 
          width: '100%', 
          marginTop: '1.5rem',
          opacity: 0.3
        }} 
      />
    </div>
  );
};
