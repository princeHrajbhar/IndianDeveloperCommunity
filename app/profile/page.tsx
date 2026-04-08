'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Shield, Cpu, LogOut, Calendar, Fingerprint } from 'lucide-react';
import CyberBackground from '@/app/(auth)/components/CyberBackground';
import ToastProvider from '@/app/(auth)/components/ToastProvider';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

useEffect(() => {
  const checkAuth = async () => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: 'include',
      });

      // 🔥 If access token expired
      if (res.status === 401) {
        console.log("Access token expired → refreshing...");

        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!refreshRes.ok) {
          router.push('/login'); // refresh also failed
          return;
        }

        // 🔁 Retry original request
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

    setTimeout(() => {
      router.push('/login');
    }, 1000);
  };

  if (!user) {
    return (
      <>
        <ToastProvider />
        <CyberBackground>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-cyan-400">Loading...</div>
          </div>
        </CyberBackground>
      </>
    );
  }

  return (
    <>
      <ToastProvider />
      <CyberBackground>
        <div className="flex justify-center items-center min-h-screen">
          <motion.div className="bg-black p-8 rounded-xl text-white">
            <Fingerprint className="w-12 h-12 mx-auto" />
            <h2 className="text-center text-2xl mt-4">Profile</h2>

            <p>Email: {user.userId}</p>

            <button onClick={handleLogout} className="mt-4 bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </motion.div>
        </div>
      </CyberBackground>
    </>
  );
}