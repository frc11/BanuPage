"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSelectionStore } from "@/src/store/selection-store";

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// ─── Component ────────────────────────────────────────────────────────────────

export function SelectionList() {
  const items = useSelectionStore((s) => s.items);
  const removeItem = useSelectionStore((s) => s.removeItem);
  const clearSelection = useSelectionStore((s) => s.clearSelection);

  return (
    <div>
      {/* ── Header de columna ──────────────────────────────────────── */}
      <div
        style={{
          paddingBottom: "1rem",
          borderBottom: "1px solid rgba(44,24,16,0.1)",
          marginBottom: 0,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--color-dark)",
            opacity: 0.45,
          }}
        >
          TUS SELECCIONES
        </p>
      </div>

      {/* ── Lista animada ─────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            {/* Item row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                padding: "1.5rem 0",
                borderBottom: "1px solid rgba(44,24,16,0.08)",
              }}
            >
              {/* ── Imagen ────────────────────────────────────────── */}
              <Link
                href={`/perfume/${item.slug}`}
                aria-label={`Ver detalle de ${item.name}`}
                style={{
                  display: "block",
                  width: "90px",
                  height: "90px",
                  flexShrink: 0,
                  backgroundColor: "var(--color-cream-dark)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    unoptimized
                    style={{ objectFit: "contain", padding: "8px" }}
                  />
                ) : (
                  /* Placeholder sin imagen */
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0.2,
                      fontSize: "1.5rem",
                    }}
                  >
                    ◈
                  </div>
                )}
              </Link>

              {/* ── Info ──────────────────────────────────────────── */}
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: "0 1.5rem",
                }}
              >
                {item.brand && (
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-dark)",
                      opacity: 0.4,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {item.brand}
                  </p>
                )}

                <Link
                  href={`/perfume/${item.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "1rem",
                      fontWeight: 400,
                      color: "var(--color-dark)",
                      lineHeight: 1.3,
                      marginBottom: 0,
                      transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.opacity = "0.65")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.opacity = "1")
                    }
                  >
                    {item.name}
                  </h3>
                </Link>

                {item.price > 0 ? (
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.875rem",
                      color: "var(--color-dark)",
                      marginTop: "0.5rem",
                    }}
                  >
                    USD {item.price.toLocaleString("es-AR")}
                  </p>
                ) : (
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                      opacity: 0.7,
                      marginTop: "0.5rem",
                    }}
                  >
                    Consultar precio
                  </p>
                )}
              </div>

              {/* ── Acciones ──────────────────────────────────────── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexShrink: 0,
                  paddingTop: "0.125rem",
                }}
              >
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label={`Eliminar ${item.name} de la selección`}
                  style={{
                    background: "none",
                    border: "none",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "0.7rem",
                    color: "var(--color-dark)",
                    opacity: 0.45,
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    cursor: "pointer",
                    padding: 0,
                    transition: "opacity 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.opacity = "0.8")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.opacity = "0.45")
                  }
                >
                  Eliminar
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── Limpiar selección (cuando hay más de 1 item) ─────────── */}
      <AnimatePresence>
        {items.length > 1 && (
          <motion.div
            key="clear-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ marginTop: "2rem", textAlign: "center" }}
          >
            <button
              onClick={clearSelection}
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.7rem",
                color: "var(--color-dark)",
                opacity: 0.35,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                cursor: "pointer",
                padding: "0.25rem",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
            >
              Limpiar selección
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
