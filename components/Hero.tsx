'use client';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import TechShowcase from './TechShowcase';

export default function Hero() {
  return (
    <section className="container mx-auto px-6 py-24 md:py-32">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Column - Text Content */}
        <motion.div 
          className="md:w-1/2 space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
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
            className="text-lg md:text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Creating cutting-edge solutions at the intersection of artificial intelligence, 
            robotics, and data science.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-medium"
            >
              Explore Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-purple-400 rounded-lg font-medium"
            >
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column - Animated Tech Showcase */}
        <motion.div 
          className="md:w-1/2 relative"
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
