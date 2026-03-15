// app/about/page.tsx
'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  HiOutlineRocketLaunch,
  HiOutlineLightBulb,
  HiOutlineUsers,
  HiOutlineGlobeAlt,
  HiOutlineCpuChip,
  HiOutlineCommandLine,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineSparkles,
  HiOutlineArrowTrendingUp,
  HiOutlineCloudArrowUp,
  HiOutlineCodeBracket,
  HiOutlineEye,
  HiOutlineHeart,
  HiOutlineTrophy,
  HiOutlineFlag,
  HiOutlineBriefcase,
  HiOutlineBuildingLibrary,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineBeaker,
  HiOutlineCircleStack,
  HiOutlineCog6Tooth,
  HiOutlineWrenchScrewdriver,
  HiOutlineArrowDown,
  HiOutlinePlay,
  HiOutlinePause,
  HiOutlineChevronLeft,
  HiOutlineChevronRight
} from 'react-icons/hi2';

// Vision & Mission Data
const visionData = {
  title: "Democratizing Artificial Intelligence",
  subtitle: "Building the future where AI is accessible, ethical, and transformative for every business",
  description: "We're on a mission to bridge the gap between cutting-edge AI technology and real-world business applications. Our platform empowers companies of all sizes to harness the power of artificial intelligence without the complexity."
};

// Core Values
const coreValues = [
  {
    title: "Ethical AI First",
    description: "We believe in responsible AI development. Every solution we build prioritizes fairness, transparency, and privacy protection.",
    icon: HiOutlineShieldCheck,
    color: "from-cyan-400 to-blue-400",
    stats: ["Fairness Audited", "Privacy First", "Transparent by Design"]
  },
  {
    title: "Innovation Without Boundaries",
    description: "We constantly push the limits of what's possible with AI, exploring new frontiers in machine learning, neural networks, and cognitive computing.",
    icon: HiOutlineBeaker,
    color: "from-blue-400 to-purple-400",
    stats: ["R&D First", "Patent Pending", "Research Driven"]
  },
  {
    title: "Customer-Centric Development",
    description: "Our AI solutions are built with your business goals in mind. We don't just deliver technology — we deliver transformation.",
    icon: HiOutlineHeart,
    color: "from-purple-400 to-pink-400",
    stats: ["98% Satisfaction", "24/7 Support", "Dedicated Teams"]
  },
  {
    title: "Global AI Community",
    description: "We're building more than a company — we're fostering a global community of AI practitioners, researchers, and innovators.",
    icon: HiOutlineGlobeAlt,
    color: "from-pink-400 to-rose-400",
    stats: ["20+ Countries", "50+ Partners", "100+ Events"]
  }
];

// Timeline Milestones
const timelineData = [
  {
    year: "2022",
    title: "The Vision Begins",
    description: "Founded with a bold vision: make enterprise-grade AI accessible to businesses of all sizes. Started with a team of 5 AI researchers and engineers.",
    achievements: ["Initial R&D", "First prototype", "Seed funding secured"],
    icon: HiOutlineFlag,
    image: "/timeline/2022.jpg" // Add your images
  },
  {
    year: "2023",
    title: "Platform Launch",
    description: "Launched our first suite of AI tools, serving 100+ businesses across 15 countries. Established partnerships with major cloud providers.",
    achievements: ["100+ clients", "$2M ARR", "15 countries"],
    icon: HiOutlineRocketLaunch,
    image: "/timeline/2023.jpg"
  },
  {
    year: "2024",
    title: "Global Expansion",
    description: "Expanded to 3 continents, opened offices in Singapore and London. Launched our enterprise AI platform with 50+ pre-trained models.",
    achievements: ["50+ AI models", "Enterprise launch", "300+ clients"],
    icon: HiOutlineGlobeAlt,
    image: "/timeline/2024.jpg"
  },
  {
    year: "2025",
    title: "AI Research Lab",
    description: "Established our dedicated AI research division, focusing on next-generation language models, computer vision, and ethical AI frameworks.",
    achievements: ["20+ patents", "Research papers", "Academic partnerships"],
    icon: HiOutlineAcademicCap,
    image: "/timeline/2025.jpg"
  },
  {
    year: "2026+",
    title: "The Future",
    description: "Aiming to become the global standard for business AI, serving 10,000+ companies with cutting-edge artificial intelligence solutions.",
    achievements: ["10,000+ clients", "$100M ARR", "Global leader"],
    icon: HiOutlineSparkles,
    image: "/timeline/future.jpg"
  }
];

