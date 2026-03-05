// app/components/OurProcess.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  HiOutlineDocumentText, 
  HiOutlineUsers, 
  HiOutlineDownload,
  HiOutlineChatAlt,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineArrowRight
} from 'react-icons/hi';

const processSteps = [
  {
    step: "STEP 1",
    title: "Discovery & Requirement",
    description: "Share your vision through our simple project form or schedule a free consultation",
    icon: HiOutlineChatAlt,
    color: "cyan",
    duration: "30-60 min"
  },
  {
    step: "STEP 2",
    title: "Detailed Quotation",
    description: "Receive a transparent, itemized quotation breaking down every feature, module, and deliverable with clear pricing.",
    icon: HiOutlineDocumentText,
    color: "cyan",
    features: [
      "Itemized Breakdown",
      "Transparent Pricing",
      "Approve / Request Changes",
      "PDF Download"
    ]
  },
  {
    step: "STEP 3",
    title: "Team Assignment",
    description: "A dedicated team is assigned to your project — designer, developer, project manager.",
    icon: HiOutlineUsers,
    color: "purple",
    team: ["Designer", "Developer", "Project Manager"],
    contacts: ["WhatsApp", "Email", "Meetings"]
  }
];

export default function OurProcess() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] max-md:bg-[size:30px_30px] max-sm:bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/20 rounded-full"
            initial={{ 
              x: Math.random() * 2000, 
              y: Math.random() * 1000 
            }}
            animate={{
              y: [null, -30, 30, -30],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 max-sm:px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-md:mb-16 max-sm:mb-12"
        >
          {/* Process badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm mb-6 max-sm:mb-4 max-sm:px-3 max-sm:py-1.5"
          >
            <HiOutlineClock className="w-4 h-4 text-cyan-400 max-sm:w-3 max-sm:h-3" />
            <span className="text-cyan-400 text-sm font-mono tracking-wider max-sm:text-xs">3 SIMPLE STEPS</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black mb-4 font-mono max-md:text-4xl max-sm:text-3xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              OUR PROCESS
            </span>
          </h2>
          
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl font-black text-white font-mono max-md:text-2xl max-sm:text-xl">
              100% Transparent.
            </p>
            <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono max-md:text-2xl max-sm:text-xl">
              100% Trustworthy.
            </p>
          </div>

          <p className="max-w-2xl mx-auto mt-6 text-base text-gray-400 font-mono leading-relaxed max-md:text-sm max-sm:text-xs max-sm:px-2">
            We believe every client deserves full visibility into their project. From day one, you get real-time access to your project&apos;s progress progress, your dedicated team, and every document — all in one platform.
          </p>
        </motion.div>

        {/* Process Steps with Timeline */}
        <div className="relative">
          {/* Animated timeline line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 max-md:left-6 max-sm:left-4"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Glowing dots on line */}
            <motion.div 
              className="absolute -left-1 top-0 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#00ffff] max-sm:w-2 max-sm:h-2 max-sm:-left-[3px]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.div 
              className="absolute -left-1 top-1/2 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_15px_#a855f7] max-sm:w-2 max-sm:h-2 max-sm:-left-[3px]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            />
            <motion.div 
              className="absolute -left-1 bottom-0 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#00ffff] max-sm:w-2 max-sm:h-2 max-sm:-left-[3px]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 2 }}
            />
          </motion.div>

          {/* Process Steps */}
          <div className="space-y-12 max-md:space-y-10 max-sm:space-y-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              const shadowColor = step.color === 'purple' ? 'rgba(168,85,247,0.5)' : 'rgba(0,255,255,0.4)';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-start gap-8 md:gap-12 max-md:gap-6 max-sm:gap-4`}
                >
                  {/* Step Number Circle */}
                  <motion.div 
                    className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-12 h-12 bg-black border-2 rounded-full flex items-center justify-center z-20 max-md:w-10 max-md:h-10 max-md:left-3 max-sm:w-8 max-sm:h-8 max-sm:left-2"
                    style={{ 
                      borderColor: step.color === 'purple' ? '#a855f7' : '#00ffff',
                      boxShadow: `0 0 20px ${step.color === 'purple' ? '#a855f7' : '#00ffff'}`
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-xs font-mono max-sm:text-[10px]" style={{ color: step.color === 'purple' ? '#a855f7' : '#00ffff' }}>
                      {index + 1}
                    </span>
                  </motion.div>

                  {/* Content Card */}
                  <div className={`flex-1 md:w-1/2 ${isEven ? 'md:text-right' : ''} max-md:ml-16 max-sm:ml-12`}>
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: `0 30px 60px ${shadowColor}`,
                        borderColor: step.color === 'purple' ? '#a855f7' : '#00ffff',
                      }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 cursor-pointer transition-all duration-300 max-md:p-6 max-sm:p-4"
                    >
                      {/* Icon and Step */}
                      <div className={`flex items-center gap-4 mb-6 ${isEven ? 'md:justify-end' : ''} max-md:mb-4 max-sm:gap-3`}>
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${
                          step.color === 'purple' 
                            ? 'from-purple-500/20 to-pink-500/20' 
                            : 'from-cyan-500/20 to-blue-500/20'
                        } max-md:p-2.5 max-sm:p-2`}>
                          <Icon className={`w-6 h-6 ${
                            step.color === 'purple' ? 'text-purple-400' : 'text-cyan-400'
                          } max-md:w-5 max-md:h-5 max-sm:w-4 max-sm:h-4`} />
                        </div>
                        <div>
                          <div className={`text-xs font-mono ${
                            step.color === 'purple' ? 'text-purple-400' : 'text-cyan-400'
                          } max-sm:text-[10px]`}>
                            {step.step}
                          </div>
                          {step.duration && (
                            <div className="text-xs text-gray-500 font-mono mt-1 max-sm:text-[10px]">
                              ~{step.duration}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-xl font-bold mb-4 font-mono transition-colors ${
                        step.color === 'purple' ? 'group-hover:text-purple-400' : 'group-hover:text-cyan-400'
                      } max-md:text-lg max-sm:text-base max-sm:mb-3`}>
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 font-mono text-sm leading-relaxed mb-6 max-md:text-xs max-sm:text-[11px] max-sm:mb-4">
                        {step.description}
                      </p>

                      {/* Features for Step 2 */}
                      {step.features && (
                        <div className="space-y-4 max-sm:space-y-3">
                          <div className="grid grid-cols-2 gap-3 max-sm:gap-2">
                            {step.features.map((feature, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-2 max-sm:gap-1"
                              >
                                <HiOutlineCheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 max-sm:w-3 max-sm:h-3" />
                                <span className="text-gray-300 font-mono text-xs max-sm:text-[10px]">{feature}</span>
                                {feature.includes('PDF') && (
                                  <HiOutlineDownload className="w-3 h-3 text-purple-400 max-sm:w-2 max-sm:h-2" />
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Team for Step 3 */}
                      {step.team && (
                        <div className="space-y-4 max-sm:space-y-3">
                          <div className="flex flex-wrap gap-2 max-sm:gap-1.5">
                            {step.team.map((role, i) => (
                              <motion.span
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs font-mono text-purple-400 max-sm:px-2 max-sm:py-1 max-sm:text-[10px]"
                              >
                                {role}
                              </motion.span>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs max-sm:gap-2 max-sm:text-[10px]">
                            {step.contacts?.map((contact, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 max-sm:w-1 max-sm:h-1" />
                                <span className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors font-mono">
                                  {contact}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Next step indicator */}
                      {index < processSteps.length - 1 && (
                        <motion.div 
                          className={`hidden md:flex items-center gap-2 mt-6 text-xs font-mono ${
                            isEven ? 'justify-start' : 'justify-end'
                          }`}
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <span className="text-gray-500">Next Step</span>
                          <HiOutlineArrowRight className="w-3 h-3 text-cyan-400" />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center max-md:mt-16 max-sm:mt-12"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(168,85,247,0.4)',
            }}
            className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-mono text-sm font-bold tracking-wider max-md:px-8 max-md:py-3 max-md:text-xs max-sm:px-6 max-sm:py-2.5"
          >
            START YOUR PROJECT
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}