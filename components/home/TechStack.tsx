// app/components/TechStack.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  SiRedis,
  SiHtml5,
  SiCss3,
  SiVuedotjs,
  SiNuxtdotjs,
  SiNodedotjs,
  SiJavascript,
  SiTypescript,
  SiVuetify,
  SiWebpack,
  SiNpm,
  SiGit,
  SiGithub,
  SiDocker,
  SiLinux,
} from 'react-icons/si';

const techItems = [
  { name: 'Redis', icon: SiRedis, color: '#DC382D' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
  { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
  { name: 'Nuxt.js', icon: SiNuxtdotjs, color: '#00DC82' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Vuetify', icon: SiVuetify, color: '#1867C0' },
  { name: 'Webpack', icon: SiWebpack, color: '#8DD6F9' },
  { name: 'npm', icon: SiNpm, color: '#CB3837' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#FFFFFF' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Linux', icon: SiLinux, color: '#FCC624' },
];

const titleVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, x: -50, rotateY: -30 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

// Split items into two rows evenly
const row1Items = techItems.slice(0, Math.ceil(techItems.length / 2));
const row2Items = techItems.slice(Math.ceil(techItems.length / 2));

export default function TechStack() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<{ row: number; index: number } | null>(null);
  
  const titleText = "OUR TECH STACK";
  const titleLetters = titleText.split("");

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation speeds (faster with infinite loop)
  const row1Speed = isMobile ? 15 : 10; // seconds for full cycle
  const row2Speed = isMobile ? 15 : 10;

  // Handle hover for individual items
  const handleItemHover = (row: number, index: number, isHovering: boolean) => {
    if (isHovering) {
      setHoveredIndex({ row, index });
    } else {
      setHoveredIndex(null);
    }
  };

  // Check if a specific item should be paused
  const shouldPauseItem = (row: number, index: number) => {
    return hoveredIndex?.row === row && hoveredIndex?.index === index;
  };

  // Get animation props for each row
  const getRow1Animation = () => {
    if (hoveredIndex?.row === 1) {
      // If any item in row 1 is hovered, pause the entire row's animation
      return {};
    }
    return {
      x: ['0%', '-50%'],
      transition: {
        x: {
          duration: row1Speed,
          repeat: Infinity,
          repeatType: "loop" as const,
          ease: "linear",
          repeatDelay: 0
        }
      }
    };
  };

  const getRow2Animation = () => {
    if (hoveredIndex?.row === 2) {
      // If any item in row 2 is hovered, pause the entire row's animation
      return {};
    }
    return {
      x: ['-50%', '0%'],
      transition: {
        x: {
          duration: row2Speed,
          repeat: Infinity,
          repeatType: "loop" as const,
          ease: "linear",
          repeatDelay: 0
        }
      }
    };
  };

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden bg-black">
      {/* Cyber grid background - adjusted for mobile */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 sm:from-cyan-500/10 sm:to-purple-500/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          {/* Animated Title */}
          <motion.div
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-4 sm:mb-6 overflow-hidden"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
              {titleLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block font-mono"
                  style={{
                    textShadow: isMobile 
                      ? "0 0 10px rgba(0,255,255,0.5)" 
                      : "0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.3)",
                    color: "#fff",
                    fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.5rem)' : undefined
                  }}
                  whileHover={!isMobile ? {
                    color: "#00ffff",
                    textShadow: "0 0 30px rgba(0,255,255,0.8)",
                    scale: 1.1,
                  } : undefined}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h2>
          </motion.div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-xl text-cyan-400/70 font-mono tracking-wider">
            &lt; Technologies We Work With /&gt;
          </p>
        </motion.div>

        {/* Moving Rows */}
        <div className="space-y-4 sm:space-y-6">
          {/* Row 1 - Moves Left (Infinite Loop) */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-2 sm:gap-3 md:gap-4 whitespace-nowrap"
              animate={getRow1Animation()}
            >
              {[...row1Items, ...row1Items].map((item, i) => {
                const Icon = item.icon;
                const originalIndex = i % row1Items.length;
                const isPaused = shouldPauseItem(1, originalIndex);
                
                return (
                  <motion.div
                    key={`row1-${i}`}
                    onHoverStart={() => handleItemHover(1, originalIndex, true)}
                    onHoverEnd={() => handleItemHover(1, originalIndex, false)}
                    onTouchStart={() => handleItemHover(1, originalIndex, true)}
                    onTouchEnd={() => handleItemHover(1, originalIndex, false)}
                    animate={isPaused ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`
                      inline-flex items-center gap-1.5 sm:gap-2 md:gap-3 
                      px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 
                      bg-white/5 backdrop-blur-lg 
                      border ${isPaused ? 'border-cyan-400' : 'border-cyan-500/30'} 
                      rounded-lg sm:rounded-xl 
                      hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] 
                      transition-all duration-300
                      ${isPaused ? 'shadow-[0_0_30px_rgba(0,255,255,0.4)]' : ''}
                      cursor-pointer
                    `}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: item.color }} />
                    <span className="text-white font-mono text-xs sm:text-sm md:text-base font-medium">
                      {isMobile && item.name.length > 8 ? item.name.substring(0, 6) + '...' : item.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Row 2 - Moves Right (Infinite Loop) */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-2 sm:gap-3 md:gap-4 whitespace-nowrap"
              animate={getRow2Animation()}
            >
              {[...row2Items, ...row2Items].map((item, i) => {
                const Icon = item.icon;
                const originalIndex = i % row2Items.length;
                const isPaused = shouldPauseItem(2, originalIndex);
                
                return (
                  <motion.div
                    key={`row2-${i}`}
                    onHoverStart={() => handleItemHover(2, originalIndex, true)}
                    onHoverEnd={() => handleItemHover(2, originalIndex, false)}
                    onTouchStart={() => handleItemHover(2, originalIndex, true)}
                    onTouchEnd={() => handleItemHover(2, originalIndex, false)}
                    animate={isPaused ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`
                      inline-flex items-center gap-1.5 sm:gap-2 md:gap-3 
                      px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 
                      bg-white/5 backdrop-blur-lg 
                      border ${isPaused ? 'border-purple-400' : 'border-purple-500/30'} 
                      rounded-lg sm:rounded-xl 
                      hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] 
                      transition-all duration-300
                      ${isPaused ? 'shadow-[0_0_30px_rgba(168,85,247,0.4)]' : ''}
                      cursor-pointer
                    `}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: item.color }} />
                    <span className="text-white font-mono text-xs sm:text-sm md:text-base font-medium">
                      {isMobile && item.name.length > 8 ? item.name.substring(0, 6) + '...' : item.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Edge fade effects - adjusted for mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-20" />
      </div>

      {/* Add touch instruction for mobile */}
      {isMobile && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-white/40 text-xs font-mono pointer-events-none">
          Tap any tech to pause
        </div>
      )}
    </section>
  );
}