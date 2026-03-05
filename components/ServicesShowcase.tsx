// app/components/ServicesShowcase.tsx
'use client';

import { motion } from 'framer-motion';
import { HiOutlineDeviceMobile } from 'react-icons/hi';
import { 
  HiOutlineComputerDesktop,
  HiOutlineChartBar,
  HiOutlineCube,
  HiOutlineChartPie,
  HiOutlineUsers,
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineStar,
  HiOutlineRocketLaunch,

} from 'react-icons/hi2';

const services = [
  {
    id: "01",
    title: "Website Development",
    description: "Professional, SEO-optimized, and responsive websites crafted using modern frameworks for seamless performance across all devices and blazing-fast load times.",
    icon: HiOutlineComputerDesktop,
    color: "from-cyan-400 to-blue-400",
    stats: [
      { label: "USERS SERVED", value: "50K+", icon: HiOutlineUsers }
    ],
    features: ["Responsive", "SEO", "Performance", "CMS", "Analytics"],
    exploreText: "Explore"
  },
  {
    id: "02",
    title: "App Development",
    description: "Custom-built mobile and web applications with real-time features, sleek UI, and high performance for Android, iOS, and cross-platform deployments.",
    icon: HiOutlineDeviceMobile,
    color: "from-blue-400 to-purple-400",
    stats: [
      { label: "MORE TRAFFIC", value: "3x", icon: HiOutlineChartBar }
    ],
    features: ["Cross-Platform", "Real-time", "Push Notifications", "Offline"],
    exploreText: "Explore"
  },
  {
    id: "03",
    title: "CRM Solutions",
    description: "Custom CRM systems to manage leads, clients, sales, and support with integrated communication tools and analytics dashboards that boost conversions.",
    icon: HiOutlineUsers,
    color: "from-purple-400 to-pink-400",
    stats: [
      { label: "COST REDUCED", value: "40%", icon: HiOutlineChartPie }
    ],
    features: ["Lead Mgmt", "Sales Pipeline", "Analytics", "Automation"],
    exploreText: "Explore"
  },
  {
    id: "04",
    title: "ERP Systems",
    description: "Scalable and modular ERP systems to streamline business processes like HR, finance, inventory, and production using cloud-backed architecture.",
    icon: HiOutlineCube,
    color: "from-pink-400 to-rose-400",
    stats: [
      { label: "CONV. RATE UP", value: "85%", icon: HiOutlineRocketLaunch }
    ],
    features: ["Multi-Module", "Cloud", "Role-Based", "Realtime Reports"],
    exploreText: "Explore"
  }
];

// Matrix rain characters for cyber effect
const matrixChars = "01アイウエオカキクケコサシスセソタチツテト";

export default function ServicesShowcase() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-black">
      {/* Background Effects - Cyber grid with cyan/purple theme */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        
        {/* Digital rain effect - subtle */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan-500/20 text-xs font-mono whitespace-nowrap"
              style={{
                left: `${i * 25}%`,
                top: '-20%',
                writingMode: 'vertical-rl',
              }}
              animate={{
                y: ['0vh', '120vh'],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 2,
              }}
            >
              {matrixChars.repeat(30)}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Cyber/AI themed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm mb-6"
          >
            <span className="text-cyan-400 text-sm font-mono tracking-wider">⚡ AI-POWERED SOLUTIONS ⚡</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black mb-4 font-mono">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              OUR SERVICES
            </span>
          </h2>
          <p className="text-xl text-cyan-400/70 font-mono tracking-wider">
            &lt; Neural Network Integrated /&gt;
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Service Card - Semi-transparent with top highlight strip */}
                <div className="relative bg-black/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 transition-all duration-500 overflow-hidden
                  before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-cyan-400/50 before:to-transparent before:translate-x-[-100%] group-hover:before:translate-x-[100%] before:transition-transform before:duration-700
                  after:absolute after:inset-0 after:bg-gradient-to-r after:from-cyan-500/0 after:via-cyan-500/0 after:to-purple-500/0 group-hover:after:from-cyan-500/5 group-hover:after:via-purple-500/5 group-hover:after:to-pink-500/5 after:transition-all after:duration-500 after:pointer-events-none
                  hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                  
                  {/* Cyber grid overlay inside card */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                  
                  {/* Top Row with ID and Icon */}
                  <div className="relative flex items-start justify-between mb-6">
                    <span className="text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      {service.id}
                    </span>
                    <div className="relative">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300">
                        <Icon className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300" />
                      </div>
                      {/* Glowing dot */}
                      <motion.div 
                        className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="relative text-2xl font-bold text-white mb-4 font-mono group-hover:text-cyan-400 transition-colors">
                    {service.title}
                    <span className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent group-hover:w-24 transition-all duration-500" />
                  </h3>

                  {/* Description */}
                  <p className="relative text-gray-400 font-mono text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>

                  {/* Features Tags */}
                  <div className="relative flex flex-wrap gap-2 mb-8">
                    {service.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-cyan-500/5 border border-cyan-500/20 rounded-lg text-xs font-mono text-cyan-400/80 hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Stats and Explore Row */}
                  <div className="relative flex items-center justify-between pt-4 border-t border-cyan-500/20">
                    {/* Stats */}
                    {service.stats.map((stat, i) => {
                      const StatIcon = stat.icon;
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div className="relative">
                            <StatIcon className="w-5 h-5 text-cyan-400" />
                            <motion.div 
                              className="absolute inset-0 bg-cyan-400/20 blur-md"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-white font-mono">
                              {stat.value}
                            </div>
                            <div className="text-[10px] text-cyan-500/60 font-mono tracking-wider">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Explore Button */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group/btn"
                    >
                      <span className="text-sm font-mono">{service.exploreText}</span>
                      <HiOutlineArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>

                  {/* Bottom binary code line */}
                  <div className="absolute bottom-2 right-4 text-[8px] font-mono text-cyan-500/30">
                    01101001 01101110 01101001 01110100
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats - Cyber/AI themed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "500+", label: "PROJECTS COMPLETED", icon: HiOutlineRocketLaunch },
            { value: "98%", label: "CLIENT SATISFACTION", icon: HiOutlineChartBar },
            { value: "24/7", label: "SUPPORT AVAILABLE", icon: HiOutlineClock },
            { value: "10+", label: "INDUSTRY AWARDS", icon: HiOutlineStar }
          ].map((stat, i) => {
            const StatIcon = stat.icon;
            return (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05, borderColor: '#00ffff' }}
                className="text-center p-6 bg-black/60 backdrop-blur-md border border-cyan-500/20 rounded-xl hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] transition-all duration-300 relative overflow-hidden group"
              >
                {/* Top highlight strip */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <StatIcon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-cyan-400 font-mono mb-2">{stat.value}</div>
                <div className="text-xs text-cyan-500/60 font-mono tracking-wider">{stat.label}</div>
                
                {/* Binary code background */}
                <div className="absolute inset-0 text-[6px] text-cyan-500/5 font-mono overflow-hidden pointer-events-none">
                  01 10 01 10 01 10 01 10
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Cyber security footer line */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-500/5 border border-cyan-500/20 rounded-full">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-cyan-400/60">SECURED BY QUANTUM ENCRYPTION • AI-PROTECTED • v2.0</span>
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}