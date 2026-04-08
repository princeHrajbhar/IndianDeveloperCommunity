// app/components/CyberCard.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CyberCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export default function CyberCard({ children, title, subtitle, icon }: CyberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md group"
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        
        <div className="relative bg-[#0a0a1f]/80 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden">
          {/* Animated Border Line */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-scan"></div>
          
          <div className="p-8 pb-0">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              {icon ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative z-10">{icon}</div>
                </div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔒</span>
                </div>
              )}
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {title}
            </motion.h2>
            
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center text-gray-400 mt-2"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {children}
        </div>
      </div>

      <style jsx>{`
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.div>
  );
}