// Team Stats with animated counters
const teamStats = [
  { label: "AI RESEARCHERS", value: "25+", icon: HiOutlineAcademicCap, suffix: "+" },
  { label: "ENGINEERS", value: "50+", icon: HiOutlineCodeBracket, suffix: "+" },
  { label: "COUNTRIES", value: "20+", icon: HiOutlineGlobeAlt, suffix: "+" },
  { label: "PATENTS", value: "35+", icon: HiOutlineTrophy, suffix: "+" }
];

// Future Goals
const futureGoals = [
  {
    title: "AGI Research",
    description: "Advancing toward Artificial General Intelligence with safe, ethical frameworks and breakthrough neural architectures.",
    icon: HiOutlineCpuChip,
    stat: "2030 Target",
    progress: 45,
    color: "cyan"
  },
  {
    title: "Global AI Education",
    description: "Training 1 million developers in AI development through our academy and certification programs worldwide.",
    icon: HiOutlineAcademicCap,
    stat: "1M Developers",
    progress: 28,
    color: "purple"
  },
  {
    title: "Carbon-Neutral AI",
    description: "Pioneering green AI infrastructure with 100% renewable energy and carbon-negative data centers by 2027.",
    icon: HiOutlineGlobeAlt,
    stat: "100% Green",
    progress: 62,
    color: "pink"
  },
  {
    title: "Open Source Leadership",
    description: "Contributing 50+ core AI models and tools to the open-source community, fostering global innovation.",
    icon: HiOutlineCodeBracket,
    stat: "50+ Projects",
    progress: 34,
    color: "cyan"
  }
];

// Manifesto Points
const manifestoPoints = [
  {
    title: "AI Should Be Accessible",
    description: "We believe that powerful AI tools shouldn't be limited to tech giants. Every business deserves access to transformative technology."
  },
  {
    title: "Ethics Drive Innovation",
    description: "Responsible AI isn't a constraint — it's a catalyst for better, more trustworthy solutions that benefit everyone."
  },
  {
    title: "Humans + AI = Superhuman",
    description: "The future isn't AI replacing humans — it's AI augmenting human potential, creativity, and decision-making."
  },
  {
    title: "Transparency Builds Trust",
    description: "We open our algorithms, explain our decisions, and invite scrutiny because trust is earned through transparency."
  }
];

// Technology Stack
const techStack = [
  { name: "Large Language Models", icon: HiOutlineCommandLine, category: "NLP" },
  { name: "Computer Vision", icon: HiOutlineEye, category: "Vision" },
  { name: "Neural Networks", icon: HiOutlineCpuChip, category: "Core" },
  { name: "Vector Databases", icon: HiOutlineCircleStack, category: "Data" },
  { name: "Reinforcement Learning", icon: HiOutlineBeaker, category: "ML" },
  { name: "Edge AI", icon: HiOutlineCog6Tooth, category: "Deployment" },
  { name: "Federated Learning", icon: HiOutlineUsers, category: "Privacy" },
  { name: "Quantum ML", icon: HiOutlineSparkles, category: "Future" },
  { name: "Neural Architecture Search", icon: HiOutlineWrenchScrewdriver, category: "AutoML" },
  { name: "Explainable AI", icon: HiOutlineEye, category: "Ethics" },
  { name: "Multimodal Models", icon: HiOutlineCloudArrowUp, category: "Integration" },
  { name: "AI Agents", icon: HiOutlineRocketLaunch, category: "Applications" }
];

