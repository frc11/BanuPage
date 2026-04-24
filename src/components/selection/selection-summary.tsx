"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Truck, MessageCircle } from "lucide-react";
import { useSelectionStore } from "@/src/store/selection-store";

// ─── WhatsApp Icon ────────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 18 }: { size?: number }) {
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

// ─── Trust Items ──────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  { icon: Shield, label: "Perfumes 100% originales" },
  { icon: Truck, label: "Envíos a todo el país" },
  { icon: MessageCircle, label: "Respuesta en menos de 24hs" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function SelectionSummary() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const items = useSelectionStore((s) => s.items);
  const generateWhatsAppUrl = useSelectionStore((s) => s.generateWhatsAppUrl);
  const addToast = useSelectionStore((s) => s.addToast);

  // Suma referencial — sólo items con precio > 0
  const totalReferencial = items.reduce(
    (acc, item) => acc + (item.price > 0 ? item.price : 0),
    0
  );
  const hasKnownPrices = items.some((item) => item.price > 0);

  const handleWhatsApp = () => {
    if (items.length === 0) {
      addToast('Agregá al menos un perfume', 'info');
      return;
    }
    window.open(generateWhatsAppUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <div
      style={{
        position: "sticky",
        top: "80px",
        alignSelf: "flex-start",
      }}
    >
      {/* ── 1. Header ────────────────────────────────────────────── */}
      <div
        style={{
          paddingBottom: "1rem",
          borderBottom: "1px solid rgba(44,24,16,0.1)",
          marginBottom: "0",
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
          RESUMEN
        </p>
      </div>

      {/* ── 2. Lista compacta de items ───────────────────────────── */}
      <div>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "1rem",
              padding: "0.625rem 0",
              borderBottom: "1px solid rgba(44,24,16,0.06)",
            }}
          >
            {/* Nombre truncado */}
            <span
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.8rem",
                color: "var(--color-dark)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
                minWidth: 0,
              }}
            >
              {item.name}
            </span>

            {/* Precio */}
            <span
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.8rem",
                color: "var(--color-dark)",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {item.price > 0
                ? `ARS ${item.price.toLocaleString("es-AR")}`
                : "—"}
            </span>
          </div>
        ))}
      </div>

      {/* ── 3. Total referencial ─────────────────────────────────── */}
      {hasKnownPrices && (
        <>
          {/* Separador */}
          <div
            style={{
              height: "1px",
              backgroundColor: "var(--color-dark)",
              opacity: 0.15,
              margin: "1rem 0",
            }}
            aria-hidden="true"
          />

          <div>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-dark)",
                opacity: 0.4,
                marginBottom: "0.375rem",
              }}
            >
              TOTAL REFERENCIAL
            </p>

            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.1rem",
                fontWeight: 400,
                color: "var(--color-dark)",
                marginBottom: "0.5rem",
              }}
            >
              ARS {totalReferencial.toLocaleString("es-AR")}
            </p>

            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.65rem",
                color: "var(--color-dark)",
                opacity: 0.4,
                lineHeight: 1.6,
              }}
            >
              * Los precios pueden variar. Te confirmaremos el total por
              WhatsApp.
            </p>
          </div>
        </>
      )}

      {/* ── 4. CTA Principal con Tooltip ─────────────────────────── */}
      <div style={{ marginTop: "1.5rem", position: "relative" }}>
        {/* Tooltip */}
        <AnimatePresence>
          {isTooltipVisible && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease: "easeOut" as const }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 10px)",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(44,24,16,0.85)",
                color: "var(--color-cream)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.65rem",
                padding: "0.375rem 0.75rem",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 10,
              }}
              // Triángulo inferior
              role="tooltip"
              aria-live="polite"
            >
              Se abrirá WhatsApp con tu lista completa
              {/* Caret */}
              <span
                style={{
                  position: "absolute",
                  bottom: "-5px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "5px solid rgba(44,24,16,0.85)",
                }}
                aria-hidden="true"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón CTA */}
        <motion.button
          onClick={handleWhatsApp}
          onHoverStart={() => setIsTooltipVisible(true)}
          onHoverEnd={() => setIsTooltipVisible(false)}
          whileHover={{ backgroundColor: "#8B7355" }}
          transition={{ duration: 0.35, ease: "easeOut" as const }}
          aria-describedby={isTooltipVisible ? "wa-tooltip" : undefined}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.625rem",
            backgroundColor: "var(--color-dark)",
            color: "var(--color-text-light)",
            border: "none",
            padding: "1.25rem",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 0,
          }}
        >
          <WhatsAppIcon size={18} />
          CONSULTAR MI SELECCIÓN
        </motion.button>
      </div>

      {/* ── 5. Bloque de confianza ───────────────────────────────── */}
      <div
        style={{
          paddingTop: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.875rem",
        }}
        role="list"
        aria-label="Garantías de compra"
      >
        {TRUST_ITEMS.map(({ icon: Icon, label }) => (
          <div
            key={label}
            role="listitem"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
            }}
          >
            <Icon
              size={14}
              strokeWidth={1.5}
              style={{ color: "var(--color-gold)", flexShrink: 0 }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.72rem",
                color: "var(--color-dark)",
                opacity: 0.6,
                lineHeight: 1.4,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
