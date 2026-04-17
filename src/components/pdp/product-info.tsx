"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check } from "lucide-react";
import {
  useSelectionStore,
  useIsInSelection,
} from "@/src/store/selection-store";
import { PerfumeData } from "@/types/sanity";
import ProductBadge from "@/src/components/ui/product-badge";
import ProductPrice from "@/src/components/ui/product-price";
import OccasionTags from "@/src/components/ui/occasion-tags";

// ─── WhatsApp Icon ────────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    </svg>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProductInfoProps {
  product: PerfumeData;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductInfo({ product }: ProductInfoProps) {
  const addItem = useSelectionStore((s) => s.addItem);
  const removeItem = useSelectionStore((s) => s.removeItem);

  // Suscripción granular — solo re-renderiza cuando ESTE producto cambia de estado
  const isInSelection = useIsInSelection(product._id);

  // Precio formateado defensivo
  const activePrice = product.price.isOnSale && product.price.discountPrice ? product.price.discountPrice : product.price.basePrice;
  const formattedPrice =
    typeof activePrice === "number" && activePrice > 0
      ? `USD ${activePrice.toLocaleString("es-AR")}`
      : null;

  // WhatsApp — consulta directa de este producto individual
  const waMessage = `Hola Banū, quiero consultar sobre ${product.brand?.title ? `${product.brand.title} ` : ""}${product.name}`;
  const waUrl = `https://wa.me/5493814665503?text=${encodeURIComponent(waMessage)}`;

  // Toggle: agrega si no está, quita si ya está
  const handleSelectionToggle = () => {
    if (isInSelection) {
      removeItem(product._id);
    } else {
      addItem({
        id: product._id,
        name: product.name,
        brand: product.brand?.title ?? "",
        // El store requiere number — 0 dispara "Consultar" en el mensaje WA
        price: typeof product.price.basePrice === "number" && product.price.basePrice > 0 ? (product.price.isOnSale && product.price.discountPrice ? product.price.discountPrice : product.price.basePrice) : 0,
        slug: product.slug,
        // URL ya resuelta por GROQ — no se necesita urlFor()
        imageUrl: product.imageUrl ?? "",
      });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Badge MODO BESTIA, EDICIÓN LIMITADA, etc */}
      <ProductBadge badge={product.badge} theme="light" />

      {/* Marca */}
      {product.brand?.title && (
        <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-gold)] mb-3 mt-1">
          {product.brand.title}
        </span>
      )}

      {/* Nombre */}
      <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-normal text-[var(--color-dark)] leading-[1.1] mb-6">
        {product.name}
      </h1>

      {/* Precio */}
      <div className="mb-10 pb-8 border-b border-[var(--color-dark)]/10">
        <ProductPrice 
          basePrice={product.price?.basePrice}
          discountPrice={product.price?.discountPrice}
          isOnSale={product.price?.isOnSale}
          theme="light"
          size="lg"
        />
      </div>

      {/* Tags de Ocasión */}
      {product.tags && product.tags.length > 0 && (
        <OccasionTags tags={product.tags} theme="light" />
      )}

      {/* ── CTAs ─────────────────────────────────────────────────────────── */}

      {/* PRIMARIO — Agregar / Quitar de la selección */}
      <button
        id={`pdp-selection-btn-${product._id}`}
        onClick={handleSelectionToggle}
        aria-label={
          isInSelection
            ? `Quitar ${product.name} de mi selección`
            : `Agregar ${product.name} a mi selección`
        }
        className={`
          w-full flex items-center justify-center gap-3
          px-8 py-4
          font-sans text-[0.75rem] tracking-[0.2em] uppercase
          transition-colors duration-300 ease-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2
          overflow-hidden relative
          ${
            isInSelection
              ? "bg-[var(--color-gold)] text-[var(--color-text-light)]"
              : "bg-[var(--color-dark)] text-[var(--color-text-light)] hover:bg-[var(--color-gold)]"
          }
        `}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isInSelection ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              <Check size={16} strokeWidth={2} />
              EN TU SELECCIÓN
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              <Plus size={16} strokeWidth={2} />
              AGREGAR A MI SELECCIÓN
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* SECUNDARIO — Consulta directa solo de este perfume */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Consultar por WhatsApp sobre ${product.name}`}
        className="
          mt-3 w-full flex items-center justify-center gap-3
          border border-[var(--color-dark)] px-8 py-4 bg-transparent
          font-sans text-[0.75rem] tracking-[0.2em] uppercase
          text-[var(--color-dark)]
          transition-all duration-300 ease-out
          hover:bg-[var(--color-dark)] hover:text-[var(--color-text-light)]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dark)] focus-visible:ring-offset-2
        "
      >
        <WhatsAppIcon />
        CONSULTAR ESTE PERFUME
      </a>

      {/* Hint contextual */}
      <p className="mt-5 font-sans text-[0.6rem] tracking-[0.12em] text-[var(--color-dark)] opacity-35 text-center leading-relaxed">
        {isInSelection
          ? "Click para quitar · Consultá tu selección completa desde el ícono de la bolsa"
          : "Agregá varios perfumes y consultá todo de una vez por WhatsApp"}
      </p>
    </div>
  );
}
