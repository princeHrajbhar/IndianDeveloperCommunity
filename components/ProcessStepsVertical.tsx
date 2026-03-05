// app/components/OurProcess.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  HiOutlineDocumentText, 
  HiOutlineUsers, 
  HiOutlineDownload,
  HiOutlineChatAlt,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineArrowRight
} from 'react-icons/hi';

const processSteps = [
  {
    step: "STEP 1",
    title: "Discovery & Requirement",
    description: "Share your vision through our simple project form or schedule a free consultation",
    icon: HiOutlineChatAlt,
    color: "cyan",
    duration: "30-60 min"
  },
  {
    step: "STEP 2",
    title: "Detailed Quotation",
    description: "Receive a transparent, itemized quotation breaking down every feature, module, and deliverable with clear pricing.",
    icon: HiOutlineDocumentText,
    color: "cyan",
    features: [
      "Itemized Breakdown",
      "Transparent Pricing",
      "Approve / Request Changes",
      "PDF Download"
    ]
  },
  {
    step: "STEP 3",
    title: "Team Assignment",
    description: "A dedicated team is assigned to your project — designer, developer, project manager.",
    icon: HiOutlineUsers,
    color: "purple",
    team: ["Designer", "Developer", "Project Manager"],
    contacts: ["WhatsApp", "Email", "Meetings"]
  }
];

export default function OurProcess() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get random positions only after mount
  const getRandomPosition = (i: number, max: number) => {
    if (!mounted) return 0;
    return (i * 73) % max;
  };

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:30px_30px] md:bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
      </div>

      {/* Animated particles - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 sm:w-1 h-0.5 sm:h-1 bg-cyan-500/20 rounded-full"
            initial={{ 
              x: getRandomPosition(i, windowWidth), 
           y: mounted ? (i * 50) % window.innerHeight : 0
            }}
            animate={{
              y: [null, -30, 30, -30],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          {/* Process badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm mb-4 sm:mb-6"
          >
            <HiOutlineClock className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
            <span className="text-cyan-400 text-[10px] sm:text-xs md:text-sm font-mono tracking-wider">3 SIMPLE STEPS</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 font-mono">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              OUR PROCESS
            </span>
          </h2>
          
          <div className="space-y-1 sm:space-y-2">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white font-mono">
              100% Transparent.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono">
              100% Trustworthy.
            </p>
          </div>

          <p className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-gray-400 font-mono leading-relaxed px-2">
            We believe every client deserves full visibility into their project. From day one, you get real-time access to your project&apos;s progress, your dedicated team, and every document — all in one platform.
          </p>
        </motion.div>

        {/* Process Steps with Timeline */}
        <div className="relative">
          {/* Animated timeline line - hidden on mobile, different layout on tablet */}
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Glowing dots on line */}
            <motion.div 
              className="absolute -left-1 top-0 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#00ffff]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.div 
              className="absolute -left-1 top-1/2 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-purple-400 shadow-[0_0_15px_#a855f7]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            />
            <motion.div 
              className="absolute -left-1 bottom-0 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#00ffff]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 2 }}
            />
          </motion.div>

          {/* Process Steps */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              const shadowColor = step.color === 'purple' ? 'rgba(168,85,247,0.5)' : 'rgba(0,255,255,0.4)';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Step Number Circle - positioned differently on mobile and desktop */}
                  <motion.div 
                    className={`relative z-20 mb-4 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2
                      ${isEven ? 'md:order-1' : 'md:order-2'}`}
                    style={{ 
                      width: 'clamp(2.5rem, 8vw, 3rem)',
                      height: 'clamp(2.5rem, 8vw, 3rem)',
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="w-full h-full bg-black border-2 rounded-full flex items-center justify-center"
                      style={{ 
                        borderColor: step.color === 'purple' ? '#a855f7' : '#00ffff',
                        boxShadow: `0 0 20px ${step.color === 'purple' ? '#a855f7' : '#00ffff'}`
                      }}
                    >
                      <span className="text-xs sm:text-sm font-mono" style={{ color: step.color === 'purple' ? '#a855f7' : '#00ffff' }}>
                        {index + 1}
                      </span>
                    </div>
                  </motion.div>

                  {/* Content Card - split to both sides */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <motion.div
                      whileHover={{ 
                        scale: 1.01,
                        boxShadow: `0 20px 40px ${shadowColor}`,
                        borderColor: step.color === 'purple' ? '#a855f7' : '#00ffff',
                      }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 cursor-pointer transition-all duration-300"
                    >
                      {/* Icon and Step */}
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${
                          step.color === 'purple' 
                            ? 'from-purple-500/20 to-pink-500/20' 
                            : 'from-cyan-500/20 to-blue-500/20'
                        }`}>
                          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                            step.color === 'purple' ? 'text-purple-400' : 'text-cyan-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className={`text-[10px] sm:text-xs font-mono ${
                            step.color === 'purple' ? 'text-purple-400' : 'text-cyan-400'
                          }`}>
                            {step.step}
                          </div>
                          {step.duration && (
                            <div className="text-[8px] sm:text-xs text-gray-500 font-mono mt-0.5 sm:mt-1">
                              ~{step.duration}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 font-mono transition-colors ${
                        step.color === 'purple' ? 'group-hover:text-purple-400' : 'group-hover:text-cyan-400'
                      }`}>
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 font-mono text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                        {step.description}
                      </p>

                      {/* Features for Step 2 */}
                      {step.features && (
                        <div className="space-y-3 sm:space-y-4">
                          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                            {step.features.map((feature, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-1.5 sm:gap-2"
                              >
                                <HiOutlineCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                                <span className="text-gray-300 font-mono text-[10px] sm:text-xs">{feature}</span>
                                {feature.includes('PDF') && (
                                  <HiOutlineDownload className="w-2 h-2 sm:w-3 sm:h-3 text-purple-400" />
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Team for Step 3 */}
                      {step.team && (
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {step.team.map((role, i) => (
                              <motion.span
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg text-[8px] sm:text-xs font-mono text-purple-400"
                              >
                                {role}
                              </motion.span>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[8px] sm:text-xs">
                            {step.contacts?.map((contact, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400" />
                                <span className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors font-mono">
                                  {contact}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Next step indicator - hidden on mobile */}
                      {index < processSteps.length - 1 && (
                        <motion.div 
                          className={`hidden sm:flex items-center gap-2 mt-4 sm:mt-6 text-[10px] sm:text-xs font-mono ${
                            isEven ? 'justify-start' : 'justify-end'
                          }`}
                          animate={{ x: isEven ? [0, 5, 0] : [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <span className="text-gray-500">Next Step</span>
                          <HiOutlineArrowRight className="w-3 h-3 text-cyan-400" />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 md:mt-20 text-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.03,
              boxShadow: '0 15px 30px rgba(168,85,247,0.3)',
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg sm:rounded-xl text-white font-mono text-xs sm:text-sm md:text-base font-bold tracking-wider"
          >
            START YOUR PROJECT
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}