'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  name: string;
  href: string;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>('/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
    { name: 'Team', href: '/team' },
    { name: 'TechExplore', href: '/techexplore' },
    { name: 'Vision', href: '/vision' },
  ];

  const hoverAnimation = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  const tapAnimation = {
    scale: 0.95,
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 ${
        isScrolled
          ? 'dark:bg-gray-900/90 bg-white/90 backdrop-blur-md shadow-lg'
          : 'dark:bg-gray-900/50 bg-white/50 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ rotate: [-5, 5, -5], transition: { duration: 0.5 } }}>
            <Link href="/" className="flex items-center space-x-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold"
              >
                I
              </motion.span>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
               Developer&apos;s Community
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={hoverAnimation}
                whileTap={tapAnimation}
              >
                <Link
                  href={link.href}
                  className={`relative px-2 py-1 ${
                    activeLink === link.href
                      ? 'text-purple-400 font-medium'
                      : 'hover:text-purple-300'
                  }`}
                  onClick={() => setActiveLink(link.href)}
                >
                  {link.name}
                  {activeLink === link.href && (
                    <motion.span
                      layoutId="activeLink"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            whileHover={hoverAnimation}
            whileTap={tapAnimation}
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col space-y-1">
              <motion.span
                animate={
                  isMenuOpen
                    ? { rotate: 45, y: 6, backgroundColor: '#a78bfa' }
                    : { rotate: 0, backgroundColor: '#ffffff' }
                }
                className="h-0.5 bg-white w-full"
              />
              <motion.span
                animate={
                  isMenuOpen ? { opacity: 0 } : { opacity: 1, backgroundColor: '#ffffff' }
                }
                className="h-0.5 bg-white w-full"
              />
              <motion.span
                animate={
                  isMenuOpen
                    ? { rotate: -45, y: -6, backgroundColor: '#a78bfa' }
                    : { rotate: 0, backgroundColor: '#ffffff' }
                }
                className="h-0.5 bg-white w-full"
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-2">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * navLinks.indexOf(link) }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        activeLink === link.href
                          ? 'bg-gray-800 text-purple-400'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                      onClick={() => {
                        setActiveLink(link.href);
                        setIsMenuOpen(false);
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
