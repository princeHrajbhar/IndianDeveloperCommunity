// app/profile/components/pages/SettingsPage.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Globe, Moon, Sun } from 'lucide-react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Account Settings
        </h1>
        <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm">Customize your profile and account preferences.</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20">
          <h2 className="text-lg sm:text-xl font-mono font-semibold text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            Profile Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 font-mono text-xs sm:text-sm mb-2">Display Name</label>
              <input
                type="text"
                defaultValue="Alex Morgan"
                className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#0a0a1f] border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-400 font-mono text-xs sm:text-sm mb-2">Username</label>
              <input
                type="text"
                defaultValue="@alexmorgan"
                className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#0a0a1f] border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-400 font-mono text-xs sm:text-sm mb-2">Bio</label>
              <textarea
                defaultValue="Full-stack developer & cybersecurity enthusiast. Building the future of web3."
                rows={3}
                className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#0a0a1f] border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>
            <button className="px-4 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-mono text-sm font-medium hover:opacity-90 transition-opacity">
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20">
          <h2 className="text-lg sm:text-xl font-mono font-semibold text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-300 font-mono text-sm">Email Notifications</span>
              </div>
              <button
                onClick={() => setEmailNotif(!emailNotif)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailNotif ? 'bg-cyan-500' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailNotif ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5 text-cyan-400" /> : <Sun className="w-5 h-5 text-cyan-400" />}
                <span className="text-gray-300 font-mono text-sm">Dark Mode</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-cyan-500' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}