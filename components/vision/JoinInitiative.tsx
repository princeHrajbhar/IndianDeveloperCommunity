"use client"
import { motion } from "framer-motion";

export const JoinInitiative = () => {
  return (
    <section className="py-20 bg-blue-900/60">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden"
        >
          <div className="relative z-10">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Be Part of India&apos;s AI Revolution
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-purple-100 mb-8 max-w-2xl"
            >
              Whether you&apos;re a student, researcher, entrepreneur, or policymaker, you can contribute to making India the AI leader.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-purple-900 hover:bg-purple-100 rounded-lg font-semibold transition"
              >
                Join as a Volunteer
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white rounded-lg font-semibold transition"
              >
                Partner With Us
              </motion.button>
            </motion.div>
          </div>

          {/* Floating AI Elements */}
          <motion.div
            animate={{
              x: [0, 10, 0, -10, 0],
              y: [0, -5, 5, 0, -5],
              rotate: [0, 5, -5, 0, 5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 right-20 text-6xl opacity-20"
          >
            🤖
          </motion.div>
          <motion.div
            animate={{
              x: [0, -15, 0, 15, 0],
              y: [0, 10, -10, 0, 10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: 2,
            }}
            className="absolute bottom-10 left-10 text-5xl opacity-20"
          >
            🧠
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};