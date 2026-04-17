"use client";

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center font-sans text-[12px] uppercase font-bold tracking-[0.1em] px-10 py-4 transition-colors duration-500 ease-out disabled:opacity-50 disabled:pointer-events-none overflow-hidden',
  {
    variants: {
      variant: {
        filled: 'bg-[var(--color-dark)] text-[var(--color-text-light)] hover:bg-[#1a0e09]',
        outlined: 'bg-transparent border border-[var(--color-dark)] text-[var(--color-dark)] hover:bg-[var(--color-dark)] hover:text-[var(--color-text-light)]',
        ghost: 'bg-transparent text-[var(--color-dark)] px-6 py-3',
        whatsapp: 'bg-transparent border border-[var(--color-dark)] text-[var(--color-dark)] hover:bg-[var(--color-dark)] hover:text-[var(--color-text-light)]',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'filled',
      fullWidth: false,
    },
  }
);

export interface BanuButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'className' | 'children'>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
}

export const BanuButton = forwardRef<HTMLButtonElement, BanuButtonProps>(
  ({ className, variant, fullWidth, isLoading, children, disabled, ...props }, ref) => {
    
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, fullWidth, className }))}
        disabled={isLoading || disabled}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={{
          tap: { opacity: 0.95 } // Sustitución directa de "bounce/scale"
        }}
        {...props}
      >
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute flex items-center justify-center"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </motion.div>
        )}
        
        <motion.span 
          className="relative z-10 flex items-center justify-center"
          animate={{ opacity: isLoading ? 0 : 1 }}
        >
          {variant === 'whatsapp' && <MessageCircle className="mr-3 h-[14px] w-[14px]" strokeWidth={2} />}
          {children}
        </motion.span>

        {variant === 'ghost' && (
          <motion.div
            className="absolute bottom-3 left-6 right-6 h-[1px] bg-current origin-left"
            variants={{
              initial: { scaleX: 0 },
              hover: { scaleX: 1 }
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </motion.button>
    );
  }
);

BanuButton.displayName = 'BanuButton';
