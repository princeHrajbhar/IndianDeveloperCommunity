// app/profile/components/pages/AnalyticsPage.tsx
'use client';

import { motion } from 'framer-motion';

export default function AnalyticsPage({ userData }: { userData: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Analytics
      </h1>
      <p className="text-gray-400 font-mono">Your analytics content here...</p>
    </motion.div>
  );
}