import React from 'react';
import { PerfumeData } from '@/types/sanity';
import { Marquee } from '@/components/ui/Marquee';
import { ProductCard } from '@/components/ui/ProductCard';
import RevealText from '@/src/components/ui/reveal-text';
import { mapSanityPerfume } from '@/lib/mappers';

export interface FeaturedMarqueeProps {
  products: any[];
}

export function FeaturedMarquee({ products }: FeaturedMarqueeProps) {
  let perfumes: PerfumeData[] = [];
  
  try {
    perfumes = products ? products.map(mapSanityPerfume) : [];
  } catch {
    return null;
  }

  if (!perfumes || perfumes.length === 0) return null;

  return (
    <section className="w-full bg-[var(--color-dark)] py-[clamp(5rem,10vw,9rem)]">
      <div className="w-full px-6 flex justify-center mb-[clamp(3rem,6vw,5rem)]">
        <RevealText 
          text="Descubrimientos Selectos" 
          as="h2" 
          className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-light text-[var(--color-text-light)] text-center"
        />
      </div>
      <Marquee speed="normal" direction="left" align="start" className="hide-scrollbar">
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
      </Marquee>
    </section>
  );
}
