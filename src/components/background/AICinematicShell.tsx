"use client";

import Image from "next/image";
import type {
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

interface AICinematicShellProps {
  children: ReactNode;
  showLogoWatermark?: boolean;
  className?: string;
}

const particles = Array.from({ length: 28 }, (_, index) => ({
  left: (index * 43) % 100,
  top: (index * 67) % 100,
  size: index % 5 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
  duration: 6 + (index % 6),
  delay: (index % 8) * 0.35,
}));

export default function AICinematicShell({
  children,
  showLogoWatermark = true,
  className = "",
}: AICinematicShellProps) {
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(700);
  const mouseY = useMotionValue(400);

  const smoothX = useSpring(mouseX, {
    stiffness: 70,
    damping: 28,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 70,
    damping: 28,
  });

  const spotlight = useMotionTemplate`
    radial-gradient(
      560px circle at ${smoothX}px ${smoothY}px,
      rgba(34, 211, 238, 0.12),
      transparent 72%
    )
  `;

  function handlePointerMove(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    const bounds =
      event.currentTarget.getBoundingClientRect();

    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      className={`relative isolate min-h-screen overflow-hidden bg-[#02050c] text-white ${className}`}
    >
      {/* Main background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_75%_25%,rgba(14,165,233,0.15),transparent_30%),radial-gradient(circle_at_15%_55%,rgba(37,99,235,0.12),transparent_34%),linear-gradient(135deg,#02050c_0%,#03101f_50%,#02040a_100%)]"
      />

      {/* Interactive cursor light */}
      <motion.div
        aria-hidden="true"
        style={{
          background: spotlight,
        }}
        className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
      />

      {/* Animated blue glow */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [0.9, 1.15, 0.9],
                opacity: [0.16, 0.35, 0.16],
                x: [0, 50, 0],
                y: [0, -25, 0],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-56 -top-52 -z-20 h-[42rem] w-[42rem] rounded-full bg-blue-600/20 blur-[150px]"
      />

      {/* Animated cyan glow */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.18, 1],
                opacity: [0.1, 0.28, 0.1],
                x: [0, 70, 0],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-56 top-[25%] -z-20 h-[38rem] w-[38rem] rounded-full bg-cyan-400/15 blur-[150px]"
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.14] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]"
      >
        <div className="h-full w-full bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      {/* Particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={
              reduceMotion
                ? {
                    opacity: 0.3,
                  }
                : {
                    y: [0, -22, 0],
                    opacity: [0.08, 0.75, 0.08],
                    scale: [1, 1.7, 1],
                  }
            }
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-cyan-100 shadow-[0_0_12px_rgba(103,232,249,0.85)]"
          />
        ))}
      </div>

      {/* Logo watermark */}
      {showLogoWatermark && (
        <motion.div
          aria-hidden="true"
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.025, 0.065, 0.025],
                  scale: [0.96, 1.04, 0.96],
                  rotate: [-2, 2, -2],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -right-24 top-[12%] -z-10 hidden h-[35rem] w-[35rem] lg:block"
        >
          <Image
            src="/quantumfinix-mark.png"
            alt=""
            width={700}
            height={700}
            priority
            className="h-full w-full object-contain mix-blend-screen"
          />
        </motion.div>
      )}

      {/* Scanning line */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                y: ["-150%", "900%"],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear",
        }}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-transparent via-cyan-200/[0.025] to-transparent"
      />

      {/* Dark edge effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(1,4,11,0.55)_100%)]"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}