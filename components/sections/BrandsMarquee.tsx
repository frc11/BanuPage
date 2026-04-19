'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BrandData } from '@/types/sanity';
import { Marquee } from '@/components/ui/Marquee';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';

export interface BrandsMarqueeProps {
  brands: BrandData[];
}

const MIN_BRANDS_FOR_CAROUSEL = 5;
const BRAND_TILE_WIDTH = 'clamp(180px, 20vw, 320px)';
const BRAND_TILE_MIN_HEIGHT = 'clamp(110px, 12vw, 170px)';
const BRAND_LOGO_HEIGHT = 'clamp(54px, 7vw, 96px)';

interface BrandTileProps {
  brand: BrandData;
  onActivate: () => void;
}

function BrandTile({ brand, onActivate }: BrandTileProps) {
  return (
    <button
      onClick={onActivate}
      aria-label={`Ver perfumes de ${brand.name}`}
      style={{
        width: BRAND_TILE_WIDTH,
        minHeight: BRAND_TILE_MIN_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        opacity: 0.78,
        transition: 'opacity 220ms ease',
        padding: '0.75rem 1rem',
        flexShrink: 0,
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.opacity = '1';
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.opacity = '0.78';
      }}
    >
      {brand.logoUrl ? (
        <Image
          src={brand.logoUrl}
          alt={brand.name}
          width={400}
          height={120}
          unoptimized
          style={{
            width: 'auto',
            height: BRAND_LOGO_HEIGHT,
            maxWidth: '100%',
            objectFit: 'contain',
            filter: 'brightness(0)',
          }}
        />
      ) : (
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(1rem, 1.9vw, 1.8rem)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-dark)',
            opacity: 0.85,
            whiteSpace: 'nowrap',
          }}
        >
          {brand.name}
        </span>
      )}
    </button>
  );
}

export function BrandsMarquee({ brands }: BrandsMarqueeProps) {
  const router = useRouter();
  const sectionPaddingTop = 'var(--spacing-section-top)';
  const sectionPaddingBottom = 'var(--spacing-section-bottom)';

  if (!brands || brands.length === 0) return null;

  const isCarousel = brands.length >= MIN_BRANDS_FOR_CAROUSEL;

  return (
    <section
      className="w-full bg-[var(--color-cream)] overflow-hidden select-none px-[var(--spacing-section-x)] relative"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: sectionPaddingTop,
        paddingBottom: sectionPaddingBottom,
      }}
    >
      <ArabicPatternOverlay opacity={0.04} color="dark" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--spacing-sm)',
          width: '100%',
          textAlign: 'center',
          marginBottom: 'var(--spacing-lg)',
        }}
      >
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-[clamp(1.1rem,2.5vw,1.6rem)] tracking-[0.28em] uppercase text-[var(--color-gold)]"
          >
            Seleccion de Casas
          </motion.span>
        <div className="w-[58px] h-[1px] bg-[var(--color-gold)] opacity-45" />
      </div>

      {isCarousel ? (
        <div
          className="w-full"
          style={{
            overflow: 'hidden',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <Marquee speed={38} direction="left" align="center" className="hide-scrollbar [--marquee-gap:var(--spacing-md)] [--marquee-padding:0px]">
            {brands.map((brand) => (
              <BrandTile
                key={brand._id}
                brand={brand}
                onActivate={() => router.push(`/catalogo?marca=${encodeURIComponent(brand.name)}`)}
              />
            ))}
          </Marquee>
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            maxWidth: 'min(1880px, 96vw)',
            padding: '0',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${brands.length}, minmax(0, 1fr))`,
              alignItems: 'stretch',
              gap: 'var(--spacing-card)',
              width: '100%',
            }}
          >
            {brands.map((brand) => (
              <div
                key={brand._id}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <BrandTile
                  brand={brand}
                  onActivate={() => router.push(`/catalogo?marca=${encodeURIComponent(brand.name)}`)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
