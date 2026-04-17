import React from 'react';
import Image from 'next/image';
import { BrandData } from '@/types/sanity';
import { sanityFetch } from '@/lib/sanity';
import { BRANDS_QUERY } from '@/lib/queries';

export async function BrandsMarquee() {
  let brands: BrandData[] = [];

  try {
    brands = await sanityFetch<BrandData[]>({ query: BRANDS_QUERY });
  } catch (error) {
    console.error("Error fetching brands:", error);
    return null; // Falla silenciosamente
  }

  if (!brands || brands.length === 0) return null;
  
  // Duplicar el contenido para un seamless loop de 0 a -50%
  const marqueeContent = [...brands, ...brands];

  return (
    <section className="w-full bg-[var(--color-cream)] h-auto min-h-[60px] md:min-h-[80px] overflow-hidden flex flex-col justify-center relative select-none">
      
      {/* Label Box */}
      <div className="w-full flex justify-center z-10 pointer-events-none">
        
        <div style={{ paddingTop: '1.5rem', paddingBottom: '0.75rem' }} className="flex flex-col items-center gap-2">
          <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-gold)]">
             Selección de Casas
          </span>
          <div className="w-[40px] h-[1px] bg-[var(--color-gold)] opacity-40" />
        </div>
      </div>

      {/* Track Wrapper con Mask Image */}
      <div className="w-full relative flex items-center pb-[1.5rem] group"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex flex-nowrap items-center whitespace-nowrap min-w-max hover:[animation-play-state:paused] cursor-default"
          style={{ animation: 'marqueeHero 35s linear infinite' }}
        >
          {marqueeContent.map((brand, index) => (
            <React.Fragment key={`${brand._id}-${index}`}>
              <div className="flex items-center justify-center shrink-0">
                {brand.logoUrl ? (
                  <div className="relative h-[24px]">
                    <Image
                      src={brand.logoUrl}
                      alt={brand.name}
                      width={100}
                      height={24}
                      className="h-[24px] w-auto object-contain opacity-60 mix-blend-multiply grayscale brightness-0"
                      unoptimized
                    />
                  </div>
                ) : (
                  <span className="font-serif text-[1.1rem] tracking-[0.15em] text-[var(--color-dark)] opacity-70 font-normal uppercase">
                    {brand.name}
                  </span>
                )}
              </div>

              {/* Separador */}
              <span className="font-serif text-[1rem] text-[var(--color-gold)] opacity-50 shrink-0 select-none" style={{ margin: '0 2.5rem' }}>
                ·
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeHero {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
