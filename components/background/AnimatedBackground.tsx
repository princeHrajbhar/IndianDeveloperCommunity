"use client"

import { useEffect, useState, ReactNode } from "react"

type Particle = {
  id: number
  size: number
  top: number
  left: number
  duration: number
  delay: number
  shape: "circle" | "square" | "triangle"
}

interface BgWrapperProps {
  children: ReactNode
  particleCount?: number
  className?: string
}

export default function BgWrapper({
  children,
  particleCount = 40,
  className = "",
}: BgWrapperProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: particleCount }).map(
      (_, i) => ({
        id: i,
        size: Math.random() * 6 + 4,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        shape: ["circle", "square", "triangle"][
          Math.floor(Math.random() * 3)
        ] as "circle" | "square" | "triangle",
      })
    )

    setParticles(generated)
  }, [particleCount])

  return (
    <div className={`relative min-h-screen bg-black ${className}`}>
      
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute opacity-40 animate-float"
            style={{
              width: p.size,
              height: p.size,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            {p.shape === "circle" && (
              <div className="w-full h-full bg-blue-500 rounded-full" />
            )}

            {p.shape === "square" && (
              <div className="w-full h-full bg-blue-400 rotate-45" />
            )}

            {p.shape === "triangle" && (
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${p.size / 2}px solid transparent`,
                  borderRight: `${p.size / 2}px solid transparent`,
                  borderBottom: `${p.size}px solid #3b82f6`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}