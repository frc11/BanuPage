"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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
  showTags?: boolean;
  priority?: boolean;
  context?: 'default' | 'catalog';
}

export function ProductCard({
  product,
  theme = 'dark',
  index = 0,
  showPerformance = true,
  showButton = true,
  showTags = true,
  priority = false,
  context = 'default',
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const addItem = useSelectionStore((s) => s.addItem);
  const isInSelection = useIsInSelection(product._id);

  const isCatalogCard = context === 'catalog';
  const textColor = theme === 'light' ? 'text-[var(--color-dark)]' : 'text-[var(--color-cream)]';
  const borderColor = theme === 'light' ? 'border-[var(--color-dark)]' : 'border-[var(--color-cream)]';
  const pdpHref = `/perfume/${product.slug}`;

  const activePrice = product.price.isOnSale && product.price.discountPrice
    ? product.price.discountPrice
    : product.price.basePrice;

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

  const waMessage = `Hola Ban\u016b, me interesa ${product.name}`;
  const waUrl = `https://wa.me/5493814665503?text=${encodeURIComponent(waMessage)}`;

  const discountPct = product.price?.isOnSale && product.price?.discountPrice && product.price?.basePrice
    ? Math.round((1 - product.price.discountPrice / product.price.basePrice) * 100)
    : null;

  return (
    <div
      className={`group flex flex-col bg-transparent border-none shadow-none overflow-hidden relative ${
        isCatalogCard ? 'w-full min-w-0' : 'w-[220px] md:w-[280px] shrink-0'
      }`}
    >
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
        {product.imageUrl ? (
          <div
            className="relative w-full aspect-[3/4] bg-[var(--color-cream-dark)] overflow-hidden"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ filter: hovered ? 'saturate(1)' : 'saturate(0.88)', transition: 'filter 500ms ease' }}
          >
            {product.hoverImageUrl && (
              <RevealImage
                src={product.hoverImageUrl}
                alt={`${product.name} lifestyle`}
                fill
                unoptimized
                priority={priority}
                className="object-cover p-0"
                style={{
                  opacity: hovered ? 1 : 0,
                  transition: 'opacity 500ms ease-out',
                  position: 'absolute',
                  zIndex: 2,
                }}
              />
            )}

            <RevealImage
              src={product.imageUrl}
              alt={product.name}
              fill
              unoptimized
              priority={priority}
              delay={index * 0.08}
              className="object-contain p-6"
              style={{
                opacity: product.hoverImageUrl && hovered ? 0 : 1,
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
                transition: 'opacity 500ms ease-out, transform 600ms cubic-bezier(0.25,0.1,0.25,1)',
                position: 'absolute',
                zIndex: 1,
              }}
            />

            {product.price?.isOnSale && product.price?.discountPrice && discountPct !== null && (
              <div
                style={{
                  position: 'absolute',
                  top: '0.625rem',
                  left: '0.625rem',
                  background: 'var(--color-dark)',
                  padding: '0.2rem 0.5rem',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.55rem',
                    letterSpacing: '0.12em',
                    color: 'var(--color-gold)',
                    fontWeight: 500,
                  }}
                >
                  -{discountPct}%
                </span>
              </div>
            )}
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

      <div className={`flex flex-col pt-4 flex-grow ${isCatalogCard ? 'px-1 md:px-1.5' : ''}`}>
        {product.badge && (
          <div className="mb-1">
            <ProductBadge badge={product.badge} theme={theme} />
          </div>
        )}

        <div className="mb-2 mt-1">
          {product.brand?.title && (
            <span className="block font-sans text-[0.65rem] tracking-[0.15em] uppercase opacity-45 text-[var(--color-gold)]">
              {product.brand.title}
            </span>
          )}
          {product.inspiredBy && (
            <span className={`block font-serif italic text-[0.72rem] opacity-60 mt-[0.15rem] ${textColor}`}>
              Inspirado en: {product.inspiredBy}
            </span>
          )}
        </div>

        <Link href={pdpHref} className="hover:opacity-70 transition-opacity duration-200 block mb-[0.65rem]">
          <RevealText
            as="h4"
            text={product.name}
            className={`font-serif text-[1.1rem] font-normal leading-[1.2] ${textColor}`}
          />
        </Link>

        <div className="mb-3">
          {isCatalogCard ? (
            product.price?.isOnSale && product.price?.discountPrice ? (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.75rem',
                    textDecoration: 'line-through',
                    textDecorationColor: 'var(--color-gold)',
                    color: 'var(--color-dark)',
                    opacity: 0.4,
                  }}
                >
                  USD {product.price.basePrice.toLocaleString()}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.85rem',
                    color: 'var(--color-gold)',
                    fontWeight: 500,
                  }}
                >
                  USD {product.price.discountPrice.toLocaleString()}
                </span>
              </div>
            ) : (
              <p
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.8rem',
                  color: 'var(--color-dark)',
                }}
              >
                {product.price?.basePrice
                  ? `USD ${product.price.basePrice.toLocaleString()}`
                  : 'Consultar'}
              </p>
            )
          ) : (
            <ProductPrice
              basePrice={product.price?.basePrice}
              discountPrice={product.price?.discountPrice}
              isOnSale={product.price?.isOnSale}
              theme={theme}
              size="sm"
            />
          )}
        </div>

        {showPerformance && product.performance && (
          <div className="mt-4">
            <PerformanceBars
              longevity={product.performance.longevity}
              projection={product.performance.projection}
              theme={theme}
            />
          </div>
        )}

        {showTags && product.tags && product.tags.length > 0 && (
          <div className="mt-2 scale-75 origin-left overflow-hidden">
            <OccasionTags tags={product.tags} theme={theme} />
          </div>
        )}

        <div className="flex-grow" />

        {showButton && (
          isCatalogCard ? (
            <div className="mt-auto">
              <button
                id={`add-selection-${product._id}`}
                onClick={handleAdd}
                aria-label={
                  isInSelection
                    ? `Quitar ${product.name} de mi selecci\u00f3n`
                    : `Agregar ${product.name} a mi selecci\u00f3n`
                }
                style={{
                  width: '100%',
                  background: isInSelection ? 'var(--color-gold)' : 'var(--color-dark)',
                  color: 'var(--color-cream)',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background 300ms ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  marginTop: '0.75rem',
                }}
              >
                {isInSelection ? '\u2713 En mi selecci\u00f3n' : '+ Seleccionar'}
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  border: '1px solid rgba(44,24,16,0.2)',
                  padding: '0.65rem 1rem',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-dark)',
                  textDecoration: 'none',
                  marginTop: '0.5rem',
                  transition: 'border-color 200ms ease',
                  cursor: 'pointer',
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7a8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8a8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                Consultar
              </a>
            </div>
          ) : (
            <div className="mt-auto flex flex-col gap-2">
              <button
                id={`add-selection-${product._id}`}
                onClick={handleAdd}
                aria-label={
                  isInSelection
                    ? `Quitar ${product.name} de mi selecci\u00f3n`
                    : `Agregar ${product.name} a mi selecci\u00f3n`
                }
                className={`
                  w-full flex items-center justify-center gap-2
                  border py-[0.75rem] px-4 bg-transparent
                  font-sans text-[0.65rem] tracking-[0.2em] uppercase
                  transition-all duration-300 ease focus:outline-none
                  ${isInSelection
                    ? 'border-[var(--color-gold)] text-[var(--color-gold)]'
                    : `${borderColor} ${textColor} hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] hover:!text-[var(--color-cream)]`
                  }
                `}
              >
                {isInSelection ? 'EN MI SELECCI\u00d3N' : 'SELECCIONAR'}
              </button>

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
          )
        )}
      </div>
    </div>
  );
}
