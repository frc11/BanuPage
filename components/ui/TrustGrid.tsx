'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Truck,
  ShieldCheck,
  MessageCircle,
  CreditCard,
  Sparkles,
  CheckCircle,
  Package,
  Lock,
} from 'lucide-react';
import { staggerContainer, fadeUp } from '@/lib/animation-variants';

export interface TrustItem {
  _id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TrustGridProps {
  items: TrustItem[];
}

const IconMap: Record<string, React.ElementType> = {
  Truck,
  ShieldCheck,
  MessageCircle,
  CreditCard,
  Sparkles,
  Package,
  Lock,
};

export function TrustGrid({ items }: TrustGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <motion.div
      className="w-full max-w-[1120px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items.map((item) => {
        const IconComponent = IconMap[item.iconName] || CheckCircle;

        return (
          <motion.div
            key={item._id}
            variants={fadeUp}
            className="group flex flex-col items-center gap-4 p-6 text-center"
          >
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-[var(--color-gold)] opacity-0 blur-xl group-hover:opacity-20 transition-opacity duration-500" />
              <IconComponent
                className="w-[52px] h-[52px] text-[var(--color-gold)] relative z-10"
                strokeWidth={1.25}
              />
            </div>

            <h4 className="font-sans font-medium text-[0.67rem] uppercase tracking-[0.12em] text-[var(--color-text-light)] mt-4 mb-2">
              {item.title}
            </h4>

            <p className="font-sans text-[0.9rem] text-[var(--color-text-light)] opacity-50 leading-relaxed text-center max-w-[180px]">
              {item.description}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
