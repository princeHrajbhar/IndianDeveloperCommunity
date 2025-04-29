'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  highlight?: string;
}

export default function SectionTitle({ title, subtitle, highlight }: SectionTitleProps) {
  return (
    <div className="text-center mb-16">
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-indigo-600 font-medium mb-2"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-gray-900"
      >
        {title.split(' ').map((word, i) => (
          <span key={i} className={word === highlight ? 'text-indigo-600' : ''}>
            {word}{' '}
          </span>
        ))}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-20 h-1 bg-indigo-600 mx-auto mt-4"
      />
    </div>
  );
}