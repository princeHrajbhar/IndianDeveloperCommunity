"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { 
  HiOutlineCpuChip,
  HiOutlineCommandLine,
  HiOutlineSparkles,
  HiOutlineRocketLaunch,
  HiOutlineShieldCheck,
  HiOutlineCodeBracket,
  HiOutlineServerStack,
  HiOutlineGlobeAlt,
  HiOutlineLightBulb,
  HiOutlineCube,
  HiOutlineCircleStack,
  HiOutlineCog6Tooth,

  HiOutlineBolt,

  HiOutlineChartBar,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineTrophy,
  HiOutlineCalendar,

  HiOutlineArrowRight,

} from "react-icons/hi2"

// Timeline Component
const TimelineItem = ({ year, title, description, icon: Icon, index }: { year: string, title: string, description: string, icon: any, index: number }) => {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex items-start gap-6 mb-12 last:mb-0"
    >
      {/* Timeline Line */}
      {index < 4 && (
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-fuchsia-500 opacity-30" />
      )}
      
      {/* Year Badge */}
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5">
          <div className="w-full h-full rounded-full bg-[#0a0c15] flex items-center justify-center">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded text-xs font-mono text-cyan-400 whitespace-nowrap">
          {year}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all group">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}

// Skill Card Component
const SkillCard = ({ icon: Icon, title, skills, gradient, delay }: { icon: any, title: string, skills: string[], gradient: string, delay: number }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`} />
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full hover:border-cyan-500/30 transition-all">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} p-3 mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
        <div className="space-y-2">
          {skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-cyan-400" />
              <span className="text-sm text-gray-300">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Project Highlight Component
const ProjectHighlight = ({ title, description, impact, icon: Icon, gradient, index }: { title: string, description: string, impact: string, icon: any, gradient: string, index: number }) => {
  const projectRef = useRef(null)
  const isInView = useInView(projectRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={projectRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} p-3 flex-shrink-0`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-400 mb-3">{description}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <HiOutlineBolt className="w-3 h-3 text-cyan-400" />
              <span className="text-xs font-mono text-cyan-400">{impact}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Philosophy Card Component
const PhilosophyCard = ({ icon: Icon, title, description, gradient }: { icon: any, title: string, description: string, gradient: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`} />
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-all h-full">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${gradient} p-4 mx-auto mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}

// Main About Detail Component
export default function AboutDetail() {
  const containerRef = useRef(null)
  const [activeTab, setActiveTab] = useState(0)

  // Journey Timeline Data
  const timelineData = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started my journey into AI development, building first neural network models for predictive analytics.",
      icon: HiOutlineRocketLaunch
    },
    {
      year: "2021",
      title: "First Breakthrough",
      description: "Launched my first AI product - an automated content generation tool that reached 10K users in 3 months.",
      icon: HiOutlineSparkles
    },
    {
      year: "2022",
      title: "Scaling Impact",
      description: "Expanded product line to 15+ AI tools serving 500K+ users across 30 countries.",
      icon: HiOutlineChartBar
    },
    {
      year: "2023",
      title: "Innovation Hub",
      description: "Founded AI innovation lab, developing cutting-edge solutions for enterprise clients.",
      icon: HiOutlineTrophy
    },
    {
      year: "2024",
      title: "Global Recognition",
      description: "50+ AI products, 2M+ users, and recognized as top AI innovator in emerging tech.",
      icon: HiOutlineGlobeAlt
    }
  ]

  // Skills Data
  const skillCategories = [
    {
      icon: HiOutlineCpuChip,
      title: "AI & Machine Learning",
      gradient: "from-cyan-500 to-blue-500",
      skills: ["Neural Networks", "Deep Learning", "NLP", "Computer Vision", "Reinforcement Learning", "Transformers"]
    },
    {
      icon: HiOutlineCodeBracket,
      title: "Development",
      gradient: "from-fuchsia-500 to-purple-500",
      skills: ["Python", "TensorFlow", "PyTorch", "Next.js", "TypeScript", "Rust", "WebAssembly"]
    },
    {
      icon: HiOutlineServerStack,
      title: "Infrastructure",
      gradient: "from-blue-500 to-cyan-400",
      skills: ["Cloud Architecture", "Kubernetes", "Docker", "Microservices", "Edge Computing", "Quantum Computing"]
    },
    {
      icon: HiOutlineShieldCheck,
      title: "AI Security",
      gradient: "from-purple-500 to-fuchsia-400",
      skills: ["Adversarial ML", "Privacy-Preserving AI", "Federated Learning", "Encrypted Inference", "AI Ethics"]
    }
  ]

  // Featured Projects
  const featuredProjects = [
    {
      title: "NeuroGen AI",
      description: "Automated content generation platform using advanced transformer models.",
      impact: "1M+ articles generated monthly",
      icon: HiOutlineDocumentText,
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      title: "CyberShield",
      description: "Real-time threat detection system using behavioral analysis.",
      impact: "99.9% threat prevention rate",
      icon: HiOutlineShieldCheck,
      gradient: "from-fuchsia-500 to-purple-500"
    },
    {
      title: "DataForge",
      description: "Intelligent data processing pipeline for enterprise analytics.",
      impact: "10x faster data processing",
      icon: HiOutlineCircleStack,
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      title: "CodeCraft AI",
      description: "AI-powered code generation and optimization assistant.",
      impact: "50% faster development",
      icon: HiOutlineCommandLine,
      gradient: "from-purple-500 to-fuchsia-400"
    }
  ]

  // Philosophy Data
  const philosophyData = [
    {
      icon: HiOutlineLightBulb,
      title: "Innovation First",
      description: "Pushing boundaries of what's possible with AI to solve real-world problems.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: HiOutlineUserGroup,
      title: "Human-Centric",
      description: "Building AI that empowers people, not replaces them.",
      gradient: "from-fuchsia-500 to-purple-500"
    },
    {
      icon: HiOutlineSparkles,
      title: "Simplicity",
      description: "Complex AI, simple interfaces - making technology accessible to all.",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: HiOutlineGlobeAlt,
      title: "Global Impact",
      description: "Creating solutions that scale globally and benefit humanity.",
      gradient: "from-purple-500 to-fuchsia-400"
    }
  ]

  return (
    <section ref={containerRef} className="relative bg-[#03050b] text-white py-32 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 
          bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)]
          bg-[size:50px_50px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mb-6">
            <HiOutlineCpuChip className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-cyan-400">THE JOURNEY • INNOVATION STORY</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400">
              From Vision to Reality
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Every line of code, every neural network, every product — built with 
            passion and precision to make AI accessible and impactful.
          </p>
        </motion.div>

        {/* Timeline Section */}
        <div className="mb-32">
          <h3 className="text-2xl font-bold text-center mb-16 flex items-center justify-center gap-3">
            <HiOutlineCalendar className="w-6 h-6 text-cyan-400" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              The Evolution
            </span>
          </h3>
          
          <div className="max-w-3xl mx-auto">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} {...item} index={index} />
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-32">
          <h3 className="text-2xl font-bold text-center mb-16 flex items-center justify-center gap-3">
            <HiOutlineCog6Tooth className="w-6 h-6 text-cyan-400" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              Technical Arsenal
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCard key={index} {...category} delay={0.1 + index * 0.1} />
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-32">
          <h3 className="text-2xl font-bold text-center mb-16 flex items-center justify-center gap-3">
            <HiOutlineCube className="w-6 h-6 text-cyan-400" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              Flagship Products
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectHighlight key={index} {...project} index={index} />
            ))}
          </div>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            {[
              { value: "50+", label: "AI Products", icon: HiOutlineCube },
              { value: "2M+", label: "Users", icon: HiOutlineUserGroup },
              { value: "30+", label: "Countries", icon: HiOutlineGlobeAlt },
              { value: "99.9%", label: "Satisfaction", icon: HiOutlineTrophy }
            ].map((stat, i) => (
              <div key={i} className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
                <div className="text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-16 flex items-center justify-center gap-3">
            <HiOutlineSparkles className="w-6 h-6 text-cyan-400" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              Building Philosophy
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophyData.map((item, index) => (
              <PhilosophyCard key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full blur-xl opacity-50" />
            <button className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-5 rounded-full font-bold text-lg group overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-3">
                <HiOutlineRocketLaunch className="w-5 h-5" />
                Let's Build Something Amazing
                <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-2 transition" />
              </span>
            </button>
          </div>
          
          <p className="text-gray-400 mt-6 font-mono text-sm">
            <span className="text-cyan-400">{"<"}</span> ready to collaborate • open for opportunities • let's innovate together <span className="text-fuchsia-400">{">"}</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}