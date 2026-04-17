import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import React from 'react';

export interface BanuLogoProps {
  theme?: 'dark' | 'light' | 'svg';
  className?: string;
  asLink?: boolean;
}

export function BanuLogo({ theme = 'dark', className, asLink = true }: BanuLogoProps) {
  let logoSrc = '/logoM.png';
  if (theme === 'light') logoSrc = '/logoC.png';
  if (theme === 'svg') logoSrc = '/logoSVG.svg';

  const imageElement = (
    <Image
      src={logoSrc}
      alt="BANŪ"
      width={180}
      height={28}
      className="w-auto h-[28px] object-contain"
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
