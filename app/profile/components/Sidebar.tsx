// app/components/Sidebar.tsx (Fully Responsive with Monospace)
'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Shield, 
  Activity, 
  Bell, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Fingerprint,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
}

interface SidebarProps {
  menuItems: MenuItem[];
  activeMenu: string;
  onMenuChange: (menuId: string) => void;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ 
  menuItems, 
  activeMenu, 
  onMenuChange, 
  userName, 
  userEmail,
  onLogout,
  isMobile = false,
  onClose
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto collapse on mobile
  const shouldCollapse = isMobileView ? true : isCollapsed;
  const sidebarWidth = shouldCollapse ? 'w-20' : 'w-72';

  return (
    <aside 
      className={`relative ${sidebarWidth} transition-all duration-300 border-r border-cyan-500/20 bg-black/30 backdrop-blur-xl flex flex-col h-full min-h-screen`}
    >
      {/* Close button for mobile */}
      {isMobile && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 lg:hidden"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Collapse Toggle Button - Hide on mobile */}
      {!isMobileView && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 z-20 p-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          {shouldCollapse ? (
            <ChevronRight className="w-4 h-4 text-white" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-white" />
          )}
        </button>
      )}

      {/* Sidebar Header */}
      <div className={`${isMobile ? 'pt-16' : 'pt-20'} pb-6 px-4 sm:px-6 border-b border-cyan-500/20`}>
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-0.5">
              <div className="w-full h-full rounded-full bg-[#0a0a1f] flex items-center justify-center">
                <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              </div>
            </div>
          </div>
          {!shouldCollapse && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 min-w-0"
            >
              <h3 className="text-white font-mono font-semibold text-xs sm:text-sm truncate">
                {userName || 'User Profile'}
              </h3>
              <p className="text-gray-400 font-mono text-[10px] sm:text-xs truncate">
                {userEmail || 'user@example.com'}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onMenuChange(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-300 group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/10'
                  : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
              }`}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'} transition-colors`} />
              {!shouldCollapse && (
                <span className="font-mono font-medium text-xs sm:text-sm">{item.label}</span>
              )}
              {isActive && !shouldCollapse && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="ml-auto w-0.5 sm:w-1 h-4 sm:h-6 bg-cyan-400 rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-3 sm:p-4 pb-4 sm:pb-6 border-t border-cyan-500/20">
        <motion.button
          onClick={onLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
          {!shouldCollapse && <span className="font-mono font-medium text-xs sm:text-sm">Logout</span>}
        </motion.button>
      </div>
    </aside>
  );
}