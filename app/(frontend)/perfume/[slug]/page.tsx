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
import type { PerfumeData } from "@/types/sanity";
import { ProductInfo } from "@/src/components/pdp/product-info";
import { ArabicPatternOverlay } from "@/components/ui/ArabicPattern";
import { BanuLogo } from "@/components/ui/BanuLogo";

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
  const product = await sanityFetch<PerfumeData | null>({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!product) {
    return { title: "Perfume no encontrado | Banū Scents" };
  }

  const brandPrefix = product.brand?.title ? `${product.brand.title} · ` : "";
  const priceStr =
    typeof product.price.basePrice === "number" && product.price.basePrice > 0
      ? ` — USD ${product.price.isOnSale && product.price.discountPrice ? product.price.discountPrice : product.price.basePrice}`
      : "";

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

  const product = await sanityFetch<PerfumeData | null>({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });

  // Hard 404 — no existe el producto o fue eliminado
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[var(--color-cream)] pt-[86px]">
      {/* Breadcrumb */}
      <div className="px-6 lg:px-12 py-6 border-b border-[var(--color-dark)]/8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[var(--color-dark)] opacity-40 hover:opacity-80 transition-opacity duration-200"
        >
          <ArrowLeft size={12} strokeWidth={1.5} />
          VOLVER AL CATÁLOGO
        </Link>
      </div>

      {/* Product Grid — 2 columnas en desktop, apilado en mobile */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* ── Columna Izquierda: Imagen ─────────────────────────────────── */}
        <div className="lg:sticky lg:top-[110px]">
          <div className="relative w-full aspect-[3/4] bg-[var(--color-cream-dark)] overflow-hidden">
            <ArabicPatternOverlay opacity={0.05} color="dark" />

            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                unoptimized
                priority
                className="object-contain p-12 relative z-10"
              />
            ) : (
              /* Fallback elegante cuando no hay imagen en el CMS */
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-32 opacity-25">
                  <BanuLogo theme="dark" />
                </div>
              </div>
            )}

            {/* Marca badge superpuesto — esquina superior izquierda */}
            {product.brand?.logoUrl && (
              <div className="absolute top-6 left-6 z-20 w-14 h-14 bg-white/80 backdrop-blur-sm flex items-center justify-center p-2">
                <Image
                  src={product.brand.logoUrl}
                  alt={product.brand.title}
                  width={40}
                  height={40}
                  unoptimized
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Nombre de marca debajo de imagen — sólo mobile */}
          {product.brand?.title && (
            <p className="lg:hidden mt-4 font-sans text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-gold)] text-center">
              {product.brand.title}
            </p>
          )}
        </div>

        {/* ── Columna Derecha: Info + CTAs (client component) ──────────── */}
        <div className="flex flex-col justify-center">
          <ProductInfo product={product} />
        </div>
      </section>

      {/* Ornamento inferior */}
      <div className="flex items-center justify-center py-16 opacity-20">
        <div className="w-12">
          <BanuLogo theme="dark" />
        </div>
      </div>
    </main>
  );
}
