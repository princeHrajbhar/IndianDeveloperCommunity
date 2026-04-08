// app/components/CyberBackground.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';

interface CyberBackgroundProps {
  children?: React.ReactNode;
}

export default function CyberBackground({ children }: CyberBackgroundProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Set mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate stable particles on client-side only
  const particles = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 50 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }, [mounted]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#1a0f2e]">
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(0,255,157,0.05)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Orbs - only show on client */}
      {mounted && (
        <>
          <div
            className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-blob pointer-events-none"
            style={{
              top: '10%',
              left: '10%',
              transform: `translate(${mouse.x * 0.02}px, ${mouse.y * 0.02}px)`,
            }}
          />

          <div
            className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"
            style={{
              bottom: '10%',
              right: '10%',
              transform: `translate(${mouse.x * -0.02}px, ${mouse.y * 0.02}px)`,
            }}
          />

          <div
            className="absolute w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(${mouse.x * 0.01}px, ${mouse.y * -0.01}px)`,
            }}
          />
        </>
      )}

      {/* Particles - only show on client */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>
      )}

      {children}

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: scale(1); }
          33% { transform: scale(1.1); }
          66% { transform: scale(0.9); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-20px) translateX(-5px); }
          75% { transform: translateY(-10px) translateX(5px); }
        }

        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}