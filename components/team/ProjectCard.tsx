'use client';

import { Project } from '@/types/team';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative group h-full flex flex-col"
    >
      <motion.div 
        className="relative h-48 overflow-hidden"
        whileHover={{ scale: 1.05 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </motion.div>
      
      <div className="p-6 flex-grow flex flex-col">
        <motion.h3 
          className="text-xl font-bold text-gray-800 mb-2"
          whileHover={{ color: '#4f46e5' }}
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 mb-4 flex-grow"
          whileHover={{ x: 5 }}
        >
          {project.description}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {project.tags.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
              whileHover={{ scale: 1.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}