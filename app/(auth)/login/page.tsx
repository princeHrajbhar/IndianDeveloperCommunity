// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Mail, Lock, LogIn, Shield } from 'lucide-react';
import CyberBackground from '@/app/(auth)/components/CyberBackground';
import CyberCard from '@/app/(auth)/components/CyberCard';
import CyberInput from '@/app/(auth)/components/CyberInput';
import CyberButton from '@/app/(auth)/components/CyberButton';
import ToastProvider from '@/app/(auth)/components/ToastProvider';


export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    if (!formData.email) {
      toast.error('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      toast.error('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    const loadingToast = toast.loading('Authenticating...');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ IMPORTANT
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // ❌ NO localStorage anymore

      toast.success('Login successful! Redirecting...', {
        id: loadingToast,
        duration: 2000,
      });

      setTimeout(() => {
        router.push('/profile');
      }, 1500);

    } catch (error: any) {
      toast.error(error.message || 'Invalid email or password', {
        id: loadingToast,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <>
      <ToastProvider />
      <CyberBackground>
        {/* Added padding top and bottom to account for global navbar/footer */}
        <div className="pt-24 pb-24 flex items-center justify-center min-h-screen px-4">
          <CyberCard 
            title="Cyber Access" 
            subtitle="Enter credentials to access secure terminal"
            icon={<Shield className="w-16 h-16 text-cyan-400" />}
          >
            <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-6">
              <CyberInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="cyber@terminal.com"
                icon={<Mail className="w-4 h-4" />}
                disabled={isLoading}
                autoComplete="email"
              />

              <CyberInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                disabled={isLoading}
                autoComplete="current-password"
              />

              <div className="flex items-center justify-between text-sm">
                <Link 
                  href="/forgot-password"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Forgot password?
                </Link>
                <Link 
                  href="/register"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Create account
                </Link>
              </div>

              <CyberButton
                type="submit"
                isLoading={isLoading}
                icon={<LogIn className="w-5 h-5" />}
              >
                ACCESS SYSTEM
              </CyberButton>
            </form>
          </CyberCard>
        </div>
      </CyberBackground>
    </>
  );
}