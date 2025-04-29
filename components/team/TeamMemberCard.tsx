'use client';

import { TeamMember } from '@/types/team';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaLinkedin, FaTwitter, FaGithub, FaDribbble, FaKaggle } from 'react-icons/fa';

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="flex flex-col items-center text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
    >
      {/* Floating background effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1 }}
      />
      
      <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-100 group-hover:border-indigo-300 transition-all duration-300 mb-4 z-10">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <motion.h3 
        className="text-xl font-bold text-gray-800 z-10"
        whileHover={{ color: '#4f46e5' }}
      >
        {member.name}
      </motion.h3>
      
      <motion.p 
        className="text-indigo-600 mb-4 z-10"
        whileHover={{ scale: 1.05 }}
      >
        {member.role}
      </motion.p>
      
      <div className="flex gap-3 z-10">
        {member.social.linkedin && (
          <motion.a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin className="w-5 h-5" />
          </motion.a>
        )}
        
        {member.social.twitter && (
          <motion.a
            href={member.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTwitter className="w-5 h-5" />
          </motion.a>
        )}
        
        {member.social.github && (
          <motion.a
            href={member.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="w-5 h-5" />
          </motion.a>
        )}
        
        {member.social.dribbble && (
          <motion.a
            href={member.social.dribbble}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaDribbble className="w-5 h-5" />
          </motion.a>
        )}
        
        {member.social.kaggle && (
          <motion.a
            href={member.social.kaggle}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaKaggle className="w-5 h-5" />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}