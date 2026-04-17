"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BrandData } from '@/types/sanity';

export interface BrandsMarqueeProps {
  brands: BrandData[];
}

export function BrandsMarquee({ brands }: BrandsMarqueeProps) {
  if (!brands || brands.length === 0) return null;
  const router = useRouter();

  // Duplicar x2 para seamless loop 0 → -50%
  const marqueeContent = [...brands, ...brands];

  return (
    <section
      className="w-full bg-[var(--color-cream)] overflow-hidden select-none"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/* Label Box */}
      <div
        style={{
          paddingTop: '1.5rem',
          paddingBottom: '0.75rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-gold)]"
        >
          Selección de Casas
        </motion.span>
        <div className="w-[40px] h-[1px] bg-[var(--color-gold)] opacity-40" />
      </div>

      {/* Track Wrapper con Mask Image */}
      <div
        className="w-full relative group"
        style={{
          paddingBottom: '1.5rem',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          overflow: 'hidden',
        }}
      >
        <div
          className="flex flex-nowrap items-center whitespace-nowrap min-w-max"
          style={{ animation: 'marquee-brands 35s linear infinite' }}
        >
          {marqueeContent.map((brand, index) => (
            <React.Fragment key={`${brand._id}-${index}`}>
              {/* Logo clickeable */}
              <div
                onClick={() => router.push(`/catalogo?marca=${encodeURIComponent(brand.name)}`)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 2.5rem',
                  opacity: 0.6,
                  transition: 'opacity 300ms ease',
                  flexShrink: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                aria-label={`Ver perfumes de ${brand.name}`}
                role="button"
                tabIndex={index < brands.length ? 0 : -1}
              >
                {brand.logoUrl ? (
                  <Image
                    src={brand.logoUrl}
                    alt={brand.name}
                    width={150}
                    height={50}
                    unoptimized
                    style={{
                      objectFit: 'contain',
                      height: '36px',
                      width: 'auto',
                      filter: 'brightness(0)',
                    }}
                  />
                ) : (
                  <span className="font-serif text-[1.1rem] tracking-[0.15em] text-[var(--color-dark)] opacity-70 font-normal uppercase">
                    {brand.name}
                  </span>
                )}
              </div>

              {/* Separador */}
              <span
                className="font-serif text-[1rem] text-[var(--color-gold)] opacity-30 shrink-0 select-none"
              >
                ◆
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-brands {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      ` }} />
    </section>
  );
}
