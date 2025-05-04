'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiServer, FiLayers } from 'react-icons/fi';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiGraphql, SiMongodb } from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';

type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'archived';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  technologies: { icon: React.ReactNode; name: string }[];
  status: ProjectStatus;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  startDate: string;
  endDate?: string;
  features: string[];
  challenges: string[];
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: 'portfolio-v3',
      title: 'Interactive Portfolio v3',
      description: 'Next-gen portfolio with 3D elements and advanced animations',
      tags: ['showcase', 'interactive', 'design'],
      technologies: [
        { icon: <SiNextdotjs className="text-black dark:text-white" />, name: 'Next.js' },
        { icon: <SiTypescript className="text-blue-600" />, name: 'TypeScript' },
        { icon: <SiTailwindcss className="text-cyan-500" />, name: 'Tailwind CSS' },
        { icon: <TbBrandThreejs className="text-gray-800 dark:text-gray-200" />, name: 'Three.js' }
      ],
      status: 'completed',
      imageUrl: '/images/portfolio-screenshot.jpg',
      githubUrl: 'https://github.com/yourusername/portfolio-v3',
      liveUrl: 'https://yourportfolio.com',
      startDate: '2023-06-01',
      endDate: '2023-08-15',
      features: [
        '3D model integration',
        'GSAP animations',
        'Dark/light mode',
        'Responsive design'
      ],
      challenges: [
        'Performance optimization for 3D elements',
        'Cross-browser compatibility',
        'Accessibility considerations'
      ]
    },
    {
      id: 'ecommerce-platform',
      title: 'Fullstack E-Commerce',
      description: 'Complete e-commerce solution with admin dashboard',
      tags: ['fullstack', 'ecommerce', 'database'],
      technologies: [
        { icon: <FaReact className="text-blue-500" />, name: 'React' },
        { icon: <FaNodeJs className="text-green-600" />, name: 'Node.js' },
        { icon: <SiMongodb className="text-green-500" />, name: 'MongoDB' },
        { icon: <SiGraphql className="text-pink-600" />, name: 'GraphQL' }
      ],
      status: 'in-progress',
      imageUrl: '/images/ecommerce-screenshot.jpg',
      githubUrl: 'https://github.com/yourusername/ecommerce-platform',
      startDate: '2023-09-01',
      features: [
        'Product management',
        'User authentication',
        'Payment integration',
        'Admin dashboard'
      ],
      challenges: [
        'Cart state management',
        'Image optimization',
        'Checkout flow'
      ]
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => 
        project.tags.includes(activeFilter) || 
        project.status === activeFilter
      );

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'planned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Planned';
      case 'archived': return 'Archived';
    }
  };

  const FloatingTechIcon = ({ icon, delay }: { icon: React.ReactNode; delay: number }) => (
    <motion.div
      className="absolute text-gray-300 dark:text-gray-700 text-4xl md:text-6xl"
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, -100],
        opacity: [0, 0.2, 0],
        x: [0, Math.random() > 0.5 ? 50 : -50]
      }}
      transition={{
        delay,
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
    >
      {icon}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 lg:p-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { icon: <SiNextdotjs />, name: 'Next.js' },
          { icon: <FaReact />, name: 'React' },
          { icon: <SiTypescript />, name: 'TypeScript' },
          { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
          { icon: <FaNodeJs />, name: 'Node.js' },
          { icon: <SiMongodb />, name: 'MongoDB' }
        ].map((tech, i) => (
          <FloatingTechIcon key={`bg-tech-${i}`} icon={tech.icon} delay={i * 2} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            My Projects
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my work with development status, technologies used, and live demos
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap gap-3 mb-8 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {['all', 'showcase', 'fullstack', 'completed', 'in-progress'].map((filter) => (
            <motion.button
              key={`filter-${filter}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium capitalize ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow'
              }`}
            >
              {filter.replace('-', ' ')}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={`project-${project.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, type: 'spring' }}
                className="relative group"
                onMouseEnter={() => setIsHovered(project.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <motion.div
                  className={`h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 border border-gray-200 dark:border-gray-700 ${
                    selectedProject?.id === project.id 
                      ? 'ring-2 ring-blue-500 dark:ring-blue-400' 
                      : 'hover:shadow-xl'
                  }`}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-20"
                      animate={{
                        opacity: isHovered === project.id ? 0.3 : 0
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiLayers className="text-5xl text-gray-300 dark:text-gray-700" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <motion.div
                          key={`${project.id}-tech-${i}`}
                          className="text-2xl"
                          whileHover={{ y: -3 }}
                          title={tech.name}
                        >
                          {tech.icon}
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span 
                          key={`${project.id}-tag-${tag}`}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {isHovered === project.id && (
                  <motion.div 
                    className="absolute top-4 right-4 flex gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800 text-white rounded-full shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-500 text-white rounded-full shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink />
                      </motion.a>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try selecting a different filter</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <FiCode className="text-6xl text-white opacity-30" />
                </div>
                <button
                  className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
                  onClick={() => setSelectedProject(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedProject.title}</h2>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusColor(selectedProject.status)}`}>
                        {getStatusLabel(selectedProject.status)}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {selectedProject.startDate} - {selectedProject.endDate || 'Present'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4 md:mt-0">
                    {selectedProject.githubUrl && (
                      <motion.a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiGithub /> Code
                      </motion.a>
                    )}
                    {selectedProject.liveUrl && (
                      <motion.a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiExternalLink /> Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6">{selectedProject.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FiLayers className="text-blue-500" /> Key Features
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, i) => (
                        <motion.li
                          key={`${selectedProject.id}-feature-${i}`}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <span className="text-green-500 mr-2">✓</span> {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FiCode className="text-purple-500" /> Challenges
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.challenges.map((challenge, i) => (
                        <motion.li
                          key={`${selectedProject.id}-challenge-${i}`}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <span className="text-yellow-500 mr-2">⚡</span> {challenge}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FiServer className="text-cyan-500" /> Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {selectedProject.technologies.map((tech, i) => (
                      <motion.div
                        key={`${selectedProject.id}-modal-tech-${i}`}
                        className="text-3xl p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                        whileHover={{ scale: 1.1 }}
                        title={tech.name}
                      >
                        {tech.icon}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}