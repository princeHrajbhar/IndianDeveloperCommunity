// components/TechComparison.tsx
"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const technologies = [
  { name: 'Next.js', category: 'Framework', stars: '78k', performance: '95%' },
  { name: 'Remix', category: 'Framework', stars: '15k', performance: '90%' },
  { name: 'Astro', category: 'Framework', stars: '19k', performance: '98%' },
  { name: 'Tailwind CSS', category: 'CSS', stars: '62k', performance: '100%' },
  { name: 'TypeScript', category: 'Language', stars: '88k', performance: '85%' },
];

export const TechComparison = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(technologies.map(t => t.category)))];

  const filteredTechs = selectedCategory === 'All' 
    ? technologies 
    : technologies.filter(t => t.category === selectedCategory);

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Technology <span className="text-blue-400">Comparison</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredTechs.map(tech => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedTech(tech.name === selectedTech ? null : tech.name)}
                className={`bg-gray-800 rounded-xl p-6 cursor-pointer transition-all ${
                  selectedTech === tech.name ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold">{tech.name}</h3>
                  <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {tech.category}
                  </span>
                </div>

                <AnimatePresence>
                  {selectedTech === tech.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-2 overflow-hidden"
                    >
                      <div className="flex justify-between">
                        <span className="text-gray-400">GitHub Stars:</span>
                        <span>{tech.stars}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Performance:</span>
                        <span>{tech.performance}</span>
                      </div>
                      <div className="pt-4">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition">
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};