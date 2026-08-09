"use client";

import type { ReactNode } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

type DeliveryStep = {
  number: string;
  phase: string;
  title: string;
  description: string;
  icon: ReactNode;
  desktopPosition: string;
  connectorPosition: string;
};

const deliverySteps: DeliveryStep[] = [
  {
    number: "01",
    phase: "Discover",
    title: "Identify the Opportunity",
    description:
      "We study your workflow, users, data and business goals to find where AI can provide meaningful value.",
    icon: <OpportunityIcon />,
    desktopPosition: "left-0 top-[4.5rem]",
    connectorPosition:
      "right-[-4.5rem] top-[4.75rem] w-[4.5rem]",
  },
  {
    number: "02",
    phase: "Validate",
    title: "Validate With a Prototype",
    description:
      "We build a focused proof of concept to test feasibility, output quality and potential business impact.",
    icon: <PrototypeIcon />,
    desktopPosition: "right-0 top-[13.5rem]",
    connectorPosition:
      "left-[-4.5rem] top-[4.75rem] w-[4.5rem]",
  },
  {
    number: "03",
    phase: "Connect",
    title: "Integrate With Your Systems",
    description:
      "We connect the solution with the applications, databases, documents and APIs your business already uses.",
    icon: <IntegrationIcon />,
    desktopPosition: "left-0 top-[25rem]",
    connectorPosition:
      "right-[-7.5rem] top-[4.75rem] w-[7.5rem]",
  },
  {
    number: "04",
    phase: "Launch",
    title: "Test, Launch and Improve",
    description:
      "We evaluate accuracy, security and performance before launch, then improve the solution using real feedback.",
    icon: <LaunchIcon />,
    desktopPosition: "right-0 top-[34.5rem]",
    connectorPosition:
      "left-[-6.75rem] top-[4.75rem] w-[6.75rem]",
  },
];

const checkpoints = [
  { x: 400, y: 145 },
  { x: 780, y: 285 },
  { x: 450, y: 465 },
  { x: 740, y: 610 },
];

