// app/profile/components/pages/OverviewPage.tsx
'use client';

import { motion } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Briefcase, Code, Award, Github, Linkedin, Twitter } from 'lucide-react';
import { UserData } from '../../types/profile.types';

interface OverviewPageProps {
  userData: UserData;
}

export default function OverviewPage({ userData }: OverviewPageProps) {
  const stats = userData.stats || { projects: 24, contributions: 156, badges: 12 };
  const skills = userData.skills || ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS'];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Welcome Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome back, {userData.name || userData.userId}!
        </h1>
        <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm">Here's what's happening with your profile today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl p-4 sm:p-6 border border-cyan-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
            <span className="text-xl sm:text-2xl font-mono font-bold text-white">{stats.projects}</span>
          </div>
          <h3 className="text-gray-300 font-mono text-sm sm:text-base">Total Projects</h3>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 sm:p-6 border border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Code className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            <span className="text-xl sm:text-2xl font-mono font-bold text-white">{stats.contributions}</span>
          </div>
          <h3 className="text-gray-300 font-mono text-sm sm:text-base">Contributions</h3>
        </div>

        <div className="bg-gradient-to-br from-pink-500/10 to-cyan-500/10 rounded-xl p-4 sm:p-6 border border-pink-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
            <span className="text-xl sm:text-2xl font-mono font-bold text-white">{stats.badges}</span>
          </div>
          <h3 className="text-gray-300 font-mono text-sm sm:text-base">Badges Earned</h3>
        </div>
      </div>

      {/* Profile Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20">
          <h2 className="text-lg sm:text-xl font-mono font-semibold text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            Personal Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span className="font-mono text-xs sm:text-sm break-all">{userData.email}</span>
            </div>
            {userData.location && (
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="font-mono text-xs sm:text-sm">{userData.location}</span>
              </div>
            )}
            {userData.joined && (
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="font-mono text-xs sm:text-sm">Joined {userData.joined}</span>
              </div>
            )}
            {userData.role && (
              <div className="flex items-center gap-3 text-gray-300">
                <Briefcase className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="font-mono text-xs sm:text-sm">{userData.role}{userData.company && ` at ${userData.company}`}</span>
              </div>
            )}
          </div>
          {userData.bio && (
            <p className="mt-4 text-gray-400 font-mono text-xs sm:text-sm">{userData.bio}</p>
          )}
          
          <div className="flex gap-3 mt-6">
            <button className="p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors">
              <Github className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            </button>
            <button className="p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors">
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            </button>
            <button className="p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors">
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            </button>
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20">
          <h2 className="text-lg sm:text-xl font-mono font-semibold text-white mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-cyan-400" />
            Skills & Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-cyan-400 text-xs sm:text-sm font-mono border border-cyan-500/30 hover:scale-105 transition-transform cursor-pointer"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}