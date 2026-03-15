// app/components/ShowcaseStats.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  HiOutlineSparkles, 
  HiOutlineShieldCheck, 
  HiOutlineCube,
  HiOutlineArrowTrendingUp,
  HiOutlineCodeBracket,
  HiOutlineRocketLaunch,
  HiOutlineCpuChip,
  HiOutlineCommandLine,
  HiOutlineCloudArrowUp,
  HiOutlineChartBar,
  HiOutlineGlobeAlt
} from 'react-icons/hi2';

export default function ShowcaseStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Matrix rain characters
  const matrixChars = "01アイウエオカキクケコサシスセソタチツテト";

  // Features data - Updated for AI company
  const features = [
    {
      title: "Multi-Model AI Architecture",
      description: "Orchestrate multiple AI models (LLMs, vision, speech) through a unified API with automatic model selection for optimal performance.",
      icon: HiOutlineCpuChip,
      gradient: "from-cyan-400 to-blue-400"
    },
    {
      title: "Real-Time Learning",
      description: "Models continuously improve from your data with automated retraining pipelines and performance monitoring dashboards.",
      icon: HiOutlineChartBar,
      gradient: "from-blue-400 to-purple-400"
    },
    {
      title: "Enterprise Security & Compliance",
      description: "SOC2, GDPR, HIPAA-ready infrastructure with end-to-end encryption, private VPC deployments, and audit logging.",
      icon: HiOutlineShieldCheck,
      gradient: "from-purple-400 to-pink-400"
    },
    {
      title: "Global AI Infrastructure",
      description: "Deploy AI models across 20+ global regions with sub-100ms latency, auto-scaling, and 99.99% uptime SLA.",
      icon: HiOutlineGlobeAlt,
      gradient: "from-pink-400 to-rose-400"
    }
  ];

  // Fixed positions for digital rain - using percentage strings
  const rainPositions = [
    { left: '5%', delay: 0 },
    { left: '20%', delay: 2 },
    { left: '35%', delay: 4 },
    { left: '50%', delay: 6 },
    { left: '65%', delay: 8 },
    { left: '80%', delay: 10 },
    { left: '95%', delay: 12 },
  ];

  // Fixed positions for particles - using percentage strings to avoid Math.random() hydration mismatch
  const particlePositions = [
    { top: '10%', left: '15%', delay: 0, duration: 4 },
    { top: '25%', left: '75%', delay: 1, duration: 5 },
    { top: '40%', left: '30%', delay: 2, duration: 6 },
    { top: '55%', left: '85%', delay: 3, duration: 4 },
    { top: '70%', left: '20%', delay: 4, duration: 7 },
    { top: '85%', left: '60%', delay: 5, duration: 5 },
    { top: '15%', left: '45%', delay: 6, duration: 6 },
    { top: '35%', left: '90%', delay: 0, duration: 5 },
    { top: '50%', left: '10%', delay: 1, duration: 4 },
    { top: '65%', left: '55%', delay: 2, duration: 7 },
    { top: '80%', left: '35%', delay: 3, duration: 5 },
    { top: '95%', left: '70%', delay: 4, duration: 6 },
    { top: '20%', left: '95%', delay: 5, duration: 4 },
    { top: '45%', left: '5%', delay: 6, duration: 5 },
    { top: '60%', left: '40%', delay: 0, duration: 6 },
    { top: '75%', left: '80%', delay: 1, duration: 7 },
    { top: '30%', left: '50%', delay: 2, duration: 4 },
    { top: '48%', left: '65%', delay: 3, duration: 5 },
    { top: '62%', left: '25%', delay: 4, duration: 6 },
    { top: '77%', left: '88%', delay: 5, duration: 4 },
    { top: '88%', left: '15%', delay: 6, duration: 5 },
    { top: '12%', left: '72%', delay: 0, duration: 7 },
    { top: '28%', left: '38%', delay: 1, duration: 4 },
    { top: '43%', left: '92%', delay: 2, duration: 5 },
    { top: '58%', left: '8%', delay: 3, duration: 6 },
    { top: '73%', left: '48%', delay: 4, duration: 7 },
    { top: '89%', left: '58%', delay: 5, duration: 4 },
    { top: '22%', left: '82%', delay: 6, duration: 5 },
    { top: '38%', left: '22%', delay: 0, duration: 6 },
    { top: '53%', left: '68%', delay: 1, duration: 4 },
  ];

  return (
    <section className="relative w-full min-h-screen py-16 sm:py-20 md:py-24 overflow-hidden bg-black">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
      </div>

      {/* Digital Rain Effect - Only render after mount */}
      {mounted && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {rainPositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan-500/30 text-xs font-mono whitespace-nowrap"
              style={{
                left: pos.left,
                top: '-20%',
                writingMode: 'vertical-rl',
              }}
              animate={{
                y: ['0vh', '120vh'],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: pos.delay,
              }}
            >
              {matrixChars.substring(0, 40)}
            </motion.div>
          ))}
        </div>
      )}

      {/* Animated Particles - Fixed positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              top: pos.top,
              left: pos.left,
            }}
            animate={{
              y: [-30, 30, -30],
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Features */}
          <div className="space-y-6 sm:space-y-8">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm"
            >
              <HiOutlineCpuChip className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-xs sm:text-sm font-mono tracking-wider">⚡ AI INFRASTRUCTURE v3.0 ⚡</span>
            </motion.div>

            {/* Features List */}
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group relative"
                >
                  {/* Feature Card */}
                  <div className="relative bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-5 sm:p-6 overflow-hidden
                    before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-cyan-400 before:to-transparent before:translate-x-[-100%] group-hover:before:translate-x-[100%] before:transition-transform before:duration-700
                    hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(0,255,255,0.2)] transition-all duration-500">
                    
                    {/* Inner Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                    
                    {/* Content */}
                    <div className="relative flex items-start gap-3 sm:gap-4">
                      {/* Icon with Glow */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 sm:p-3 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-full h-full text-white" />
                        </div>
                        <motion.div 
                          className="absolute inset-0 bg-cyan-400/20 blur-xl"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                        />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-mono mb-1 sm:mb-2 group-hover:text-cyan-400 transition-colors">
                          #{feature.title}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base text-gray-400 font-mono leading-relaxed group-hover:text-gray-300 transition-colors">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Binary Code Decorator */}
                    <div className="absolute bottom-2 right-3 text-[6px] sm:text-[8px] font-mono text-cyan-500/30">
                      01000001 01001001 00100000 01010010 01000101 01000001 01000100 01011001
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column - Stats & Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Dashboard Card */}
            <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-5 sm:p-6 md:p-8 overflow-hidden
              hover:border-purple-400/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all duration-500">
              
              {/* Grid Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

              {/* Dashboard Header */}
              <div className="relative flex items-center justify-between mb-6 sm:mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-cyan-400 font-mono text-xs sm:text-sm">ai.dashboard.nexus</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400/50 rounded-full" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400/50 rounded-full" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400/50 rounded-full" />
                </div>
              </div>

              {/* Main Stats - AI Performance Metrics */}
              <div className="relative mb-8 sm:mb-12">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                  >
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black font-mono bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      99.97%
                    </span>
                    <div className="text-xs text-gray-400 font-mono mt-1">MODEL ACCURACY</div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                  >
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black font-mono bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      &lt;50ms
                    </span>
                    <div className="text-xs text-gray-400 font-mono mt-1">INFERENCE LATENCY</div>
                  </motion.div>
                </div>

                {/* Performance Label */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30 whitespace-nowrap">
                  <span className="text-purple-400 font-mono text-[10px] sm:text-xs tracking-wider">REAL-TIME METRICS</span>
                </div>
              </div>

              {/* Progress Bar - API Usage */}
              <div className="relative space-y-4">
                <div className="flex justify-between text-[10px] sm:text-xs font-mono">
                  <span className="text-cyan-400">API THROUGHPUT</span>
                  <span className="text-white">2.4M req/min</span>
                </div>
                <div className="w-full h-1.5 sm:h-2 bg-cyan-500/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: '86%' }}
                    transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between text-[10px] sm:text-xs font-mono">
                  <span className="text-gray-500">CAPACITY</span>
                  <span className="text-cyan-400">86% UTILIZED</span>
                </div>
              </div>

              {/* Cyber Decorations */}
              <div className="absolute top-4 right-4 text-[8px] font-mono text-cyan-500/30 hidden sm:block">
                AI-7F3A • ML-9B2C
              </div>
            </div>

            {/* Code Snippet Card - AI Training Script */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="relative bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4 sm:p-5 overflow-hidden group
                hover:border-cyan-400/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.02)_1px,transparent_1px)] bg-[size:15px_15px]" />
              
              <div className="relative font-mono text-xs sm:text-sm">
                <div className="text-purple-400 mb-2">{`const model = await nexusAI.load('gpt-4-vision');`}</div>
                <div className="text-cyan-400 mb-2">{`const result = model.process({`}</div>
                <div className="text-green-400/70 ml-4 mb-2">{`  input: 'real-time_data_stream',`}</div>
                <div className="text-green-400/70 ml-4 mb-2">{`  threshold: 0.95,`}</div>
                <div className="text-green-400/70 ml-4 mb-2">{`  latency: '<50ms'`}</div>
                <div className="text-cyan-400 mb-2">{`});`}</div>
                <div className="text-green-400/70 flex items-center gap-2">
                  <span className="animate-pulse">{'//'}</span>
                  <span>Training pipeline active...</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-1 h-3 bg-green-400 inline-block"
                  />
                </div>
              </div>

              {/* Copy Button */}
              <button className="absolute top-2 right-2 text-cyan-500/50 hover:text-cyan-400 transition-colors">
                <HiOutlineCommandLine className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Security Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center justify-center gap-3 text-[10px] sm:text-xs font-mono"
            >
              <span className="text-cyan-500/50">ai.nexus.cloud</span>
              <span className="w-1 h-1 bg-cyan-400 rounded-full" />
              <span className="text-purple-400">SOC2 • HIPAA</span>
              <span className="w-1 h-1 bg-purple-400 rounded-full" />
              <span className="text-cyan-500/50">ENCRYPTED</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Glow Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="relative h-[2px] mt-16 sm:mt-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rotate-45" />
        </motion.div>
      </div>
    </section>
  );
}