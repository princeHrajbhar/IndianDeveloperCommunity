// app/(auth)/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Mail, Send, Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import CyberBackground from '@/app/(auth)/components/CyberBackground';
import CyberCard from '@/app/(auth)/components/CyberCard';
import CyberInput from '@/app/(auth)/components/CyberInput';
import CyberButton from '@/app/(auth)/components/CyberButton';
import ToastProvider from '@/app/(auth)/components/ToastProvider';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    const loadingToast = toast.loading('Sending reset link...');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }

      toast.success('Reset link sent successfully!', {
        id: loadingToast,
        duration: 2000,
      });

      // Store email and show success page
      setSentEmail(email);
      setIsEmailSent(true);
      
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset link. Please try again.', {
        id: loadingToast,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Success Page Component
  if (isEmailSent) {
    return (
      <>
        <ToastProvider />
        <CyberBackground>
          <div className="pt-24 pb-24 flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                
                <div className="relative bg-[#0a0a1f]/80 backdrop-blur-xl rounded-2xl border border-green-500/30 shadow-2xl overflow-hidden">
                  {/* Animated Border Line */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-scan"></div>
                  
                  <div className="p-8 text-center">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative z-10 w-24 h-24 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
                      Check Your Email
                    </h2>
                    
                    <p className="text-gray-300 mb-2">
                      We've sent a password reset link to:
                    </p>
                    <p className="text-cyan-400 font-semibold mb-6 break-all">
                      {sentEmail}
                    </p>
                    
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 mb-6">
                      <p className="text-sm text-gray-300">
                        📧 Please check your inbox and click the reset link to create a new password.
                        The link will expire in 5 minutes.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setEmail('');
                          setIsEmailSent(false);
                        }}
                        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                      >
                        Send to Another Email
                      </button>
                      
                      <Link 
                        href="/login"
                        className="block w-full px-6 py-3 bg-[#0a0a1f] border border-gray-700 rounded-lg text-gray-400 font-semibold hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300 text-center"
                      >
                        Back to Login
                      </Link>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="p-8 pt-0 text-center">
                    <p className="text-gray-500 text-sm">
                      Didn't receive the email? Check your spam folder
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

  // Initial Form Page
  return (
    <>
      <ToastProvider />
      <CyberBackground>
        <div className="pt-24 pb-24 flex items-center justify-center min-h-screen px-4">
          <CyberCard 
            title="Reset Password" 
            subtitle="Enter your email to receive a password reset link"
            icon={<Shield className="w-16 h-16 text-pink-400" />}
          >
            <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-6">
              <CyberInput
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cyber@terminal.com"
                icon={<Mail className="w-4 h-4" />}
                disabled={isLoading}
                autoComplete="email"
              />

              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-xs text-gray-400">
                <p>📧 We'll send you a secure link to reset your password</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link 
                  href="/login"
                  className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
                <Link 
                  href="/register"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Create Account
                </Link>
              </div>

              <CyberButton
                type="submit"
                isLoading={isLoading}
                icon={<Send className="w-5 h-5" />}
              >
                SEND RESET LINK
              </CyberButton>
            </form>
          </CyberCard>
        </div>
      </CyberBackground>
    </>
  );
}