// app/components/CyberInput.tsx
'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface CyberInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  autoComplete?: string;
  required?: boolean;
}

export default function CyberInput({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  icon,
  disabled,
  autoComplete,
  required = true,
}: CyberInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="space-y-2"
    >
      <label className="text-sm font-medium text-cyan-400 flex items-center gap-2">
        {icon}
        {label}
        {required && <span className="text-red-400 text-xs">*</span>}
      </label>
      <div className="relative group">
        <input
          type={isPassword && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="w-full px-4 py-3 bg-[#0a0a1f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 group-hover:border-cyan-500/50"
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </div>
    </motion.div>
  );
}