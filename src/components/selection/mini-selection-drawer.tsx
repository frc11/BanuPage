"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useSelectionStore } from "@/src/store/selection-store";
import { useHydrated } from "@/src/hooks/use-hydrated";

// ─── Types ────────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const drawerVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: EASE },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.25, ease: EASE },
  },
};

// ─── WhatsApp Icon ────────────────────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg
      width={15}
      height={15}
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

// ─── Component ────────────────────────────────────────────────────────────────

export function MiniSelectionDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const mounted = useHydrated();

  const items = useSelectionStore((s) => s.items);
  const isOpen = useSelectionStore((s) => s.isOpen);
  const closeDrawer = useSelectionStore((s) => s.closeDrawer);
  const generateWhatsAppUrl = useSelectionStore((s) => s.generateWhatsAppUrl);

  // Auto-cerrar cuando el usuario llega a /seleccion
  useEffect(() => {
    if (pathname === "/seleccion" && isOpen) {
      closeDrawer();
    }
  }, [pathname, isOpen, closeDrawer]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => { 
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // ── Hydration guard ─────────────────────────────────────────────────────────
  // El store persist lee de localStorage solo en el cliente.
  // Retornar null hasta que el primer useEffect se ejecute garantiza
  // que servidor y cliente renderizan el mismo output inicial.
  if (!mounted) return null;

  // El último item agregado es el más reciente del array
  const lastItem = items.length > 0 ? items[items.length - 1] : null;
  const count = items.length;

  const handleWhatsApp = () => {
    window.open(generateWhatsAppUrl(), "_blank", "noopener,noreferrer");
  };

  const handleViewSelection = () => {
    closeDrawer();
    router.push("/seleccion");
  };

  return (
    <>
      {/* ── Overlay mobile-only ────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mini-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 bg-[rgba(44,24,16,0.4)]"
            style={{ zIndex: 'calc(var(--z-selection-drawer) - 1)' }}
            onClick={closeDrawer}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Drawer ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && lastItem && (
          <motion.aside
            key="mini-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mi Selección"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.3 }}
            onDragEnd={(_, info) => {
              // Si recarga a la derecha y rebota
              if (info.offset.x > 80) closeDrawer();
            }}
            className="fixed-bottom"
            style={{
              position: "fixed",
              top: "var(--navbar-height)",
              right: 0,
              zIndex: "var(--z-selection-drawer)",
              width: "380px",
              maxWidth: "100vw",
              maxHeight: "calc(100vh - var(--navbar-height))",
              overflowY: "auto",
              backgroundColor: "var(--color-cream)",
              boxShadow: "-4px 0 24px rgba(44,24,16,0.12)",
            }}
          >
            {/* ── Header ────────────────────────────────────────────────── */}
            <div
              style={{
                position: "relative",
                padding: "1.5rem",
                borderBottom: "1px solid rgba(44,24,16,0.1)",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--color-dark)",
                }}
              >
                MI SELECCIÓN
              </span>

              {/* Botón cerrar */}
              <button
                onClick={closeDrawer}
                aria-label="Cerrar selección"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  width: "32px",
                  height: "32px",
                  backgroundColor: "var(--color-dark)",
                  color: "var(--color-text-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 0,
                  flexShrink: 0,
                }}
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>

            {/* ── Último item agregado ──────────────────────────────────── */}
            <div style={{ padding: "1.5rem" }}>
              {/* Label */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-dark)",
                  opacity: 0.45,
                  marginBottom: "0.75rem",
                }}
              >
                SE HA AGREGADO A TU SELECCIÓN
              </p>

              {/* Item row */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {/* Thumbnail 60×60 */}
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    flexShrink: 0,
                    backgroundColor: "var(--color-cream-dark)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {lastItem.imageUrl ? (
                    <Image
                      src={lastItem.imageUrl}
                      alt={lastItem.name}
                      fill
                      unoptimized
                      style={{ objectFit: "contain", padding: "4px" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0.25,
                      }}
                    >
                      <span style={{ fontSize: "1.5rem" }}>◈</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {lastItem.brand && (
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {lastItem.brand}
                    </p>
                  )}
                  <h4
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "0.95rem",
                      fontWeight: 400,
                      color: "var(--color-dark)",
                      lineHeight: 1.3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {lastItem.name}
                  </h4>
                  {lastItem.price > 0 ? (
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.85rem",
                        color: "var(--color-dark)",
                        marginTop: "0.25rem",
                        fontWeight: 500,
                      }}
                    >
                      USD {lastItem.price.toLocaleString("es-AR")}
                    </p>
                  ) : (
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                        marginTop: "0.25rem",
                        opacity: 0.7,
                      }}
                    >
                      Consultar precio
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Contador (si hay más de 1 item) ──────────────────────── */}
            {count > 1 && (
              <div
                style={{
                  padding: "0.75rem 1.5rem",
                  borderTop: "1px solid rgba(44,24,16,0.08)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "0.75rem",
                    color: "var(--color-dark)",
                    opacity: 0.6,
                  }}
                >
                  {count} perfumes en tu selección
                </p>
              </div>
            )}

            {/* ── CTAs ──────────────────────────────────────────────────── */}
            <div
              style={{
                padding: "1.5rem",
                paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {/* 1 — CONSULTAR POR WHATSAPP */}
              <button
                onClick={handleWhatsApp}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.625rem",
                  backgroundColor: "var(--color-dark)",
                  color: "var(--color-text-light)",
                  border: "none",
                  padding: "1rem",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: 0,
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <WhatsAppIcon />
                CONSULTAR MI SELECCIÓN
              </button>

              {/* 2 — VER MI SELECCIÓN */}
              <button
                onClick={handleViewSelection}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  color: "var(--color-dark)",
                  border: "1px solid var(--color-dark)",
                  padding: "1rem",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: 0,
                  transition: "background-color 0.2s ease, color 0.2s ease",
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
                VER MI SELECCIÓN
              </button>

              {/* 3 — SEGUIR EXPLORANDO */}
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={closeDrawer}
                  style={{
                    background: "none",
                    border: "none",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "0.75rem",
                    color: "var(--color-dark)",
                    opacity: 0.5,
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    cursor: "pointer",
                    padding: "0.25rem",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
                >
                  Seguir explorando
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
