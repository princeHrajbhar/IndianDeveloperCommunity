// // app/components/ProfileContent.tsx (Updated with Monospace & Responsive)
// 'use client';

// import { 
//   User, 
//   Mail, 
//   MapPin, 
//   Calendar, 
//   Briefcase, 
//   Code, 
//   Award, 
//   Clock,
//   Shield,
//   Lock,
//   Activity,
//   Bell,
//   Settings,
//   Github,
//   Linkedin,
//   Twitter,
//   Eye,
//   EyeOff,
//   Smartphone,
//   Globe,
//   Moon,
//   Sun
// } from 'lucide-react';
// import { useState } from 'react';
// import { motion } from 'framer-motion';

// // Types
// interface UserData {
//   userId: string;
//   email: string;
//   name?: string;
//   username?: string;
//   bio?: string;
//   location?: string;
//   joined?: string;
//   role?: string;
//   company?: string;
//   skills?: string[];
//   stats?: {
//     projects: number;
//     contributions: number;
//     badges: number;
//   };
//   recentActivity?: Activity[];
//   notifications?: Notification[];
// }

// interface Activity {
//   id: number;
//   action: string;
//   date: string;
//   type: 'project' | 'badge' | 'contribution' | 'article';
// }

// interface Notification {
//   id: number;
//   title: string;
//   time: string;
//   read: boolean;
// }

// // Overview Content
// export function OverviewContent({ userData }: { userData: UserData }) {
//   const stats = userData.stats || { projects: 24, contributions: 156, badges: 12 };
//   const skills = userData.skills || ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS'];
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="space-y-4 sm:space-y-6"
//     >
//       {/* Welcome Section */}
//       <div className="mb-6 sm:mb-8">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//           Welcome back, {userData.name || userData.userId}!
//         </h1>
//         <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm">Here's what's happening with your profile today.</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//         <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl p-4 sm:p-6 border border-cyan-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
//           <div className="flex items-center justify-between mb-3 sm:mb-4">
//             <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
//             <span className="text-xl sm:text-2xl font-mono font-bold text-white">{stats.projects}</span>
//           </div>
//           <h3 className="text-gray-300 font-mono text-sm sm:text-base">Total Projects</h3>
//         </div>

//         <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 sm:p-6 border border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
//           <div className="flex items-center justify-between mb-3 sm:mb-4">
//             <Code className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
//             <span className="text-xl sm:text-2xl font-mono font-bold text-white">{stats.contributions}</span>
//           </div>
//           <h3 className="text-gray-300 font-mono text-sm sm:text-base">Contributions</h3>
//         </div>

//         <div className="bg-gradient-to-br from-pink-500/10 to-cyan-500/10 rounded-xl p-4 sm:p-6 border border-pink-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
//           <div className="flex items-center justify-between mb-3 sm:mb-4">
//             <Award className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
//             <span className="text-xl sm:text-2xl font-mono font-bold text-white">{stats.badges}</span>
//           </div>
//           <h3 className="text-gray-300 font-mono text-sm sm:text-base">Badges Earned</h3>
//         </div>
//       </div>

//       {/* Profile Info */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//         {/* Personal Information */}
//         <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20">
//           <h2 className="text-lg sm:text-xl font-mono font-semibold text-white mb-4 flex items-center gap-2">
//             <User className="w-5 h-5 text-cyan-400" />
//             Personal Information
//           </h2>
//           <div className="space-y-3">
//             <div className="flex items-center gap-3 text-gray-300">
//               <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
//               <span className="font-mono text-xs sm:text-sm break-all">{userData.email}</span>
//             </div>
//             {userData.location && (
//               <div className="flex items-center gap-3 text-gray-300">
//                 <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
//                 <span className="font-mono text-xs sm:text-sm">{userData.location}</span>
//               </div>
//             )}
//             {userData.joined && (
//               <div className="flex items-center gap-3 text-gray-300">
//                 <Calendar className="w-4 h-4 text-cyan-400 flex-shrink-0" />
//                 <span className="font-mono text-xs sm:text-sm">Joined {userData.joined}</span>
//               </div>
//             )}
//             {userData.role && (
//               <div className="flex items-center gap-3 text-gray-300">
//                 <Briefcase className="w-4 h-4 text-cyan-400 flex-shrink-0" />
//                 <span className="font-mono text-xs sm:text-sm">{userData.role}{userData.company && ` at ${userData.company}`}</span>
//               </div>
//             )}
//           </div>
//           {userData.bio && (
//             <p className="mt-4 text-gray-400 font-mono text-xs sm:text-sm">{userData.bio}</p>
//           )}
          
