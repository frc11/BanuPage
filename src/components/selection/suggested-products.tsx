"use client";

import React from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { useSelectionStore } from "@/src/store/selection-store";
import type { PerfumeData } from "@/types/sanity";

interface SuggestedProductsProps {
  /** Todos los productos featured — filtrado de los ya seleccionados se hace aquí */
  allFeatured: PerfumeData[];
}

export function SuggestedProducts({ allFeatured }: SuggestedProductsProps) {
  const items = useSelectionStore((s) => s.items);

  // Excluir los que ya están en la selección y tomar los primeros 4
  const toShow = allFeatured
    .filter((p) => !items.some((i) => i.id === p._id))
    .slice(0, 4);

  // Si todos ya están seleccionados, ocultar la sección completa
  if (toShow.length === 0) return null;

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "var(--color-dark)",
        padding: "clamp(4rem, 8vw, 6rem) 0",
      }}
      aria-label="Productos sugeridos"
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--color-text-light)",
            opacity: 0.45,
            marginBottom: "0.9rem",
          }}
        >
          TAMBIÉN TE PUEDE INTERESAR
        </p>
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 300,
            color: "var(--color-text-light)",
            letterSpacing: "0.02em",
            opacity: 0.85,
            margin: 0,
          }}
        >
          Explorá el Catálogo
        </p>
      </div>

      {/* Grid de productos */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 4vw, 3rem)",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(1rem, 2vw, 1.5rem)",
        }}
        className="lg:grid-cols-4"
      >
        {toShow.map((product, index) => (
          <ProductCard 
            key={product._id} 
            product={product} 
            theme="dark" 
            index={index}
            showPerformance={false}
            showButton={false}
          />
        ))}
      </div>
    </section>
  );
}
