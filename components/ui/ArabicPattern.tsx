import React, { useId } from 'react';
import { cn } from '@/lib/utils';

export interface ArabicPatternProps {
  opacity?: number;
  color?: 'light' | 'dark';
  className?: string;
}

export function ArabicPatternOverlay({
  opacity = 0.04,
  color = 'light',
  className
}: ArabicPatternProps) {
  const patternId = useId();

  return (
    <svg
      /* 
        Restricciones de jerarquía visual cumplidas:
        pointer-events-none: No bloquea clics debajo del overlay
        aria-hidden: Excluido del DOM accesible 
        absolute inset-0: Expansión absoluta hacia sus top boundaries
      */
      className={cn("absolute inset-0 w-full h-full object-cover pointer-events-none z-0", className)}
      aria-hidden="true"
      style={{ opacity, color: color === 'light' ? 'var(--color-cream)' : 'var(--color-dark)' }}
    >
      <defs>
        {/* Patrón Islámico Clásico Geométrico (Teselación Estrella de 8 Puntas "Khatam") */}
        <pattern
          id={patternId}
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.2)"
        >
          <g stroke="currentColor" strokeWidth="0.75" fill="none">
            {/* Estrella central del cuadrante */}
            <g transform="translate(30, 30)">
              <rect x="-12" y="-12" width="24" height="24" />
              <rect x="-12" y="-12" width="24" height="24" transform="rotate(45)" />
            </g>

            {/* Vértices periféricos que componen estrellan adyacentes de 4 losas interseccadas */}
            <g transform="translate(0, 0)">
              <rect x="-12" y="-12" width="24" height="24" />
              <rect x="-12" y="-12" width="24" height="24" transform="rotate(45)" />
            </g>
            <g transform="translate(60, 0)">
              <rect x="-12" y="-12" width="24" height="24" />
              <rect x="-12" y="-12" width="24" height="24" transform="rotate(45)" />
            </g>
            <g transform="translate(0, 60)">
              <rect x="-12" y="-12" width="24" height="24" />
              <rect x="-12" y="-12" width="24" height="24" transform="rotate(45)" />
            </g>
            <g transform="translate(60, 60)">
              <rect x="-12" y="-12" width="24" height="24" />
              <rect x="-12" y="-12" width="24" height="24" transform="rotate(45)" />
            </g>

            {/* Rieles de Enlace Ortogonal */}
            {/* Ligan la estrella central con el espacio de vacío y conectan con la grilla superior/lateral infinita */}
            <path d="M 30 13 L 30 0 M 30 47 L 30 60 M 13 30 L 0 30 M 47 30 L 60 30" />
            
            {/* Rieles de Enlace Diagonal Mosaico (Cerrando las joyas octagonales) */}
            <path d="M 18 18 L 12 12 M 42 18 L 48 12 M 18 42 L 12 48 M 42 42 L 48 48" />
          </g>
        </pattern>
      </defs>
      
      {/* Rectángulo de expansión que recubre todo el render target */}
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
