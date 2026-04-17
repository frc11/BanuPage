"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  faqs: FaqItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="w-full flex flex-col px-0">
      {faqs.map((faq) => {
        const isOpen = openId === faq._id;
        
        return (
          <div 
            key={faq._id} 
            className="w-full border-t border-[rgba(234,230,223,0.15)]"
          >
             <button 
               onClick={() => handleToggle(faq._id)}
               className="w-full flex items-center justify-between py-[1.5rem] focus:outline-none transition-opacity duration-300"
               aria-expanded={isOpen}
             >
               <span 
                 className={`font-serif text-[1.1rem] font-normal text-left transition-colors duration-300 pr-8 ${
                   isOpen ? "text-[var(--color-gold)]" : "text-[var(--color-text-light)]"
                 }`}
               >
                 {faq.question}
               </span>
               
               <motion.div
                 animate={{ rotate: isOpen ? 45 : 0 }}
                 transition={{ duration: 0.3 }}
                 className="text-[var(--color-gold)] flex items-center justify-center shrink-0 w-[16px] h-[16px] relative"
               >
                 {/* Líneas horizontales/verticales para armar el Plus sin importar de librería */}
                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                   <rect x="7.5" y="0" width="1" height="16" fill="currentColor" />
                   <rect x="0" y="7.5" width="16" height="1" fill="currentColor" />
                 </svg>
               </motion.div>
             </button>

             <AnimatePresence>
               {isOpen && (
                 <motion.div
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: "auto", opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                   className="overflow-hidden"
                 >
                   <div className="pb-[1.5rem] font-sans text-[0.875rem] leading-[1.8] text-[var(--color-text-light)] opacity-70 text-left">
                     {faq.answer}
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        );
      })}
      
      {/* Sellar el final con el último border-bottom para que encuadre perfecto */}
      <div className="w-full border-t border-[rgba(234,230,223,0.15)]" />
    </div>
  );
}
