// app/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Activity, Shield, Bell, Settings, Menu, X } from 'lucide-react';
import CyberBackground from '@/app/(auth)/components/CyberBackground';
import ToastProvider from '@/app/(auth)/components/ToastProvider';
import Sidebar, { MenuItem } from './components/Sidebar';
import OverviewPage from './components/pages/OverviewPage';
import ActivityPage from './components/pages/ActivityPage';
import SecurityPage from './components/pages/SecurityPage';
import NotificationsPage from './components/pages/NotificationsPage';
import SettingsPage from './components/pages/SettingsPage';
import { UserData } from './types/profile.types';
import { toast } from 'react-hot-toast';
import { TrendingUp } from 'lucide-react';
import AnalyticsPage from './components/pages/AnalyticsPage';


// Menu items configuration - EASILY SCALABLE: Just add new items here!
const menuItems: MenuItem[] = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'activity', label: 'Activity', icon: Activity },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  // 🔥 TO ADD A NEW PAGE, JUST UNCOMMENT AND ADD YOUR COMPONENT:
  // { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  // { id: 'messages', label: 'Messages', icon: MessageCircle },
  // { id: 'team', label: 'Team', icon: Users },
  // { id: 'billing', label: 'Billing', icon: CreditCard },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [activeMenu, setActiveMenu] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: 'include',
        });

        if (res.status === 401) {
          const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
          });

          if (!refreshRes.ok) {
            router.push('/login');
            return;
          }

          res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            credentials: 'include',
          });
        }

        if (!res.ok) {
          router.push('/login');
          return;
        }

        const data = await res.json();
        setUser(data.data);
      } catch (err) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    toast.success('Logged out successfully');
    setTimeout(() => router.push('/login'), 1000);
  };

  // 🔥 EASILY SCALABLE: Just add a new case for your page component!
  const renderContent = () => {
    switch (activeMenu) {
      case 'overview':
        return <OverviewPage userData={user || { userId: '', email: '' }} />;
      case 'activity':
        return <ActivityPage />;
      case 'security':
        return <SecurityPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage />;
        // In renderContent function
case 'analytics':
  return <AnalyticsPage userData={user} />;
      // 🔥 TO ADD A NEW PAGE, JUST ADD A NEW CASE:
      // case 'analytics':
      //   return <AnalyticsPage userData={user} />;
      // case 'messages':
      //   return <MessagesPage />;
      default:
        return <OverviewPage userData={user || { userId: '', email: '' }} />;
    }
  };

  if (loading) {
    return (
      <>
        <ToastProvider />
        <CyberBackground>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-cyan-400 text-base sm:text-lg font-mono animate-pulse tracking-wider">
              LOADING PROFILE...
            </div>
          </div>
        </CyberBackground>
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <ToastProvider />
      <CyberBackground>
        <div className="flex flex-col lg:flex-row min-h-screen">
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden fixed top-4 left-4 z-50">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-black/50 backdrop-blur-xl border border-cyan-500/30 text-cyan-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Sidebar - Desktop */}
          <div className="hidden lg:block">
            <Sidebar
              menuItems={menuItems}
              activeMenu={activeMenu}
              onMenuChange={setActiveMenu}
              userName={user.name || user.userId}
              userEmail={user.email}
              onLogout={handleLogout}
            />
          </div>

          {/* Sidebar - Mobile Drawer */}
          {mobileMenuOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <div className="fixed left-0 top-0 bottom-0 w-72 z-50 lg:hidden">
                <Sidebar
                  menuItems={menuItems}
                  activeMenu={activeMenu}
                  onMenuChange={(menuId) => {
                    setActiveMenu(menuId);
                    setMobileMenuOpen(false);
                  }}
                  userName={user.name || user.userId}
                  userEmail={user.email}
                  onLogout={handleLogout}
                />
              </div>
            </>
          )}
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-20 pb-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </CyberBackground>
    </>
  );
}