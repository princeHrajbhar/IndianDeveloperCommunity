'use client';

import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black">
      <div className="text-center">
        <motion.div className="relative w-24 h-24 mx-auto mb-6">
          
          <motion.div
            className="absolute inset-0 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />

          <motion.div
            className="absolute inset-2 border-4 border-blue-500/20 border-b-blue-500 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />

          <motion.div
            className="absolute inset-[38px] bg-cyan-400 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />

        </motion.div>

        <motion.p
          className="text-cyan-400 font-mono text-lg tracking-[0.3em]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="text-cyan-600">{'<'}</span>
          ESTABLISHING SECURE CONNECTION
          <span className="text-cyan-600">{'/>'}</span>
        </motion.p>
      </div>
    </div>
  );
}