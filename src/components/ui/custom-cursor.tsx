"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMouseActive, setIsMouseActive] = useState(false);
  const isMouseActiveRef = useRef(false);
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");
  const isCursorEligible =
    typeof window !== "undefined" &&
    (() => {
      const ua = navigator.userAgent || "";
      const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
        || window.matchMedia("(any-hover: hover) and (any-pointer: fine)").matches;
      const hasAnyCoarsePointer = window.matchMedia("(pointer: coarse)").matches
        || window.matchMedia("(any-pointer: coarse)").matches;
      const isTouchDevice = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
      const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua);
      const isIpad = /iPad/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      return hasFinePointer && !hasAnyCoarsePointer && !isTouchDevice && !isMobileUA && !isIpad;
    })();

  useEffect(() => {
    if (isStudio || !isCursorEligible) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const activateMouseCursor = () => {
      if (!isMouseActiveRef.current) {
        isMouseActiveRef.current = true;
        setIsMouseActive(true);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      setPos({ x: e.clientX, y: e.clientY });
      activateMouseCursor();
    };

    const handleTouchStart = () => {
      if (isMouseActiveRef.current) {
        isMouseActiveRef.current = false;
        setIsMouseActive(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

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
      if (!isMouseActiveRef.current) return;
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
      void e;
      if (!isMouseActiveRef.current) return;
      setHovered(false);
    };

    // Usamos delegación de eventos en window para no requerir MutationObservers pesados
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      isMouseActiveRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isCursorEligible, isStudio]);

  useEffect(() => {
    if (isStudio) {
      document.body.classList.add("studio-env");
      document.body.classList.remove("custom-cursor-enabled");
      return;
    }

    document.body.classList.remove("studio-env");

    if (!isCursorEligible || !isMouseActive) {
      document.body.classList.remove("custom-cursor-enabled");
      return;
    }

    document.body.classList.add("custom-cursor-enabled");
    return () => {
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, [isCursorEligible, isMouseActive, isStudio]);

  if (!isCursorEligible || !isMouseActive || isStudio) return null;

  return (
    <>
      {/* DOT */}
      <motion.div
        className="custom-cursor-dot fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          width: 5,
          height: 5,
          zIndex: 'var(--z-cursor)' as unknown as number,
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
        className="custom-cursor-ring fixed top-0 left-0 bg-transparent rounded-full pointer-events-none border"
        style={{ zIndex: 'var(--z-cursor)' as unknown as number }}
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
