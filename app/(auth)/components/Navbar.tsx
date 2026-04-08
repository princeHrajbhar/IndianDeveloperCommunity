// app/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Shield, LogOut, User, Home, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/login');
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    ...(isLoggedIn ? [{ path: '/profile', label: 'Profile', icon: <User className="w-4 h-4" /> }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1f]/90 backdrop-blur-xl border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <Shield className="w-8 h-8 text-cyan-400 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              CyberAuth
            </span>
            <Cpu className="w-4 h-4 text-cyan-500 animate-pulse" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  pathname === item.path
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                    : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                {pathname !== '/login' && (
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
                  >
                    Login
                  </Link>
                )}
                {pathname !== '/register' && (
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    Register
                  </Link>
                )}
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/10 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}