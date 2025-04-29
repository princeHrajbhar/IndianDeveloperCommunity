import { motion } from 'framer-motion';

const features = [
  {
    title: "AI-Powered Predictions",
    description: "Leverage machine learning to predict future trends and behavior.",
    icon: "🤖"
  },
  {
    title: "Real-Time Data Processing",
    description: "Analyze data streams instantly with high performance and low latency.",
    icon: "📊"
  },
  {
    title: "Quantum Computing Integration",
    description: "Harness the power of quantum algorithms for solving complex problems.",
    icon: "⚛️"
  },
  {
    title: "Automated Insights",
    description: "Get actionable insights and recommendations with AI-driven analytics.",
    icon: "💡"
  }
];

export const TechFeatures = () => {
  return (
    <section className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          Quantum AI <span className="text-blue-400">Features</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10 }}
              className="bg-purple-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="text-4xl mb-4 text-blue-400">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
