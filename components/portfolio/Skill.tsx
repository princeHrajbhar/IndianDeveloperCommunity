'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll,  useTransform } from 'framer-motion';
import { FiCode, FiCpu, FiDatabase, FiLayers, FiServer, FiSmartphone } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiGraphql, SiPostgresql, SiRedis } from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';
import { JSX } from 'react/jsx-runtime';

type SkillCategory = 'frontend' | 'backend' | 'devops' | 'database' | 'mobile' | 'all';
type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface Skill {
  id: string;
  name: string;
  icon: JSX.Element;
  category: SkillCategory[];
  level: SkillLevel;
  experience: string;
  description: string;
  color: string;
}

const SkillsPage = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityRange = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Skill data
  const skillsData: Skill[] = [
    {
      id: 'react',
      name: 'React',
      icon: <FaReact />,
      category: ['frontend', 'mobile'],
      level: 'expert',
      experience: '4+ years',
      description: 'Building complex, interactive UIs with hooks, context, and performance optimizations.',
      color: 'text-blue-400'
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      icon: <SiNextdotjs />,
      category: ['frontend', 'backend'],
      level: 'expert',
      experience: '3+ years',
      description: 'SSR, SSG, ISR, API routes, middleware, and advanced optimizations.',
      color: 'text-gray-800 dark:text-gray-100'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      icon: <SiTypescript />,
      category: ['frontend', 'backend'],
      level: 'advanced',
      experience: '3+ years',
      description: 'Strong typing, generics, utility types, and complex type definitions.',
      color: 'text-blue-600'
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      icon: <SiTailwindcss />,
      category: ['frontend'],
      level: 'advanced',
      experience: '3+ years',
      description: 'Utility-first CSS with custom plugins and theming support.',
      color: 'text-cyan-400'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      icon: <FaNodeJs />,
      category: ['backend'],
      level: 'advanced',
      experience: '4+ years',
      description: 'Building scalable server-side applications and APIs with Express, NestJS.',
      color: 'text-green-500'
    },
    {
      id: 'python',
      name: 'Python',
      icon: <FaPython />,
      category: ['backend'],
      level: 'intermediate',
      experience: '2+ years',
      description: 'Data processing, scripting, and backend development with Django/Flask.',
      color: 'text-yellow-400'
    },
    {
      id: 'graphql',
      name: 'GraphQL',
      icon: <SiGraphql />,
      category: ['backend'],
      level: 'intermediate',
      experience: '2+ years',
      description: 'Schema design, resolvers, Apollo Server/Client implementation.',
      color: 'text-pink-600'
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      icon: <SiPostgresql />,
      category: ['database'],
      level: 'intermediate',
      experience: '3+ years',
      description: 'Database design, query optimization, and advanced SQL features.',
      color: 'text-blue-700'
    },
    {
      id: 'redis',
      name: 'Redis',
      icon: <SiRedis />,
      category: ['database'],
      level: 'intermediate',
      experience: '2+ years',
      description: 'Caching, session management, and pub/sub implementations.',
      color: 'text-red-600'
    },
    {
      id: 'aws',
      name: 'AWS',
      icon: <FaAws />,
      category: ['devops'],
      level: 'intermediate',
      experience: '2+ years',
      description: 'EC2, S3, Lambda, RDS, and other cloud services deployment.',
      color: 'text-orange-500'
    },
    {
      id: 'docker',
      name: 'Docker',
      icon: <FaDocker />,
      category: ['devops'],
      level: 'intermediate',
      experience: '2+ years',
      description: 'Containerization, Docker Compose, and deployment workflows.',
      color: 'text-blue-500'
    },
    {
      id: 'threejs',
      name: 'Three.js',
      icon: <TbBrandThreejs />,
      category: ['frontend'],
      level: 'beginner',
      experience: '1 year',
      description: '3D visualizations and interactive WebGL experiences.',
      color: 'text-gray-400'
    }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category.includes(activeCategory));

  const categories: { id: SkillCategory; name: string; icon: JSX.Element }[] = [
    { id: 'all', name: 'All Skills', icon: <FiCode /> },
    { id: 'frontend', name: 'Frontend', icon: <FiLayers /> },
    { id: 'backend', name: 'Backend', icon: <FiServer /> },
    { id: 'database', name: 'Database', icon: <FiDatabase /> },
    { id: 'devops', name: 'DevOps', icon: <FiCpu /> },
    { id: 'mobile', name: 'Mobile', icon: <FiSmartphone /> }
  ];

  const getLevelColor = (level: SkillLevel) => {
    switch (level) {
      case 'beginner': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelWidth = (level: SkillLevel) => {
    switch (level) {
      case 'beginner': return '25%';
      case 'intermediate': return '50%';
      case 'advanced': return '75%';
      case 'expert': return '100%';
      default: return '0%';
    }
  };

  // Floating particles background
  const Particle = ({ x, y, color, delay }: { x: string; y: string; color: string; delay: number }) => (
    <motion.div
      className={`absolute rounded-full ${color} w-2 h-2`}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        y: [0, -40],
        x: [0, Math.random() > 0.5 ? 20 : -20]
      }}
      transition={{
        delay,
        duration: 6 + Math.random() * 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ left: x, top: y }}
    />
  );

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white p-4 md:p-8 lg:p-12 relative overflow-hidden"
    >
      {/* Animated background particles */}
      {[...Array(30)].map((_, i) => (
        <Particle
          key={i}
          x={`${Math.random() * 100}%`}
          y={`${Math.random() * 100}%`}
          color={i % 3 === 0 ? 'bg-blue-400/30' : i % 2 === 0 ? 'bg-purple-400/30' : 'bg-green-400/30'}
          delay={i * 0.2}
        />
      ))}

      {/* Floating skill icons in background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: yRange, opacity: opacityRange }}
      >
        {skillsData.map((skill, i) => (
          <motion.div
            key={`bg-${skill.id}`}
            className={`absolute ${skill.color} opacity-10`}
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${20 + (i * 13) % 60}%`,
              fontSize: `${isMobile ? '2rem' : '4rem'}`
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {skill.icon}
          </motion.div>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-12 text-center"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
            whileHover={{ scale: 1.02 }}
          >
            My Skills & Expertise
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Technologies I&apos;ve mastered and tools I use to build amazing digital experiences
          </motion.p>
        </motion.div>

        {/* Interactive category tabs */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-12 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ 
                scale: 1.05,
                y: -3,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all relative overflow-hidden flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow'
              }`}
            >
              {category.icon}
              {category.name}
              {activeCategory === category.id && (
                <motion.span
                  layoutId="activeCategoryIndicator"
                  className="absolute inset-0 bg-white/10 rounded-lg"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, type: 'spring' }}
                className="relative group"
                onMouseEnter={() => !isMobile && setIsHovering(skill.id)}
                onMouseLeave={() => !isMobile && setIsHovering(null)}
              >
                {/* Skill card */}
                <motion.div
                  layout
                  onClick={() => setSelectedSkill(selectedSkill?.id === skill.id ? null : skill)}
                  className={`h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 border border-gray-200 dark:border-gray-700 ${
                    selectedSkill?.id === skill.id 
                      ? 'ring-2 ring-blue-500 dark:ring-blue-400' 
                      : 'hover:shadow-xl'
                  }`}
                  whileHover={!isMobile ? { 
                    y: -5,
                    boxShadow: "0 15px 30px -5px rgba(0,0,0,0.1)"
                  } : {}}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-6">
                    {/* Skill icon with floating animation */}
                    <motion.div
                      animate={{
                        y: isHovering === skill.id ? [0, -5, 0] : 0,
                        rotate: isHovering === skill.id ? [0, 10, -10, 0] : 0
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`text-4xl mb-4 ${skill.color}`}
                    >
                      {skill.icon}
                    </motion.div>

                    <h3 className="text-xl font-bold mb-1">{skill.name}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getLevelColor(skill.level)}`}>
                      {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                    </span>

                    {/* Experience bar */}
                    <div className="mt-3 mb-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div 
                        className={`h-2 rounded-full ${getLevelColor(skill.level).replace('text', 'bg')}`}
                        initial={{ width: 0 }}
                        animate={{ width: getLevelWidth(skill.level) }}
                        transition={{ delay: 0.3, duration: 1, type: 'spring' }}
                      />
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300">{skill.experience} experience</p>

                    {/* Expanded details */}
                    <AnimatePresence>
                      {selectedSkill?.id === skill.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 overflow-hidden"
                        >
                          <p className="text-sm text-gray-700 dark:text-gray-200">{skill.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Glow effect */}
                {isHovering === skill.id && !isMobile && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-blue-500/10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-5xl mb-4">🧐</div>
            <h3 className="text-xl font-bold mb-2">No skills found in this category</h3>
            <p className="text-gray-600 dark:text-gray-400">Try selecting a different category above</p>
          </motion.div>
        )}
      </div>

      {/* 3D floating action button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-xl text-white"
          style={{
            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)'
          }}
        >
          <FiCode className="text-xl" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SkillsPage;