//           {/* Social Links */}
//           <div className="flex gap-3 mt-6">
//             <button className="p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors">
//               <Github className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
//             </button>
//             <button className="p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors">
//               <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
//             </button>
//             <button className="p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors">
//               <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
//             </button>
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20">
//           <h2 className="text-lg sm:text-xl font-mono font-semibold text-white mb-4 flex items-center gap-2">
//             <Code className="w-5 h-5 text-cyan-400" />
//             Skills & Technologies
//           </h2>
//           <div className="flex flex-wrap gap-2">
//             {skills.map((skill, index) => (
//               <motion.span
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: index * 0.05 }}
//                 className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-cyan-400 text-xs sm:text-sm font-mono border border-cyan-500/30 hover:scale-105 transition-transform cursor-pointer"
//               >
//                 {skill}
//               </motion.span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // Activity Content
// export function ActivityContent({ activities }: { activities?: Activity[] }) {
//   const defaultActivities = [
//     { id: 1, action: 'Completed project "EcoTrack"', date: '2 days ago', type: 'project' as const },
//     { id: 2, action: 'Earned "Bug Hunter" badge', date: '5 days ago', type: 'badge' as const },
//     { id: 3, action: 'Contributed to open source', date: '1 week ago', type: 'contribution' as const },
//     { id: 4, action: 'Published article on Next.js', date: '2 weeks ago', type: 'article' as const },
//   ];
  
//   const activityList = activities || defaultActivities;
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="space-y-4 sm:space-y-6"
//     >
//       <div className="mb-6 sm:mb-8">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//           Activity Timeline
//         </h1>
//         <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm">Track your recent activities and achievements.</p>
//       </div>

//       <div className="space-y-3 sm:space-y-4">
//         {activityList.map((activity, index) => (
//           <motion.div
//             key={activity.id}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
//           >
//             <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
//               <div className="flex items-start gap-3 sm:gap-4">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
//                   {activity.type === 'project' && <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
//                   {activity.type === 'badge' && <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
//                   {activity.type === 'contribution' && <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
//                   {activity.type === 'article' && <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
//                 </div>
//                 <div>
//                   <h3 className="text-white font-mono font-medium text-sm sm:text-base">{activity.action}</h3>
//                   <p className="text-gray-400 font-mono text-xs sm:text-sm mt-1">{activity.date}</p>
//                 </div>
//               </div>
//               <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// // Security Content
// export function SecurityContent() {
//   const [twoFA, setTwoFA] = useState(false);
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="space-y-4 sm:space-y-6"
//     >
//       <div className="mb-6 sm:mb-8">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//           Security Settings
//         </h1>
//         <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm">Manage your account security and privacy preferences.</p>
//       </div>

//       <div className="space-y-4 sm:space-y-6">
//         {/* Password Change */}
//         <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
//             <div className="flex items-center gap-3">
//               <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
//               <h2 className="text-lg sm:text-xl font-mono font-semibold text-white">Change Password</h2>
//             </div>
//           </div>
//           <p className="text-gray-400 font-mono text-xs sm:text-sm mb-4">Last changed 30 days ago</p>
//           <button className="px-4 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-mono text-sm font-medium hover:opacity-90 transition-opacity">
//             Update Password
//           </button>
//         </div>

//         {/* Two-Factor Authentication */}
//         <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
//             <div className="flex items-center gap-3">
//               <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
//               <h2 className="text-lg sm:text-xl font-mono font-semibold text-white">Two-Factor Authentication</h2>
//             </div>
//             <button
//               onClick={() => setTwoFA(!twoFA)}
//               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                 twoFA ? 'bg-cyan-500' : 'bg-gray-700'
//               }`}
//             >
//               <span
//                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                   twoFA ? 'translate-x-6' : 'translate-x-1'
//                 }`}
//               />
//             </button>
//           </div>
//           <p className="text-gray-400 font-mono text-xs sm:text-sm">Add an extra layer of security to your account.</p>
//         </div>

//         {/* Active Sessions */}
//         <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20">
//           <h2 className="text-lg sm:text-xl font-mono font-semibold text-white mb-4 flex items-center gap-3">
//             <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
//             Active Sessions
//           </h2>
//           <div className="space-y-3">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-cyan-500/5 rounded-lg gap-3">
//               <div className="flex items-center gap-3">
//                 <Smartphone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
//                 <div>
//                   <p className="text-white font-mono text-sm">Chrome on Windows</p>
//                   <p className="text-gray-400 font-mono text-xs">San Francisco, CA • Current session</p>
//                 </div>
//               </div>
//               <span className="text-green-400 font-mono text-xs sm:text-sm">Active now</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // Notifications Content
// export function NotificationsContent({ notifications }: { notifications?: Notification[] }) {
//   const [notifList, setNotifList] = useState(notifications || [
//     { id: 1, title: 'New message from Sarah', time: '10 min ago', read: false },
//     { id: 2, title: 'Your project was viewed 50 times', time: '1 hour ago', read: false },
//     { id: 3, title: 'Weekly report available', time: '3 hours ago', read: true },
//     { id: 4, title: 'System maintenance scheduled', time: '1 day ago', read: true },
//   ]);

