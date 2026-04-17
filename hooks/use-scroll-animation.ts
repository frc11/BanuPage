"use client";

import { useEffect, useRef } from 'react';
import { useAnimation, useInView } from 'framer-motion';

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return { ref, controls };
}
