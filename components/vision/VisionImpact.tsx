// components/VisionImpact.tsx  
"use client"
import { motion } from "framer-motion";  

const milestones = [  
  {  
    year: "2023",  
    achievement: "Launched India’s first AI skill development program",  
    stat: "100K+ Trained",  
  },  
  {  
    year: "2024",  
    achievement: "Established 5 AI research hubs across India",  
    stat: "50+ Startups Supported",  
  },  
  {  
    year: "2025",  
    achievement: "Partnered with global AI leaders for knowledge exchange",  
    stat: "10+ International Collaborations",  
  },  
];  

export const VisionImpact = () => {  
  return (  
    <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900 text-white">  
      <div className="container mx-auto px-6">  
        <motion.h2  
          initial={{ opacity: 0, y: 20 }}  
          whileInView={{ opacity: 1, y: 0 }}  
          transition={{ duration: 0.5 }}  
          viewport={{ once: true }}  
          className="text-4xl font-bold text-center mb-16"  
        >  
          Our <span className="text-purple-300">Impact</span>  
        </motion.h2>  

        <div className="relative">  
          {/* Timeline Bar */}  
          <div className="absolute left-8 md:left-1/2 h-full w-1 bg-purple-400 transform -translate-x-1/2" />  

          <div className="space-y-12">  
            {milestones.map((milestone, index) => (  
              <motion.div  
                key={index}  
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}  
                whileInView={{ opacity: 1, x: 0 }}  
                transition={{ duration: 0.6, delay: index * 0.2 }}  
                viewport={{ once: true }}  
                className={`relative flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}  
              >  
                <div className="hidden md:block md:w-1/2" />  
                <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">  
                  {index + 1}  
                </div>  
                <div className="flex-1 bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">  
                  <h3 className="text-2xl font-bold text-purple-300">{milestone.year}</h3>  
                  <p className="text-lg my-2">{milestone.achievement}</p>  
                  <p className="text-xl font-semibold text-purple-200">{milestone.stat}</p>  
                </div>  
              </motion.div>  
            ))}  
          </div>  
        </div>  

        <motion.div  
          initial={{ opacity: 0, y: 20 }}  
          whileInView={{ opacity: 1, y: 0 }}  
          transition={{ delay: 0.5 }}  
          viewport={{ once: true }}  
          className="mt-16 text-center"  
        >  
          <button className="px-8 py-3 bg-white text-purple-900 hover:bg-purple-100 rounded-lg font-semibold transition">  
            Contribute to Our Mission →  
          </button>  
        </motion.div>  
      </div>  
    </section>  
  );  
};  