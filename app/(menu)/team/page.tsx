"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  description: string;
  university: string;
  image: string;
  testimonial?: string;
};

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'AI Research Lead',
      description: 'Specializes in deep learning and neural architectures',
      university: 'IIT Bombay',
      image: '/ai.jpg',
      testimonial: "Being part of this community has allowed me to work on cutting-edge AI problems that directly impact our nation&apos;s growth."
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Data Science Head',
      description: 'Expert in predictive analytics and big data',
      university: 'IIIT Hyderabad',
      image: '/drone.jpg',
      testimonial: "The collaborative environment here has helped me grow both technically and as a leader in the AI space."
    },
    {
      id: 3,
      name: 'Amit Singh',
      role: 'Frontend Architect',
      description: 'Builds intuitive AI-powered interfaces',
      university: 'NIT Trichy',
      image: '/blockchain.jpg',
      testimonial: "I&apos;ve found my passion for creating AI interfaces that make complex technology accessible to everyone."
    },
    {
      id: 4,
      name: 'Neha Gupta',
      role: 'Backend Lead',
      description: 'Scales AI systems for millions of users',
      university: 'BITS Pilani',
      image: '/bitcoin.jpg',
      testimonial: "Working here has given me the opportunity to build systems that truly make a difference at scale."
    },
    {
      id: 5,
      name: 'Vikram Joshi',
      role: 'ML Engineer',
      description: 'Optimizes models for edge devices',
      university: 'IIT Delhi',
      image: '/neural.jpg',
      testimonial: "The focus on practical, deployable AI solutions sets this community apart from others."
    },
    {
      id: 6,
      name: 'Ananya Reddy',
      role: 'Community Manager',
      description: 'Connects developers with opportunities',
      university: 'IIIT Bangalore',
      image: '/quantum.jpg',
      testimonial: "Seeing our members grow and succeed is the most rewarding part of my work here."
    },
  ];

  const projects = [
    {
      id: 1,
      title: 'BharatGPT',
      description: 'Open-source multilingual LLM for Indian languages',
      status: 'Active'
    },
    {
      id: 2,
      title: 'AI for Agriculture',
      description: 'Computer vision solutions for crop monitoring',
      status: 'Beta'
    },
    {
      id: 3,
      title: 'Healthcare Diagnostics',
      description: 'AI-powered early disease detection system',
      status: 'Research'
    },
    {
      id: 4,
      title: 'GovTech AI',
      description: 'Optimizing government services with AI',
      status: 'Planning'
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-purple-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white p-[35px]">
      <Head>
        <title>Team | AI Superpower India</title>
        <meta name="description" content="Meet the team building India&apos;s AI future" />
      </Head>

      <header className="py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            AI Superpower India
          </h1>
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl">
            Join Us
          </button>
        </motion.div>
      </header>

      <main className="pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex overflow-x-auto py-4 mb-8 scrollbar-hide"
        >
          {['about', 'mission', 'projects', 'team'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 mx-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'about' && (
              <section className="mb-24 px-4">
                <h2 className="text-4xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 drop-shadow-lg">
                  About Our Community ✨
                </h2>
              
                <div className="grid md:grid-cols-2 gap-10">
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 30px rgba(128, 90, 213, 0.3)" }}
                    transition={{ type: "spring", stiffness: 100, damping: 12 }}
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-900 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-300 opacity-70 transition-all duration-300 group-hover:w-2"></div>
              
                    <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                      <span>Who We Are</span> <span className="animate-pulse">🚀</span>
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-[16px]">
                      We&apos;re a growing collective of students, developers, and enthusiasts passionate about
                      artificial intelligence and technology. Our mission is to learn, build, and innovate together —
                      starting small, dreaming big.
                    </p>
                  </motion.div>
              
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 30px rgba(128, 90, 213, 0.3)" }}
                    transition={{ type: "spring", stiffness: 100, damping: 12 }}
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-900 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-300 opacity-70 transition-all duration-300 group-hover:w-2"></div>
              
                    <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                      <span>Our Journey</span> <span className="animate-bounce">💡</span>
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-[16px]">
                      We&apos;ve just begun, hosting meetups, brainstorming ideas, and collaborating on early-stage
                      projects. It&apos;s not about numbers — it&apos;s about building a space where curiosity thrives and
                      ideas turn into action.
                    </p>
                  </motion.div>
                </div>
              </section>
            )}

            {activeTab === 'mission' && (
              <section className="mb-24 px-4">
                <h2 className="text-4xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 drop-shadow-lg animate-gradient-x">
                  Our Vision & Mission 🌟
                </h2>

                <div className="grid md:grid-cols-2 gap-10">
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)" }}
                    transition={{ type: "spring", stiffness: 100, damping: 14 }}
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-900 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-300 opacity-70 transition-all duration-300 group-hover:w-2"></div>

                    <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                      <span>Vision</span> <span className="animate-pulse">🎯</span>
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-[16px]">
                      To establish India as a global superpower in artificial intelligence by 2030,
                      creating an ecosystem where Indian-developed AI solutions transform industries,
                      empower citizens, and solve uniquely Indian challenges at scale.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)" }}
                    transition={{ type: "spring", stiffness: 100, damping: 14 }}
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-900 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-300 opacity-70 transition-all duration-300 group-hover:w-2"></div>

                    <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                      <span>Mission</span> <span className="animate-bounce">🚀</span>
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-[16px]">
                      We bridge the gap between academic research and industry application by
                      fostering collaboration, providing hands-on training, and building open-source
                      AI tools tailored for India&apos;s diverse needs. Our focus spans from fundamental
                      research to deployable solutions in healthcare, agriculture, education, and
                      governance.
                    </p>
                  </motion.div>
                </div>
              </section>
            )}

            {activeTab === 'projects' && (
              <section className="mb-24 px-4">
                <h2 className="text-4xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 drop-shadow-lg animate-gradient-x">
                  Current Projects 🔥
                </h2>
              
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 120, damping: 12 }}
                      className="relative bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-700 group overflow-hidden"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-br from-purple-500/20 via-pink-400/10 to-transparent pointer-events-none rounded-2xl"></div>
              
                      <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <span>{project.title}</span>
                        <span className="text-sm animate-pulse">🚀</span>
                      </h3>
              
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${
                          project.status === 'Active' ? 'bg-green-500' :
                          project.status === 'Beta' ? 'bg-yellow-500' :
                          project.status === 'Research' ? 'bg-blue-500' : 'bg-purple-500'
                        }`}
                      >
                        {project.status}
                      </span>
              
                      <p className="text-gray-300 mb-6 text-[15px] leading-relaxed">
                        {project.description}
                      </p>
              
                      <button className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 font-medium text-white tracking-wide shadow-md hover:shadow-lg">
                        Contribute ✨
                      </button>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'team' && (
              <section className="mb-24 px-4">
                <h2 className="text-4xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 drop-shadow-lg animate-gradient-x">
                  Meet Our Core Team 👑
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.map((member) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.04, rotate: 0.5 }}
                      onHoverStart={() => setHoveredMember(member.id)}
                      onHoverEnd={() => setHoveredMember(null)}
                      className="relative bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-700 overflow-hidden group"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-purple-600/50 via-pink-500/30 to-transparent pointer-events-none rounded-2xl"></div>

                      <div className="flex items-center mb-5">
                        <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden mr-4 border-2 border-purple-500 shadow-lg">
                          <Image 
                            src={member.image} 
                            alt={member.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=7e22ce&color=fff`;
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            {member.name}
                            <span className="text-sm animate-pulse">🌟</span>
                          </h3>
                          <p className="text-purple-300 font-medium">{member.role}</p>
                        </div>
                      </div>

                      <AnimatePresence>
                        {hoveredMember === member.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 space-y-2"
                          >
                            <p className="text-gray-300 text-[15px] leading-relaxed">{member.description}</p>
                            <p className="text-sm text-purple-300 font-medium">{member.university}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>

        <section className="mt-32 px-4 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-extrabold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 drop-shadow-lg">
              Voices From Our Team
            </h2>

            <div className="relative overflow-x-auto overflow-y-hidden hide-scrollbar">
              <motion.div
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 30,
                  ease: "linear",
                }}
                className="flex gap-8"
              >
                {[...teamMembers, ...teamMembers].map((member) => (
                  <div
                    key={`testimonial-${member.id}-${Math.random()}`}
                    className="min-w-[320px] bg-gradient-to-br from-purple-800 via-purple-700 to-purple-900 bg-opacity-80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/30 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-400 via-purple-500 to-transparent rounded-3xl"></div>

                    <div className="flex items-center mb-5 relative z-10">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-pink-500 mr-4 shadow-md">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = `https://ui-avatars.com/api/?name=${member.name.replace(
                              " ",
                              "+"
                            )}&background=7e22ce&color=fff`;
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{member.name}</h3>
                        <p className="text-sm text-pink-300">{member.role}</p>
                      </div>
                    </div>

                    <p className="text-gray-200 italic text-[15px] relative z-10">
                      &ldquo;{member.testimonial}&rdquo;
                    </p>

                    <div className="flex mt-4 text-yellow-400 text-lg relative z-10">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <svg
                          key={idx}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                        >
                          <path d="M12 17.3l6.18 3.73-1.64-7.19 5.46-4.73-7.27-.61L12 2 9.27 8.5l-7.27.61 5.46 4.73-1.64 7.19z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
      <footer className="py-8 px-4 sm:px-8 lg:px-16 border-t border-gray-800">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Build India&apos;s AI Future?</h2>
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold">
            Join Our Community
          </button>
          <p className="mt-6 text-gray-400">
            © {new Date().getFullYear()} AI Superpower India.
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default TeamPage;