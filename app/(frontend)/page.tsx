import { sanityFetch } from '@/lib/sanity';
import {
  HERO_QUERY,
  BRANDS_QUERY,
  FEATURED_PRODUCTS_QUERY,
  FAQ_ITEMS_QUERY,
  REVIEWS_QUERY,
} from '@/lib/queries';
import type {
  HeroSectionData,
  BrandData,
  PerfumeData,
  FaqItemData,
  ReviewData,
} from '@/types/sanity';

import { Hero } from '@/components/sections/Hero';
import { BrandsMarquee } from '@/components/sections/BrandsMarquee';
import { FeaturedMarquee } from '@/components/sections/FeaturedMarquee';
import { TrustSection } from '@/components/sections/TrustSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { SectionDivider } from '@/src/components/ui/section-divider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inicio',
  description:
    'Descubrí el arte del perfume árabe. Fragancias auténticas de las mejores casas orientales, disponibles en Argentina.',
  openGraph: {
    type: 'website',
  },
};

export default async function Home() {
  // Ejecución paralela de consultas GROQ para minimizar latencia SSR
  const [heroData, brandsData, productsData, faqData, reviewsData] = await Promise.all([
    sanityFetch<HeroSectionData>({ query: HERO_QUERY }),
    sanityFetch<BrandData[]>({ query: BRANDS_QUERY }),
    sanityFetch<PerfumeData[]>({ query: FEATURED_PRODUCTS_QUERY }),
    sanityFetch<FaqItemData[]>({ query: FAQ_ITEMS_QUERY }),
    sanityFetch<ReviewData[] | null>({ query: REVIEWS_QUERY }),
  ]);

  const heroTitle = heroData?.title?.trim() ?? '';
  const hasHeroContent = heroTitle !== '' && heroTitle.toLowerCase() !== 'hola';

  return (
    <main className="relative flex flex-col items-center bg-[var(--color-cream)] w-full overflow-hidden">
      {/* 1. Hero */}
      <Hero
        title={heroData?.title}
        subtitle={heroData?.subtitle}
        videoUrls={heroData?.videoUrls ?? []}
        showContent={hasHeroContent}
      />

      <SectionDivider variant="pattern" from="dark" to="cream" />

      {/* 2. Marcas */}
      <BrandsMarquee brands={brandsData ?? []} />

      <SectionDivider variant="pattern" from="cream" to="dark" />

      {/* 3. Productos destacados — dark */}
      <FeaturedMarquee products={productsData ?? []} />

      {/* dark → cream: perfumes a porque banu */}
      <SectionDivider variant="pattern" from="dark" to="cream" />

      {/* 4. ¿Por qué elegir Banū? — cream */}
      <TrustSection trustItems={null} />

      {/* 5. Testimonios — solo si hay datos (cream → dark) */}
      {reviewsData && reviewsData.length > 0 && (
        <>
          <SectionDivider variant="pattern" from="cream" to="dark" />
          <ReviewsSection reviews={reviewsData} />
          {/* dark → cream para FAQ */}
          <SectionDivider variant="pattern" from="dark" to="cream" />
        </>
      )}

      {/* 6. FAQ — cream si hay reviews, dark si no hay */}
      {reviewsData && reviewsData.length > 0 ? (
        <>
          <FaqSection faqItems={faqData} theme="light" />
        </>
      ) : (
        <>
          {/* cream → dark: porque banu a faq sin testimonios */}
          <SectionDivider variant="pattern" from="cream" to="dark" />
          <FaqSection faqItems={faqData} theme="dark" />
        </>
      )}
    </main>
  );
}
