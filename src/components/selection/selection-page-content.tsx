"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelectionStore } from "@/src/store/selection-store";
import { useHydrated } from "@/src/hooks/use-hydrated";
import { SelectionList } from "@/src/components/selection/selection-list";
import { SelectionSummary } from "@/src/components/selection/selection-summary";
import { SuggestedProducts } from "@/src/components/selection/suggested-products";
import RevealText from "@/src/components/ui/reveal-text";
import type { PerfumeData } from "@/types/sanity";

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center"
      role="status"
      aria-label="Selección vacía"
    >
      {/* Logo decorativo */}
      <div style={{ width: 60, height: 60, opacity: 0.15, marginBottom: "2rem" }}>
        <Image
          src="/logoSVG.svg"
          alt="Banū Scents"
          width={60}
          height={60}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Título */}
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--color-dark)",
          opacity: 0.4,
          marginBottom: "1.25rem",
        }}
      >
        TU SELECCIÓN ESTÁ VACÍA
      </p>

      {/* Descripción */}
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "0.875rem",
          color: "var(--color-dark)",
          opacity: 0.5,
          maxWidth: "300px",
          lineHeight: 1.6,
          marginBottom: "2.5rem",
        }}
      >
        Explorá nuestro catálogo y agregá los perfumes que te interesen.
      </p>

      {/* CTA */}
      <Link
        href="/"
        style={{
          display: "inline-block",
          border: "1px solid var(--color-dark)",
          backgroundColor: "transparent",
          color: "var(--color-dark)",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          padding: "0.875rem 2.5rem",
          textDecoration: "none",
          transition: "background-color 0.25s ease, color 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-dark)";
          e.currentTarget.style.color = "var(--color-text-light)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "var(--color-dark)";
        }}
      >
        IR AL CATÁLOGO
      </Link>
    </div>
  );
}

// ─── Filled State — layout 2 columnas ────────────────────────────────────────

function FilledState({ count }: { count: number }) {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)",
      }}
    >
      {/* Header de página */}
      <header style={{ textAlign: "center", paddingBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}>
          <RevealText 
            text="Mi Selección" 
            as="h1" 
            className="font-serif font-light text-[var(--color-dark)] leading-[1.1] text-[clamp(2rem,4vw,3rem)]"
          />
        </div>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.75rem",
            color: "var(--color-dark)",
            opacity: 0.5,
          }}
        >
          {count} {count === 1 ? "perfume seleccionado" : "perfumes seleccionados"}
        </p>
      </header>

      {/* Separador */}
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "var(--color-dark)",
          opacity: 0.1,
          marginBottom: "clamp(2rem, 4vw, 3rem)",
        }}
        aria-hidden="true"
      />

      {/* Grid 2 columnas desktop / 1 columna mobile */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(2rem, 4vw, 3rem)",
        }}
        className="lg:grid-cols-[60fr_40fr]"
      >
        {/* Columna izquierda — Lista de productos (S5.2) */}
        <div>
          <SelectionList />
        </div>

        {/* Columna derecha — Resumen + CTAs (S5.3) */}
        <div className="lg:sticky lg:top-[110px] lg:self-start">
          <SelectionSummary />
        </div>
      </div>
    </div>
  );
}

interface SelectionPageContentProps {
  allFeatured: PerfumeData[];
}

export function SelectionPageContent({ allFeatured }: SelectionPageContentProps) {
  const count = useSelectionStore((s) => s.items.length);
  const mounted = useHydrated();

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-cream)",
        paddingTop: "86px", // Navbar (36px topbar + 50px nav)
      }}
    >
      {/* Guard: esperar hidratación del store para evitar mismatch con localStorage */}
      {mounted ? (
        <>
          {count === 0 ? <EmptyState /> : <FilledState count={count} />}
          {/* Sugerencias: visibles en ambos estados — descubrimiento y upsell */}
          <SuggestedProducts allFeatured={allFeatured} />
        </>
      ) : (
        /* Skeleton mínimo — misma altura que el empty state para evitar layout shift */
        <div style={{ minHeight: "60vh" }} aria-hidden="true" />
      )}
    </main>
  );
}

