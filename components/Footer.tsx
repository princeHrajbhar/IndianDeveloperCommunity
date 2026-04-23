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
  Cpu,
  Fingerprint,
  Lock,
  Server
} from 'lucide-react';

const CyberFooter = () => {
  const quickLinks = [
    { name: 'Privacy Policy', icon: Shield, href: '/privacy' },
    { name: 'Terms of Service', icon: FileText, href: '/terms' },
    { name: 'Refund Policy', icon: RefreshCw, href: '/refund' },
    { name: 'Contact Support', icon: Mail, href: '/contact' },
  ];

  const contactChannels = [
    { name: 'Call', icon: Phone, href: 'tel:+1234567890', color: 'hover:text-cyan-400' },
    { name: 'WhatsApp', icon: SiWhatsapp, href: 'https://wa.me/1234567890', color: 'hover:text-green-400' },
  ];

  const techStack = [
    { name: 'AI Core', icon: Cpu, status: 'active' },
    { name: 'Neural Network', icon: CircuitBoard, status: 'active' },
    { name: 'Quantum Encryption', icon: Lock, status: 'active' },
    { name: 'Edge Computing', icon: Server, status: 'active' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#03050b] via-[#0a0c15] to-[#03050b] text-gray-300 overflow-hidden">
      
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 
          bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)]
          bg-[size:40px_40px]" 
        />
        <div className="absolute inset-0 
          bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.05),transparent_50%)]" 
        />
      </div>

      {/* Animated Glowing Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 w-[200%] h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        />
        <motion.div
          animate={{
            x: ['100%', '-100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute top-40 w-[200%] h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        />
        <motion.div
          animate={{
            x: ['-50%', '150%'],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 4
          }}
          className="absolute top-60 w-[200%] h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"
        />
      </div>

      {/* Floating AI Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
          >
            {i % 2 === 0 ? (
              <Cpu className="w-8 h-8 text-cyan-500/20" />
            ) : (
              <Fingerprint className="w-8 h-8 text-purple-500/20" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <Zap className="w-10 h-10 text-cyan-400" />
              </motion.div>
              <span className="text-2xl font-mono font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent tracking-wider">
                AADHARIX
              </span>
            </div>
            
            <p className="text-sm font-mono text-gray-400 mb-4 leading-relaxed">
              Building the future with AI-powered solutions. Fast, secure, and intelligent.
            </p>
            
            {/* Cyber Status Indicator */}
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              />
              <span className="text-xs font-mono text-gray-500 tracking-wider">AI CORE ACTIVE</span>
            </div>

            {/* Tech Stack Badges */}
            <div className="mt-6 space-y-2">
              {techStack.map((tech, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <tech.icon className="w-3 h-3 text-cyan-400" />
                  <span className="text-xs font-mono text-gray-500">{tech.name}</span>
                  <span className="text-xs font-mono text-green-400 ml-auto">● ONLINE</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-mono font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-wider">
              [ NAVIGATION ]
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors group"
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="text-cyan-400"
                    >
                      {`[→]`}
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
            <h3 className="text-lg font-mono font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-wider">
              [ CONNECT ]
            </h3>
            <div className="space-y-3">
              {contactChannels.map((channel, idx) => (
                <motion.a
                  key={channel.name}
                  href={channel.href}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all group ${channel.color}`}
                >
                  <channel.icon className="w-5 h-5" />
                  <span className="font-mono text-sm font-medium">{channel.name}</span>
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
            <h3 className="text-lg font-mono font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-wider">
              [ DOWNLOAD ]
            </h3>
            <div className="space-y-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all group"
              >
                <SiGoogleplay className="w-6 h-6 text-green-400" />
                <div>
                  <div className="text-[10px] font-mono text-gray-400">GET IT ON</div>
                  <div className="font-mono font-semibold text-sm">Google Play</div>
                </div>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-auto"
                >
                  <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all group"
              >
                <SiAppstore className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="text-[10px] font-mono text-gray-400">DOWNLOAD ON THE</div>
                  <div className="font-mono font-semibold text-sm">App Store</div>
                </div>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-auto"
                >
                  <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative pt-8 mt-8"
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

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-xs font-mono text-gray-500 tracking-wider">
              <span className="text-cyan-400">©</span> 2026 AADHARIX • ALL RIGHTS RESERVED
            </p>
            
            {/* Cyber Security Badge */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(34,211,238,0)', 
                  '0 0 20px 0 rgba(34,211,238,0.3)', 
                  '0 0 0 0 rgba(34,211,238,0)'
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-cyan-500/30"
            >
              <Shield className="w-3 h-3 text-cyan-400" />
              <span className="text-[10px] font-mono text-gray-300 tracking-wider">SECURED BY AI • ENCRYPTED</span>
              <Lock className="w-3 h-3 text-green-400" />
            </motion.div>

            {/* Version */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gray-600">v2.0.1</span>
              <span className="text-[10px] font-mono text-gray-600">|</span>
              <span className="text-[10px] font-mono text-gray-600">BUILD: 2024.01</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default CyberFooter;