"use client";

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';
import { useEffect } from 'react';

// ----------------------------------------------------------------------
// Parche de mitigación react-19 vs sanity
// Suprime un error ruidoso en consola asociado a "disableTransition"
// ----------------------------------------------------------------------
if (typeof console !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("disableTransition")) return;
    originalError(...args);
  };
}

export default function StudioPage() {
  useEffect(() => {
    document.body.classList.add("studio-env");
    return () => document.body.classList.remove("studio-env");
  }, []);

  return <NextStudio config={config} />;
}
