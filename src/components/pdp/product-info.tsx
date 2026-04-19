"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// ─── Divider ─────────────────────────────────────────────────────────────────

function Divider({ spacing = '2rem' }: { spacing?: string }) {
  return (
    <div style={{
      width: '100%',
      height: '1px',
      background: 'var(--color-dark)',
      opacity: 0.08,
      margin: `${spacing} 0`,
    }} />
  );
}

// ─── Animated Accordion ───────────────────────────────────────────────────────

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

function AccordionPanel({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      {items.map((acc) => {
        const isOpen = openId === acc.id;
        return (
          <div key={acc.id} style={{ borderTop: '1px solid rgba(44,24,16,0.08)' }}>
            <button
              onClick={() => setOpenId(isOpen ? null : acc.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 0',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
              }}
              aria-expanded={isOpen}
            >
              <span style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-dark)',
                opacity: 0.7,
              }}>
                {acc.title}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <ChevronDown size={14} style={{ opacity: 0.4 }} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{
                    paddingBottom: '1.25rem',
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.82rem',
                    lineHeight: 1.75,
                    color: 'var(--color-dark)',
                    opacity: 0.6,
                    maxWidth: '90%',
                  }}>
                    {acc.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      <div style={{ borderTop: '1px solid rgba(44,24,16,0.08)' }} />
    </div>
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
  const isInSelection = useIsInSelection(product._id);

  const waMessage = `Hola Banū, quiero consultar sobre ${product.brand?.title ? `${product.brand.title} ` : ""}${product.name}`;
  const waUrl = `https://wa.me/5493814665503?text=${encodeURIComponent(waMessage)}`;

  const handleSelectionToggle = () => {
    if (isInSelection) {
      removeItem(product._id);
    } else {
      addItem({
        id: product._id,
        name: product.name,
        brand: product.brand?.title ?? "",
        price:
          typeof product.price.basePrice === "number" && product.price.basePrice > 0
            ? product.price.isOnSale && product.price.discountPrice
              ? product.price.discountPrice
              : product.price.basePrice
            : 0,
        slug: product.slug,
        imageUrl: product.imageUrl ?? "",
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* ── BADGE ── */}
      <ProductBadge badge={product.badge} theme="light" />

      {/* ── MARCA ── */}
      {product.brand?.title && (
        <span style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.7rem',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          marginBottom: '0.75rem',
          marginTop: product.badge ? '0.5rem' : '0',
          opacity: 0.85,
        }}>
          {product.brand.title}
        </span>
      )}

      {/* ── NOMBRE ── */}
      <h1 style={{
        fontFamily: 'var(--font-cormorant)',
        fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
        fontWeight: 300,
        color: 'var(--color-dark)',
        lineHeight: 1.08,
        marginBottom: '1rem',
        letterSpacing: '-0.01em',
      }}>
        {product.name}
      </h1>

      {/* ── INSPIRADO EN ── */}
      {product.inspiredBy && (
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.78rem',
          fontStyle: 'italic',
          color: 'var(--color-gold)',
          opacity: 0.75,
          marginBottom: '0',
        }}>
          Inspirado en {product.inspiredBy}
        </p>
      )}

      <Divider spacing="1.75rem" />

      {/* ── PRECIO ── */}
      <div style={{ marginBottom: '2rem' }}>
        <ProductPrice
          basePrice={product.price?.basePrice}
          discountPrice={product.price?.discountPrice}
          isOnSale={product.price?.isOnSale}
          theme="light"
          size="lg"
        />
      </div>

      {/* ── CTA: AGREGAR ── */}
      <motion.button
        onClick={handleSelectionToggle}
        whileHover={{ opacity: 0.88 }}
        style={{
          width: '100%',
          background: isInSelection ? 'var(--color-gold)' : 'var(--color-dark)',
          color: 'var(--color-cream)',
          border: 'none',
          padding: '1.15rem 2rem',
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.75rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.625rem',
          transition: 'background 300ms ease',
          marginBottom: '0.875rem',
        }}
      >
        <AnimatePresence mode="wait">
          {isInSelection ? (
            <motion.span key="added" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.18 }}>
              ✓ En tu selección
            </motion.span>
          ) : (
            <motion.span key="add" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.18 }}>
              + Agregar a mi selección
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── CTA: WHATSAPP ── */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.625rem',
          width: '100%',
          padding: '1.15rem 2rem',
          border: '1px solid rgba(44,24,16,0.25)',
          color: 'var(--color-dark)',
          background: 'transparent',
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.75rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'background 300ms ease, border-color 300ms ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(44,24,16,0.05)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
      >
        <WhatsAppIcon size={16} />
        Consultar por WhatsApp
      </a>

      <Divider spacing="2rem" />

      {/* ── GARANTÍAS ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { icon: <Truck size={15} strokeWidth={1.5} />, text: 'Envío prioritario a todo el país' },
          { icon: <Shield size={15} strokeWidth={1.5} />, text: 'Garantía de autenticidad BANŪ' },
          { icon: <MessageCircle size={15} strokeWidth={1.5} />, text: 'Asesoramiento olfativo personalizado' },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <span style={{ color: 'var(--color-gold)', opacity: 0.8, flexShrink: 0 }}>{icon}</span>
            <span style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-dark)',
              opacity: 0.6,
            }}>
              {text}
            </span>
          </div>
        ))}
      </div>

      <Divider spacing="2.5rem" />

      {/* ── NOTAS OLFATIVAS ── */}
      <div>
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.62rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--color-dark)',
          opacity: 0.38,
          marginBottom: '1.75rem',
        }}>
          Notas Olfativas
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
          {[
            { label: 'Salida', notes: product.notes.top },
            { label: 'Corazón', notes: product.notes.heart },
            { label: 'Fondo', notes: product.notes.base },
          ].map(({ label, notes }) => (
            <div key={label}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-dark)',
                opacity: 0.45,
                marginBottom: '0.5rem',
              }}>
                {label}
              </span>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1rem',
                fontStyle: 'italic',
                color: 'var(--color-dark)',
                lineHeight: 1.45,
                opacity: 0.85,
              }}>
                {notes}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Divider spacing="2.5rem" />

      {/* ── PERFORMANCE BARS ── */}
      <PerformanceBars
        longevity={product.performance.longevity}
        projection={product.performance.projection}
        theme="light"
      />

      {/* ── OCCASION TAGS ── */}
      {product.tags && product.tags.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <OccasionTags tags={product.tags} theme="light" />
        </div>
      )}

      <Divider spacing="2rem" />

      {/* ── ACORDEONES ── */}
      <AccordionPanel items={[
        { id: 'details', title: 'Detalles del Producto', content: `Este perfume ha sido seleccionado por la curaduría de la bóveda BANŪ. Inspirado en ${product.inspiredBy || 'las fragancias más exclusivas'}, ofrece una experiencia sensorial única.` },
        { id: 'shipping', title: 'Política de Envío', content: 'Realizamos envíos a todo el territorio nacional mediante logística privada. El tiempo estimado de entrega es de 3 a 5 días hábiles.' },
      ]} />

      {/* ── HINT CONTEXTUAL ── */}
      <p style={{
        marginTop: '1.5rem',
        fontFamily: 'var(--font-dm-sans)',
        fontSize: '0.62rem',
        letterSpacing: '0.12em',
        color: 'var(--color-dark)',
        opacity: 0.3,
        textAlign: 'center',
        lineHeight: 1.7,
      }}>
        {isInSelection
          ? "Click para quitar · Consultá tu selección completa desde el ícono de la bolsa"
          : "Agregá varios perfumes y consultá todo de una vez por WhatsApp"}
      </p>
    </div>
  );
}
