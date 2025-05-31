'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import TechShowcase from './TechShowcase';

export default function Hero() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Left Column - Text Content */}
        <motion.div 
          className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TypeAnimation
              sequence={[
                'Innovating with AI',
                1000,
                'Building Robotics',
                1000,
                'Transforming with Data',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.h1>

          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Creating cutting-edge solutions at the intersection of artificial intelligence, 
            robotics, and data science.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-medium text-white"
            >
              Explore Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-purple-400 rounded-lg font-medium text-white"
            >
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column - Animated Tech Showcase */}
        <motion.div 
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <TechShowcase />
        </motion.div>
      </div>
    </section>
  );
}
