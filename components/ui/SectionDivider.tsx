import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionDividerProps {
  variant?: 'line' | 'ornament';
  className?: string;
}

export function SectionDivider({ variant = 'line', className }: SectionDividerProps) {
  if (variant === 'ornament') {
    return (
      <div className={cn("w-full flex items-center justify-center gap-4 text-[var(--color-gold)] opacity-50 py-12 relative z-10 pointer-events-none", className)}>
        <div className="w-[60px] h-[1px] bg-currentColor" />
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M12 2L22 12L12 22L2 12L12 2Z" />
        </svg>
        <div className="w-[60px] h-[1px] bg-currentColor" />
      </div>
    );
  }

  return (
    <div className={cn("w-full py-8 flex justify-center pointer-events-none relative z-10", className)}>
      <div className="w-full h-[1px] bg-[rgba(139,115,85,0.2)]" />
    </div>
  );
}
