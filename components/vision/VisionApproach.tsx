"use client"
import { motion } from "framer-motion";

const initiatives = [
  {
    title: "AI Education for All",
    description: "Expanding AI literacy through schools, colleges, and online platforms to create a future-ready workforce.",
    icon: "🎓",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    title: "Startup Ecosystem",
    description: "Funding and mentoring AI startups to drive innovation and entrepreneurship.",
    icon: "🚀",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Research & Development",
    description: "Partnering with top institutions to advance cutting-edge AI research.",
    icon: "🔬",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    title: "Government & Policy",
    description: "Advising policymakers to create an AI-friendly regulatory environment.",
    icon: "🏛️",
    gradient: "from-indigo-500 to-purple-500"
  },
];

export const VisionApproach = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 to-blue-900 overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 overflow-hidden"
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: Math.random() * 1000, y: Math.random() * 1000 }}
            animate={{
              x: Math.random() * 1000,
              y: Math.random() * 1000,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute text-blue-400 opacity-70"
            style={{
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          >
            {['🤖', '🧠', '🔍', '💡', '📊', '🌐', '📈', '🔬'][i % 8]}
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
        >
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Strategic Approach</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {initiatives.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group overflow-hidden bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-300"
            >
              {/* Gradient highlight on hover */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-0" 
                   style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
              </div>
              
              <div className="relative z-10">
                <div className={`text-4xl mb-4 inline-block p-3 rounded-lg bg-gradient-to-r ${item.gradient}`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
                
                {/* Animated underline */}
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  className="h-0.5 mt-4 bg-gradient-to-r from-blue-400 to-purple-400"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all shadow-lg"
          >
            Explore Our Initiatives →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};