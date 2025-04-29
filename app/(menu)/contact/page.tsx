"use client";
import { motion } from "framer-motion";
import { FaFileUpload, FaUserTie, FaCode, FaLightbulb, FaChartLine, FaHandshake, FaBookOpen } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function CommunityHubPage() {
  // Expanded join options with detailed descriptions
  const joinOptions = [
    {
      title: "Join as Core Developer",
      icon: <FaCode className="text-4xl" />,
      description: "Contribute to foundational AI infrastructure projects",
      details: [
        "Work on open-source AI frameworks",
        "Build developer tools for India&apos;s AI ecosystem",
        "Collaborate with top engineers nationwide"
      ],
      color: "from-purple-600 to-indigo-600",
      action: "#developer-form"
    },
    {
      title: "Join as Researcher",
      icon: <FaLightbulb className="text-4xl" />,
      description: "Advance India&apos;s AI research capabilities",
      details: [
        "Access to national AI research datasets",
        "Work on government-supported initiatives",
        "Publish papers with institutional backing"
      ],
      color: "from-blue-500 to-cyan-500",
      action: "#researcher-form"
    },
    {
      title: "Join as Project Lead",
      icon: <FaUserTie className="text-4xl" />,
      description: "Steer strategic AI initiatives",
      details: [
        "Lead cross-functional teams",
        "Manage government and private partnerships",
        "Shape India&apos;s AI roadmap"
      ],
      color: "from-green-600 to-emerald-500",
      action: "#lead-form"
    }
  ];

  // Project participation options
  const projectOptions = [
    {
      name: "BharatGPT Initiative",
      description: "National-scale multilingual AI model",
      status: "Active Recruitment",
      skills: ["NLP", "PyTorch", "Distributed Systems"],
      link: "#bharatgpt"
    },
    {
      name: "AI for Agriculture",
      description: "Precision farming solutions",
      status: "Pilot Phase",
      skills: ["Computer Vision", "IoT", "Edge AI"],
      link: "#ai-agri"
    },
    {
      name: "Healthcare Diagnostics",
      description: "AI-powered disease detection",
      status: "Research Phase",
      skills: ["Medical Imaging", "Federated Learning"],
      link: "#health-ai"
    }
  ];

  // Why Join Us benefits
  const whyJoinUs = [
    {
      title: "Career Advancement",
      icon: <FaChartLine className="text-4xl text-blue-400" />,
      benefits: [
        "Access to exclusive job opportunities",
        "Skill certification programs",
        "Career mentorship from industry leaders"
      ]
    },
    {
      title: "Networking",
      icon: <FaHandshake className="text-4xl text-purple-400" />,
      benefits: [
        "Connect with 10,000+ AI professionals",
        "Quarterly networking events",
        "Private community channels"
      ]
    },
    {
      title: "Learning Resources",
      icon: <FaBookOpen className="text-4xl text-green-400" />,
      benefits: [
        "Access to premium courses and workshops",
        "Research paper repository",
        "Live Q&A with experts"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#131b2b] text-gray-100">
      {/* Tech Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: Math.random() * 1200,
              y: Math.random() * 1200,
              rotate: Math.random() * 360,
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute text-blue-400"
            style={{
              fontSize: `${Math.random() * 40 + 20}px`,
            }}
          >
            {['</>', 'AI', 'ML', 'DEV', 'IND', 'TECH', 'CODE', 'DATA'][i % 8]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Build India&apos;s AI Future
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            Join our national movement to position India as the global leader in Artificial Intelligence
          </motion.p>
        </div>

        {/* Participation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {joinOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <div className={`bg-gradient-to-br ${option.color} rounded-t-2xl p-8 text-white flex flex-col items-center text-center`}>
                <div className="mb-6">{option.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{option.title}</h3>
                <p className="mb-0 opacity-90">{option.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-b-2xl shadow-lg border-t-0 border-gray-700 flex-grow">
                <ul className="space-y-3">
                  {option.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-400 mr-2 mt-1">•</span>
                      <span className="text-gray-200">{detail}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-6 w-full py-3 px-4 rounded-lg bg-gradient-to-r ${option.color} text-white font-medium shadow-md`}
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Join Us Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-20 border border-gray-700"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Why Join Our Community?
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyJoinUs.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-blue-400 transition-colors"
              >
                <div className="mb-6 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-white mb-4">{item.title}</h3>
                <ul className="space-y-3">
                  {item.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-400 mr-2 mt-1">✓</span>
                      <span className="text-gray-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Project Participation Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-20 border border-gray-700"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Join Our Flagship Projects
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectOptions.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-700 rounded-xl overflow-hidden border border-gray-600 hover:border-blue-400 transition-colors"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{project.name}</h3>
                    <span className="bg-blue-900 text-blue-100 text-xs px-3 py-1 rounded-full font-medium">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Skills Needed:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, i) => (
                        <span key={i} className="bg-gray-600 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.a
                    href={project.link}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition font-medium"
                  >
                    Express Interest
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image Upload Form */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-20 border border-gray-700"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Share Your AI Project
          </h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
            Upload details about your AI initiative to be featured in India&apos;s national AI registry
          </p>
          
          <form className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Your project name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Project Description</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Describe your AI project"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Project Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg hover:border-blue-400 transition-colors bg-gray-700">
                <div className="space-y-1 text-center">
                  <div className="flex justify-center text-gray-400">
                    <FaFileUpload className="text-4xl" />
                  </div>
                  <div className="flex text-sm text-gray-300 justify-center">
                    <label className="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none">
                      <span>Upload an image</span>
                      <input type="file" className="sr-only" accept="image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Website</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://yourproject.ai"
                />
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
            >
              Submit Project
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.a
            href="mailto:contact@indiai.org"
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-4 h-full border border-gray-700"
          >
            <div className="bg-blue-900 p-3 rounded-full text-blue-300 flex-shrink-0">
              <FiMail className="text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Email Us</h3>
              <p className="text-gray-300">contact@indiai.org</p>
            </div>
          </motion.a>

          <motion.a
            href="tel:+911234567890"
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-4 h-full border border-gray-700"
          >
            <div className="bg-green-900 p-3 rounded-full text-green-300 flex-shrink-0">
              <FiPhone className="text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Call Us</h3>
              <p className="text-gray-300">+91 12345 67890</p>
            </div>
          </motion.a>

          <motion.a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-4 h-full border border-gray-700"
          >
            <div className="bg-red-900 p-3 rounded-full text-red-300 flex-shrink-0">
              <FiMapPin className="text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Visit Us</h3>
              <p className="text-gray-300">AI Innovation Hub, Bangalore</p>
            </div>
          </motion.a>
        </div>
      </div>
    </div>
  );
}