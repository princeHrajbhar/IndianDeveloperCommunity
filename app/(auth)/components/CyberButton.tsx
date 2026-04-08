// app/components/CyberButton.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CyberButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  isLoading?: boolean;
  children: ReactNode;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export default function CyberButton({
  type = 'submit',
  onClick,
  isLoading = false,
  children,
  icon,
  variant = 'primary',
  disabled,
}: CyberButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className="relative w-full group overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${variant === 'primary' ? 'from-cyan-500 via-purple-500 to-pink-500' : 'from-gray-600 via-gray-500 to-gray-600'} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className={`absolute inset-0 bg-gradient-to-r ${variant === 'primary' ? 'from-cyan-500 to-purple-500' : 'from-gray-600 to-gray-500'} rounded-lg`}></div>
      <div className="relative px-6 py-3 bg-[#0a0a1f] rounded-lg m-[1px] group-hover:bg-transparent transition-all duration-300">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-cyan-400 font-semibold">PROCESSING...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            {icon}
            <span className={`${variant === 'primary' ? 'text-white' : 'text-gray-300'} font-semibold`}>{children}</span>
          </div>
        )}
      </div>
    </motion.button>
  );
}