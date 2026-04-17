"use client";

import React from "react";
import { motion } from "framer-motion";

export function WhatsAppButton() {
  const waUrl = "https://wa.me/5493814665503";

  return (
    <div className="fixed bottom-6 right-6 fixed-bottom pointer-events-auto" style={{ zIndex: 'var(--z-toast)' }}>
      <div className="relative flex items-center justify-center">
        {/* Ping Animation Backdrop */}
        <motion.div
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 bg-[#25D366] rounded-full pointer-events-none"
        />
        
        {/* Main Button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="relative bg-[var(--color-dark)] text-[var(--color-cream)] p-[1.125rem] rounded-none shadow-2xl hover:bg-[#25D366] transition-colors duration-300 flex items-center justify-center pointer-events-auto"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          </svg>
        </a>
      </div>
    </div>
  );
}
