// app/components/VideoHero.tsx
'use client';

import LoadingScreen from './LoadingScreen';
import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function VideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse move effect for subtle parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  // Transform values for overlay movement
  const overlayX = useTransform(smoothX, [0, 1], [-20, 20]);
  const overlayY = useTransform(smoothY, [0, 1], [-20, 20]);

  // Handle mouse move for interactive effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    
    // For gradient effect
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Initialize video and set timeout
 useEffect(() => {
  const timeoutId = setTimeout(() => {
    if (!isVideoLoaded) {
      console.log("Video loading timeout - showing content anyway");
      setIsVideoLoaded(true);
    }
  }, 3000);

  const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleLoadedData = () => {
        console.log("Video loaded successfully");
        setIsVideoLoaded(true);
        clearTimeout(timeoutId);
      };

      const handleError = (e: Event) => {
        console.error("Video error:", e);
        setVideoError(true);
        setIsVideoLoaded(true);
        clearTimeout(timeoutId);
      };

      const handleCanPlayThrough = () => {
        console.log("Video can play through");
        setIsVideoLoaded(true);
        clearTimeout(timeoutId);
      };

      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('error', handleError);
      videoElement.addEventListener('canplaythrough', handleCanPlayThrough);

      videoElement.play()
        .then(() => {
          console.log("Video playing");
        })
        .catch(error => {
          console.log("Video autoplay failed:", error);
          setIsVideoLoaded(true);
          clearTimeout(timeoutId);
        });

      return () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('error', handleError);
        videoElement.removeEventListener('canplaythrough', handleCanPlayThrough);
        clearTimeout(timeoutId);
      };
    } else {
      setIsVideoLoaded(true);
      clearTimeout(timeoutId);
    }
  },[isVideoLoaded]);

  // Animated text variants
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

  // Right side stats animation
  const statVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.8,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Sci-Fi Cyber Security themed text
  const titleText = "QUANTUM SHIELD";
  const titleLetters = titleText.split("");

  // Fallback background if video fails
  const fallbackBackground = {
    background: 'linear-gradient(135deg, #000000 0%, #001a1a 50%, #000033 100%)',
  };

  // Matrix rain effect characters
  const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Video Background with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          scale: 1,
        }}
      >
        {/* Cyber grid overlay that follows mouse */}
        <motion.div 
          className="absolute inset-0 z-10 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,255,255,0.15) 0%, transparent 60%)`,
            x: overlayX,
            y: overlayY,
          }}
        />
        
        {/* Digital rain effect overlay */}
        <div className="absolute inset-0 z-10 opacity-30 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(0deg, 
              transparent, 
              transparent 2px, 
              rgba(0, 255, 255, 0.05) 3px, 
              transparent 4px
            )`,
            backgroundSize: '100% 8px',
            animation: 'scanline 10s linear infinite',
          }}
        />
        
        {/* Matrix rain effect */}
        <div className="absolute inset-0 z-10 opacity-20 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan-500/30 text-xs font-mono whitespace-nowrap"
              style={{
                left: `${i * 7}%`,
                top: '-20%',
                writingMode: 'vertical-rl',
              }}
              animate={{
                y: ['0vh', '120vh'],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.5,
              }}
            >
              {matrixChars.repeat(20)}
            </motion.div>
          ))}
        </div>
        
        {/* Video element */}
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.4) contrast(1.4) hue-rotate(180deg) saturate(1.5)' }}
          >
            <source src="/AI_Cyber_Security_Futuristic_Background_Video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div 
            className="absolute inset-0 w-full h-full"
            style={fallbackBackground}
          >
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                animation: 'pulse 4s ease-in-out infinite',
              }} />
            </div>
          </div>
        )}

        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/40 to-black/40 z-5" />
        
        {/* Animated binary code effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M10 10l40 40M50 10L10 50' stroke='%2300ffff' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      {/* Main Content Container - Split Layout */}
      <div className="relative z-20 w-full h-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        
        {/* LEFT SIDE - Main Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center h-full pt-16 sm:pt-20 lg:pt-0">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4 sm:mb-6 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm"
          >
            <span className="text-cyan-400 text-xs sm:text-sm font-mono tracking-[0.2em] sm:tracking-[0.3em]">
              ⚡ SYSTEM SECURE v2.0 ⚡
            </span>
          </motion.div>

          {/* Animated Title */}
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="mb-2 sm:mb-4 overflow-hidden"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black tracking-tighter">
              {titleLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                  style={{ 
                    textShadow: '0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.3)',
                    color: '#fff',
                    fontFamily: 'monospace',
                  }}
                  whileHover={{
                    color: '#00ffff',
                    textShadow: '0 0 30px rgba(0,255,255,0.8)',
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-2 sm:mb-4 text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl text-cyan-300/90 font-light tracking-wider"
          >
            Neural Network Defense System
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg text-white/70 font-light leading-relaxed"
          >
            Advanced quantum encryption protocols protecting digital assets 
            across the metaverse. Real-time threat neutralization with 
            AI-powered predictive algorithms.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/join" passHref>
              <motion.button
                className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-mono font-semibold text-white overflow-hidden rounded-lg bg-transparent border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(0,255,255,0.3)]"
                whileHover={{ 
                  boxShadow: '0 0 60px rgba(0,255,255,0.6)',
                  borderColor: '#00ffff',
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
                
                <span className="relative z-10 flex items-center gap-2 sm:gap-3 md:gap-4">
                  <span className="text-cyan-300 hidden xs:inline">[</span>
                  <span className="whitespace-nowrap">INITIALIZE PROTOCOL</span>
                  <span className="text-cyan-300 hidden xs:inline">]</span>
                  <motion.svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    animate={{ 
                      x: [0, 8, 0],
                      rotate: [0, 90, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </motion.svg>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT SIDE - Simple Clean Stats */}
        <motion.div 
          variants={statVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-end justify-center h-full pb-16 sm:pb-20 lg:pb-0"
        >
          {/* Simple Stats Card */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-md bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
              <h3 className="text-cyan-400 font-mono text-xs sm:text-sm tracking-wider">
                SYSTEM STATUS
              </h3>
              <div className="flex items-center gap-1 sm:gap-2">
                <motion.div 
                  className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <span className="text-green-400/60 text-[10px] sm:text-xs">ONLINE</span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div>
                <div className="flex justify-between text-white/60 font-mono text-[10px] sm:text-xs mb-1 sm:mb-2">
                  <span>QUANTUM NODES</span>
                  <span className="text-cyan-400">10,248</span>
                </div>
                <div className="w-full h-0.5 sm:h-1 bg-cyan-500/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-white/60 font-mono text-[10px] sm:text-xs mb-1 sm:mb-2">
                  <span>THREATS NEUTRALIZED</span>
                  <span className="text-cyan-400">2.5M</span>
                </div>
                <div className="w-full h-0.5 sm:h-1 bg-cyan-500/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-white/60 font-mono text-[10px] sm:text-xs mb-1 sm:mb-2">
                  <span>RESPONSE TIME</span>
                  <span className="text-cyan-400">0.003ms</span>
                </div>
                <div className="w-full h-0.5 sm:h-1 bg-cyan-500/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: '98%' }}
                    transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-white/60 font-mono text-[10px] sm:text-xs mb-1 sm:mb-2">
                  <span>ENCRYPTION LEVEL</span>
                  <span className="text-purple-400">QUANTUM</span>
                </div>
                <div className="w-full h-0.5 sm:h-1 bg-cyan-500/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-400 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.6, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            {/* Simple Footer */}
            <div className="mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t border-cyan-500/20">
              <div className="flex justify-between items-center">
                <span className="text-white/40 font-mono text-[10px] sm:text-xs">PROTOCOL v2.0</span>
                <span className="text-cyan-400 font-mono text-[10px] sm:text-xs tracking-wider">⚡ ACTIVE</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Loading state */}
      {!isVideoLoaded && <LoadingScreen />}

      {/* Add responsive styles for scanline animation */}
     <style>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        @media (max-width: 640px) {
          .scanline {
            animation-duration: 20s;
          }
        }
      `}</style>
    </div>
  );
}