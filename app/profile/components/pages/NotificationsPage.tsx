// app/profile/components/pages/NotificationsPage.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { Notification } from '../../types/profile.types';

interface NotificationsPageProps {
  notifications?: Notification[];
}

export default function NotificationsPage({ notifications }: NotificationsPageProps) {
  const [notifList, setNotifList] = useState(notifications || [
    { id: 1, title: 'New message from Sarah', time: '10 min ago', read: false },
    { id: 2, title: 'Your project was viewed 50 times', time: '1 hour ago', read: false },
    { id: 3, title: 'Weekly report available', time: '3 hours ago', read: true },
    { id: 4, title: 'System maintenance scheduled', time: '1 day ago', read: true },
  ]);

  const markAsRead = (id: number) => {
    setNotifList(notifList.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifList(notifList.map(notif => ({ ...notif, read: true })));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm">Stay updated with your latest alerts.</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-cyan-400 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors font-mono"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {notifList.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border transition-all duration-300 cursor-pointer hover:border-cyan-500/50 ${
              notification.read ? 'border-gray-700/50' : 'border-cyan-500/30'
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-2 flex-shrink-0 ${!notification.read ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'}`}></div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-mono font-medium text-sm sm:text-base ${!notification.read ? 'text-white' : 'text-gray-400'}`}>
                    {notification.title}
                  </h3>
                  <p className="text-gray-500 font-mono text-xs sm:text-sm mt-1">{notification.time}</p>
                </div>
              </div>
              <Bell className="w-4 h-4 text-cyan-400/50 flex-shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}