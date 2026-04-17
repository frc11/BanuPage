"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMobile, setIsMobile] = useState(true);
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  useEffect(() => {
    // Usamos pointer: fine para garantizar que los laptops con touch screen sí vean el cursor
    const isFine = window.matchMedia("(pointer: fine)").matches;
    setIsMobile(!isFine);

    if (!isFine) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const checkHoverAttributes = (el: Element) => {
      // Helper function para verificar los selectores que piden hover interactivo
      return (
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.getAttribute("role") === "button" ||
        el.getAttribute("data-cursor") === "pointer" ||
        closestInteractive(el) !== null
      );
    };

    const closestInteractive = (el: Element) => {
      return el.closest('a, button, [role="button"], [data-cursor="pointer"]');
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target && e.target instanceof Element) {
        if (checkHoverAttributes(e.target)) {
          setHovered(true);
        }
        
        // Identificar el background actual trepando el DOM (event bubbling)
        const isDarkBg = e.target.closest(
          '.bg-\\[var\\(--color-dark\\)\\], [style*="var(--color-dark)"], footer, .bg-black'
        );
        setTheme(isDarkBg ? "dark" : "light");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      setHovered(false);
    };

    // Usamos delegación de eventos en window para no requerir MutationObservers pesados
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  useEffect(() => {
    if (isStudio) {
      document.body.classList.add("studio-env");
    } else {
      document.body.classList.remove("studio-env");
    }
  }, [isStudio]);

  if (isMobile || isStudio) return null;

  return (
    <>
      {/* DOT */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          width: 5,
          height: 5,
        }}
        animate={{
          x: pos.x,
          y: pos.y,
          marginLeft: -2.5,
          marginTop: -2.5,
          scale: hovered ? 0 : 1,
          backgroundColor: theme === "dark" ? "var(--color-cream)" : "var(--color-dark)",
        }}
        transition={{
          duration: 0,
        }}
      />

      {/* RING */}
      <motion.div
        className="fixed top-0 left-0 bg-transparent rounded-full pointer-events-none z-[9999] border"
        animate={{
          x: pos.x,
          y: pos.y,
          width: hovered ? 52 : 36,
          height: hovered ? 52 : 36,
          marginLeft: hovered ? -26 : -18,
          marginTop: hovered ? -26 : -18,
          borderColor: hovered 
            ? "var(--color-gold)" 
            : (theme === "dark" ? "var(--color-cream)" : "var(--color-dark)"),
        }}
        transition={{
          x: { duration: 0.15, ease: "linear" },
          y: { duration: 0.15, ease: "linear" },
          width: { duration: 0.25, ease: "easeOut" },
          height: { duration: 0.25, ease: "easeOut" },
          borderColor: { duration: 0.25, ease: "easeOut" },
          marginLeft: { duration: 0.25, ease: "easeOut" },
          marginTop: { duration: 0.25, ease: "easeOut" },
        }}
      />
    </>
  );
}
