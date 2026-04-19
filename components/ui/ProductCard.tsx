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
  fluidWidth?: boolean;
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
  fluidWidth = false,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const addItem = useSelectionStore((s) => s.addItem);
  const removeItem = useSelectionStore((s) => s.removeItem);
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
    if (isInSelection) {
      removeItem(product._id);
    } else {
      addItem({
        id: product._id,
        name: product.name,
        brand: product.brand?.title ?? '',
        price: activePrice,
        slug: product.slug,
        imageUrl: product.imageUrl ?? '',
      });
    }
  };

  const waMessage = `Hola Ban\u016b, me interesa ${product.name}`;
  const waUrl = `https://wa.me/5493814665503?text=${encodeURIComponent(waMessage)}`;

  const discountPct = product.price?.isOnSale && product.price?.discountPrice && product.price?.basePrice
    ? Math.round((1 - product.price.discountPrice / product.price.basePrice) * 100)
    : null;
  const enforceAlignedRows = !isCatalogCard && !showButton;
  const inspiredClampStyle: React.CSSProperties | undefined = enforceAlignedRows
    ? {
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      minHeight: 'calc(0.72rem * 1.35 * 2)',
    }
    : undefined;

  return (
    <div
      className={`group relative flex flex-col gap-1 bg-transparent shadow-none overflow-hidden p-[var(--spacing-card)] !rounded-[4px] ${isCatalogCard
          ? 'w-full min-w-0'
          : fluidWidth
            ? 'w-full min-w-0 max-w-[320px]'
            : 'w-[220px] md:w-[280px] shrink-0'
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
                className="object-cover"
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
              className="object-cover"
              style={{
                opacity: product.hoverImageUrl && hovered ? 0 : 1,
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
                transition: 'opacity 500ms ease-out, transform 600ms cubic-bezier(0.25,0.1,0.25,1)',
                position: 'absolute',
                zIndex: 1,
              }}
            />

            {/* Badge encima de la imagen con glow */}
            {product.badge && (
              <div
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  zIndex: 4,
                  pointerEvents: 'none',
                  background: 'linear-gradient(135deg, rgba(139,115,85,0.95) 0%, rgba(180,148,100,0.98) 100%)',
                  padding: '0.3rem 0.65rem',
                  boxShadow: '0 0 18px 4px rgba(180,148,100,0.45), 0 2px 8px rgba(0,0,0,0.25)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.55rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    fontWeight: 600,
                  }}
                >
                  {product.badge}
                </span>
              </div>
            )}

            {product.price?.isOnSale && product.price?.discountPrice && discountPct !== null && (
              <div
                style={{
                  position: 'absolute',
                  top: '0.625rem',
                  left: '0.625rem',
                  background: 'var(--color-dark)',
                  padding: '0.25rem 0.5rem',
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

            {/* Hover CTA — desliza desde abajo al hacer hover en la imagen */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 5,
                transform: hovered ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 380ms cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <button
                onClick={handleAdd}
                aria-label={isInSelection ? `Quitar ${product.name}` : `Agregar ${product.name} a mi selección`}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: isInSelection
                    ? 'linear-gradient(90deg, rgba(139,115,85,0.97) 0%, rgba(160,130,90,0.97) 100%)'
                    : 'linear-gradient(90deg, rgba(44,24,16,0.96) 0%, rgba(60,35,22,0.96) 100%)',
                  border: 'none',
                  color: 'var(--color-cream)',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  backdropFilter: 'blur(4px)',
                  transition: 'background 280ms ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = isInSelection
                    ? 'linear-gradient(90deg, rgba(160,130,90,1) 0%, rgba(180,148,100,1) 100%)'
                    : 'linear-gradient(90deg, rgba(139,115,85,0.98) 0%, rgba(160,134,95,0.98) 100%)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = isInSelection
                    ? 'linear-gradient(90deg, rgba(139,115,85,0.97) 0%, rgba(160,130,90,0.97) 100%)'
                    : 'linear-gradient(90deg, rgba(44,24,16,0.96) 0%, rgba(60,35,22,0.96) 100%)';
                }}
              >
                {isInSelection ? '✓ En mi selección' : '+ Agregar a mi selección'}
              </button>
            </div>
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

      <div
        className={`flex flex-col flex-grow ${enforceAlignedRows ? 'gap-1' : 'gap-1'} ${isCatalogCard ? 'px-1 md:px-1.5' : ''}`}
      >
        {/* Badge placeholder para alineación — NUNCA muestra el badge duplicado */}
        <div className={enforceAlignedRows ? 'min-h-[2.1rem] flex items-start' : 'hidden'}>
          {enforceAlignedRows && !product.badge && <span aria-hidden="true" className="block h-[2.1rem]" />}
        </div>

        <div className={`flex flex-col ${enforceAlignedRows ? 'min-h-[3.35rem]' : ''}`} style={{ marginTop: '0.2rem' }}>
          {product.brand?.title && (
            <span className="mb-0.5 block font-sans text-[0.8rem] tracking-widest uppercase opacity-45 text-[var(--color-gold)]">
              {product.brand.title}
            </span>
          )}
          {product.inspiredBy && (
            <span className={`block font-serif italic text-[0.92rem] leading-[1.35] opacity-60 ${textColor}`} style={inspiredClampStyle}>
              Inspirado en: {product.inspiredBy}
            </span>
          )}
        </div>

        <Link
          href={pdpHref}
          className={`mt-1 block hover:opacity-70 transition-opacity duration-200 ${enforceAlignedRows ? 'min-h-[3rem]' : 'mb-0.5'}`}
        >
          <RevealText
            as="h4"
            text={product.name}
            className={`font-serif text-[1.45rem] font-normal leading-[1.2] ${textColor}`}
          />
        </Link>

        <div className={`mt-2 pt-2 ${enforceAlignedRows ? 'min-h-[2.3rem]' : ''}`}>
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
          <div className="mt-[var(--spacing-sm)]">
            <PerformanceBars
              longevity={product.performance.longevity}
              projection={product.performance.projection}
              theme={theme}
            />
          </div>
        )}

        {showTags && product.tags && product.tags.length > 0 && (
          <div className="mt-[var(--spacing-xs)] scale-75 origin-left overflow-hidden">
            <OccasionTags tags={product.tags} theme={theme} />
          </div>
        )}

        <div className="flex-grow" />


      </div>
    </div>
  );
}