// Counter Component
const Counter = ({ value, suffix = '', duration = 2 }: { value: string, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue, duration]);
  
  return <span ref={ref}>{count}{suffix}</span>;
};

// Progress Bar Component
const ProgressBar = ({ progress, color }: { progress: number, color: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <div ref={ref} className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${
          color === 'cyan' ? 'from-cyan-400 to-blue-400' :
          color === 'purple' ? 'from-purple-400 to-pink-400' :
          'from-pink-400 to-rose-400'
        }`}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${progress}%` } : { width: 0 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      />
    </div>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-cyan-400/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Parallax Section Component
const ParallaxSection = ({ children, speed = 0.5 }: { children: React.ReactNode, speed?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  
  return (
    <motion.div ref={ref} style={{ y }} className="relative">
      {children}
    </motion.div>
  );
};

// Timeline Carousel for Mobile
const TimelineCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % timelineData.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + timelineData.length) % timelineData.length);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % timelineData.length);
    setIsAutoPlay(false);
  };

  return (
    <div className="md:hidden relative">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
            {(() => {
              const Icon = timelineData[currentIndex].icon;
              return <Icon className="w-5 h-5 text-cyan-400" />;
            })()}
          </div>
          <span className="text-2xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            {timelineData[currentIndex].year}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 font-mono">{timelineData[currentIndex].title}</h3>
        <p className="text-sm text-gray-400 font-mono mb-4">{timelineData[currentIndex].description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {timelineData[currentIndex].achievements.map((achievement, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs font-mono text-cyan-400"
            >
              {achievement}
            </span>
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-4">
          {timelineData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlay(false);
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-6 bg-cyan-400' 
                  : 'w-2 bg-cyan-500/30 hover:bg-cyan-400/50'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-black/60 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 hover:border-cyan-400 transition-colors"
      >
        <HiOutlineChevronLeft className="w-4 h-4" />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-black/60 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 hover:border-cyan-400 transition-colors"
      >
        <HiOutlineChevronRight className="w-4 h-4" />
      </button>

      {/* Auto-play toggle */}
      <button
        onClick={() => setIsAutoPlay(!isAutoPlay)}
        className="absolute -bottom-8 right-0 text-xs font-mono text-cyan-400/60 hover:text-cyan-400 transition-colors flex items-center gap-1"
      >
        {isAutoPlay ? (
          <>
            <HiOutlinePause className="w-3 h-3" /> Auto-play
          </>
        ) : (
          <>
            <HiOutlinePlay className="w-3 h-3" /> Manual
          </>
        )}
      </button>
    </div>
  );
};

// Scroll Progress Indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 z-50 origin-left"
      style={{ scaleX }}
    />
  );
};

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const categories = ['All', 'NLP', 'Vision', 'Core', 'Data', 'ML', 'Deployment', 'Privacy', 'Future', 'AutoML', 'Ethics', 'Integration', 'Applications'];

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTech = activeCategory === 'All' 
    ? techStack 
    : techStack.filter(tech => tech.category === activeCategory);

  // Matrix rain effect - responsive
  const matrixChars = "01アイウエオカキクケコサシスセソタチツテト";
  const rainPositions = mounted ? Array.from({ length: window.innerWidth < 768 ? 5 : 10 }, (_, i) => 5 + (i * 10)) : [];

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <ScrollProgress />
      
      {/* Background Effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:30px_30px] md:bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5" />
        
        {/* Digital Rain Effect - Responsive */}
        {mounted && (
          <div className="absolute inset-0 opacity-5 sm:opacity-10">
            {rainPositions.map((position, i) => (
              <motion.div
                key={i}
                className="absolute text-cyan-500/30 text-[8px] sm:text-xs font-mono whitespace-nowrap"
                style={{
                  left: `${position}%`,
                  top: '-20%',
                  writingMode: 'vertical-rl',
                }}
                animate={{
                  y: ['0vh', '120vh'],
                }}
                transition={{
                  duration: 20 + i * 3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 2,
                }}
              >
                {matrixChars.repeat(50)}
              </motion.div>
            ))}
          </div>
        )}
        
        <FloatingParticles />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        
        {/* Hero Section */}
        <ParallaxSection speed={-0.2}>
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-20 md:mb-24 lg:mb-32"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm mb-4 sm:mb-6"
            >
              <HiOutlineCpuChip className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
              <span className="text-cyan-400 text-[10px] sm:text-xs md:text-sm font-mono tracking-wider">ABOUT US • SINCE 2022</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 font-mono px-2">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {visionData.title}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-cyan-400/70 font-mono mb-4 sm:mb-6 max-w-4xl mx-auto px-4">
              {visionData.subtitle}
            </p>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-400 font-mono max-w-3xl mx-auto leading-relaxed px-4">
              {visionData.description}
            </p>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-8 sm:mt-12"
            >
              <HiOutlineArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400/50 mx-auto" />
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12">
              {teamStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, borderColor: '#00ffff' }}
                    className="p-3 sm:p-4 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-1 sm:mb-2" />
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-400 font-mono">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 font-mono whitespace-nowrap">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </ParallaxSection>

        {/* Manifesto Section */}
        <ParallaxSection speed={0.2}>
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 sm:mb-20 md:mb-24 lg:mb-32"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-mono mb-2 sm:mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  OUR MANIFESTO
                </span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 font-mono max-w-2xl mx-auto px-4">
                The principles that guide every line of code and every decision we make
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {manifestoPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="relative group"
                >
                  <div className={`bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4 sm:p-6 md:p-8 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden ${
                    hoveredCard === index ? 'shadow-[0_0_30px_rgba(0,255,255,0.2)]' : ''
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative">
                      <motion.div 
                        className="text-3xl sm:text-4xl mb-2 sm:mb-4 text-cyan-400/30 group-hover:text-cyan-400 transition-colors duration-500"
                        animate={hoveredCard === index ? { scale: 1.1 } : { scale: 1 }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </motion.div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 font-mono group-hover:text-cyan-400 transition-colors">
                        {point.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 font-mono leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </ParallaxSection>

        {/* Core Values Section */}
        <ParallaxSection speed={-0.1}>
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 sm:mb-20 md:mb-24 lg:mb-32"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-mono mb-2 sm:mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CORE VALUES
                </span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 font-mono max-w-2xl mx-auto px-4">
                The foundation that shapes our culture and drives our innovation
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="relative group"
                  >
                    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4 sm:p-6 hover:border-cyan-400/50 transition-all duration-500 h-full">
                      <motion.div 
                        className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${value.color} p-2 sm:p-3 mb-3 sm:mb-4`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-full h-full text-white" />
                      </motion.div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-mono group-hover:text-cyan-400 transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 font-mono leading-relaxed mb-3 sm:mb-4">
                        {value.description}
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {value.stats.map((stat, i) => (
                          <span
                            key={i}
                            className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400"
                          >
                            {stat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </ParallaxSection>

        {/* Timeline Section */}
        <ParallaxSection speed={0.1}>
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 sm:mb-20 md:mb-24 lg:mb-32"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-mono mb-2 sm:mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  OUR JOURNEY
                </span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 font-mono max-w-2xl mx-auto px-4">
                From a bold vision to global impact — the milestones that shaped us
              </p>
            </div>

            {/* Mobile Timeline Carousel */}
            <TimelineCarousel />

            {/* Desktop Timeline */}
            <div className="hidden md:block relative">
              {/* Timeline Line */}
              <motion.div 
                className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
              />

              {timelineData.map((item, index) => {
                const Icon = item.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`relative flex items-start gap-8 mb-12 ${
                      isEven ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <motion.div 
                      className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-cyan-400 rounded-full z-10"
                      whileHover={{ scale: 1.5, borderColor: '#a855f7' }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <div className={`w-1/2 ${isEven ? 'pr-12' : 'pl-12'}`}>
                      <motion.div
                        whileHover={{ scale: 1.02, borderColor: '#00ffff' }}
                        className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all duration-500"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
                            <Icon className="w-5 h-5 text-cyan-400" />
                          </div>
                          <span className="text-2xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                            {item.year}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 font-mono">{item.title}</h3>
                        <p className="text-sm text-gray-400 font-mono mb-4">{item.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {item.achievements.map((achievement, i) => (
                            <motion.span
                              key={i}
                              whileHover={{ scale: 1.05 }}
                              className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs font-mono text-cyan-400"
                            >
                              {achievement}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </ParallaxSection>

        {/* Future Goals Section */}
        <ParallaxSection speed={-0.1}>
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 sm:mb-20 md:mb-24 lg:mb-32"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-mono mb-2 sm:mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  THE FUTURE WE'RE BUILDING
                </span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 font-mono max-w-2xl mx-auto px-4">
                Bold goals that drive us forward — the next frontier of artificial intelligence
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {futureGoals.map((goal, index) => {
                const Icon = goal.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ scale: 1.02 }}
                    className="relative group"
                  >
                    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4 sm:p-6 md:p-8 hover:border-cyan-400/50 transition-all duration-500">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                        <motion.div 
                          className={`p-2 sm:p-3 bg-gradient-to-br ${
                            goal.color === 'cyan' ? 'from-cyan-500/20 to-blue-500/20' :
                            goal.color === 'purple' ? 'from-purple-500/20 to-pink-500/20' :
                            'from-pink-500/20 to-rose-500/20'
                          } rounded-xl`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                        </motion.div>
                        <span className="text-[10px] sm:text-xs font-mono text-cyan-400/60 bg-cyan-500/10 px-2 sm:px-3 py-1 rounded-full border border-cyan-500/30 whitespace-nowrap">
                          {goal.stat}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 font-mono group-hover:text-cyan-400 transition-colors">
                        {goal.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 font-mono leading-relaxed mb-3 sm:mb-4">
                        {goal.description}
                      </p>
                      <ProgressBar progress={goal.progress} color={goal.color} />
                      <div className="mt-2 text-right text-[10px] sm:text-xs font-mono text-cyan-400">
                        {goal.progress}% Complete
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </ParallaxSection>

        {/* Technology Stack Section */}
        <ParallaxSection speed={0.1}>
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 sm:mb-20 md:mb-24 lg:mb-32"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-mono mb-2 sm:mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  OUR AI STACK
                </span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 font-mono max-w-2xl mx-auto px-4">
                The cutting-edge technologies powering our AI solutions
              </p>
            </div>

            {/* Category Filter - Scrollable on mobile */}
            <div className="overflow-x-auto pb-4 mb-6 hide-scrollbar">
              <div className="flex gap-2 min-w-max px-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[10px] sm:text-xs transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:border-cyan-400'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {filteredTech.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="group cursor-pointer"
                  >
                    <div className="p-3 sm:p-4 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-lg text-center hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-[10px] sm:text-xs font-mono text-gray-400 group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {tech.name}
                      </span>
                      <span className="text-[8px] sm:text-[10px] font-mono text-cyan-500/50 mt-1 block">
                        {tech.category}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </ParallaxSection>

        {/* Call to Action */}
        <ParallaxSection speed={-0.2}>
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-mono mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Join Us in Shaping the Future
                </span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 font-mono max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
                Whether you're a business looking to transform with AI, a researcher pushing boundaries, 
                or an engineer building the future — we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg sm:rounded-xl text-white font-mono text-xs sm:text-sm font-bold hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-300"
                  >
                    Start Your AI Journey
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/careers"
                    className="block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black/40 border border-cyan-500/30 rounded-lg sm:rounded-xl text-cyan-400 font-mono text-xs sm:text-sm font-bold hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all duration-300"
                  >
                    Join Our Team
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </ParallaxSection>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-500/5 border border-cyan-500/20 rounded-full">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-[8px] sm:text-[10px] md:text-xs font-mono text-cyan-400/60">
              © 2024 • BUILDING THE FUTURE OF AI • v3.0
            </span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Custom scrollbar hide class */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}