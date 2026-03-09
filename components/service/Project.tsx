"use client"

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { 
  HiOutlineEye, 
  HiOutlineArrowTopRightOnSquare,
  HiOutlineCodeBracket,
  HiOutlineChartBar,
  HiOutlineDevicePhoneMobile,
  HiOutlineShieldCheck,
  HiOutlineCommandLine,
  HiOutlineCpuChip,
  HiOutlineGlobeAlt,
  HiOutlineRocketLaunch,
  HiOutlineSparkles,
  HiOutlineServer,
  HiOutlineLockClosed,
  HiOutlineArrowLongRight,
  HiOutlineMagnifyingGlassPlus
} from "react-icons/hi2"

// Project Data
const projects = [
  {
    id: 1,
    title: "NeuralGuard AI",
    category: "Cybersecurity",
    description: "Advanced AI-powered threat detection platform with real-time neural network analysis and autonomous response systems.",
    image: "/projects/neuralguard.jpg", // Replace with actual image path
    technologies: ["Next.js", "TensorFlow", "Python", "WebGL"],
    metrics: {
      performance: 99,
      security: 100,
      uptime: 99.99
    },
    gradient: "from-cyan-500 to-blue-600",
    icon: HiOutlineShieldCheck,
    link: "#"
  },
  {
    id: 2,
    title: "QuantumCore Exchange",
    category: "FinTech",
    description: "Decentralized cryptocurrency exchange with quantum-resistant encryption and sub-millisecond transaction processing.",
    image: "/projects/quantumcore.jpg",
    technologies: ["React", "Node.js", "Solidity", "WebAssembly"],
    metrics: {
      performance: 98,
      security: 99,
      uptime: 99.95
    },
    gradient: "from-purple-500 to-fuchsia-600",
    icon: HiOutlineCpuChip,
    link: "#"
  },
  {
    id: 3,
    title: "CyberSync OS",
    category: "Cloud Infrastructure",
    description: "Distributed cloud operating system with self-healing architecture and AI-optimized resource allocation.",
    image: "/projects/cybersync.jpg",
    technologies: ["Kubernetes", "Go", "Rust", "GraphQL"],
    metrics: {
      performance: 97,
      security: 98,
      uptime: 99.98
    },
    gradient: "from-blue-500 to-cyan-400",
    icon: HiOutlineServer,
    link: "#"
  },
  {
    id: 4,
    title: "BioLink Genomics",
    category: "HealthTech",
    description: "AI-powered genomic analysis platform processing millions of DNA sequences with real-time mutation detection.",
    image: "/projects/biolink.jpg",
    technologies: ["Python", "Django", "Redis", "D3.js"],
    metrics: {
      performance: 96,
      security: 99,
      uptime: 99.92
    },
    gradient: "from-emerald-500 to-teal-400",
    icon: HiOutlineSparkles,
    link: "#"
  },
  {
    id: 5,
    title: "AutoDefend Automotive",
    category: "Automotive AI",
    description: "Autonomous vehicle security system with predictive collision avoidance and encrypted vehicle-to-everything communication.",
    image: "/projects/autodefend.jpg",
    technologies: ["C++", "ROS", "PyTorch", "MQTT"],
    metrics: {
      performance: 99,
      security: 99,
      uptime: 99.99
    },
    gradient: "from-red-500 to-orange-500",
    icon: HiOutlineRocketLaunch,
    link: "#"
  },
  {
    id: 6,
    title: "NeuroLink Interface",
    category: "Brain-Computer Interface",
    description: "Neural interface platform enabling direct brain-to-device communication with real-time signal processing.",
    image: "/projects/neurolink.jpg",
    technologies: ["Python", "C++", "WebGL", "WebSockets"],
    metrics: {
      performance: 95,
      security: 98,
      uptime: 99.89
    },
    gradient: "from-fuchsia-500 to-pink-500",
    icon: HiOutlineCommandLine,
    link: "#"
  }
]