//   const markAsRead = (id: number) => {
//     setNotifList(notifList.map(notif => 
//       notif.id === id ? { ...notif, read: true } : notif
//     ));
//   };

//   const markAllAsRead = () => {
//     setNotifList(notifList.map(notif => ({ ...notif, read: true })));
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="space-y-4 sm:space-y-6"
//     >
//       <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//             Notifications
//           </h1>
//           <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm">Stay updated with your latest alerts.</p>
//         </div>
//         <button 
//           onClick={markAllAsRead}
//           className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-cyan-400 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors font-mono"
//         >
//           Mark all as read
//         </button>
//       </div>

//       <div className="space-y-2 sm:space-y-3">
//         {notifList.map((notification, index) => (
//           <motion.div
//             key={notification.id}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className={`bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border transition-all duration-300 cursor-pointer hover:border-cyan-500/50 ${
//               notification.read ? 'border-gray-700/50' : 'border-cyan-500/30'
//             }`}
//             onClick={() => markAsRead(notification.id)}
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
//                 <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-2 flex-shrink-0 ${!notification.read ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'}`}></div>
//                 <div className="flex-1 min-w-0">
//                   <h3 className={`font-mono font-medium text-sm sm:text-base ${!notification.read ? 'text-white' : 'text-gray-400'}`}>
//                     {notification.title}
//                   </h3>
//                   <p className="text-gray-500 font-mono text-xs sm:text-sm mt-1">{notification.time}</p>
//                 </div>
//               </div>
//               <Bell className="w-4 h-4 text-cyan-400/50 flex-shrink-0" />
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// // Settings Content
// export function SettingsContent() {
//   const [darkMode, setDarkMode] = useState(true);
//   const [emailNotif, setEmailNotif] = useState(true);
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="space-y-4 sm:space-y-6"
//     >
//       <div className="mb-6 sm:mb-8">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//           Account Settings
//         </h1>
//         <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm">Customize your profile and account preferences.</p>
//       </div>

//       <div className="space-y-4 sm:space-y-6">
//         {/* Profile Settings */}
//         <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20">
//           <h2 className="text-lg sm:text-xl font-mono font-semibold text-white mb-4 flex items-center gap-2">
//             <User className="w-5 h-5 text-cyan-400" />
//             Profile Settings
//           </h2>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-gray-400 font-mono text-xs sm:text-sm mb-2">Display Name</label>
//               <input
//                 type="text"
//                 defaultValue="Alex Morgan"
//                 className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#0a0a1f] border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-cyan-500 focus:outline-none transition-colors"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-400 font-mono text-xs sm:text-sm mb-2">Username</label>
//               <input
//                 type="text"
//                 defaultValue="@alexmorgan"
//                 className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#0a0a1f] border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-cyan-500 focus:outline-none transition-colors"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-400 font-mono text-xs sm:text-sm mb-2">Bio</label>
//               <textarea
//                 defaultValue="Full-stack developer & cybersecurity enthusiast. Building the future of web3."
//                 rows={3}
//                 className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#0a0a1f] border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-cyan-500 focus:outline-none transition-colors"
//               />
//             </div>
//             <button className="px-4 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-mono text-sm font-medium hover:opacity-90 transition-opacity">
//               Save Changes
//             </button>
//           </div>
//         </div>

//         {/* Preferences */}
//         <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-cyan-500/20">
//           <h2 className="text-lg sm:text-xl font-mono font-semibold text-white mb-4 flex items-center gap-2">
//             <Settings className="w-5 h-5 text-cyan-400" />
//             Preferences
//           </h2>
//           <div className="space-y-4">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//               <div className="flex items-center gap-3">
//                 <Globe className="w-5 h-5 text-cyan-400" />
//                 <span className="text-gray-300 font-mono text-sm">Email Notifications</span>
//               </div>
//               <button
//                 onClick={() => setEmailNotif(!emailNotif)}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                   emailNotif ? 'bg-cyan-500' : 'bg-gray-700'
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                     emailNotif ? 'translate-x-6' : 'translate-x-1'
//                   }`}
//                 />
//               </button>
//             </div>
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//               <div className="flex items-center gap-3">
//                 {darkMode ? <Moon className="w-5 h-5 text-cyan-400" /> : <Sun className="w-5 h-5 text-cyan-400" />}
//                 <span className="text-gray-300 font-mono text-sm">Dark Mode</span>
//               </div>
//               <button
//                 onClick={() => setDarkMode(!darkMode)}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                   darkMode ? 'bg-cyan-500' : 'bg-gray-700'
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                     darkMode ? 'translate-x-6' : 'translate-x-1'
//                   }`}
//                 />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
