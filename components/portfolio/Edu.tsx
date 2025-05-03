'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';
import { FaGraduationCap, FaLaptopCode, FaCertificate } from 'react-icons/fa';

type TimelineItem = {
  id: string;
  title: string;
  institution?: string;
  company?: string;
  position?: string;
  duration: string;
  description: string[];
  type: 'education' | 'experience' | 'certification';
  skills?: string[];
};

const UltraEnhancedPortfolio = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'experience' | 'certifications'>('education');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest * 100);
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const timelineData: TimelineItem[] = [
    {
        id: 'edu-1',
        title: 'Master of Computer Science',
        institution: 'Tech University',
        duration: '2022 - 2024',
        description: [
          'Specialized in Artificial Intelligence and Machine Learning',
          'Published research on neural network optimization',
          'Thesis: "Advanced Techniques in Image Recognition"'
        ],
        type: 'education',
        skills: ['Machine Learning', 'Deep Learning', 'Data Structures', 'Algorithms']
      },
      {
        id: 'exp-1',
        title: 'Machine Learning Engineer Intern',
        company: 'NeuralTech Solutions',
        position: 'Intern',
        duration: 'Jan 2024 - Apr 2024',
        description: [
          'Built ML models for real-time data analytics',
          'Collaborated on a chatbot project using NLP techniques',
          'Optimized model inference time by 30%'
        ],
        type: 'experience',
        skills: ['Python', 'TensorFlow', 'NLP', 'Model Optimization']
      },
      {
        id: 'cert-1',
        title: 'Deep Learning Specialization',
        company: 'Coursera (deeplearning.ai)',
        duration: 'Dec 2023',
        description: [
          'Completed five courses covering CNNs, RNNs, and Sequence Models',
          'Final project: Image classification with transfer learning'
        ],
        type: 'certification',
        skills: ['Keras', 'CNN', 'Transfer Learning', 'RNN']
      },
      {
        id: 'edu-2',
        title: 'Bachelor of Technology in Computer Science',
        institution: 'Global Engineering College',
        duration: '2018 - 2022',
        description: [
          'Graduated with Honors (CGPA: 9.1)',
          'Final year project: "Smart Home Automation System"',
          'Active member of the coding club and hackathon participant'
        ],
        type: 'education',
        skills: ['Java', 'C++', 'Embedded Systems', 'IoT']
      },
      {
        id: 'exp-2',
        title: 'Full-Stack Developer Intern',
        company: 'CodeCraft Innovations',
        position: 'Intern',
        duration: 'Jul 2023 - Oct 2023',
        description: [
          'Developed and maintained company’s e-commerce platform',
          'Integrated payment gateway APIs',
          'Improved website load time by 40%'
        ],
        type: 'experience',
        skills: ['React.js', 'Node.js', 'MongoDB', 'Express']
      },
      {
        id: 'cert-2',
        title: 'AWS Certified Cloud Practitioner',
        company: 'Amazon Web Services',
        duration: 'Jun 2023',
        description: [
          'Learned AWS core services: EC2, S3, Lambda',
          'Deployed serverless applications using AWS Lambda and API Gateway'
        ],
        type: 'certification',
        skills: ['AWS', 'Cloud Computing', 'Serverless']
      },
      {
        id: 'edu-3',
        title: 'Higher Secondary Schooling',
        institution: 'Sunrise Senior Secondary School',
        duration: '2016 - 2018',
        description: [
          'Major subjects: Physics, Chemistry, Mathematics, Computer Science',
          'Secured 91% in final board exams'
        ],
        type: 'education',
        skills: ['Physics', 'Maths', 'Problem Solving']
      },
      {
        id: 'exp-3',
        title: 'Campus Ambassador',
        company: 'TechFest Global',
        position: 'Ambassador',
        duration: 'Feb 2023 - May 2023',
        description: [
          'Promoted national-level coding contests on campus',
          'Managed event logistics and student registrations',
          'Increased event participation by 35%'
        ],
        type: 'experience',
        skills: ['Public Speaking', 'Event Management', 'Networking']
      },
      {
        id: 'cert-3',
        title: 'Python for Data Science',
        company: 'edX (Microsoft)',
        duration: 'Mar 2023',
        description: [
          'Mastered data wrangling, visualization, and predictive analytics',
          'Built final project: Customer churn prediction using logistic regression'
        ],
        type: 'certification',
        skills: ['Python', 'Pandas', 'Seaborn', 'Scikit-learn']
      },
      {
        id: 'cert-4',
        title: 'Git & GitHub Essentials',
        company: 'Udemy',
        duration: 'Jan 2023',
        description: [
          'Covered version control fundamentals and collaborative workflows',
          'Built team projects using branches, pull requests, and merge conflicts'
        ],
        type: 'certification',
        skills: ['Git', 'GitHub', 'Version Control']
      }
  ];

  const filteredData = timelineData.filter(item => item.type === activeTab || 
    (activeTab === 'certifications' && item.type === 'certification'));

  const handleItemClick = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const getIcon = (type: string, size = 20) => {
    switch (type) {
      case 'education': return <FaGraduationCap className="text-blue-400" size={size} />;
      case 'experience': return <FaLaptopCode className="text-green-400" size={size} />;
      case 'certification': return <FaCertificate className="text-purple-400" size={size} />;
      default: return null;
    }
  };

  const getTabColor = (tab: string) => {
    switch (tab) {
      case 'education': return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'experience': return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'certifications': return 'bg-gradient-to-r from-purple-500 to-purple-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const Particle = ({ x, y, color }: { x: string; y: string; color: string }) => (
    <motion.div
      className={`absolute rounded-full ${color} w-2 h-2`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        y: [0, -20],
        x: [0, Math.random() > 0.5 ? 10 : -10]
      }}
      transition={{
        duration: 4 + Math.random() * 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ left: x, top: y }}
    />
  );

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8 lg:p-12 relative overflow-hidden"
    >
      {[...Array(20)].map((_, i) => (
        <Particle
          key={i}
          x={`${Math.random() * 100}%`}
          y={`${Math.random() * 100}%`}
          color={i % 3 === 0 ? 'bg-blue-400/30' : i % 2 === 0 ? 'bg-purple-400/30' : 'bg-green-400/30'}
        />
      ))}

      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-8 md:mb-16 text-center md:text-left"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-green-400"
            whileHover={{ scale: 1.02 }}
          >
            My Professional Journey
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore my educational background, work experience, and professional certifications
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap gap-3 mb-8 md:mb-12 justify-center md:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
            { id: 'experience', label: 'Experience', icon: <FaLaptopCode /> },
            { id: 'certifications', label: 'Certifications', icon: <FaCertificate /> }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ 
                scale: 1.05,
                y: -3,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab(tab.id as 'education' | 'experience' | 'certifications');
                setExpandedItem(null);
              }}
              className={`px-6 py-3 rounded-xl font-medium transition-all relative overflow-hidden flex items-center gap-2 ${
                activeTab === tab.id
                  ? `${getTabColor(tab.id)} text-white shadow-lg`
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <div className="relative">
          {!isMobile && (
            <motion.div 
              className="absolute left-4 md:left-8 top-0 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full hidden md:block"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
          )}

          {isMobile && (
            <div className="absolute left-4 top-0 h-full w-2 flex flex-col items-center">
              {filteredData.map((_, i) => (
                <motion.div
                  key={`mobile-dot-${i}`}
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mb-8"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-6 md:space-y-8"
            >
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100
                  }}
                  className="relative group"
                  onMouseEnter={() => !isMobile && setIsHovering(item.id)}
                  onMouseLeave={() => !isMobile && setIsHovering(null)}
                >
                  {!isMobile && (
                    <motion.div
                      animate={{
                        scale: isHovering === item.id || expandedItem === item.id ? [1, 1.1, 1] : 1,
                        boxShadow: isHovering === item.id || expandedItem === item.id ? 
                          `0 0 15px ${item.type === 'education' ? 'rgba(96, 165, 250, 0.7)' : 
                           item.type === 'experience' ? 'rgba(74, 222, 128, 0.7)' : 
                           'rgba(167, 139, 250, 0.7)'}` : 'none'
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`absolute left-0 md:left-8 top-6 h-5 w-5 rounded-full ${
                        item.type === 'education' ? 'bg-blue-500' :
                        item.type === 'experience' ? 'bg-green-500' :
                        'bg-purple-500'
                      } transform -translate-x-1/2 z-10 flex items-center justify-center shadow-lg`}
                    >
                      {getIcon(item.type, 14)}
                    </motion.div>
                  )}

                  <motion.div
                    layout
                    onClick={() => handleItemClick(item.id)}
                    className={`ml-10 md:ml-24 p-5 md:p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      isHovering === item.id
                        ? 'bg-gray-800 shadow-xl'
                        : 'bg-gray-800/90 hover:bg-gray-800'
                    } ${
                      expandedItem === item.id ? 'ring-2 ring-opacity-50 ' + 
                        (item.type === 'education' ? 'ring-blue-500' :
                         item.type === 'experience' ? 'ring-green-500' :
                         'ring-purple-500') : ''
                    }`}
                    whileHover={!isMobile ? { 
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)"
                    } : {}}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <motion.h3 
                          className="text-lg md:text-xl lg:text-2xl font-bold mb-1"
                          animate={{ 
                            color: isHovering === item.id || expandedItem === item.id ? 
                              item.type === 'education' ? '#60a5fa' : 
                              item.type === 'experience' ? '#4ade80' : 
                              '#a78bfa' : 'white'
                          }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.p 
                          className="text-base md:text-lg text-gray-300"
                          animate={{
                            x: isHovering === item.id || expandedItem === item.id ? 5 : 0
                          }}
                        >
                          {item.institution || item.company}
                          {item.position && <span className="text-gray-400"> • {item.position}</span>}
                        </motion.p>
                      </div>
                      <motion.span 
                        className="mt-2 md:mt-0 px-3 py-1 bg-gray-700 rounded-full text-xs md:text-sm font-medium"
                        animate={{
                          scale: isHovering === item.id || expandedItem === item.id ? 1.05 : 1
                        }}
                      >
                        {item.duration}
                      </motion.span>
                    </div>

                    <AnimatePresence>
                      {expandedItem === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="mt-4 overflow-hidden"
                        >
                          <ul className="space-y-2">
                            {item.description.map((desc, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                className="text-gray-300 flex items-start"
                              >
                                <span className="text-blue-400 mr-2">•</span> {desc}
                              </motion.li>
                            ))}
                          </ul>
                          
                          {item.skills && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              className="mt-4 flex flex-wrap gap-2"
                            >
                              {item.skills.map((skill) => (
                                <motion.span
                                  key={skill}
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ type: 'spring', stiffness: 200 }}
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    item.type === 'education' ? 'bg-blue-900/50 text-blue-300' :
                                    item.type === 'experience' ? 'bg-green-900/50 text-green-300' :
                                    'bg-purple-900/50 text-purple-300'
                                  }`}
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div
                      animate={{
                        x: isHovering === item.id || expandedItem === item.id ? 5 : 0,
                        color: isHovering === item.id || expandedItem === item.id ? 
                          item.type === 'education' ? '#60a5fa' : 
                          item.type === 'experience' ? '#4ade80' : 
                          '#a78bfa' : '#60a5fa'
                      }}
                      className="mt-3 flex items-center text-sm md:text-base font-medium"
                    >
                      {expandedItem === item.id ? 'Hide details' : 'Show details'}
                      <motion.span
                        animate={{ 
                          rotate: expandedItem === item.id ? 180 : 0
                        }}
                      >
                        <FiChevronDown className="ml-1" />
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"
        >
          <FiArrowRight className="text-white text-xl" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default UltraEnhancedPortfolio;