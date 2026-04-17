import React, { ElementType, HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type TypographyVariant = 'display' | 'heading' | 'subheading' | 'body' | 'caption' | 'label';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TypographyVariant;
}

const variantStyles: Record<TypographyVariant, string> = {
  display: 'font-serif text-[clamp(3.5rem,8vw,7rem)] tracking-[0.08em] leading-none',
  heading: 'font-serif text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[0.02em] text-center mb-[clamp(3rem,6vw,5rem)] leading-tight',
  subheading: 'font-sans text-[clamp(0.75rem,1.5vw,0.875rem)] tracking-[0.15em] uppercase opacity-60 text-center mb-4',
  body: 'font-sans text-[14px] leading-loose font-normal',
  caption: 'font-sans text-[12px] opacity-60 font-normal tracking-wide',
  label: 'font-sans text-[11px] uppercase font-bold tracking-[0.15em]',
};

const defaultElement: Record<TypographyVariant, ElementType> = {
  display: 'h1',
  heading: 'h2',
  subheading: 'h3',
  body: 'p',
  caption: 'span',
  label: 'span',
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ as, variant = 'body', className, children, ...props }, ref) => {
    const Component = as || defaultElement[variant];

    return (
      <Component
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';
