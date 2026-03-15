'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Tech stack data
const techStack = [
  { 
    name: 'AI/ML', 
    icon: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
  },
  { 
    name: 'Robotics', 
    icon: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
  },
  { 
    name: 'Data Science', 
    icon: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
  },
];

export default function TechShowcase() {
  const [currentTech, setCurrentTech] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % techStack.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] w-full">
      {/* Animated Gradient Border */}
      <motion.div
        className="absolute inset-0 rounded-3xl p-1"
        animate={{
          background: [
            'linear-gradient(45deg, #7c3aed, #3b82f6)',
            'linear-gradient(45deg, #3b82f6, #7c3aed)',
            'linear-gradient(45deg, #7c3aed, #3b82f6)'
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Main Image Container */}
        <div className="relative h-full w-full rounded-3xl overflow-hidden bg-gray-900">
          <AnimatePresence>
            {techStack.map((tech, index) => (
              currentTech === index && (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={tech.icon} 
                    alt={tech.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex items-end p-8">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl font-bold"
                    >
                      {tech.name}
                    </motion.h3>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