// Category Filter Component
const CategoryFilter = ({ categories, activeCategory, setActiveCategory }: { 
  categories: string[], 
  activeCategory: string, 
  setActiveCategory: (category: string) => void 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-3 justify-center mb-12"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveCategory("all")}
        className={`px-6 py-3 rounded-full font-mono text-sm transition-all ${
          activeCategory === "all" 
            ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,255,255,0.5)]" 
            : "border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300"
        }`}
      >
        ALL SYSTEMS
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveCategory(category)}
          className={`px-6 py-3 rounded-full font-mono text-sm transition-all ${
            activeCategory === category 
              ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,255,255,0.5)]" 
              : "border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300"
          }`}
        >
          {category.toUpperCase()}
        </motion.button>
      ))}
    </motion.div>
  )
}

// Project Card Component
const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glow Effect */}
      <motion.div
        animate={isHovered ? { opacity: 0.6, scale: 1.05 } : { opacity: 0, scale: 1 }}
        className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-2xl blur-xl transition-opacity`}
      />

      {/* Main Card */}
      <div className="relative bg-[#0a0c15] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
          <motion.div
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full bg-[#1a1d2a] flex items-center justify-center"
          >
            <project.icon className="w-20 h-20 text-white/20" />
          </motion.div>
          
          {/* Overlay */}
          <motion.div
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end justify-end p-4"
          >
            <motion.a
              href={project.link}
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-cyan-500 rounded-full text-black"
            >
              <HiOutlineArrowTopRightOnSquare className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Category Tag */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-full">
            <span className="text-xs font-mono text-cyan-400">{project.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient}`} />
            {project.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded font-mono text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
            <div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <HiOutlineChartBar className="w-3 h-3" />
                Perf
              </div>
              <div className="text-sm font-mono text-cyan-400">{project.metrics.performance}%</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <HiOutlineShieldCheck className="w-3 h-3" />
                Sec
              </div>
              <div className="text-sm font-mono text-fuchsia-400">{project.metrics.security}%</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <HiOutlineServer className="w-3 h-3" />
                Uptime
              </div>
              <div className="text-sm font-mono text-blue-400">{project.metrics.uptime}%</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Main Portfolio Component
export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const containerRef = useRef(null)
  
  const categories = [...new Set(projects.map(p => p.category))]
  
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  // Stats for the header
  const totalProjects = projects.length
  const avgPerformance = Math.round(projects.reduce((acc, p) => acc + p.metrics.performance, 0) / totalProjects)
  const totalTech = [...new Set(projects.flatMap(p => p.technologies))].length

  return (
    <section className="relative bg-[#03050b] text-white min-h-screen overflow-hidden pt-32 pb-24">
      
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 
          bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)]
          bg-[size:50px_50px]" 
        />
        <div className="absolute inset-0 
          bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,255,0.1),transparent_50%)]" 
        />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{ 
              y: [null, -100],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div 
            animate={{ 
              boxShadow: ["0 0 20px rgba(0,255,255,0.3)", "0 0 40px rgba(255,0,255,0.3)", "0 0 20px rgba(0,255,255,0.3)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-sm mb-6 font-mono tracking-wide"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              ⚡
            </motion.span>
            OUR PORTFOLIO • SYSTEM SHOWCASE v2.0
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-5xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400">
              Digital Excellence
            </span>
            <br />
            <span className="text-white">in Every Project</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore our latest AI-powered systems and cyber infrastructure projects, 
            delivered with cutting-edge technology and innovative solutions.
          </p>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-3xl font-mono text-cyan-400">{totalProjects}</div>
              <div className="text-sm text-gray-400">Total Projects</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-3xl font-mono text-fuchsia-400">{avgPerformance}%</div>
              <div className="text-sm text-gray-400">Avg. Performance</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-3xl font-mono text-blue-400">{totalTech}</div>
              <div className="text-sm text-gray-400">Technologies</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,255,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <HiOutlineMagnifyingGlassPlus className="relative z-10 w-5 h-5" />
            <span className="relative z-10">Load More Projects</span>
            <HiOutlineArrowLongRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [-20, 20, -20],
          rotate: 360
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 left-10 w-64 h-64 border border-cyan-500/20 rounded-full"
      />
      <motion.div
        animate={{ 
          y: [20, -20, 20],
          rotate: -360
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-96 h-96 border border-fuchsia-500/20 rounded-full"
      />
    </section>
  )
}