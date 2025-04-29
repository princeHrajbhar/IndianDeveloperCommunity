"use client";
import { motion } from "framer-motion";


export const TechExplorerHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#111827]">
      {/* Animated background emojis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 overflow-hidden"
      >
        {[...Array(20)].map((_, i) => (
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
            className="absolute text-[#a78bfa] opacity-50"
            style={{
              fontSize: `${Math.random() * 40 + 20}px`, // Increased font size
              textShadow: "0 0 8px rgba(167, 139, 250, 0.8)", // Glowing effect
            }}
          >
            {["⌨️", "💻", "🖥️", "📱", "🔌", "📊", "🖱️", "📡"][i % 8]}
          </motion.div>
        ))}
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center justify-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-center text-white mb-8"
        >
        Quantum AI <span className="text-[#a78bfa]"> Revolution</span>
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mb-12"
        >
          Explore, compare, and master the revolutionary power of Quantum AI transforming the digital landscape.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative w-full max-w-4xl h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl border border-[#9333ea]/30"
        >
          <video
            src="/techex.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-[#9333ea]/10 pointer-events-none" />

          {/* Quantum AI overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="absolute top-5 left-5 md:top-8 md:left-8 text-white text-lg md:text-2xl font-bold backdrop-blur-sm px-4 py-2 rounded-lg border border-[#a78bfa]/50 shadow-lg group cursor-pointer"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[#a78bfa]"
            >
              Quantum AI
            </motion.span>

            <p className="text-sm md:text-base text-gray-300 mt-1">
              Next-gen computing meets AI intelligence.
            </p>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-20 left-0 bg-[#111827] border border-[#a78bfa]/30 rounded-lg shadow-xl p-3 w-64 text-sm text-gray-300 hidden group-hover:block z-20"
            >
              <p>
                Quantum AI fuses quantum computing with AI to accelerate
                solutions for complex, multi-variable challenges — redefining
                optimization and data intelligence.
              </p>
            </motion.div>
          </motion.div>

          {/* Interactive hotspots */}
          <TechHotspots />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-[#d1d5db] text-2xl"
      >
        ↓
      </motion.div>
    </section>
  );
};

const TechHotspots = () => {
  const hotspots = [
    { x: "20%", y: "30%", tech: "Next.js" },
    { x: "60%", y: "45%", tech: "Tailwind CSS" },
    { x: "75%", y: "20%", tech: "TypeScript" },
    { x: "40%", y: "70%", tech: "Framer Motion" },
  ];

  return (
    <>
      {hotspots.map((spot, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.5 + i * 0.3,
          }}
          whileHover={{ scale: 1.2, opacity: 1 }}
          className="absolute w-4 h-4 rounded-full bg-[#9333ea] cursor-pointer"
          style={{ left: spot.x, top: spot.y }}
        >
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white animate-ping" />
          <motion.div
            className="absolute left-6 bg-[#1f2937] text-white px-3 py-1 rounded-md text-sm whitespace-nowrap"
            initial={{ opacity: 0, x: 0 }}
            whileHover={{ opacity: 1, x: 10 }}
          >
            {spot.tech}
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};
