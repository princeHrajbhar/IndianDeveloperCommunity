// app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import CyberBackground from '@/app/(auth)/components/CyberBackground';
import CyberCard from '@/app/(auth)/components/CyberCard';
import CyberInput from '@/app/(auth)/components/CyberInput';
import CyberButton from '@/app/(auth)/components/CyberButton';
import ToastProvider from '@/app/(auth)/components/ToastProvider';
import { Mail, Lock, UserPlus,  Eye, EyeOff } from 'lucide-react';


export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      toast.error('Password must contain at least one uppercase, one lowercase, one number, and one special character');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    const loadingToast = toast.loading('Creating account...');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store email for OTP verification
      localStorage.setItem('verificationEmail', formData.email);

      toast.success('Account created! Please verify your email.', {
        id: loadingToast,
        duration: 3000,
      });

      // Redirect to OTP verification page with email
      setTimeout(() => {
        router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
      }, 2000);
      
    } catch (error: any) {
      toast.error(error.message || 'Registration failed. Please try again.', {
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
        <div className="pt-24 pb-24 flex items-center justify-center min-h-screen px-4">
          <CyberCard 
            title="Create Account" 
            subtitle="Join the cyber network"
            icon={<UserPlus className="w-16 h-16 text-purple-400" />}
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

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-cyan-400 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-[#0a0a1f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 group-hover:border-cyan-500/50"
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character
                </p>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-cyan-400 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Confirm Password
                </label>
                <div className="relative group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-[#0a0a1f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 group-hover:border-cyan-500/50"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="text-center text-sm">
                <Link 
                  href="/login"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Already have an account? Login
                </Link>
              </div>

              <CyberButton
                type="submit"
                isLoading={isLoading}
                icon={<UserPlus className="w-5 h-5" />}
              >
                CREATE ACCOUNT
              </CyberButton>
            </form>
          </CyberCard>
        </div>
      </CyberBackground>
    </>
  );
}