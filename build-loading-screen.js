const fs = require('fs');

const svg = fs.readFileSync('public/logoSVG.svg', 'utf8');
const regex = /d="([^"]+)"/g;
let paths = [];
let match;
while ((match = regex.exec(svg)) !== null) {
  paths.push(match[1]);
}

const tsxContent = `"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArabicPatternOverlay } from "@/components/ui/ArabicPattern";

const LOGO_PATHS = ${JSON.stringify(paths, null, 2)};

export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Verificamos estado de sesión para mostrar sólo en primera visita
    if (!sessionStorage.getItem("banu-loaded")) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("banu-loaded", "true");
      }, 2400); // 2.4s total time
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--color-dark)] pointer-events-auto"
        >
          {/* 1. LOGO SVG ANIMADO */}
          <div className="w-[100px] md:w-[140px] flex items-center justify-center relative">
            <svg
              viewBox="0 0 1536 1024"
              className="w-full h-auto overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              {LOGO_PATHS.map((d, index) => (
                <motion.path
                  key={index}
                  d={d}
                  stroke="#EAE6DF"
                  strokeWidth="0.5"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0, fill: "rgba(234, 230, 223, 0)" }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                    fill: "#EAE6DF",
                    stroke: "rgba(234, 230, 223, 0)",
                  }}
                  transition={{
                    pathLength: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
                    opacity: { duration: 0.3, delay: 0.3 },
                    fill: { duration: 0.4, delay: 1.5, ease: "easeInOut" },
                    stroke: { duration: 0.4, delay: 1.5, ease: "easeInOut" },
                  }}
                />
              ))}
            </svg>
          </div>

          {/* 2. LÍNEA DORADA */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 48, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-[1px] bg-[var(--color-gold)] mt-7"
          />

          {/* 3. TAGLINE */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.45, y: 0 }}
            transition={{ duration: 0.5, delay: 1.7 }}
            className="mt-4 font-sans text-[0.58rem] tracking-[0.4em] text-[var(--color-cream)] uppercase"
          >
            Perfumes Árabes
          </motion.div>

          {/* 4. PATRÓN ÁRABE DE FONDO */}
          <div className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none">
            <ArabicPatternOverlay opacity={1} color="light" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`;

fs.writeFileSync('src/components/ui/loading-screen.tsx', tsxContent);
console.log('Loading screen successfully generated at src/components/ui/loading-screen.tsx');
