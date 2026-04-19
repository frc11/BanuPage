import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import React from 'react';

export interface BanuLogoProps {
  theme?: 'dark' | 'light' | 'svg' | 'gold-dark';
  className?: string;
  asLink?: boolean;
}

export function BanuLogo({ theme = 'dark', className, asLink = true }: BanuLogoProps) {
  let logoSrc = '/logoM.png';
  if (theme === 'light') logoSrc = '/logoC.png';
  if (theme === 'svg') logoSrc = '/logoSVG.svg';
  if (theme === 'gold-dark') logoSrc = '/logoM.png';

  // Filtro que convierte el PNG oscuro en un dorado muy oscuro y saturado
  const goldDarkFilter = 'brightness(0) saturate(100%) invert(18%) sepia(60%) saturate(600%) hue-rotate(10deg) brightness(0.7)';

  const imageElement = (
    <Image
      src={logoSrc}
      alt="BANŪ"
      width={600}
      height={100}
      className={cn("w-auto h-[60px] md:h-[100px] object-contain", className)}
      style={theme === 'gold-dark' ? { filter: goldDarkFilter } : undefined}
      priority
      unoptimized
    />
  );

  if (!asLink) {
    return (
      <div className={cn("relative flex items-center justify-center", className)}>
        {imageElement}
      </div>
    );
  }

  return (
    <Link 
      href="/" 
      className={cn(
        "relative flex items-center justify-center transition-opacity duration-500 hover:opacity-70",
        className
      )}
      aria-label="Banū Scents Inicio"
    >
      {imageElement}
    </Link>
  );
}
