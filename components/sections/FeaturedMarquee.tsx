import React from 'react';
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
  const useCarousel = perfumes.length >= MIN_PRODUCTS_FOR_CAROUSEL;

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
          className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-light text-[var(--color-text-light)] text-center"
        />
      </div>

      {useCarousel ? (
        <Marquee speed={38} direction="left" align="start" className="hide-scrollbar [--marquee-gap:var(--spacing-card)] [--marquee-padding:0px]">
          {perfumes.map((product, index) => (
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
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: `repeat(${perfumes.length}, minmax(0, 1fr))`,
              gap: 'var(--spacing-card)',
              alignItems: 'start',
              justifyItems: 'center',
            }}
          >
            {perfumes.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                showPerformance={false}
                index={index}
                showButton={false}
                showTags={false}
                priority={index < 3}
                fluidWidth
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
