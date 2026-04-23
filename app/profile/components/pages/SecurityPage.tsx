// app/profile/components/pages/SecurityPage.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, Activity, Smartphone } from 'lucide-react';

export default function SecurityPage() {
  const [twoFA, setTwoFA] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Security Settings
        </h1>
        <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm">Manage your account security and privacy preferences.</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              <h2 className="text-lg sm:text-xl font-mono font-semibold text-white">Change Password</h2>
            </div>
          </div>
          <p className="text-gray-400 font-mono text-xs sm:text-sm mb-4">Last changed 30 days ago</p>
          <button className="px-4 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-mono text-sm font-medium hover:opacity-90 transition-opacity">
            Update Password
          </button>
        </div>

        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              <h2 className="text-lg sm:text-xl font-mono font-semibold text-white">Two-Factor Authentication</h2>
            </div>
            <button
              onClick={() => setTwoFA(!twoFA)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                twoFA ? 'bg-cyan-500' : 'bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFA ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <p className="text-gray-400 font-mono text-xs sm:text-sm">Add an extra layer of security to your account.</p>
        </div>

        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20">
          <h2 className="text-lg sm:text-xl font-mono font-semibold text-white mb-4 flex items-center gap-3">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            Active Sessions
          </h2>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-cyan-500/5 rounded-lg gap-3">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-mono text-sm">Chrome on Windows</p>
                  <p className="text-gray-400 font-mono text-xs">San Francisco, CA • Current session</p>
                </div>
              </div>
              <span className="text-green-400 font-mono text-xs sm:text-sm">Active now</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}