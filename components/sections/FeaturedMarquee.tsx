import React from 'react';
import { PerfumeData } from '@/types/sanity';
import { Marquee } from '@/components/ui/Marquee';
import { Typography } from '@/components/ui/Typography';
import { ProductCard } from '@/components/ui/ProductCard';
import RevealText from '@/src/components/ui/reveal-text';
import { sanityFetch } from '@/lib/sanity';
import { FEATURED_PRODUCTS_QUERY } from '@/lib/queries';
import { mapSanityPerfume } from '@/lib/mappers';

export async function FeaturedMarquee() {
  let perfumes: PerfumeData[] = [];
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawData = await sanityFetch<any[]>({ query: FEATURED_PRODUCTS_QUERY });
    console.log("Raw Featured Products:", rawData);
    perfumes = rawData.map(mapSanityPerfume);
  } catch (error) {
    console.error("DEBUG Sanity Featured Fetch Error:", error);
    return null; // Falla silenciosamente, no rompe el layout
  }

  if (!perfumes || perfumes.length === 0) return null;

  return (
    <section className="w-full bg-[var(--color-dark)] py-[clamp(5rem,10vw,9rem)]">
      <div className="w-full px-6 text-center mb-[clamp(3rem,6vw,5rem)]">
        <RevealText 
          text="Descubrimientos Selectos" 
          as="h2" 
          className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-light text-[var(--color-text-light)]"
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
            priority={index < 3}
          />
        ))}
      </Marquee>
    </section>
  );
}
