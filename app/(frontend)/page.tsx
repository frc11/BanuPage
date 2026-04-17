import { sanityFetch } from '@/lib/sanity';
import {
  HERO_QUERY,
  BRANDS_QUERY,
  FEATURED_PRODUCTS_QUERY,
  TRUST_ITEMS_QUERY,
  FAQ_ITEMS_QUERY,
  REVIEWS_QUERY,
} from '@/lib/queries';
import type {
  HeroSectionData,
  BrandData,
  PerfumeData,
  TrustItemData,
  FaqItemData,
  ReviewData,
} from '@/types/sanity';

import { Hero } from '@/components/sections/Hero';
import { BrandsMarquee } from '@/components/sections/BrandsMarquee';
import { FeaturedMarquee } from '@/components/sections/FeaturedMarquee';
import { TrustAndFaq } from '@/components/sections/TrustAndFaq';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { SectionDivider } from '@/src/components/ui/section-divider';

export default async function Home() {
  // Execución paralela de todas las consultas GROQ para minimizar latencia SSR
  const [heroData, brandsData, productsData, trustData, faqData, reviewsData] = await Promise.all([
    sanityFetch<HeroSectionData>({ query: HERO_QUERY }),
    sanityFetch<BrandData[]>({ query: BRANDS_QUERY }),
    sanityFetch<PerfumeData[]>({ query: FEATURED_PRODUCTS_QUERY }),
    sanityFetch<TrustItemData[]>({ query: TRUST_ITEMS_QUERY }),
    sanityFetch<FaqItemData[]>({ query: FAQ_ITEMS_QUERY }),
    sanityFetch<ReviewData[] | null>({ query: REVIEWS_QUERY }),
  ]);

  console.log("Raw Hero Data:", heroData);

  return (
    <main className="relative flex flex-col items-center bg-[var(--color-cream)] w-full overflow-hidden">
      <Hero
        title={heroData?.title}
        subtitle={heroData?.subtitle}
        videoUrls={heroData?.videoUrls ?? []}
      />
      
      <SectionDivider variant="pattern" from="dark" to="cream" />
      
      <BrandsMarquee />
      
      <SectionDivider variant="pattern" from="cream" to="dark" />
      
      <FeaturedMarquee />
      
      <SectionDivider variant="line" from="dark" to="dark" />
      
      <TrustAndFaq trustItems={trustData} faqItems={faqData} />
      
      <SectionDivider variant="pattern" from="dark" to="cream" />
      
      <ReviewsSection reviews={reviewsData} />
      
      <SectionDivider variant="pattern" from="cream" to="dark" />
    </main>
  );
}
