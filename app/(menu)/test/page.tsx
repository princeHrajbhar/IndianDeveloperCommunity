"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const TechExplorerVision = () => {
  const [activeTech, setActiveTech] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);

  const technologies = [
    {
      title: "AI Revolution",
      description: "Next-gen neural networks achieving human-level reasoning with 100x efficiency gains.",
      icon: "🤖",
      color: "from-purple-600 to-indigo-600",
      code: `// AI Model Training
const model = new Transformer({
  layers: 128,
  attentionHeads: 32
});

model.train(dataset, {
  epochs: 100,
  learningRate: 0.001
});`
    },
    {
      title: "Blockchain 3.0",
      description: "Quantum-resistant ledgers enabling million TPS with zero energy consumption.",
      icon: "⛓️",
      color: "from-indigo-600 to-blue-600",
      code: `// Smart Contract
contract DecentralizedAI {
  struct Model {
    address owner;
    uint256 price;
  }

  function trainModel(bytes memory data) 
    public payable returns (bytes32) {
    // Distributed training logic
  }
}`
    },
    {
      title: "IoT Singularity",
      description: "Self-organizing device networks with edge AI and 6G connectivity.",
      icon: "🌐",
      color: "from-blue-600 to-cyan-500",
      code: `// Device Communication
function handleSensorData() {
  const analysis = edgeAI.analyze(data);
  if (analysis.anomaly) {
    blockchain.recordEvent(analysis);
    meshNetwork.broadcast(analysis);
  }
}`
    },
    {
      title: "Quantum Computing",
      description: "Fault-tolerant qubits solving optimization problems in polynomial time.",
      icon: "⚛️",
      color: "from-cyan-500 to-teal-500",
      code: `# Quantum Algorithm
def quantum_ml(data):
    qc = QuantumCircuit(128)
    qc.encode(data)
    qc.apply_quantum_kernel()
    result = qc.execute()
    return classical_decode(result)`
    },
    {
      title: "Web3 Infrastructure",
      description: "Decentralized protocols replacing traditional cloud platforms.",
      icon: "🕸️",
      color: "from-teal-500 to-emerald-500",
      code: `// Web3 Service
class DecentralizedStorage {
  async upload(file) {
    const cid = await ipfs.add(file);
    const receipt = await blockchain.mintNFT(cid);
    return { cid, receipt };
  }
}`
    },
  ];

  useEffect(() => {
    const element = ref.current; // Capture the current value in a variable
    if (!element) return;
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );
  
    observer.observe(element);
  
    return () => {
      observer.unobserve(element); // Use the captured value in cleanup
    };
  }, [controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTech((prev) => (prev + 1) % technologies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [technologies.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const codeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-24 px-4 sm:px-6 lg:px-8">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(124,_58,_237,_0.1)_0,_transparent_70%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(124,58,237,0.5)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
      </div>

      <motion.div
        ref={ref}
        className="relative max-w-7xl mx-auto"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-4">
            Tech Explorer
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            The frontier of emerging technologies that will define the next decade of innovation
          </p>
        </motion.div>

        {/* Developer Visualization */}
        <motion.div 
          className="mb-20 flex justify-center"
          variants={itemVariants}
        >
          <div className="relative w-full max-w-4xl bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMNiA2TTYgMEwwIDYiIHN0cm9rZT0iIzFmMWYxZiIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')] opacity-20"></div>
            
            <div className="relative z-10 p-6">
              <div className="flex items-center mb-4">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-gray-400">
                  {technologies[activeTech].title.toLowerCase().replace(/\s+/g, '_')}.js
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTech}
                  className="font-mono text-sm md:text-base text-gray-300 overflow-x-auto"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={codeVariants}
                >
                  <pre className="whitespace-pre-wrap">{technologies[activeTech].code}</pre>
                </motion.div>
              </AnimatePresence>
              
              <div className="mt-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                  <span className="text-lg">{technologies[activeTech].icon}</span>
                </div>
                <div className="text-purple-400 text-sm">
                  Running on decentralized compute network...
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technologies Carousel */}
        <motion.div className="mb-16" variants={itemVariants}>
          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
            <div className="flex space-x-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  className={`flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden p-8 cursor-pointer bg-gradient-to-br ${tech.color} relative group`}
                  onClick={() => setActiveTech(index)}
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="text-4xl mb-4">{tech.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{tech.title}</h3>
                    <p className="text-white/90">{tech.description}</p>
                    <div className="mt-auto pt-4">
                      <div className="w-full bg-white/30 h-1 rounded-full overflow-hidden">
                        <motion.div
                          className="bg-white h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: activeTech === index ? '100%' : '0%' }}
                          transition={{ duration: 5, ease: 'linear' }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div className="text-center" variants={itemVariants}>
          <motion.button
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Building with Emerging Tech
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Add these styles directly */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TechExplorerVision;