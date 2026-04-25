import React from 'react';
import Link from 'next/link';
import { PerfumeData } from '@/types/sanity';
import { Marquee } from '@/components/ui/Marquee';
import { ProductCard } from '@/components/ui/ProductCard';
import RevealText from '@/src/components/ui/reveal-text';
import { mapSanityPerfume } from '@/lib/mappers';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';

export interface FeaturedMarqueeProps {
  products: unknown[];
}

const MIN_PRODUCTS_FOR_CAROUSEL = 5;

export function FeaturedMarquee({ products }: FeaturedMarqueeProps) {
  let perfumes: PerfumeData[] = [];
  const headingToProductsGap = 'clamp(3.25rem, 6vw, 5rem)';

  try {
    perfumes = products ? products.map(mapSanityPerfume) : [];
  } catch {
    return null;
  }

  if (!perfumes || perfumes.length === 0) return null;
  const featuredPerfumes = perfumes.filter((perfume) => perfume.isFeatured);
  const visiblePerfumes = featuredPerfumes.length > 0 ? featuredPerfumes : perfumes;
  const useCarousel = visiblePerfumes.length > MIN_PRODUCTS_FOR_CAROUSEL;

  return (
    <section
      className="relative w-full bg-[var(--color-dark)]"
      style={{
        paddingTop: 'var(--spacing-section-top)',
        paddingBottom: 'var(--spacing-section-bottom)',
        paddingLeft: 'var(--spacing-section-x)',
        paddingRight: 'var(--spacing-section-x)'
      }}
    >
      <ArabicPatternOverlay opacity={0.04} color="light" />
      <div
        className="w-full flex justify-center"
        style={{ paddingBottom: headingToProductsGap }}
      >
        <RevealText
          text="Descubrimientos Selectos"
          as="h2"
          className="font-serif text-[clamp(1.9rem,9vw,3.5rem)] leading-[1.12] font-light text-[var(--color-text-light)] text-center max-w-[12ch] sm:max-w-none mx-auto"
          style={{ justifyContent: 'center', width: '100%' }}
        />
      </div>

      {useCarousel ? (
        <Marquee speed={38} direction="left" align="start" className="hide-scrollbar [--marquee-gap:var(--spacing-card)] [--marquee-padding:0px]">
          {visiblePerfumes.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              index={index}
              showPerformance={false}
              showButton={false}
              showTags={false}
              priority={index < 3}
            />
          ))}
          <div aria-hidden="true" className="w-0 shrink-0" />
        </Marquee>
      ) : (
        <div className="w-full">
          <div className="featured-products-grid">
            {visiblePerfumes.map((product, index) => (
              <div key={product._id} className="featured-products-item">
                <ProductCard
                  product={product}
                  showPerformance={false}
                  index={index}
                  showButton={false}
                  showTags={false}
                  priority={index < 3}
                  fluidWidth
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="featured-cta-wrap flex w-full justify-center">
        <Link
          href="/catalogo"
          className="cta-catalog"
          style={{
            animation: 'banu-cta-reveal 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.35s both',
          }}
        >
          <span className="cta-catalog__label">
            Ver Coleccion Completa
          </span>
        </Link>
      </div>
    </section>
  );
}
