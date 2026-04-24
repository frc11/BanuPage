import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { sanityFetch } from "@/lib/sanity";
import {
  PRODUCT_BY_SLUG_QUERY,
  ALL_PRODUCT_SLUGS_QUERY,
} from "@/lib/queries";
import { mapSanityPerfume } from "@/lib/mappers";
import { ProductInfo } from "@/src/components/pdp/product-info";
import { BanuLogo } from "@/components/ui/BanuLogo";
import SuggestedProducts from "@/src/components/pdp/suggested-products-pdp";
import { ArabicPatternOverlay } from "@/components/ui/ArabicPattern";
import ProductGallery from "@/src/components/pdp/product-gallery";

// ─── Static Params (ISR + prerender en build) ─────────────────────────────────

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<string[]>({ query: ALL_PRODUCT_SLUGS_QUERY });
    return (slugs ?? []).map((slug) => ({ slug }));
  } catch (error) {
    console.warn('[perfume/[slug]] generateStaticParams fallback:', error);
    return [];
  }
}

// ─── Dynamic Metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const rawProduct = await sanityFetch<unknown>({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!rawProduct) {
    return { title: "Perfume no encontrado | Banū Scents" };
  }

  const product = mapSanityPerfume(rawProduct as never);
  const brandPrefix = product.brand?.title ? `${product.brand.title} · ` : "";
  const activePrice = product.price.isOnSale && product.price.discountPrice ? product.price.discountPrice : product.price.basePrice;
  const priceStr = activePrice > 0 ? ` — ARS ${activePrice.toLocaleString("es-AR")}` : "";

  return {
    title: `${product.name} | ${brandPrefix}Banū Scents`,
    description: `${brandPrefix}${product.name}${priceStr}. Alta perfumería nicho y árabe. Agregá a tu selección y consultá por WhatsApp.`,
    openGraph: {
      title: `${product.name} | Banū Scents`,
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const rawProduct = await sanityFetch<unknown>({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!rawProduct) notFound();

  const product = mapSanityPerfume(rawProduct as never);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: {
      '@type': 'Brand',
      name: product.brand?.title ?? 'Banū Scents'
    },
    offers: {
      '@type': 'Offer',
      price: product.price?.basePrice ?? 0,
      priceCurrency: 'ARS',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Banū Scents'
      }
    },
    ...(product.imageUrl && { image: product.imageUrl }),
    ...(product.inspiredBy && { description: `Inspirado en ${product.inspiredBy}` })
  };

  return (
    <div style={{ background: 'var(--color-cream)', position: 'relative' }} data-navtheme="light">
      <ArabicPatternOverlay opacity={0.04} color="dark" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* LAYOUT SPLIT — dos columnas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '50% 50%',
          minHeight: 'var(--app-vh)',
          alignItems: 'start',
        }}
        className="pdp-grid"
      >
        {/* COLUMNA IZQUIERDA — sticky, imagen full */}
        <div style={{
          position: 'sticky',
          top: 'var(--navbar-height)',
          height: 'calc(var(--app-vh) - var(--navbar-height))',
          background: 'var(--color-cream-dark)',
          overflow: 'hidden',
          marginTop: 'var(--navbar-height)',
        }}>
          {product.imageUrl ? (
            <ProductGallery 
              images={[product.imageUrl, ...(product.gallery || [])].filter(Boolean) as string[]} 
              productName={product.name} 
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', opacity: 0.2 }}>
              <BanuLogo theme="light" />
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA — scrolleable */}
        <div
          className="pdp-info-column"
          style={{
          padding: 'clamp(3rem, 5vw, 5rem) clamp(2rem, 4vw, 4rem)',
          paddingTop: 'calc(var(--navbar-height) + clamp(3rem, 5vw, 5rem))',
        }}>
          <ProductInfo product={product} />
        </div>

      </div>

      {/* PRODUCTOS SUGERIDOS */}
      <SuggestedProducts currentId={product._id} />

    </div>
  )
}
