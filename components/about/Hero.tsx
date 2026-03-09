"use client"

import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { 
  HiOutlineCpuChip,
  HiOutlineCommandLine,
  HiOutlineSparkles,
  HiOutlineRocketLaunch,
  HiOutlineShieldCheck,
 
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineBeaker,
  HiOutlineArrowLongRight,
  HiOutlineCheckBadge,
  HiOutlineCube,
 
  HiOutlineCpuChip as HiOutlineCpu,
 
} from "react-icons/hi2"

// Floating Particle Component
const FloatingParticle = ({ delay = 0, size = "small", color = "cyan" }: { delay?: number, size?: string, color?: string }) => {
  const sizeClasses = {
    small: "w-1 h-1",
    medium: "w-2 h-2",
    large: "w-3 h-3"
  }
  
  const colorClasses = {
    cyan: "bg-cyan-400",
    fuchsia: "bg-fuchsia-400",
    blue: "bg-blue-400",
    purple: "bg-purple-400"
  }

  return (
    <motion.div
      className={`absolute rounded-full ${sizeClasses[size as keyof typeof sizeClasses]} ${colorClasses[color as keyof typeof colorClasses]}`}
      initial={{ 
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
        opacity: 0,
        scale: 0
      }}
      animate={{ 
        y: [null, -100, -200, -300],
        x: [null, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
        opacity: [0, 0.8, 0.4, 0],
        scale: [0, 1, 0.8, 0]
      }}
      transition={{ 
        duration: 5 + Math.random() * 5,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
    />
  )
}

// Glowing Orb Component
const GlowingOrb = ({ position, color, size, delay }: { position: string, color: string, size: string, delay: number }) => {
  return (
    <motion.div
      className={`absolute ${position} ${size} rounded-full blur-3xl opacity-20`}
      style={{ background: color }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay
      }}
    />
  )
}

// AI Feature Card Component
const AICard = ({ icon: Icon, title, value, subtitle, gradient, delay }: { icon: any, title: string, value: string, subtitle: string, gradient: string, delay: number }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity`} />
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} p-3 mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-2xl font-mono text-cyan-400 mb-1">{value}</div>
        <div className="text-sm font-semibold text-white mb-1">{title}</div>
        <div className="text-xs text-gray-400">{subtitle}</div>
      </div>
    </motion.div>
  )
}

// Main About Hero Component
export default function AboutHero() {
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 })
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 150 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const x = (clientX - innerWidth / 2) / 30
      const y = (clientY - innerHeight / 2) / 30
      
      mouseX.set(x)
      mouseY.set(y)
      
      setMousePosition({ x: clientX, y: clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const gridRotate = useTransform(springX, (x) => `perspective(1000px) rotateY(${x}deg) rotateX(${springY.get()}deg)`)
  const parallaxStyle = useTransform(springY, (y) => `translateY(${y * 0.5}px) translateX(${springX.get() * 0.5}px)`)

  // Stats data
  const aiStats = [
    { icon: HiOutlineCube, value: "50+", title: "AI Products", subtitle: "Live in production", gradient: "from-cyan-500 to-blue-500" },
    { icon: HiOutlineUserGroup, value: "2M+", title: "Active Users", subtitle: "Across platforms", gradient: "from-fuchsia-500 to-purple-500" },
    { icon: HiOutlineClock, value: "10M+", title: "Hours Saved", subtitle: "For our users", gradient: "from-blue-500 to-cyan-400" },
    { icon: HiOutlineChartBar, value: "99.9%", title: "Efficiency Rate", subtitle: "Task automation", gradient: "from-purple-500 to-fuchsia-400" }
  ]

  return (
    <section ref={containerRef} className="relative bg-[#03050b] text-white min-h-screen overflow-hidden">
      
      {/* Cyber Grid Background with Parallax */}
      <motion.div 
        style={{ transform: gridRotate }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute inset-0 
          bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)]
          bg-[size:50px_50px]" 
        />
      </motion.div>

      {/* Animated Binary Rain */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-500/10 font-mono text-xs whitespace-nowrap"
            initial={{ 
              x: Math.random() * windowSize.width, 
              y: -100,
              opacity: 0.2
            }}
            animate={{ 
              y: windowSize.height + 100,
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          >
            {Array(20).fill(0).map(() => Math.random() > 0.5 ? "1" : "0").join("")}
          </motion.div>
        ))}
      </div>

      {/* Floating Particles */}
      {[...Array(50)].map((_, i) => (
        <FloatingParticle 
          key={i} 
          delay={i * 0.2} 
          size={i % 3 === 0 ? "large" : i % 2 === 0 ? "medium" : "small"}
          color={i % 4 === 0 ? "fuchsia" : i % 3 === 0 ? "blue" : "cyan"}
        />
      ))}

      {/* Glowing Orbs */}
      <GlowingOrb position="top-20 left-20" color="rgba(0,255,255,0.5)" size="w-96 h-96" delay={0} />
      <GlowingOrb position="bottom-20 right-20" color="rgba(255,0,255,0.5)" size="w-[500px] h-[500px]" delay={2} />
      <GlowingOrb position="top-40 right-40" color="rgba(0,100,255,0.5)" size="w-80 h-80" delay={4} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-32 pb-24">
        
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
            />
            <span className="text-sm font-mono text-cyan-400">AI PRODUCT DEVELOPER • INNOVATION LAB</span>
            <motion.span
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 bg-fuchsia-400 rounded-full"
            />
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-5xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400">
              Building the Future
            </span>
            <br />
            <span className="text-white relative">
              One AI at a Time
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -right-8 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-cyan-400"
              />
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            I'm on a mission to create{" "}
            <span className="text-cyan-400 font-semibold">intelligent AI products</span> and{" "}
            <span className="text-fuchsia-400 font-semibold">innovative tools</span> that 
            revolutionize how people work — reducing human effort, accelerating workflows, 
            and unlocking unprecedented productivity.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {aiStats.map((stat, index) => (
            <AICard key={index} {...stat} delay={0.2 + index * 0.1} />
          ))}
        </motion.div>

        {/* Main Value Proposition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="relative"
        >
          {/* Glowing Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
          
          {/* Content Card */}
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
            
            {/* Inner Grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-[linear-gradient(rgba(0,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.2)_1px,transparent_1px)] bg-[size:30px_30px]" />
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="text-cyan-400">Why I Build</span>
                  <br />
                  <span className="text-white">AI That Matters</span>
                </h2>

                <div className="space-y-4">
                  {[
                    { icon: HiOutlineRocketLaunch, text: "10x faster workflow automation", color: "cyan" },
                    { icon: HiOutlineSparkles, text: "Intelligent task delegation", color: "fuchsia" },
                    { icon: HiOutlineCpuChip, text: "Adaptive learning systems", color: "blue" },
                    { icon: HiOutlineShieldCheck, text: "Enterprise-grade security", color: "purple" },
                    { icon: HiOutlineCommandLine, text: "Seamless API integration", color: "cyan" },
                    { icon: HiOutlineUserGroup, text: "Human-centric design", color: "fuchsia" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="flex items-center gap-3 group"
                    >
                      <div className={`p-2 rounded-lg bg-${item.color}-500/20 border border-${item.color}-500/30`}>
                        <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                      </div>
                      <span className="text-gray-300">{item.text}</span>
                      <HiOutlineCheckBadge className="w-4 h-4 text-green-400 opacity-0 group-hover:opacity-100 transition" />
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,255,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <HiOutlineBeaker className="relative z-10 w-5 h-5" />
                  <span className="relative z-10">Explore My AI Products</span>
                  <HiOutlineArrowLongRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition" />
                </motion.button>
              </div>

              {/* Right Content - Visual Representation */}
              <div className="relative h-[400px]">
                {/* Animated Neural Network Visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    {/* Neural Connections */}
                    {[...Array(10)].map((_, i) => (
                      [...Array(10)].map((_, j) => (
                        <motion.line
                          key={`${i}-${j}`}
                          x1={50 + i * 30}
                          y1={50 + j * 30}
                          x2={50 + (i + 1) * 30}
                          y2={50 + j * 30}
                          stroke="rgba(0,255,255,0.2)"
                          strokeWidth="1"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.2 }}
                          transition={{ duration: 2, delay: i * 0.05, repeat: Infinity, repeatType: "reverse" }}
                        />
                      ))
                    ))}

                    {/* Vertical Connections */}
                    {[...Array(10)].map((_, i) => (
                      [...Array(10)].map((_, j) => (
                        <motion.line
                          key={`v-${i}-${j}`}
                          x1={50 + i * 30}
                          y1={50 + j * 30}
                          x2={50 + i * 30}
                          y2={50 + (j + 1) * 30}
                          stroke="rgba(255,0,255,0.2)"
                          strokeWidth="1"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.2 }}
                          transition={{ duration: 2, delay: i * 0.05 + 1, repeat: Infinity, repeatType: "reverse" }}
                        />
                      ))
                    ))}

                    {/* Nodes */}
                    {[...Array(10)].map((_, i) => (
                      [...Array(10)].map((_, j) => (
                        <motion.circle
                          key={`node-${i}-${j}`}
                          cx={50 + i * 30}
                          cy={50 + j * 30}
                          r="4"
                          fill="url(#gradient)"
                          animate={{
                            r: [4, 8, 4],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.1 + j * 0.1,
                            repeat: Infinity
                          }}
                        />
                      ))
                    ))}

                    <defs>
                      <radialGradient id="gradient">
                        <stop offset="0%" stopColor="#00ffff" />
                        <stop offset="100%" stopColor="#ff00ff" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>

                {/* Floating AI Labels */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-10 left-10 bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2"
                >
                  <span className="text-xs font-mono text-cyan-400">Machine Learning</span>
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-20 right-10 bg-black/60 backdrop-blur-sm border border-fuchsia-500/30 rounded-lg px-3 py-2"
                >
                  <span className="text-xs font-mono text-fuchsia-400">Neural Networks</span>
                </motion.div>

                <motion.div
                  animate={{ x: [-10, 10, -10] }}
                  transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                  className="absolute top-40 right-20 bg-black/60 backdrop-blur-sm border border-blue-500/30 rounded-lg px-3 py-2"
                >
                  <span className="text-xs font-mono text-blue-400">Deep Learning</span>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 3 }}
                  className="absolute bottom-10 left-20 bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg px-3 py-2"
                >
                  <span className="text-xs font-mono text-purple-400">AI Core</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-16 font-mono text-sm text-gray-500"
        >
          <span className="text-cyan-400">{"<"}</span> reducing human effort • accelerating innovation • building the future <span className="text-fuchsia-400">{">"}</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-gray-500"
      >
        <span>SCROLL TO DISCOVER</span>
        <HiOutlineArrowLongRight className="w-4 h-4 rotate-90" />
      </motion.div>
    </section>
  )
}