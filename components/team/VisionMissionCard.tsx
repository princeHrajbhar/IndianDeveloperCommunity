'use client';

import { VisionMission } from '@/types/team';
import { motion } from 'framer-motion';

export default function VisionMissionCard({ item }: { item: VisionMission }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`p-8 rounded-xl shadow-lg relative overflow-hidden h-full ${
        item.type === 'vision' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'
      }`}
    >
      {/* Animated background elements */}
      {item.type === 'vision' && (
        <>
          <motion.div 
            className="absolute top-0 left-0 w-20 h-20 rounded-full bg-indigo-500 opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-indigo-400 opacity-10"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </>
      )}
      
      <motion.h3 
        className="text-2xl font-bold mb-4 relative z-10"
        whileHover={{ scale: 1.02 }}
      >
        {item.title}
      </motion.h3>
      
      <motion.p 
        className="text-lg relative z-10"
        whileHover={{ x: 5 }}
      >
        {item.description}
      </motion.p>
    </motion.div>
  );
}