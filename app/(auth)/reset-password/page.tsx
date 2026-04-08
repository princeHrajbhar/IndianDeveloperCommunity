'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Lock, Shield, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import CyberBackground from '@/app/(auth)/components/CyberBackground';
import ToastProvider from '@/app/(auth)/components/ToastProvider';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    if (!formData.newPassword) {
      toast.error('New password is required');
      return false;
    }
    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.newPassword)) {
      toast.error('Password must contain at least one uppercase, one lowercase, one number, and one special character');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // ✅ FIX: always get fresh URL (no state bug)
    const resetUrl = window.location.href;

    if (!resetUrl) {
      toast.error('Invalid reset link. Please request a new password reset.');
      return;
    }
    
    setIsLoading(true);
    const loadingToast = toast.loading('Resetting password...');

    try {
      const requestBody = {
        resetUrl,
        newPassword: formData.newPassword
      };
      
      console.log('Sending request to server:', requestBody);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

    if (!response.ok) {
  toast.error(data.message || 'Failed to reset password', {
    id: loadingToast,
    duration: 4000,
  });

  setIsLoading(false);
  return; // 🔥 VERY IMPORTANT
}

      toast.success('Password reset successfully! Redirecting to login...', {
        id: loadingToast,
        duration: 2000,
      });
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to reset password. Please try again.', {
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
          <div className="w-full max-w-md group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              
              <div className="relative bg-[#0a0a1f]/80 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-scan"></div>
                
                <div className="p-8 pb-0">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                      <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Shield className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Reset Password
                  </h2>
                  
                  <p className="text-center text-gray-400 mt-2">
                    Enter your new password
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-cyan-400 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      New Password
                    </label>
                    <div className="relative group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-[#0a0a1f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 group-hover:border-cyan-500/50"
                        placeholder="Enter new password"
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
                        placeholder="Confirm new password"
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

                  <div className="flex items-center justify-between text-sm">
                    <Link href="/login" className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors">
                      <ArrowLeft className="w-4 h-4" />
                      Back to Login
                    </Link>
                  </div>

                  <button type="submit" disabled={isLoading} className="relative w-full group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg"></div>
                    <div className="relative px-6 py-3 bg-[#0a0a1f] rounded-lg m-[1px] group-hover:bg-transparent transition-all duration-300">
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-cyan-400 font-semibold">RESETTING...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Shield className="w-5 h-5 text-white" />
                          <span className="text-white font-semibold">RESET PASSWORD</span>
                        </div>
                      )}
                    </div>
                  </button>
                </form>

                <div className="p-8 pt-0 text-center">
                  <p className="text-gray-500 text-sm">
                    Protected by advanced AI security protocols
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CyberBackground>

      <style jsx>{`
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
}