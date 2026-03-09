// components/CyberFooter.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  SiGoogleplay, 
  SiAppstore, 
  SiWhatsapp 
} from 'react-icons/si';
import { 
  Phone, 
  Globe, 
  Shield, 
  FileText, 
  RefreshCw, 
  Mail,
  Zap,
  CircuitBoard,
  Cpu
} from 'lucide-react';

const CyberFooter = () => {
  const quickLinks = [
    { name: 'Privacy Policy', icon: Shield, href: '/privacy' },
    { name: 'Terms', icon: FileText, href: '/terms' },
    { name: 'Refund', icon: RefreshCw, href: '/refund' },
    { name: 'Contact', icon: Mail, href: '/contact' },
  ];

  const contactChannels = [
    { name: 'Call', icon: Phone, href: 'tel:+1234567890', color: 'hover:text-cyan-400' },
    { name: 'WhatsApp', icon: SiWhatsapp, href: 'https://wa.me/1234567890', color: 'hover:text-green-400' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-purple-900/20 to-black text-gray-300 overflow-hidden">
      {/* Animated Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:34px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Animated Glowing Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: ['0%', '100%', '0%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 -left-1/2 w-[200%] h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        />
        <motion.div
          animate={{
            x: ['0%', '-100%', '0%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute top-40 -left-1/2 w-[200%] h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        />
      </div>

      {/* Floating AI Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          >
            {i % 2 === 0 ? (
              <Cpu className="w-6 h-6 text-cyan-500/20" />
            ) : (
              <CircuitBoard className="w-6 h-6 text-purple-500/20" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Site Guru
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Building the future with AI-powered solutions. Fast, secure, and intelligent.
            </p>
            
            {/* Cyber Status Indicator */}
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              <span className="text-xs text-gray-500">AI CORE ACTIVE</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center space-x-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors group"
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="text-cyan-400"
                    >
                      &gt;
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Connect
            </h3>
            <div className="space-y-4">
              {contactChannels.map((channel) => (
                <motion.a
                  key={channel.name}
                  href={channel.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all group ${channel.color}`}
                >
                  <channel.icon className="w-5 h-5" />
                  <span className="font-medium">{channel.name}</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-auto"
                  >
                    <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* App Store Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Get the App
            </h3>
            <div className="space-y-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all group"
              >
                <SiGoogleplay className="w-6 h-6 text-green-400" />
                <div>
                  <div className="text-xs text-gray-400">GET IT ON</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all group"
              >
                <SiAppstore className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative pt-8 mt-8 border-t border-gray-800"
        >
          {/* Animated Border */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          />

          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-500">
              © 2026 Site Guru Pvt Ltd. All rights reserved.
            </p>
            
            {/* Cyber Security Badge */}
            <motion.div
              animate={{
                boxShadow: ['0 0 0 0 rgba(34,211,238,0)', '0 0 20px 0 rgba(34,211,238,0.3)', '0 0 0 0 rgba(34,211,238,0)'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-gray-300">Secured by AI</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default CyberFooter;