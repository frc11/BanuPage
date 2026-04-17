"use client";

import { useState, useEffect } from "react";

/**
 * useHydrated — Resuelve el hydration mismatch de Zustand + persist.
 *
 * Zustand persist lee de localStorage solo en el cliente.
 * El servidor siempre renderiza el estado inicial (vacío).
 * Si el cliente tiene items en localStorage, React detecta un mismatch y lanza un error.
 *
 * Solución: los componentes que leen del store persisted no renderizan hasta
 * que el cliente haya hidratado el store desde localStorage.
 *
 * Uso:
 *   const mounted = useHydrated()
 *   if (!mounted) return <Skeleton /> // o null
 */
export function useHydrated(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
