// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// export default function HeroPage() {
//   const containerRef = useRef(null);
//   const [activeSection, setActiveSection] = useState('home');
//   const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });
//   const [professionIndex, setProfessionIndex] = useState(0);
//   const [displayText, setDisplayText] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [typingSpeed, setTypingSpeed] = useState(150);

//   const professions = [
//     "Full Stack Developer",
//     "Android Developer",
//     "iOS Developer",
//     "Data Analyst",
//     "ML Engineer",
//     "AI Developer",
//     "Startup Enthusiast"
//   ];

//   // Scroll animations
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end end']
//   });

//   const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

//   // Handle mouse move for dynamic gradient
//   const handleMouseMove = (e: React.MouseEvent) => {
//     const { clientX, clientY } = e;
//     const x = (clientX / window.innerWidth) * 100;
//     const y = (clientY / window.innerHeight) * 100;
//     setGradientPosition({ x, y });
//   };

//   // Handle resume download
//   const handleDownloadResume = () => {
//     // Replace with your actual resume URL
//     const resumeUrl = '/resume.pdf';
//     const link = document.createElement('a');
//     link.href = resumeUrl;
//     link.download = 'YourName_Resume.pdf';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Typewriter effect for professions
//   useEffect(() => {
//     const currentProfession = professions[professionIndex];
    
//     if (isDeleting) {
//       if (displayText.length > 0) {
//         const timeout = setTimeout(() => {
//           setDisplayText(currentProfession.substring(0, displayText.length - 1));
//           setTypingSpeed(75);
//         }, typingSpeed);
//         return () => clearTimeout(timeout);
//       } else {
//         setIsDeleting(false);
//         setProfessionIndex((professionIndex + 1) % professions.length);
//         setTypingSpeed(150);
//       }
//     } else {
//       if (displayText.length < currentProfession.length) {
//         const timeout = setTimeout(() => {
//           setDisplayText(currentProfession.substring(0, displayText.length + 1));
//         }, typingSpeed);
//         return () => clearTimeout(timeout);
//       } else {
//         setTimeout(() => setIsDeleting(true), 2000);
//       }
//     }
//   }, [displayText, professionIndex, isDeleting, typingSpeed]);

//   // Floating animation for background elements
//   const floatingVariants = {
//     float: {
//       y: [0, -20, 0],
//       x: [0, 10, 0],
//       transition: {
//         duration: Math.random() * 10 + 10,
//         repeat: Infinity,
//         repeatType: 'reverse',
//         ease: 'easeInOut'
//       }
//     }
//   };

//   return (
//     <div 
//       ref={containerRef}
//       className="relative min-h-screen w-full overflow-x-hidden"
//       onMouseMove={handleMouseMove}
//       style={{
//         background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, 
//           rgba(99, 102, 241, 0.1) 0%, 
//           rgba(0, 0, 0, 0.8) 70%)`
//       }}
//     >
//       {/* Animated background elements */}
//       <div className="fixed inset-0 overflow-hidden -z-10">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full bg-white"
//             style={{
//               width: Math.random() * 80 + 30,
//               height: Math.random() * 80 + 30,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               opacity: 0.03 + Math.random() * 0.03
//             }}
//             variants={floatingVariants}
//             initial="float"
//             animate="float"
//           />
//         ))}
//       </div>

//       {/* Combined Navbar and Hero Section */}
//       <div className="relative">
//         {/* Navbar */}
//         <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50">
//           <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
//             <motion.a 
//               href="#home" 
//               className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               whileHover={{ scale: 1.05 }}
//             >
//               Portfolio
//             </motion.a>
            
//             <div className="hidden md:flex space-x-6 lg:space-x-8">
//               {['home', 'projects', 'about', 'contact'].map((item) => (
//                 <motion.a
//                   key={item}
//                   href={`#${item}`}
//                   className={`capitalize font-medium transition-colors ${activeSection === item ? 'text-cyan-400' : 'text-white hover:text-cyan-300'}`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//             </div>
            
//             <motion.button
//               className="px-4 py-1.5 sm:px-6 sm:py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium text-sm sm:text-base"
//               whileHover={{ 
//                 scale: 1.05,
//                 boxShadow: '0 0 15px rgba(34, 211, 238, 0.5)'
//               }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleDownloadResume}
//             >
//               Download CV
//             </motion.button>
//           </div>
//         </nav>

//         {/* Hero Section */}
//         <motion.section 
//           id="home"
//           className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
//           style={{
//             scale: heroScale,
//             opacity: heroOpacity
//           }}
//           onViewportEnter={() => setActiveSection('home')}
//         >
//           <div className="container mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <motion.h1 
//                 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
//                   Hello, I'm Alex
//                 </span>
//               </motion.h1>
              
//               <motion.div
//                 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 mb-6 sm:mb-8 h-12 sm:h-16 md:h-20 flex justify-center items-center"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <div className="relative inline-block text-left">
//                   <span className="text-gray-400">I'm a </span>
//                   <span className="text-cyan-400 border-r-2 border-cyan-400">
//                     {displayText}
//                     <motion.span
//                       className="inline-block w-1 h-6 sm:h-8 bg-cyan-400 ml-1"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ repeat: Infinity, duration: 0.5, repeatType: 'reverse' }}
//                     />
//                   </span>
//                 </div>
//               </motion.div>
              
//               <motion.p 
//                 className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 I create performant, accessible, and beautiful digital experiences using modern technologies.
//               </motion.p>
              
//               <motion.div
//                 className="flex flex-wrap justify-center gap-3 sm:gap-4"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//               >
//                 <motion.a
//                   href="#projects"
//                   className="px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium text-base sm:text-lg relative overflow-hidden group"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <span className="relative z-10">View My Work</span>
//                   <motion.span
//                     className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     initial={{ x: '-100%' }}
//                     whileHover={{ x: '0%' }}
//                     transition={{ duration: 0.5 }}
//                   />
//                 </motion.a>
                
//                 <motion.a
//                   href="#contact"
//                   className="px-6 py-2 sm:px-8 sm:py-3 border-2 border-white text-white rounded-full font-medium text-base sm:text-lg relative overflow-hidden group"
//                   whileHover={{ 
//                     scale: 1.05,
//                     backgroundColor: 'rgba(255, 255, 255, 0.1)'
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <span className="relative z-10">Contact Me</span>
//                   <motion.span
//                     className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
//                   />
//                 </motion.a>
//               </motion.div>
//             </motion.div>
//           </div>
          
//           <motion.div
//             className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
//             animate={{
//               y: [0, 15, 0],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               repeatType: 'loop',
//             }}
//           >
//             <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
//               <motion.div
//                 className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1 sm:mt-2"
//                 animate={{
//                   opacity: [0, 1, 0],
//                   y: [0, 3, 6],
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   repeatType: 'loop',
//                 }}
//               />
//             </div>
//           </motion.div>
//         </motion.section>
//       </div>
//     </div>
//   );
// }
import React from 'react'

const Landing = () => {
  return (
    <div>
      
    </div>
  )
}

export default Landing
