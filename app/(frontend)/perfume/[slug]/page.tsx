import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { sanityFetch } from "@/lib/sanity";
import {
  PRODUCT_BY_SLUG_QUERY,
  ALL_PRODUCT_SLUGS_QUERY,
} from "@/lib/queries";
import { mapSanityPerfume } from "@/lib/mappers";
import { ProductInfo } from "@/src/components/pdp/product-info";
import { ArabicPatternOverlay } from "@/components/ui/ArabicPattern";
import { BanuLogo } from "@/components/ui/BanuLogo";
import RevealImage from "@/src/components/ui/reveal-image";
import SuggestedProducts from "@/src/components/pdp/suggested-products-pdp";

// ─── Static Params (ISR + prerender en build) ─────────────────────────────────

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: ALL_PRODUCT_SLUGS_QUERY });
  return (slugs ?? []).map((slug) => ({ slug }));
}

// ─── Dynamic Metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const rawProduct = await sanityFetch<any>({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!rawProduct) {
    return { title: "Perfume no encontrado | Banū Scents" };
  }

  const product = mapSanityPerfume(rawProduct);
  const brandPrefix = product.brand?.title ? `${product.brand.title} · ` : "";
  const activePrice = product.price.isOnSale && product.price.discountPrice ? product.price.discountPrice : product.price.basePrice;
  const priceStr = activePrice > 0 ? ` — USD ${activePrice}` : "";

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

  const rawProduct = await sanityFetch<any>({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });

  // Hard 404 — no existe el producto o fue eliminado
  if (!rawProduct) notFound();

  // Normalización via Mapper (Arquitectura Defensiva)
  const product = mapSanityPerfume(rawProduct);

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
      priceCurrency: 'USD',
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
    <div style={{ background: 'var(--color-cream)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* LAYOUT SPLIT — dos columnas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '58% 42%',
        minHeight: '100vh',
        paddingTop: 'var(--navbar-height)'
      }}
      className="pdp-grid"
      >

        {/* COLUMNA IZQUIERDA — GALERÍA */}
        <div style={{
          position: 'sticky',
          top: 'var(--navbar-height)',
          height: 'calc(100vh - var(--navbar-height))',
          background: 'var(--color-cream-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {product.imageUrl ? (
            <RevealImage
              src={product.imageUrl}
              alt={product.name}
              fill
              priority
              style={{ objectFit: 'contain', padding: '8%' }}
            />
          ) : (
            // FALLBACK elegante cuando no hay imagen
              <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-[80px] opacity-20">
                <BanuLogo theme="light" />
              </div>
              </div>
          )}
        </div>

        {/* COLUMNA DERECHA — INFO */}
        <div style={{
          padding: 'clamp(3rem, 5vw, 5rem) clamp(2rem, 4vw, 4rem)',
          overflowY: 'auto'
        }}>
          <ProductInfo product={product} />
        </div>

      </div>

      {/* PRODUCTOS SUGERIDOS */}
      <SuggestedProducts currentId={product._id} />

    </div>
  )
}
