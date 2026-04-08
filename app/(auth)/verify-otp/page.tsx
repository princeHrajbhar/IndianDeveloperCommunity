// app/verify-otp/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Key, Shield, ArrowLeft, RefreshCw, Mail } from 'lucide-react';
import CyberBackground from '@/app/(auth)/components/CyberBackground';
import CyberCard from '@/app/(auth)/components/CyberCard';
import CyberInput from '@/app/(auth)/components/CyberInput';
import CyberButton from '@/app/(auth)/components/CyberButton';
import ToastProvider from '@/app/(auth)/components/ToastProvider';

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown
  const [canResend, setCanResend] = useState(false);

  // Get email from URL params or localStorage
  useEffect(() => {
    const emailParam = searchParams.get('email');
    const storedEmail = localStorage.getItem('verificationEmail');
    
    if (emailParam) {
      setEmail(emailParam);
      localStorage.setItem('verificationEmail', emailParam);
    } else if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email found, redirect to register
      toast.error('Email not found. Please register again.');
      setTimeout(() => router.push('/register'), 2000);
    }
  }, [searchParams, router]);

  // Countdown timer for OTP expiry
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendOtp = async () => {
    if (!canResend) {
      toast.error(`Please wait ${formatTime(timeLeft)} before resending`);
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Resending OTP...');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      toast.success('OTP resent successfully!', {
        id: loadingToast,
        duration: 3000,
      });

      // Reset timer
      setTimeLeft(300);
      setCanResend(false);
      
    } catch (error: any) {
      toast.error(error.message || 'Failed to resend OTP', {
        id: loadingToast,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }
    
    if (otp.length !== 6) {
      toast.error('OTP must be 6 digits');
      return;
    }
    
    setIsLoading(true);
    const loadingToast = toast.loading('Verifying OTP...');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          otp 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      toast.success('Email verified successfully!', {
        id: loadingToast,
        duration: 2000,
      });

      // Clear verification email from storage
      localStorage.removeItem('verificationEmail');
      
      // Redirect to login page after successful verification
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      
    } catch (error: any) {
      toast.error(error.message || 'Invalid OTP. Please try again.', {
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
            title="Verify Email" 
            subtitle={`Enter the 6-digit code sent to ${email}`}
            icon={<Key className="w-16 h-16 text-cyan-400" />}
          >
            <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-cyan-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="px-4 py-3 bg-[#0a0a1f] border border-gray-700 rounded-lg text-gray-300">
                  {email}
                </div>
              </div>

              <CyberInput
                label="Verification Code (OTP)"
                name="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit code"
                icon={<Key className="w-4 h-4" />}
                disabled={isLoading}
                autoComplete="off"
              />

              {/* OTP Expiry Timer */}
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-400">
                  {!canResend ? (
                    <span>OTP expires in: <span className="text-cyan-400 font-mono">{formatTime(timeLeft)}</span></span>
                  ) : (
                    <span className="text-yellow-400">OTP expired</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResend || isLoading}
                  className={`flex items-center gap-1 transition-colors ${
                    canResend && !isLoading
                      ? 'text-cyan-400 hover:text-cyan-300'
                      : 'text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  Resend OTP
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link 
                  href="/register"
                  className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Register
                </Link>
                <Link 
                  href="/login"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Already verified? Login
                </Link>
              </div>

              <CyberButton
                type="submit"
                isLoading={isLoading}
                icon={<Shield className="w-5 h-5" />}
              >
                VERIFY & CONTINUE
              </CyberButton>
            </form>
          </CyberCard>
        </div>
      </CyberBackground>
    </>
  );
}