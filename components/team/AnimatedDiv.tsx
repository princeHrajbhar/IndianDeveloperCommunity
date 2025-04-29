'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedDivProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  type?: 'fadeIn' | 'slideUp' | 'scaleIn';
}

export default function AnimatedDiv({ 
  children, 
  delay = 0, 
  className,
  type = 'fadeIn'
}: AnimatedDivProps) {
  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      variants={variants[type]}
      className={className}
    >
      {children}
    </motion.div>
  );
}