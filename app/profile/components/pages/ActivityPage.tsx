// app/profile/components/pages/ActivityPage.tsx
'use client';

import { motion } from 'framer-motion';
import { Briefcase, Code, Award, Activity, Clock } from 'lucide-react';
import { Activity as ActivityType } from '../../types/profile.types';

interface ActivityPageProps {
  activities?: ActivityType[];
}

export default function ActivityPage({ activities }: ActivityPageProps) {
  const defaultActivities = [
    { id: 1, action: 'Completed project "EcoTrack"', date: '2 days ago', type: 'project' as const },
    { id: 2, action: 'Earned "Bug Hunter" badge', date: '5 days ago', type: 'badge' as const },
    { id: 3, action: 'Contributed to open source', date: '1 week ago', type: 'contribution' as const },
    { id: 4, action: 'Published article on Next.js', date: '2 weeks ago', type: 'article' as const },
  ];
  
  const activityList = activities || defaultActivities;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Activity Timeline
        </h1>
        <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm">Track your recent activities and achievements.</p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {activityList.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  {activity.type === 'project' && <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                  {activity.type === 'badge' && <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                  {activity.type === 'contribution' && <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                  {activity.type === 'article' && <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                </div>
                <div>
                  <h3 className="text-white font-mono font-medium text-sm sm:text-base">{activity.action}</h3>
                  <p className="text-gray-400 font-mono text-xs sm:text-sm mt-1">{activity.date}</p>
                </div>
              </div>
              <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}