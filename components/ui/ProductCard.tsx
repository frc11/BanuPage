"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';
import { BanuLogo } from '@/components/ui/BanuLogo';
import { useSelectionStore, useIsInSelection } from '@/src/store/selection-store';
import { PerfumeData } from '@/types/sanity';
import RevealImage from '@/src/components/ui/reveal-image';
import ProductBadge from '@/src/components/ui/product-badge';
import ProductPrice from '@/src/components/ui/product-price';
import RevealText from '@/src/components/ui/reveal-text';
import { PerformanceBars } from '@/src/components/ui/performance-bars';
import OccasionTags from '@/src/components/ui/occasion-tags';

export interface ProductCardProps {
  product: PerfumeData;
  theme?: 'light' | 'dark';
  index?: number;
  showPerformance?: boolean;
  showButton?: boolean;
  priority?: boolean;
}


export function ProductCard({ 
  product, 
  theme = 'dark', 
  index = 0,
  showPerformance = true,
  showButton = true,
  priority = false
}: ProductCardProps) {
  const addItem = useSelectionStore((s) => s.addItem);
  const isSelected = useIsInSelection(product._id);

  const textColor = theme === 'light' ? 'text-[var(--color-dark)]' : 'text-[var(--color-cream)]';
  const borderColor = theme === 'light' ? 'border-[var(--color-dark)]' : 'border-[var(--color-cream)]';

  const pdpHref = `/perfume/${product.slug}`;

  // Lógica de Precio
  const activePrice = product.price.isOnSale && product.price.discountPrice 
    ? product.price.discountPrice 
    : product.price.basePrice;

  // Lógica de Wishlist (necesitamos pasar un precio number simple al store)
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product._id,
      name: product.name,
      brand: product.brand?.title ?? '',
      price: activePrice,
      slug: product.slug,
      imageUrl: product.imageUrl ?? '',
    });
  };

  const waMessage = `Hola Banū, quiero consultar sobre ${product.brand?.title ? `${product.brand.title} ` : ""}${product.name}`;
  const waUrl = `https://wa.me/5493814665503?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="group flex flex-col bg-transparent border-none shadow-none w-[220px] md:w-[280px] shrink-0 overflow-hidden relative">
      
      {/* Imagen & Badge */}
      <Link
        href={pdpHref}
        aria-label={`Ver detalle de ${product.name}`}
        className="block relative"
        onClick={(e) => {
          if ((e.currentTarget as HTMLElement).hasAttribute('data-dragging')) {
            e.preventDefault();
          }
        }}
      >
        {/* Imagen del Frasco */}
        {product.imageUrl ? (
          <div className="relative w-full aspect-[3/4] bg-[var(--color-cream-dark)] overflow-hidden">
            <RevealImage
              src={product.imageUrl}
              alt={product.name}
              fill
              unoptimized
              priority={priority}
              delay={index * 0.08}
              className="object-contain p-6 transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
            />
          </div>
        ) : (
          <div className="relative w-full aspect-[3/4] bg-[var(--color-cream-dark)] flex items-center justify-center overflow-hidden">
            <ArabicPatternOverlay opacity={0.1} color="dark" />
            <div className="relative z-10 w-24 opacity-80 pointer-events-none">
              <BanuLogo theme="dark" asLink={false} />
            </div>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col pt-4 flex-grow">
        
        {/* 2. Badge */}
        {product.badge && <ProductBadge badge={product.badge} theme={theme} />}

        {/* 3. Marca & Inspiración */}
        <div className="mb-2 mt-1">
          {product.brand?.title && (
            <span className={`block font-sans text-[0.65rem] tracking-[0.15em] uppercase opacity-45 text-[var(--color-gold)]`}>
              {product.brand.title}
            </span>
          )}
          {product.inspiredBy && (
            <span className={`block font-serif italic text-[0.7rem] opacity-60 mt-[0.15rem] ${textColor}`}>
              Inspirado en: {product.inspiredBy}
            </span>
          )}
        </div>

        {/* 4. Nombre */}
        <Link href={pdpHref} className="hover:opacity-70 transition-opacity duration-200 block mb-[0.65rem]">
          <RevealText 
            as="h4"
            text={product.name}
            className={`font-serif text-[1.1rem] font-normal leading-[1.2] ${textColor}`}
          />
        </Link>

        {/* 5. ProductPrice */}
        <div className="mb-3">
          <ProductPrice 
            basePrice={product.price?.basePrice}
            discountPrice={product.price?.discountPrice}
            isOnSale={product.price?.isOnSale}
            theme={theme}
            size="sm"
          />
        </div>

        {/* 6. Rendimiento */}
        {showPerformance && (
          <div className="mt-4">
            <PerformanceBars 
              longevity={product.performance.longevity} 
              projection={product.performance.projection} 
              theme={theme}
            />
          </div>
        )}

        {/* 6.5 Occasion Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="mt-2 scale-75 origin-left overflow-hidden">
            <OccasionTags tags={product.tags} theme={theme} />
          </div>
        )}

        {/* Filler para empujar el botón al fondo si la card crece */}
        <div className="flex-grow" />

        {/* 7. CTAs */}
        {showButton && (
          <div className="mt-auto flex flex-col gap-2">
            {/* Botón Selección */}
            <button
              id={`add-selection-${product._id}`}
              onClick={handleAdd}
              aria-label={
                isSelected
                  ? `Quitar ${product.name} de mi selección`
                  : `Agregar ${product.name} a mi selección`
              }
              className={`
                w-full flex items-center justify-center gap-2
                border py-[0.75rem] px-4 bg-transparent
                font-sans text-[0.65rem] tracking-[0.2em] uppercase
                transition-all duration-300 ease focus:outline-none
                ${isSelected
                  ? 'border-[var(--color-gold)] text-[var(--color-gold)]'
                  : `${borderColor} ${textColor} hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] hover:!text-[var(--color-cream)]`
                }
              `}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isSelected ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={11} strokeWidth={2.5} />
                    EN MI SELECCIÓN
                  </motion.span>
                ) : (
                  <motion.span
                    key="plus"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <Plus size={11} strokeWidth={2.5} />
                    SELECCIONAR
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Botón WhatsApp Consulta Directa */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                w-full flex items-center justify-center gap-2
                border py-[0.75rem] px-4 bg-transparent
                font-sans text-[0.65rem] tracking-[0.2em] uppercase
                transition-all duration-300 ease
                ${borderColor} ${textColor} hover:bg-[var(--color-dark)] hover:text-[var(--color-text-light)]
              `}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              </svg>
              CONSULTAR
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
