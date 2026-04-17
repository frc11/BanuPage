"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useSelectionStore } from "@/src/store/selection-store";
import { BanuLogo } from "@/components/ui/BanuLogo";

// ─── Variants ─────────────────────────────────────────────────────────────────

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 380,
      damping: 38,
      mass: 0.9,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.28,
      ease: [0.32, 0, 0.67, 0] as [number, number, number, number],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

// ─── WhatsApp Icon ────────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 15 }: { size?: number }) {
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
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface SelectionMiniDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SelectionMiniDrawer({ isOpen, onClose }: SelectionMiniDrawerProps) {
  // Granular selectors — cada selector re-renderiza solo cuando su slice cambia
  const items = useSelectionStore((s) => s.items);
  const removeItem = useSelectionStore((s) => s.removeItem);
  const generateWhatsAppUrl = useSelectionStore((s) => s.generateWhatsAppUrl);

  const count = items.length;
  const whatsappUrl = generateWhatsAppUrl();

  // Cerrar con Escape
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const formatPrice = (price: number) =>
    price > 0 ? `USD ${price.toLocaleString("es-AR")}` : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mini-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.aside
            key="mini-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mi Selección"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-[91] w-full max-w-[420px] bg-[var(--color-dark)] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={16} strokeWidth={1.5} className="text-[var(--color-gold)]" />
                <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-[var(--color-cream)] opacity-80">
                  Mi Selección
                </span>
                {count > 0 && (
                  <span className="font-sans text-[0.65rem] bg-[var(--color-gold)] text-[var(--color-dark)] px-2 py-0.5 font-medium tracking-wider">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar selección"
                className="text-[var(--color-cream)] opacity-50 hover:opacity-100 transition-opacity duration-200"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto py-6 px-8 space-y-6">
              {count === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full gap-6 text-center"
                >
                  <div className="w-20 opacity-20">
                    <BanuLogo theme="light" />
                  </div>
                  <p className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[var(--color-cream)] opacity-40">
                    Tu selección está vacía
                  </p>
                </motion.div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                      layout
                      className="flex items-center gap-4 group"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-20 bg-[var(--color-cream-dark)]/80 shrink-0 overflow-hidden relative flex items-center justify-center">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            unoptimized
                            className="object-contain p-2"
                          />
                        ) : (
                          <div className="w-8 opacity-30">
                            <BanuLogo theme="dark" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        {item.brand && (
                          <p className="font-sans text-[0.6rem] tracking-[0.15em] uppercase text-[var(--color-cream)] opacity-40 mb-1">
                            {item.brand}
                          </p>
                        )}
                        <h4 className="font-serif text-[0.95rem] text-[var(--color-cream)] leading-[1.25] truncate">
                          {item.name}
                        </h4>
                        {formatPrice(item.price) ? (
                          <p className="font-sans text-[0.75rem] text-[var(--color-gold)] mt-1 font-medium">
                            {formatPrice(item.price)}
                          </p>
                        ) : (
                          <p className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-[var(--color-gold)]/60 mt-1">
                            Consultar
                          </p>
                        )}
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Quitar ${item.name}`}
                        className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity duration-200 text-[var(--color-cream)] shrink-0"
                      >
                        <X size={14} strokeWidth={1.5} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer CTAs */}
            <div className="px-8 py-6 border-t border-white/10 space-y-3">
              {/* Primary: WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={count === 0}
                onClick={count === 0 ? (e) => e.preventDefault() : undefined}
                className={`
                  w-full flex items-center justify-center gap-2.5
                  bg-[var(--color-gold)] border border-[var(--color-gold)]
                  py-4 px-6
                  font-sans text-[0.65rem] tracking-[0.25em] uppercase
                  text-[var(--color-dark)]
                  transition-all duration-300 ease-out
                  ${count > 0
                    ? "hover:bg-transparent hover:text-[var(--color-gold)] cursor-pointer"
                    : "opacity-30 cursor-not-allowed"
                  }
                `}
              >
                <WhatsAppIcon />
                CONSULTAR POR WHATSAPP
              </a>

              {/* Secondary: Página completa */}
              <Link
                href="/seleccion"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 border border-white/20 py-3 px-6 font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[var(--color-cream)] opacity-60 hover:opacity-100 hover:border-white/50 transition-all duration-200"
              >
                VER SELECCIÓN COMPLETA
                <ArrowRight size={12} strokeWidth={1.5} />
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
