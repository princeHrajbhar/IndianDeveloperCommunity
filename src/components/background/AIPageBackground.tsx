"use client";

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
  useTransform,
} from "motion/react";

interface AIPageBackgroundProps {
  children: ReactNode;
  className?: string;
}

const particles = Array.from({ length: 30 }, (_, index) => ({
  left: (index * 47 + 9) % 100,
  top: (index * 61 + 13) % 100,
  size: index % 7 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
  delay: (index % 8) * 0.4,
  duration: 5 + (index % 6),
}));

export default function AIPageBackground({
  children,
  className = "",
}: AIPageBackgroundProps) {
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const smoothX = useSpring(pointerX, {
    stiffness: 55,
    damping: 24,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 55,
    damping: 24,
  });

  const cursorX = useMotionValue(700);
  const cursorY = useMotionValue(400);

  const smoothCursorX = useSpring(cursorX, {
    stiffness: 60,
    damping: 28,
  });

  const smoothCursorY = useSpring(cursorY, {
    stiffness: 60,
    damping: 28,
  });

  const farX = useTransform(smoothX, [0, 1], [-24, 24]);
  const farY = useTransform(smoothY, [0, 1], [-18, 18]);

  const mediumX = useTransform(smoothX, [0, 1], [-40, 40]);
  const mediumY = useTransform(smoothY, [0, 1], [-28, 28]);

  const closeX = useTransform(smoothX, [0, 1], [-65, 65]);
  const closeY = useTransform(smoothY, [0, 1], [-42, 42]);

  const pointerGlow = useMotionTemplate`
    radial-gradient(
      540px circle at ${smoothCursorX}px ${smoothCursorY}px,
      rgba(34, 211, 238, 0.13),
      transparent 72%
    )
  `;

  function handlePointerMove(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    const bounds =
      event.currentTarget.getBoundingClientRect();

    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    cursorX.set(x);
    cursorY.set(y);

    pointerX.set(x / bounds.width);
    pointerY.set(y / bounds.height);
  }

  function handlePointerLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative isolate min-h-screen overflow-x-clip bg-[#020711] text-white ${className}`}
    >
      {/* Base */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-50 bg-[radial-gradient(circle_at_12%_14%,rgba(6,182,212,0.16),transparent_30%),radial-gradient(circle_at_84%_24%,rgba(37,99,235,0.17),transparent_31%),radial-gradient(circle_at_54%_88%,rgba(20,184,166,0.09),transparent_34%),linear-gradient(145deg,#020711_0%,#03101d_48%,#02040c_100%)]"
      />

      {/* Cursor light */}
      <motion.div
        aria-hidden="true"
        style={{
          background: pointerGlow,
        }}
        className="pointer-events-none fixed inset-0 -z-20 hidden lg:block"
      />

      {/* Far parallax grid */}
      <motion.div
        aria-hidden="true"
        style={
          reduceMotion
            ? undefined
            : {
                x: farX,
                y: farY,
              }
        }
        className="pointer-events-none fixed inset-[-5%] -z-40 opacity-[0.18]"
      >
        <div className="h-full w-full bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:82px_82px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      </motion.div>

      {/* Medium parallax light field */}
      <motion.div
        aria-hidden="true"
        style={
          reduceMotion
            ? undefined
            : {
                x: mediumX,
                y: mediumY,
              }
        }
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: [-8, 7, -8],
                scale: [0.92, 1.08, 0.92],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed -left-[18rem] -top-[22rem] -z-40 h-[56rem] w-[72rem] bg-[conic-gradient(from_145deg,transparent,rgba(6,182,212,0.15),rgba(59,130,246,0.12),transparent)] blur-[120px]"
      />

      {/* Close parallax orb */}
      <motion.div
        aria-hidden="true"
        style={
          reduceMotion
            ? undefined
            : {
                x: closeX,
                y: closeY,
              }
        }
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [0.85, 1.14, 0.85],
                opacity: [0.1, 0.23, 0.1],
              }
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed -right-52 top-[28%] -z-30 h-[36rem] w-[36rem] rounded-full bg-cyan-500/15 blur-[135px]"
      />

      {/* Lower blue field */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -55, 0],
                y: [0, -35, 0],
                scale: [1, 1.15, 1],
              }
        }
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed bottom-[-15rem] left-[26%] -z-40 h-[42rem] w-[42rem] rounded-full bg-blue-600/14 blur-[145px]"
      />

      {/* Vertical architecture lines */}
      <motion.div
        aria-hidden="true"
        style={
          reduceMotion
            ? undefined
            : {
                x: farX,
              }
        }
        className="pointer-events-none fixed inset-0 -z-30 opacity-30"
      >
        <div className="absolute bottom-0 left-[11%] top-0 w-px bg-gradient-to-b from-transparent via-cyan-300/16 to-transparent" />
        <div className="absolute bottom-0 left-[34%] top-0 w-px bg-gradient-to-b from-transparent via-blue-300/10 to-transparent" />
        <div className="absolute bottom-0 right-[31%] top-0 w-px bg-gradient-to-b from-transparent via-cyan-300/12 to-transparent" />
        <div className="absolute bottom-0 right-[9%] top-0 w-px bg-gradient-to-b from-transparent via-blue-300/14 to-transparent" />
      </motion.div>

      {/* Particles */}
      <motion.div
        aria-hidden="true"
        style={
          reduceMotion
            ? undefined
            : {
                x: closeX,
                y: closeY,
              }
        }
        className="pointer-events-none fixed inset-0 -z-20"
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
                    opacity: 0.25,
                  }
                : {
                    opacity: [0.05, 0.8, 0.05],
                    y: [0, -20, 0],
                    scale: [1, 1.8, 1],
                  }
            }
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-cyan-100 shadow-[0_0_14px_rgba(103,232,249,0.9)]"
          />
        ))}
      </motion.div>

      {/* Perspective floor */}
      <motion.div
        aria-hidden="true"
        style={
          reduceMotion
            ? undefined
            : {
                x: mediumX,
              }
        }
        className="pointer-events-none fixed inset-x-[-28%] bottom-[-23%] -z-30 h-[55%] origin-bottom opacity-30"
      >
        <div
          className="h-full w-full bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_top,black,transparent_90%)]"
          style={{
            transform:
              "perspective(760px) rotateX(66deg) scale(1.15)",
          }}
        />
      </motion.div>

      {/* Scan beam */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                y: ["-120%", "1000%"],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear",
        }}
        className="pointer-events-none fixed inset-x-0 top-0 -z-20 h-24 bg-gradient-to-b from-transparent via-cyan-100/[0.025] to-transparent"
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(2,7,17,0.68)_100%)]"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}