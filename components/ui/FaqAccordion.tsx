'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  faqs: FaqItem[];
  theme?: 'dark' | 'light';
}

export function FaqAccordion({ faqs, theme = 'dark' }: FaqAccordionProps) {
  const isLight = theme === 'light';
  const borderColor = isLight ? 'rgba(44,24,16,0.12)' : 'rgba(255,255,255,0.1)';
  const textColor = isLight ? 'var(--color-dark)' : 'var(--color-text-light)';
  const textOpenColor = isLight ? 'var(--color-gold)' : 'var(--color-gold)';
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="w-full flex flex-col">
      {faqs.map((faq) => {
        const isOpen = openId === faq._id;

        return (
          <div key={faq._id} className="w-full border-t" style={{ borderColor }}>
            <button
              onClick={() => handleToggle(faq._id)}
              className="w-full flex items-center justify-between py-6 min-h-[92px] focus:outline-none transition-opacity duration-300"
              aria-expanded={isOpen}
            >
              <span
                className={`font-serif text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.35] font-normal text-left transition-colors duration-300 pr-10`}
                style={{ color: isOpen ? textOpenColor : textColor }}
              >
                {faq.question}
              </span>

              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[var(--color-gold)] flex items-center justify-center shrink-0 w-[20px] h-[20px] relative ml-auto"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="9.5" y="0" width="1" height="20" fill="currentColor" />
                  <rect x="0" y="9.5" width="20" height="1" fill="currentColor" />
                </svg>
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 font-sans text-[0.95rem] leading-[1.8] opacity-70 text-left" style={{ color: textColor }}>
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      <div className="w-full border-t" style={{ borderColor }} />
    </div>
  );
}
