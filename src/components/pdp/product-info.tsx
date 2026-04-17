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
import { PerformanceBars } from "@/src/components/ui/performance-bars";
import { Truck, Shield, MessageCircle, ChevronDown } from "lucide-react";

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

      {/* 7. Links de Servicio */}
      <div className="mt-8 flex flex-col gap-4 border-t border-[var(--color-dark)]/10 pt-8">
        <div className="flex items-center gap-3 text-[0.65rem] tracking-[0.1em] uppercase opacity-70">
          <Truck size={14} strokeWidth={1.5} className="text-[var(--color-gold)]" />
          <span>Envío prioritario a todo el país</span>
        </div>
        <div className="flex items-center gap-3 text-[0.65rem] tracking-[0.1em] uppercase opacity-70">
          <Shield size={14} strokeWidth={1.5} className="text-[var(--color-gold)]" />
          <span>Garantía de autenticidad BANŪ</span>
        </div>
        <div className="flex items-center gap-3 text-[0.65rem] tracking-[0.1em] uppercase opacity-70">
          <MessageCircle size={14} strokeWidth={1.5} className="text-[var(--color-gold)]" />
          <span>Asesoramiento olfativo personalizado</span>
        </div>
      </div>

      {/* 8. Descripción (Notas Olfativas como fallback) */}
      <div className="mt-10">
        <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase opacity-40 mb-4">Notas Olfativas</p>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-sans text-[0.65rem] tracking-[0.1em] uppercase opacity-60">Salida</span>
            <p className="font-serif text-[1rem] italic opacity-90">{product.notes.top}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-sans text-[0.65rem] tracking-[0.1em] uppercase opacity-60">Corazón</span>
            <p className="font-serif text-[1rem] italic opacity-90">{product.notes.heart}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-sans text-[0.65rem] tracking-[0.1em] uppercase opacity-60">Fondo</span>
            <p className="font-serif text-[1rem] italic opacity-90">{product.notes.base}</p>
          </div>
        </div>
      </div>

      {/* 9. PerformanceBars */}
      <div className="mt-10 pt-8 border-t border-[var(--color-dark)]/10">
        <PerformanceBars 
          longevity={product.performance.longevity} 
          projection={product.performance.projection} 
          theme="light"
        />
      </div>

      {/* 10. OccasionTags */}
      {product.tags && product.tags.length > 0 && (
        <div className="mt-4">
          <OccasionTags tags={product.tags} theme="light" />
        </div>
      )}

      {/* 11. Acordeones (Detalles, Envío) */}
      <div className="mt-10 flex flex-col">
        {[
          { id: 'details', title: 'Detalles del Producto', content: `Este perfume ha sido seleccionado por la curaduría de la bóveda BANŪ. Inspirado en ${product.inspiredBy || 'las fragancias más exclusivas'}, ofrece una experiencia sensorial única.` },
          { id: 'shipping', title: 'Política de Envío', content: 'Realizamos envíos a todo el territorio nacional mediante logística privada. El tiempo estimado de entrega es de 3 a 5 días hábiles.' }
        ].map((acc) => (
          <div key={acc.id} className="border-t border-[var(--color-dark)]/10">
            <details className="group">
              <summary className="flex items-center justify-between py-5 cursor-pointer list-none focus:outline-none">
                <span className="font-sans text-[0.7rem] tracking-[0.2em] uppercase opacity-80">{acc.title}</span>
                <ChevronDown size={14} className="opacity-40 transition-transform group-open:rotate-180" />
              </summary>
              <div className="pb-5 font-sans text-[0.8rem] leading-relaxed opacity-60 max-w-[90%]">
                {acc.content}
              </div>
            </details>
          </div>
        ))}
        <div className="border-t border-[var(--color-dark)]/10 w-full" />
      </div>

      {/* Hint contextual */}
      <p className="mt-10 font-sans text-[0.6rem] tracking-[0.12em] text-[var(--color-dark)] opacity-35 text-center leading-relaxed">
        {isInSelection
          ? "Click para quitar · Consultá tu selección completa desde el ícono de la bolsa"
          : "Agregá varios perfumes y consultá todo de una vez por WhatsApp"}
      </p>
    </div>
  );
}
