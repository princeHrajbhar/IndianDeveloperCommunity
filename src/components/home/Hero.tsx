"use client";

import type { PointerEvent as ReactPointerEvent } from "react";

import {
  motion,
  MotionConfig,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";

const particles = Array.from({ length: 32 }, (_, index) => ({
  left: (index * 41) % 100,
  top: (index * 67) % 100,
  size: index % 5 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
  duration: 5 + (index % 7),
  delay: (index % 9) * 0.3,
  drift: ((index % 7) - 3) * 8,
}));

const capabilities = [
  "AI",
  "Automation",
  "Software",
  "Digital Growth",
];

const highlights = [
  {
    title: "AI",
    description: "AI-powered systems built around real business needs.",
  },
  {
    title: "Software",
    description: "Custom software designed for your workflows and growth.",
  },
  {
    title: "Digital Growth",
    description: "Marketing systems designed to create measurable growth.",
  },
];

export default function Hero() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const spotlightX = useMotionValue(700);
  const spotlightY = useMotionValue(400);

  const smoothX = useSpring(pointerX, {
    stiffness: 55,
    damping: 25,
    mass: 0.8,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 55,
    damping: 25,
    mass: 0.8,
  });

  const contentX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [7, -7],
  );

  const contentY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [5, -5],
  );

  const visualX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-22, 22],
  );

  const visualY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-16, 16],
  );

  const spotlight = useMotionTemplate`
    radial-gradient(
      560px circle at ${spotlightX}px ${spotlightY}px,
      rgba(34, 211, 238, 0.11),
      transparent 72%
    )
  `;

  function handlePointerMove(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    const bounds =
      event.currentTarget.getBoundingClientRect();

    pointerX.set(
      event.clientX / window.innerWidth - 0.5,
    );

    pointerY.set(
      event.clientY / window.innerHeight - 0.5,
    );

    spotlightX.set(event.clientX - bounds.left);
    spotlightY.set(event.clientY - bounds.top);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden bg-[#02050c] text-white sm:min-h-[calc(100svh-80px)]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_76%_36%,rgba(14,165,233,0.15),transparent_27%),radial-gradient(circle_at_18%_25%,rgba(37,99,235,0.13),transparent_32%),linear-gradient(135deg,#02050c_0%,#041122_48%,#02040a_100%)]"
        />

        <motion.div
          aria-hidden="true"
          style={{
            background: spotlight,
          }}
          className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
        />

        <motion.div
          aria-hidden="true"
          animate={{
            scale: [0.9, 1.15, 0.9],
            opacity: [0.18, 0.38, 0.18],
            rotate: [0, 10, -6, 0],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-56 top-[-12%] -z-20 h-[45rem] w-[45rem] rounded-full bg-blue-600/20 blur-[150px]"
        />

        <motion.div
          aria-hidden="true"
          animate={{
            x: [0, 70, 0],
            y: [0, -35, 0],
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.3, 0.12],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-56 top-[12%] -z-20 h-[38rem] w-[38rem] rounded-full bg-cyan-400/15 blur-[150px]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.16] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
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
              animate={{
                x: [0, particle.drift, 0],
                y: [0, -24, 0],
                opacity: [0.08, 0.8, 0.08],
                scale: [1, 1.7, 1],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute rounded-full bg-cyan-100 shadow-[0_0_12px_rgba(103,232,249,0.8)]"
            />
          ))}
        </div>

        <motion.div
          aria-hidden="true"
          animate={{
            y: ["-140%", "800%"],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear",
          }}
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-transparent via-cyan-200/[0.035] to-transparent"
        />

        <div className="mx-auto grid w-full max-w-[1600px] items-center gap-8 px-4 pb-10 pt-12 sm:min-h-[calc(100svh-80px)] sm:gap-12 sm:px-7 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:px-10 lg:py-12 xl:px-16">
          <motion.div
            style={{
              x: contentX,
              y: contentY,
            }}
            className="relative z-20 min-w-0 max-w-3xl"
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.8,
              }}
              className="mb-5 inline-flex max-w-full items-center gap-2.5 rounded-full border border-cyan-300/15 bg-cyan-300/[0.055] px-3.5 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-cyan-100/80 backdrop-blur-xl sm:mb-7 sm:gap-3 sm:px-4 sm:text-[11px] sm:tracking-[0.25em]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-300" />
              </span>

              AI • Software • Automation • Digital Growth
            </motion.div>

            <h1 className="max-w-full font-black uppercase leading-[0.92] tracking-[-0.045em] sm:leading-[0.88] sm:tracking-[-0.06em]">
              <motion.span
                initial={{
                  opacity: 0,
                  y: 60,
                  filter: "blur(15px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1,
                  delay: 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block break-words text-[clamp(2.45rem,12.5vw,3.4rem)] text-white sm:text-[clamp(3.4rem,7.2vw,7.4rem)] lg:whitespace-nowrap lg:text-[clamp(3.8rem,5.25vw,5.75rem)] xl:text-[clamp(4.5rem,5.4vw,6.25rem)]"
              >
                Build.
              </motion.span>

              <motion.span
                initial={{
                  opacity: 0,
                  y: 60,
                  filter: "blur(15px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1,
                  delay: 0.27,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block break-words bg-gradient-to-r from-blue-400 via-cyan-100 to-cyan-400 bg-clip-text text-[clamp(2.45rem,12.5vw,3.4rem)] text-transparent sm:text-[clamp(3.4rem,7.2vw,7.4rem)]"
              >
                Automate. Grow.
              </motion.span>
            </h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.5,
              }}
              className="mt-6 max-w-2xl text-[15px] leading-7 text-slate-400 sm:mt-8 sm:text-lg sm:leading-8"
            >
              AI-powered solutions, custom software, business automation
              and digital marketing designed to solve real business problems.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.64,
              }}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
            >
              <motion.div
                whileHover={{
                  y: -3,
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <Link
                  href="/book-consultation"
                  className="group relative inline-flex min-h-14 w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 px-7 text-sm font-bold text-[#020711] shadow-[0_0_50px_rgba(34,211,238,0.22)] sm:w-auto"
                >
                  <span className="absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/65 to-transparent transition-transform duration-700 group-hover:translate-x-[140%]" />

                  <span className="relative flex items-center gap-3">
                    Explore Solutions
                    <ArrowIcon />
                  </span>
                </Link>
              </motion.div>

            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.8,
              }}
              className="mt-4"
            >
              <Link
                href="/digital-marketing"
                className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200/75 transition hover:text-cyan-100"
              >
                Explore Digital Marketing
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.88,
              }}
              className="mt-8 flex flex-wrap gap-2 sm:mt-10"
            >
              {capabilities.map((capability, index) => (
                <motion.span
                  key={capability}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.9 + index * 0.08,
                  }}
                  className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[11px] text-slate-500 backdrop-blur-lg"
                >
                  {capability}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 1.04,
              }}
              className="mt-8 grid max-w-2xl gap-4 border-t border-white/[0.07] pt-5 sm:mt-10 sm:grid-cols-3 sm:gap-5 sm:pt-6"
            >
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className={
                    index > 0
                      ? "sm:border-l sm:border-white/[0.07] sm:pl-5"
                      : ""
                  }
                >
                  <p className="text-sm font-semibold text-slate-100">
                    {item.title}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.76,
              filter: "blur(25px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.4,
              delay: 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              x: visualX,
              y: visualY,
            }}
            className="relative mx-auto flex h-[310px] w-full max-w-[340px] items-center justify-center overflow-visible min-[390px]:h-[350px] min-[390px]:max-w-[390px] sm:h-[570px] sm:max-w-[610px] lg:h-[640px]"
          >
            <motion.div
              animate={{
                scale: [0.85, 1.1, 0.85],
                opacity: [0.28, 0.6, 0.28],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute h-[56%] w-[56%] rounded-full bg-cyan-400/20 blur-[110px]"
            />

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 38,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[86%] w-[86%] rounded-full border border-dashed border-cyan-300/[0.09] sm:h-[91%] sm:w-[91%]"
            >
              <OrbitNode className="left-1/2 top-[-5px]" />
              <OrbitNode className="bottom-[9%] right-[13%]" />
              <OrbitNode className="left-[6%] top-[35%]" />
            </motion.div>

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[70%] w-[70%] rounded-full border border-cyan-300/[0.13] sm:h-[74%] sm:w-[74%]"
            >
              <span className="absolute right-[8%] top-[16%] h-3 w-3 rounded-full border border-cyan-100/40 bg-cyan-300/25 shadow-[0_0_25px_rgba(34,211,238,0.8)]" />
            </motion.div>

            {[0, 60, 120].map((rotation, index) => (
              <motion.div
                key={rotation}
                animate={{
                  rotate: [rotation, rotation + 360],
                }}
                transition={{
                  duration: 18 + index * 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute h-[38%] w-[82%] rounded-[50%] border border-cyan-300/[0.09] sm:h-[43%] sm:w-[88%]"
              />
            ))}

            <motion.div
              animate={{
                boxShadow: [
                  "0 0 70px rgba(34,211,238,0.14), inset 0 0 40px rgba(56,189,248,0.06)",
                  "0 0 135px rgba(34,211,238,0.34), inset 0 0 75px rgba(56,189,248,0.15)",
                  "0 0 70px rgba(34,211,238,0.14), inset 0 0 40px rgba(56,189,248,0.06)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex h-[46%] w-[46%] items-center justify-center rounded-full border border-cyan-100/20 bg-[#04111f]/80 backdrop-blur-2xl sm:h-[43%] sm:w-[43%]"
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-4 rounded-full border-r border-t border-cyan-200/45"
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-8 rounded-full border-b border-l border-blue-300/35"
              />

              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-[60%] w-[60%] items-center justify-center rounded-full border border-white/[0.06] bg-[radial-gradient(circle,rgba(34,211,238,0.16),rgba(3,10,20,0.88)_70%)]"
              >
                <QuantumMark />
              </motion.div>

              <div className="absolute -bottom-8 text-center sm:-bottom-11">
                <p className="text-[9px] uppercase tracking-[0.35em] text-cyan-100/50">
                  AI • Software • Automation • Marketing
                </p>

                <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-cyan-100">
                  CONNECTED
                </p>
              </div>
            </motion.div>

            <FloatingCard
              className="left-0 top-[17%]"
              title="AI"
              value="Intelligence"
              delay={0}
            />

            <FloatingCard
              className="bottom-[14%] right-0"
              title="Automation"
              value="Connected"
              delay={0.7}
            />

            <motion.div
              animate={{
                x: [0, 8, 0],
                y: [0, -7, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[9%] left-[3%] hidden rounded-xl border border-white/[0.08] bg-black/25 px-4 py-3 font-mono text-[10px] text-cyan-200/70 backdrop-blur-xl lg:block"
            >
              <p>
                <span className="text-blue-300">
                  AI
                </span>{" "}
                ↔{" "}
                <span className="text-cyan-100">
                  Software ↔ Automation ↔ Marketing
                </span>
              </p>

              <motion.span
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="mt-1 inline-block h-3 w-1 bg-cyan-200"
              />
            </motion.div>
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
        />
      </section>
    </MotionConfig>
  );
}

function FloatingCard({
  className,
  title,
  value,
  delay,
}: {
  className: string;
  title: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -13, 0],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute hidden w-48 rounded-2xl border border-white/10 bg-[#06101f]/75 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:block ${className}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[9px] uppercase tracking-[0.22em] text-slate-500">
          {title}
        </p>

        <span className="relative flex h-2 w-2">
          <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-300" />
        </span>
      </div>

      <p className="mt-3 text-sm font-medium text-cyan-100">
        {value}
      </p>

      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
        <motion.div
          animate={{
            x: ["-120%", "250%"],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
        />
      </div>
    </motion.div>
  );
}

function OrbitNode({
  className,
}: {
  className: string;
}) {
  return (
    <span
      className={`absolute h-2.5 w-2.5 rounded-full border border-cyan-100/50 bg-cyan-300/30 shadow-[0_0_20px_rgba(34,211,238,0.85)] ${className}`}
    />
  );
}

function QuantumMark() {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      className="h-[72%] w-[72%]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="hero-mark-gradient"
          x1="12"
          y1="10"
          x2="70"
          y2="70"
        >
          <stop stopColor="#A5F3FC" />
          <stop offset="0.5" stopColor="#06B6D4" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>

      <motion.path
        d="M53 59A27 27 0 1 1 59 23"
        stroke="url(#hero-mark-gradient)"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          duration: 2,
          delay: 0.4,
        }}
      />

      <motion.path
        d="M26 52c11-16 20 17 36 5"
        stroke="url(#hero-mark-gradient)"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          duration: 1.8,
          delay: 0.8,
        }}
      />

      <motion.path
        d="m47 46 19-19-5 12 10-3-24 23Z"
        fill="url(#hero-mark-gradient)"
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
        }}
      />

      <path
        d="M43 25h17l-5 6h-9l-4 5"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M4 10h12m-4-4 4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}