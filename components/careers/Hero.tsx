"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { 
  HiOutlineRocketLaunch,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineGlobeAlt,
  HiOutlineTrophy,
  HiOutlineSparkles,
  HiOutlineCpuChip,
  HiOutlineCommandLine,
  HiOutlineBeaker,
  HiOutlineHeart,
  HiOutlineLightBulb,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineArrowLongRight,
  HiOutlineMapPin,
  HiOutlineAcademicCap,
  HiOutlineUsers,
  HiOutlineCodeBracket,
  HiOutlineCube,
  HiOutlineFire,
  HiOutlineBolt,
  HiOutlinePresentationChartLine,
  HiOutlineWrenchScrewdriver,
  HiOutlineStar
} from "react-icons/hi2"

// Floating Elements
const FloatingPaths = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
          style={{
            top: `${20 + i * 15}%`,
            left: 0,
            right: 0,
          }}
          animate={{
            x: [-1000, 1000],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Role Card - New Design
const RoleCard = ({ role, department, location, type, index }: { 
  role: string, 
  department: string, 
  location: string, 
  type: string,
  index: number 
}) => {
  const cardRef = useRef(null)
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 10 }}
      className="group relative border-b border-white/10 py-6 cursor-pointer hover:border-cyan-400/50 transition-colors"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors font-mono">
            {role}
          </h3>
          <p className="text-gray-400 mt-1 font-mono">{department}</p>
        </div>
        
        <div className="flex items-center gap-6 text-sm">
          <span className="flex items-center gap-1 text-gray-500 font-mono">
            <HiOutlineMapPin className="w-4 h-4" />
            {location}
          </span>
          <span className="flex items-center gap-1 text-gray-500 font-mono">
            <HiOutlineClock className="w-4 h-4" />
            {type}
          </span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <HiOutlineArrowLongRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// Value Pill - New Design
const ValuePill = ({ icon: Icon, text, index }: { icon: any, text: string, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:border-cyan-400/30 transition-all"
    >
      <Icon className="w-5 h-5 text-cyan-400" />
      <span className="text-gray-300 font-mono">{text}</span>
    </motion.div>
  )
}

// Impact Stat - New Design
const ImpactStat = ({ number, label, icon: Icon, index }: { number: string, label: string, icon: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 border border-white/10 mb-4">
        <Icon className="w-8 h-8 text-cyan-400" />
      </div>
      <div className="text-4xl font-black text-white mb-2 font-mono">{number}</div>
      <div className="text-sm text-gray-400 font-mono">{label}</div>
    </motion.div>
  )
}

// Team Member Card - New Design
const TeamMemberCard = ({ name, role, expertise, index }: { name: string, role: string, expertise: string, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-400/30 transition-all">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-4 flex items-center justify-center text-2xl font-bold text-white font-mono">
          {name.charAt(0)}
        </div>
        <h3 className="text-xl font-bold text-white mb-1 font-mono">{name}</h3>
        <p className="text-cyan-400 text-sm mb-3 font-mono">{role}</p>
        <p className="text-gray-400 text-sm font-mono">{expertise}</p>
      </div>
    </motion.div>
  )
}

// Project Card - New Design
const ProjectCard = ({ title, description, impact, index }: { title: string, description: string, impact: string, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
      <div className="relative bg-[#0a0c15] border border-white/10 rounded-2xl p-8 hover:border-transparent transition-all">
        <h3 className="text-2xl font-bold text-white mb-3 font-mono">{title}</h3>
        <p className="text-gray-400 mb-4 font-mono">{description}</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full">
          <HiOutlineBolt className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-400 font-mono">{impact}</span>
        </div>
      </div>
    </motion.div>
  )
}

// Main Career Component
export default function CareerPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.3])

  // Open roles data
  const openRoles = [
    { role: "Senior AI Research Scientist", department: "Research Lab", location: "Remote", type: "Full-time" },
    { role: "Machine Learning Engineer", department: "Engineering", location: "San Francisco", type: "Full-time" },
    { role: "AI Product Manager", department: "Product", location: "New York", type: "Full-time" },
    { role: "Frontend Architect", department: "Engineering", location: "London", type: "Remote" },
    { role: "Developer Advocate", department: "Community", location: "Remote", type: "Full-time" },
    { role: "Security Engineer", department: "Security", location: "Austin", type: "Full-time" },
  ]

  // Values data
  const values = [
    { icon: HiOutlineLightBulb, text: "Innovation First" },
    { icon: HiOutlineHeart, text: "Human-Centered" },
    { icon: HiOutlineUsers, text: "Collaborative" },
    { icon: HiOutlineTrophy, text: "Excellence Driven" },
    { icon: HiOutlineGlobeAlt, text: "Global Impact" },
    { icon: HiOutlineSparkles, text: "Creative Freedom" },
  ]

  // Impact stats
  const impactStats = [
    { number: "50+", label: "AI Products", icon: HiOutlineCube },
    { number: "2M+", label: "Users", icon: HiOutlineUsers },
    { number: "30+", label: "Countries", icon: HiOutlineGlobeAlt },
    { number: "∞", label: "Innovation", icon: HiOutlineSparkles },
  ]

  // Team members
  const teamMembers = [
    { name: "Dr. Sarah Chen", role: "AI Research Lead", expertise: "Neural Networks, Deep Learning" },
    { name: "Alex Rivera", role: "ML Engineering", expertise: "Computer Vision, Edge AI" },
    { name: "Maya Patel", role: "Product Director", expertise: "AI Products, User Experience" },
    { name: "James Wilson", role: "Security Architect", expertise: "Adversarial ML, Privacy" },
  ]

  // Projects
  const projects = [
    { title: "Project Nexus", description: "Next-gen neural architecture for real-time learning", impact: "10x faster training" },
    { title: "Project Aegis", description: "AI security framework protecting millions of users", impact: "99.9% threat prevention" },
    { title: "Project Symphony", description: "Collaborative AI platform for creative work", impact: "1M+ users" },
  ]

  return (
    <div ref={containerRef} className="bg-[#03050b] text-white min-h-screen overflow-hidden">
      
      {/* Background Elements */}
      <div className="fixed inset-0">
        <motion.div 
          style={{ y: backgroundY, opacity }}
          className="absolute inset-0"
        >
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-3xl" />
        </motion.div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <FloatingPaths />
      </div>

      {/* Content */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sm font-mono tracking-wider">
                <HiOutlineFire className="w-4 h-4 text-cyan-400" />
                WE'RE BUILDING THE FUTURE
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-5xl font-black mb-8 font-mono"
            >
              <span className="text-white">Join the </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                AI Revolution
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed font-mono"
            >
              We're on a mission to democratize AI and make it accessible to everyone. 
              Your skills, your ideas, your impact — amplified by technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/30 transition-all font-mono">
                View Open Roles
                <HiOutlineArrowLongRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
              <button className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all font-mono">
                Meet the Team
              </button>
            </motion.div>
          </div>
        </section>

        {/* Impact Stats Section */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {impactStats.map((stat, index) => (
                <ImpactStat key={index} {...stat} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-32 px-6 bg-gradient-to-b from-transparent via-white/5 to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-4xl md:text-5xl font-black text-center mb-16 font-mono"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                Our Values
              </span>
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-4">
              {values.map((value, index) => (
                <ValuePill key={index} {...value} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-4xl md:text-5xl font-black text-center mb-16 font-mono"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                Open Roles
              </span>
            </motion.h2>

            <div className="divide-y divide-white/10">
              {openRoles.map((role, index) => (
                <RoleCard key={index} {...role} index={index} />
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center mt-12"
            >
              <button className="text-cyan-400 hover:text-fuchsia-400 transition-colors flex items-center gap-2 mx-auto font-mono">
                View All 25+ Positions
                <HiOutlineArrowLongRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-4xl md:text-5xl font-black text-center mb-16 font-mono"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                What You'll Build
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-4xl md:text-5xl font-black text-center mb-16 font-mono"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                Meet Your Future Colleagues
              </span>
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} {...member} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-fuchsia-500/30 rounded-3xl blur-3xl" />
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-16">
                <h2 className="text-4xl md:text-5xl font-black mb-6 font-mono">
                  <span className="text-white">Ready to Make Your Mark?</span>
                </h2>
                
                <p className="text-xl text-gray-300 mb-12 font-mono">
                  Join us in shaping the future of AI. Your journey starts here.
                </p>

                <button className="group px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all font-mono">
                  <span className="flex items-center gap-3">
                    Apply Now
                    <HiOutlineRocketLaunch className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                  </span>
                </button>

                <p className="text-gray-500 mt-8 text-sm font-mono">
                  We welcome all talents, backgrounds, and perspectives.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}