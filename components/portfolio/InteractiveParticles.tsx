// 'use client';

// import { motion, useMotionValue } from 'framer-motion';

// export default function InteractiveParticles({ scrollProgress }: { scrollProgress: number }) {
//   const particles = Array.from({ length: 100 }).map((_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     size: Math.random() * 4 + 1,
//     speed: Math.random() * 0.5 + 0.1
//   }));

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {particles.map((particle) => (
//         <motion.div
//           key={particle.id}
//           className="absolute rounded-full bg-white/20"
//           style={{
//             width: `${particle.size}px`,
//             height: `${particle.size}px`,
//             left: `${particle.x}%`,
//             top: `${particle.y}%`,
//             y: useMotionValue(particle.y + scrollProgress * 100 * particle.speed)
//           }}
//           animate={{
//             x: [particle.x, particle.x + (Math.random() * 20 - 10)],
//             opacity: [0.2, 0.8, 0.2]
//           }}
//           transition={{
//             duration: 5 + Math.random() * 10,
//             repeat: Infinity,
//             repeatType: 'reverse',
//             ease: 'easeInOut'
//           }}
//         />
//       ))}
//     </div>
//   );
// }
import React from 'react'

const InteractiveParticles = () => {
  return (
    <div>
      
    </div>
  )
}

export default InteractiveParticles