export default function AIDeliveryProcessSection() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="relative overflow-hidden bg-transparent py-20 text-white sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <SectionHeader reduceMotion={reduceMotion} />

        {/* Desktop delivery route */}
        <div className="relative mx-auto mt-16 hidden h-[720px] max-w-[1180px] lg:block">
          <DeliveryRoute reduceMotion={reduceMotion} />

          <StartMarker reduceMotion={reduceMotion} />
          <FinishMarker reduceMotion={reduceMotion} />

          {deliverySteps.map((step, index) => (
            <DesktopStep
              key={step.number}
              step={step}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* Mobile and tablet */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute bottom-3 left-5 top-3 w-px bg-gradient-to-b from-cyan-300/50 via-blue-400/20 to-cyan-300/50" />

          <motion.div
            initial={
              reduceMotion
                ? undefined
                : {
                    scaleY: 0,
                  }
            }
            whileInView={{
              scaleY: 1,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute bottom-3 left-5 top-3 w-px origin-top bg-gradient-to-b from-cyan-200 via-cyan-400 to-blue-500"
          />

          <div className="space-y-12">
            {deliverySteps.map((step, index) => (
              <MobileStep
                key={step.number}
                step={step}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
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
          Delivery process
        </p>

        <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-300/70" />
      </div>

      <h2 className="mt-5 text-4xl font-black leading-[1] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
        From AI idea to
        <span className="block text-cyan-300">
          working solution.
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
        A focused process for discovering the opportunity,
        testing the concept, connecting the right systems and
        improving the solution after launch.
      </p>
    </motion.header>
  );
}

function DeliveryRoute({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  const routePath =
    "M590 28 C590 78 400 78 400 145 C400 220 780 210 780 285 C780 365 450 375 450 465 C450 545 740 530 740 610 C740 665 590 660 590 700";

  return (
    <svg
      viewBox="0 0 1180 720"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {/* Quiet route */}
      <path
        d={routePath}
        stroke="rgba(103,232,249,0.12)"
        strokeWidth="1.5"
      />

      {/* Initial route reveal */}
      <motion.path
        d={routePath}
        stroke="url(#delivery-route-gradient)"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={
          reduceMotion
            ? undefined
            : {
                pathLength: 0,
              }
        }
        whileInView={{
          pathLength: 1,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 1.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Moving signal */}
      {!reduceMotion && (
        <motion.path
          d={routePath}
          stroke="rgb(103,232,249)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 22"
          animate={{
            strokeDashoffset: [0, -104],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Checkpoints */}
      {checkpoints.map((checkpoint, index) => (
        <g key={`${checkpoint.x}-${checkpoint.y}`}>
          <motion.circle
            cx={checkpoint.x}
            cy={checkpoint.y}
            r="15"
            fill="transparent"
            stroke="rgba(103,232,249,0.18)"
            animate={
              reduceMotion
                ? undefined
                : {
                    r: [12, 19, 12],
                    opacity: [0.2, 0.65, 0.2],
                  }
            }
            transition={{
              duration: 3,
              delay: index * 0.45,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <circle
            cx={checkpoint.x}
            cy={checkpoint.y}
            r="5"
            fill="rgb(103,232,249)"
          />

          <circle
            cx={checkpoint.x}
            cy={checkpoint.y}
            r="2"
            fill="white"
          />
        </g>
      ))}

      <defs>
        <linearGradient
          id="delivery-route-gradient"
          x1="590"
          y1="28"
          x2="590"
          y2="700"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="rgb(165,243,252)" />
          <stop
            offset="0.52"
            stopColor="rgb(34,211,238)"
          />
          <stop
            offset="1"
            stopColor="rgb(59,130,246)"
          />
        </linearGradient>
      </defs>
    </svg>
  );
}

function StartMarker({
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
              y: -12,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      className="absolute left-1/2 top-0 z-10 -translate-x-1/2 text-center"
    >
      <span className="block text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-600">
        Starting point
      </span>

      <span className="mt-2 block text-xs font-semibold text-cyan-100">
        AI Idea
      </span>
    </motion.div>
  );
}

function FinishMarker({
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
              y: 12,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
        delay: 0.4,
      }}
      className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 text-center"
    >
      <span className="block text-xs font-semibold text-cyan-100">
        Working Solution
      </span>

      <span className="mt-2 block text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-600">
        Ready to improve
      </span>
    </motion.div>
  );
}

function DesktopStep({
  step,
  index,
  reduceMotion,
}: {
  step: DeliveryStep;
  index: number;
  reduceMotion: boolean;
}) {
  const entersFromLeft = index === 0 || index === 2;

  return (
    <motion.article
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              x: entersFromLeft ? -30 : 30,
              y: 14,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group absolute z-20 w-[340px] bg-transparent ${step.desktopPosition}`}
    >
      {/* Horizontal connection */}
      <motion.span
        aria-hidden="true"
        initial={
          reduceMotion
            ? undefined
            : {
                scaleX: 0,
              }
        }
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.7,
          delay: 0.4 + index * 0.1,
        }}
        className={`absolute h-px origin-center bg-gradient-to-r from-cyan-300/50 to-transparent ${step.connectorPosition}`}
      />

      <div className="relative">
        <div className="flex items-center gap-4">
          <motion.span
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -4, 0],
                    rotate: [0, 3, -2, 0],
                  }
            }
            transition={{
              duration: 3.5 + index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-200 transition-colors duration-300 group-hover:border-cyan-300/45"
          >
            {step.icon}
          </motion.span>

          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-cyan-300/45">
              STEP {step.number}
            </p>

            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              {step.phase}
            </p>
          </div>
        </div>

        <h3 className="mt-5 text-2xl font-bold leading-tight tracking-[-0.035em] text-white">
          {step.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-400">
          {step.description}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <span className="h-px w-8 bg-cyan-300/45" />

          <span className="text-[8px] font-medium uppercase tracking-[0.18em] text-cyan-100/50">
            {step.phase} phase
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function MobileStep({
  step,
  index,
  reduceMotion,
}: {
  step: DeliveryStep;
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
              x: 20,
              y: 18,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-14"
    >
      <motion.span
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 3,
          delay: index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-[#020711] text-cyan-200"
      >
        {step.icon}
      </motion.span>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-mono text-[9px] tracking-[0.2em] text-cyan-300/50">
          {step.number}
        </span>

        <span className="h-px w-6 bg-cyan-300/35" />

        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          {step.phase}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold tracking-[-0.03em] text-white sm:text-2xl">
        {step.title}
      </h3>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
        {step.description}
      </p>
    </motion.article>
  );
}

function OpportunityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="m16 16 4 4M8.5 11h5M11 8.5v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PrototypeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M8 4h8l3 5-7 11L5 9l3-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M5 9h14M8 4l4 5 4-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IntegrationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="4"
        width="7"
        height="7"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <rect
        x="14"
        y="13"
        width="7"
        height="7"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M10 7.5h3.5A3.5 3.5 0 0 1 17 11v2M14.5 10.5 17 13l2.5-2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LaunchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M14 5c2.8-2 5.5-2 6-2.1.1.5.1 3.2-2 6L13 14l-4-4 5-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M9 10H5l-2 4 5 1M13 14v4l-4 2-1-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <circle
        cx="15.5"
        cy="7.5"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}