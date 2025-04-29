// components/TechRadar.tsx
"use client"
import { motion, useMotionValue, useTransform } from 'framer-motion';

const techRadarData = [
  { name: 'Next.js', quadrant: 'Adopt', ring: 'Trial', x: 30, y: 30 },
  { name: 'Svelte', quadrant: 'Assess', ring: 'Hold', x: 70, y: 30 },
  { name: 'Rust', quadrant: 'Hold', ring: 'Adopt', x: 30, y: 70 },
  { name: 'GraphQL', quadrant: 'Adopt', ring: 'Trial', x: 70, y: 70 },
];

export const TechRadar = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Interactive <span className="text-blue-600">Tech Radar</span>
        </h2>

        <div className="flex justify-center">
          <motion.div
            onMouseMove={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              mouseX.set((e.clientX - rect.left) / rect.width);
              mouseY.set((e.clientY - rect.top) / rect.height);
            }}
            style={{
              rotateX,
              rotateY,
            }}
            className="relative w-full max-w-2xl h-96 bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center"
          >
            {/* Radar grid */}
            <div className="absolute inset-8 border-2 border-gray-200 rounded-full" />
            <div className="absolute inset-16 border-2 border-gray-200 rounded-full" />
            <div className="absolute inset-24 border-2 border-gray-200 rounded-full" />
            <div className="absolute h-full w-px bg-gray-200" />
            <div className="absolute w-full h-px bg-gray-200" />
            
            {/* Quadrant labels */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-500">
              Adopt
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-500">
              Assess
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-500">
              Hold
            </div>
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-500">
              Trial
            </div>

            {/* Tech dots */}
            {techRadarData.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.2 }}
                className={`absolute w-6 h-6 rounded-full ${
                  tech.quadrant === 'Adopt' ? 'bg-green-500' :
                  tech.quadrant === 'Assess' ? 'bg-yellow-500' :
                  tech.quadrant === 'Hold' ? 'bg-red-500' : 'bg-blue-500'
                } cursor-pointer flex items-center justify-center text-white text-xs`}
                style={{
                  left: `${tech.x}%`,
                  top: `${tech.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {tech.name.split(' ')[0]}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute -bottom-8 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                >
                  {tech.name} - {tech.ring}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};