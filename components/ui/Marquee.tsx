import React from 'react';
import { cn } from '@/lib/utils';

export interface MarqueeProps {
  children: React.ReactNode;
  /** Configura de forma ágil la duración final de la animación */
  speed?: 'slow' | 'normal' | 'fast' | number;
  /** Flujo de movimiento */
  direction?: 'left' | 'right';
  className?: string;
  align?: 'start' | 'center' | 'end';
}

export function Marquee({
  children,
  speed = 'slow',
  direction = 'left',
  className,
  align = 'center'
}: MarqueeProps) {
  
  // Relaciones de tiempo para la estética "Silent Luxury"
  const speedMap: Record<string, string> = {
    slow: '60s',
    normal: '35s',
    fast: '20s',
  };

  const durationValue = typeof speed === 'number' ? `${speed}s` : speedMap[speed] || '60s';
  const directionClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';
  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end'
  }[align];

  return (
    <div 
      className={cn(
        "group overflow-hidden flex flex-row w-full select-none", 
        // Opción: máscara de fade a los costados para más lujo.
        "[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
        className
      )}
    >
      {/* 
        Container A 
        Usar group-hover nos permite detener ambas partes de forma síncrona
      */}
      <div 
        className={cn(
          "w-max flex flex-row shrink-0 justify-around gap-16 px-8",
          alignClass,
          directionClass,
          "group-hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: durationValue }}
      >
        {children}
      </div>

      {/* 
        Container B (Duplicación Infinita) 
        aria-hidden="true" previene doble lectura en screen readers.
      */}
      <div 
        className={cn(
          "w-max flex flex-row shrink-0 justify-around gap-16 px-8",
          alignClass,
          directionClass,
          "group-hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: durationValue }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
