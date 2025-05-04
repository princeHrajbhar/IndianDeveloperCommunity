'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin,  FiSend } from 'react-icons/fi';
import { SiUpwork, SiFiverr } from 'react-icons/si';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  // Floating bubbles animation
  const Bubble = ({ delay, size, x, y }: { delay: number; size: string; x: string; y: string }) => (
    <motion.div
      className={`absolute rounded-full bg-blue-400/20 dark:bg-purple-400/20 ${size}`}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: [0, 0.5, 0], y: [100, -100] }}
      transition={{ delay, duration: 10 + Math.random() * 5, repeat: Infinity, ease: "linear" }}
      style={{ left: x, top: y }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Animated background bubbles */}
      {[...Array(15)].map((_, i) => (
        <Bubble
          key={`bubble-${i}`}
          delay={i * 0.5}
          size={i % 3 === 0 ? 'w-8 h-8' : i % 2 === 0 ? 'w-12 h-12' : 'w-16 h-16'}
          x={`${Math.random() * 100}%`}
          y={`${Math.random() * 100}%`}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10 mt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
            whileHover={{ scale: 1.02 }}
          >
            Let&apos;s Connect
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Have a project in mind or want to collaborate? Reach out to me through any of these channels.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FiMail className="text-blue-500" /> Send me a message
            </h2>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Name
                </label>
                <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </motion.div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Email
                </label>
                <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </motion.div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Message
                </label>
                <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </motion.div>
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  'Sending...'
                ) : (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg text-center"
                  >
                    Message sent successfully!
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg text-center"
                  >
                    Failed to send message. Please try again.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Direct Contact</h2>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 mb-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <FiMail className="text-blue-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a 
                    href="mailto:your.email@example.com" 
                    className="text-blue-500 hover:underline"
                  >
                    your.email@example.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 mb-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <FiGithub className="text-green-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">GitHub</h3>
                  <a 
                    href="https://github.com/yourusername" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    github.com/yourusername
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 mb-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <FiLinkedin className="text-blue-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">LinkedIn</h3>
                  <a 
                    href="https://linkedin.com/in/yourusername" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    linkedin.com/in/yourusername
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Collaboration Platforms</h2>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 mb-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <SiUpwork className="text-green-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Upwork</h3>
                  <a 
                    href="https://upwork.com/freelancers/~yourprofile" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    upwork.com/freelancers/~yourprofile
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 mb-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <SiFiverr className="text-green-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Fiverr</h3>
                  <a 
                    href="https://fiverr.com/yourusername" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    fiverr.com/yourusername
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}