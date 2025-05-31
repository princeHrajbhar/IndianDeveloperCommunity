'use client';

import { motion } from 'framer-motion';

export default function ParticleExplosion({ 
  x, y, count, colors 
}: { 
  x: number; y: number; count: number; colors: string[] 
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{
              left: x,
              top: y,
              backgroundColor: color
            }}
            initial={{ 
              x: 0,
              y: 0,
              opacity: 1,
              scale: 0
            }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: [1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut"
            }}
          />
        );
      })}
    </>
  );
}