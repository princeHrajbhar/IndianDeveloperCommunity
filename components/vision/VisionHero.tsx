// components/VisionHero.tsx  
"use client"
import { motion } from "framer-motion";  
import Image from "next/image";  

export const VisionHero = () => {  
  return (  
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900">  
      {/* Animated Background Elements */}  
      <motion.div  
        initial={{ opacity: 0 }}  
        animate={{ opacity: 0.2 }}  
        transition={{ duration: 2 }}  
        className="absolute inset-0 overflow-hidden"  
      >  
        {[...Array(20)].map((_, i) => (  
          <motion.div  
            key={i}  
            initial={{ x: Math.random() * 1000, y: Math.random() * 1000 }}  
            animate={{  
              x: Math.random() * 1000,  
              y: Math.random() * 1000,  
              rotate: 360,  
            }}  
            transition={{  
              duration: Math.random() * 20 + 10,  
              repeat: Infinity,  
              ease: "linear",  
            }}  
            className="absolute text-purple-400 opacity-70"  
            style={{ fontSize: `${Math.random() * 20 + 10}px` }}  
          >  
            {['🤖', '🧠', '🔬', '💡', '🚀', '🌐', '📊', '🔍'][i % 8]}  
          </motion.div>  
        ))}  
      </motion.div>  

      {/* Main Content */}  
      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">  
        <motion.h1  
          initial={{ y: -50, opacity: 0 }}  
          animate={{ y: 0, opacity: 1 }}  
          transition={{ duration: 0.8 }}  
          className="text-5xl md:text-7xl font-bold text-white mb-6"  
        >  
          Making India the <span className="text-purple-400">AI Superpower</span>  
        </motion.h1>  

        <motion.p  
          initial={{ y: 50, opacity: 0 }}  
          animate={{ y: 0, opacity: 1 }}  
          transition={{ duration: 0.8, delay: 0.2 }}  
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12"  
        >  
          Our vision is to establish India as the global leader in Artificial Intelligence through innovation, education, and collaboration.  
        </motion.p>  

        <motion.div  
          initial={{ scale: 0.8, opacity: 0 }}  
          animate={{ scale: 1, opacity: 1 }}  
          transition={{ duration: 0.5, delay: 0.4 }}  
          className="flex flex-wrap gap-4 justify-center"  
        >  
          <motion.button  
            whileHover={{ scale: 1.05 }}  
            whileTap={{ scale: 0.95 }}  
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"  
          >  
            Join Our Initiative  
          </motion.button>  
          <motion.button  
            whileHover={{ scale: 1.05 }}  
            whileTap={{ scale: 0.95 }}  
            className="px-8 py-3 bg-transparent border-2 border-purple-400 hover:bg-purple-400/20 text-white rounded-lg font-semibold transition"  
          >  
            Learn More  
          </motion.button>  
        </motion.div>  

        {/* Animated India Map with AI Nodes */}  
        <motion.div  
          initial={{ opacity: 0, y: 50 }}  
          animate={{ opacity: 1, y: 0 }}  
          transition={{ delay: 0.6 }}  
          className="mt-16 relative w-full max-w-4xl h-64 md:h-96"  
        >  
          <Image  
            src="/aiimage3.png"  
            alt="India AI Hub"  
            fill  
            className="object-contain"  
          />  
          <AICityNodes />  
        </motion.div>  
      </div>  

      {/* Scroll Indicator */}  
      <motion.div  
        animate={{ y: [0, 10, 0] }}  
        transition={{ repeat: Infinity, duration: 2 }}  
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-2xl"  
      >  
        ↓  
      </motion.div>  
    </section>  
  );  
};  

const AICityNodes = () => {  
  const cities = [  
    { name: "Bangalore", x: "30%", y: "60%", size: "lg" },  
    { name: "Hyderabad", x: "40%", y: "50%", size: "md" },  
    { name: "Delhi", x: "60%", y: "30%", size: "lg" },  
    { name: "Mumbai", x: "45%", y: "45%", size: "md" },  
    { name: "Chennai", x: "55%", y: "70%", size: "sm" },  
  ];  

  return (  
    <>  
      {cities.map((city, i) => (  
        <motion.div  
          key={i}  
          initial={{ scale: 0 }}  
          animate={{ scale: 1 }}  
          transition={{ delay: 0.8 + i * 0.2 }}  
          whileHover={{ scale: 1.2 }}  
          className={`absolute rounded-full bg-purple-500 flex items-center justify-center cursor-pointer ${  
            city.size === "lg" ? "w-8 h-8" :  
            city.size === "md" ? "w-6 h-6" : "w-4 h-4"  
          }`}  
          style={{ left: city.x, top: city.y }}  
        >  
          <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-70" />  
          <motion.div  
            initial={{ opacity: 0, y: 10 }}  
            whileHover={{ opacity: 1, y: 0 }}  
            className="absolute -top-8 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap"  
          >  
            {city.name} AI Hub  
          </motion.div>  
        </motion.div>  
      ))}  
    </>  
  );  
};  