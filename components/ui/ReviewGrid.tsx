"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { staggerContainer, fadeUp } from '@/lib/animation-variants';

export interface ReviewItem {
  _id: string;
  author: string;
  rating: number;
  text: string;
}

export interface ReviewGridProps {
  reviews: ReviewItem[];
}

export function ReviewGrid({ reviews }: ReviewGridProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-0"
    >
      {reviews.map((review) => (
        <div key={review._id} className="flex justify-center">
          <ReviewCard 
            author={review.author}
            rating={review.rating}
            text={review.text}
            variants={fadeUp} 
          />
        </div>
      ))}
    </motion.div>
  );
}


