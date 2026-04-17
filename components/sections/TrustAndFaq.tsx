"use client";

import React from 'react';
import { TrustItemData, FaqItemData } from '@/types/sanity';
import { TrustGrid } from '@/components/ui/TrustGrid';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { ArabicPatternOverlay } from '@/components/ui/ArabicPattern';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { fadeUp } from '@/lib/animation-variants';
import RevealText from '@/src/components/ui/reveal-text';

const FALLBACK_TRUST: TrustItemData[] = [
  { _id: '1', title: 'Envíos Nacionales', description: 'Logística discreta y asegurada a todo el territorio con tracking prioritario.', iconName: 'Truck' },
  { _id: '2', title: 'Autenticidad 100%', description: 'Distribuidores oficiales. Cada fragancia incluye su sello inalterable de fábrica.', iconName: 'ShieldCheck' },
  { _id: '3', title: 'Asesoría Privada', description: 'Atención personalizada 1 a 1 para guiar tu viaje olfativo.', iconName: 'MessageCircle' },
  { _id: '4', title: 'Bóveda Cifrada', description: 'Transacciones y datos estrictamente resguardados bajo grado militar.', iconName: 'Lock' },
];

const FALLBACK_FAQ: FaqItemData[] = [
  { _id: 'f1', question: '¿Las fragancias son originales?', answer: 'Absolutamente. Banū Scents opera como eslabón oficial de distribución de las casas nicho y árabes más prestigiosas. Cada pieza conserva su celofán original, códigos de lote verificables internacionalmente y sellos holográficos de importación.' },
  { _id: 'f2', question: '¿Cómo funciona el envío?', answer: 'Procesamos los pedidos en un máximo de 24 horas hábiles. Utilizamos paquetería de primer nivel con seguro de valor declarado. Todos los envíos cuentan con empaques estructurales de triple capa para proteger la integridad de los envases.' },
  { _id: 'f3', question: '¿Ofrecen asesoramiento olfativo?', answer: 'Sí. Comprendemos que adquirir alta perfumería a ciegas es un desafío. A través de nuestro canal privado de WhatsApp, nuestros curadores pueden guiarte basándose en las notas aromáticas que más te atraen.' },
];

interface TrustAndFaqProps {
  trustItems: TrustItemData[] | null;
  faqItems: FaqItemData[] | null;
}

export function TrustAndFaq({ trustItems, faqItems }: TrustAndFaqProps) {
  const trust = (trustItems && trustItems.length > 0) ? trustItems : FALLBACK_TRUST;
  const faq = (faqItems && faqItems.length > 0) ? faqItems : FALLBACK_FAQ;
  const { ref, controls } = useScrollAnimation();

  return (
    <section className="relative w-full bg-[var(--color-dark)] py-[clamp(5rem,10vw,8rem)] overflow-hidden">
      <ArabicPatternOverlay opacity={0.04} color="light" />
      <div className="w-full flex flex-col items-center relative z-10">
        
        {/* Trust Section Wrapper */}
        <div className="w-full max-w-[1000px] flex flex-col items-center px-6 lg:px-8">
          {/* Separador Superior - Estricto Centrado */}
          <div className="w-32 h-px bg-[var(--color-gold)] opacity-30 mb-20" />
          
          <TrustGrid items={trust} />
        </div>
        
        {/* FAQ Section Wrapper - Linked to the same axis */}
        <div className="w-32 h-px bg-[var(--color-gold)] opacity-30 mt-24 mb-20" />
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeUp}
          viewport={{ once: true }}
          className="w-full max-w-[800px] flex flex-col items-center px-6 lg:px-8"
        >
          <RevealText
            as="h2"
            text="Preguntas Frecuentes"
            className="text-[var(--color-text-light)] font-serif text-[3.5rem] !mb-16 text-center"
            delay={0.2}
          />
          <FaqAccordion faqs={faq} />
        </motion.div>
      </div>
    </section>
  );
}

