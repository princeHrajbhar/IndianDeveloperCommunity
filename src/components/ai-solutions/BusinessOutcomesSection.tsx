"use client";

import type { ReactNode } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

type BusinessOutcome = {
  number: string;
  title: string;
  description: string;
  label: string;
  icon: ReactNode;
  desktopPosition: string;
};

const outcomes: BusinessOutcome[] = [
  {
    number: "01",
    title: "Reduce Manual Work",
    description:
      "Automate repetitive operational tasks so your team can focus on customers, decisions and business growth.",
    label: "Less repetitive effort",
    icon: <AutomationIcon />,
    desktopPosition:
      "left-0 top-10 xl:left-5 xl:top-14",
  },
  {
    number: "02",
    title: "Improve Response Times",
    description:
      "Help employees and customers find information and complete common requests with fewer delays.",
    label: "Faster service",
    icon: <SpeedIcon />,
    desktopPosition:
      "right-0 top-10 xl:right-5 xl:top-14",
  },
  {
    number: "03",
    title: "Use Business Data Better",
    description:
      "Turn scattered documents and operational information into knowledge people can understand and use.",
    label: "Useful intelligence",
    icon: <DataIcon />,
    desktopPosition:
      "bottom-8 left-0 xl:bottom-12 xl:left-5",
  },
  {
    number: "04",
    title: "Scale Operations",
    description:
      "Handle increasing request and information volumes without increasing manual effort at the same rate.",
    label: "Greater capacity",
    icon: <ScaleIcon />,
    desktopPosition:
      "bottom-8 right-0 xl:bottom-12 xl:right-5",
  },
];

export default function BusinessOutcomesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-transparent py-20 text-white sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <motion.header
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-300/70" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300/70">
              Business outcomes
            </p>

            <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-300/70" />
          </div>

          <h2 className="mt-5 text-4xl font-black leading-[1] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            Where AI can create
            <span className="block text-cyan-300">
              real business value.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            We begin with the operational result—not the
            technology—and identify where AI can create useful,
            controlled improvement.
          </p>
        </motion.header>

        {/* Desktop radial map */}
        <div className="relative mx-auto mt-16 hidden h-[660px] max-w-[1180px] lg:block">
          <ConnectorMap reduceMotion={Boolean(reduceMotion)} />

          <CentralOutcomeCore
            reduceMotion={Boolean(reduceMotion)}
          />

          {outcomes.map((outcome, index) => (
            <DesktopOutcome
              key={outcome.number}
              outcome={outcome}
              index={index}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </div>

        {/* Mobile and tablet layout */}
        <div className="mt-12 lg:hidden">
          <MobileCore
            reduceMotion={Boolean(reduceMotion)}
          />

          <div className="relative mt-10 grid gap-8 sm:grid-cols-2">
            {outcomes.map((outcome, index) => (
              <MobileOutcome
                key={outcome.number}
                outcome={outcome}
                index={index}
                reduceMotion={Boolean(reduceMotion)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CentralOutcomeCore({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              scale: 0.82,
            }
      }
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.4,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute left-1/2 top-1/2 z-20 flex h-64 w-64 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 rounded-full border border-dashed border-cyan-300/18"
      />

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-7 rounded-full border border-blue-300/15"
      />

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.04, 1],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full border border-cyan-300/25 bg-transparent text-center shadow-[0_0_70px_rgba(34,211,238,0.12)]"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-200">
          <ValueIcon />
        </span>

        <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300/60">
          AI objective
        </p>

        <p className="mt-2 text-lg font-bold tracking-[-0.03em] text-white">
          Business Value
        </p>
      </motion.div>
    </motion.div>
  );
}

function DesktopOutcome({
  outcome,
  index,
  reduceMotion,
}: {
  outcome: BusinessOutcome;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              scale: 0.9,
              y: 20,
            }
      }
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
              scale: 1.015,
            }
      }
      className={`group absolute z-30 w-[330px] bg-transparent ${outcome.desktopPosition}`}
    >
      <div className="relative border-l border-white/[0.1] pl-6 transition-colors duration-300 group-hover:border-cyan-300/45">
        <motion.span
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -4, 0],
                }
          }
          transition={{
            duration: 3.5 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 bg-[#020711] text-cyan-200"
        >
          {outcome.icon}
        </motion.span>

        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[9px] tracking-[0.2em] text-cyan-300/45">
            OUTCOME {outcome.number}
          </p>

          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/50 shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-[-0.035em] text-white">
          {outcome.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-400">
          {outcome.description}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <span className="h-px w-8 bg-cyan-300/40" />

          <span className="text-[9px] font-medium uppercase tracking-[0.17em] text-cyan-100/55">
            {outcome.label}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function ConnectorMap({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1180 660"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <path
        d="M470 265 C410 220 360 190 300 175"
        stroke="rgba(103,232,249,0.13)"
        strokeWidth="1"
      />

      <path
        d="M710 265 C770 220 820 190 880 175"
        stroke="rgba(103,232,249,0.13)"
        strokeWidth="1"
      />

      <path
        d="M470 395 C410 440 360 470 300 495"
        stroke="rgba(96,165,250,0.13)"
        strokeWidth="1"
      />

      <path
        d="M710 395 C770 440 820 470 880 495"
        stroke="rgba(96,165,250,0.13)"
        strokeWidth="1"
      />

      {!reduceMotion && (
        <>
          <motion.path
            d="M470 265 C410 220 360 190 300 175"
            stroke="rgb(103,232,249)"
            strokeWidth="1.5"
            strokeDasharray="4 14"
            animate={{
              strokeDashoffset: [0, -36],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.path
            d="M710 265 C770 220 820 190 880 175"
            stroke="rgb(103,232,249)"
            strokeWidth="1.5"
            strokeDasharray="4 14"
            animate={{
              strokeDashoffset: [0, -36],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.path
            d="M470 395 C410 440 360 470 300 495"
            stroke="rgb(96,165,250)"
            strokeWidth="1.5"
            strokeDasharray="4 14"
            animate={{
              strokeDashoffset: [0, -36],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.path
            d="M710 395 C770 440 820 470 880 495"
            stroke="rgb(96,165,250)"
            strokeWidth="1.5"
            strokeDasharray="4 14"
            animate={{
              strokeDashoffset: [0, -36],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </>
      )}

      {[
        [300, 175],
        [880, 175],
        [300, 495],
        [880, 495],
      ].map(([cx, cy], index) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="4"
          fill="rgb(103,232,249)"
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.25, 1, 0.25],
                  r: [3, 5, 3],
                }
          }
          transition={{
            duration: 2.4,
            delay: index * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

function MobileCore({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              scale: 0.9,
            }
      }
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
      }}
      className="relative mx-auto flex h-40 w-40 items-center justify-center"
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 rounded-full border border-dashed border-cyan-300/20"
      />

      <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border border-cyan-300/25">
        <ValueIcon />

        <span className="mt-3 text-xs font-semibold text-white">
          Business Value
        </span>
      </div>
    </motion.div>
  );
}

function MobileOutcome({
  outcome,
  index,
  reduceMotion,
}: {
  outcome: BusinessOutcome;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              y: 22,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
      }}
      className="relative border-t border-white/[0.09] pt-6"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-200">
          {outcome.icon}
        </span>

        <span className="font-mono text-[9px] tracking-[0.2em] text-cyan-300/40">
          {outcome.number}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-bold tracking-[-0.03em] text-white">
        {outcome.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-400">
        {outcome.description}
      </p>

      <div className="mt-5 flex items-center gap-3">
        <span className="h-px w-7 bg-cyan-300/40" />

        <span className="text-[9px] uppercase tracking-[0.16em] text-cyan-100/55">
          {outcome.label}
        </span>
      </div>
    </motion.article>
  );
}

function AutomationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="6"
        width="12"
        height="12"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M12 2.5V6M12 18v3.5M2.5 12H6M18 12h3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="m9.5 12 1.7 1.7 3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M5 18a8 8 0 1 1 14 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="m12 14 4-4M7 18h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DataIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <ellipse
        cx="12"
        cy="5.5"
        rx="7"
        ry="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M5 5.5v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6M5 11.5v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M5 19V9M12 19V5M19 19v-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="m4 6 5-3 5 3 6-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ValueIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 text-cyan-200"
      aria-hidden="true"
    >
      <path
        d="M12 3 4 7v5c0 4.5 3 7.4 8 9 5-1.6 8-4.5 8-9V7l-8-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="m8.5 12 2.2 2.2 4.8-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}