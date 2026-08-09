"use client";

import Link from "next/link";
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

type ProblemCard = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  outcomes: string[];
  href: string;
  cta: string;
  icon: ReactNode;
};

const problems: ProblemCard[] = [
  {
    number: "01",
    eyebrow: "Product development",
    title: "Launch a New Digital Product",
    description:
      "Move from an early idea to a focused, validated and scalable product without losing momentum in unnecessary complexity.",
    outcomes: [
      "Clarify the product opportunity",
      "Validate the core experience",
      "Build a production-ready foundation",
    ],
    href: "/services/product-development",
    cta: "Build your product",
    icon: <RocketIcon />,
  },
  {
    number: "02",
    eyebrow: "Software modernization",
    title: "Upgrade Existing Software",
    description:
      "Transform slow, outdated or difficult-to-maintain software into a faster, safer and more adaptable digital platform.",
    outcomes: [
      "Improve speed and reliability",
      "Strengthen security and usability",
      "Reduce long-term technical debt",
    ],
    href: "/services/software-modernization",
    cta: "Modernize your platform",
    icon: <ModernizeIcon />,
  },
  {
    number: "03",
    eyebrow: "AI automation",
    title: "Automate Repetitive Work",
    description:
      "Use intelligent workflows, AI agents and system integrations to reduce manual effort while keeping people in control.",
    outcomes: [
      "Remove repetitive operational tasks",
      "Connect disconnected business systems",
      "Create faster, more consistent workflows",
    ],
    href: "/services/ai-automation",
    cta: "Explore automation",
    icon: <AutomationIcon />,
  },
  {
    number: "04",
    eyebrow: "Engineering capacity",
    title: "Extend Your Development Team",
    description:
      "Add focused engineering capability to your roadmap without waiting through a long recruitment and onboarding cycle.",
    outcomes: [
      "Access skills for a defined initiative",
      "Accelerate delivery without losing quality",
      "Work with a flexible technical team",
    ],
    href: "/services/team-extension",
    cta: "Expand your team",
    icon: <TeamIcon />,
  },
];

export default function ProblemsOutcomes() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-transparent py-24 text-white sm:py-28 lg:py-32">
      {/* Section divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
      />

      {/* Local glow only — not a section background */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [0.88, 1.12, 0.88],
                opacity: [0.08, 0.2, 0.08],
                x: [0, 60, 0],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-56 top-16 -z-10 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-[140px]"
      />

      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
        {/* Heading */}
        <div className="grid gap-10 lg:grid-cols-[1fr_0.62fr] lg:items-end">
          <motion.div
            initial={{
              opacity: 0,
              y: 28,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-100/75 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-cyan-200" />
              </span>

              Problems first · Technology second
            </div>

            <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl">
              Technology should solve
              <span className="block bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                real business problems.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              delay: 0.12,
            }}
          >
            <p className="text-base leading-8 text-slate-400">
              The right solution should make your organization
              faster, clearer and easier to operate. We begin
              with the outcome you need, then select the
              technology that supports it.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-600">
              <span className="h-px w-12 bg-gradient-to-r from-cyan-300/60 to-transparent" />
              Find the path that matches your situation
            </div>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {problems.map((problem, index) => (
            <ProblemOutcomeCard
              key={problem.number}
              problem={problem}
              index={index}
            />
          ))}
        </div>

        {/* Bottom action */}
        <motion.div
          initial={{
            opacity: 0,
            y: 26,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8"
        >
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/[0.08] blur-[80px]"
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300/70">
                Not sure where your challenge fits?
              </p>

              <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
                Start with the problem. We will help define the
                technical path.
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                A focused conversation can uncover the real
                constraint, identify what should be tested first
                and prevent unnecessary development work.
              </p>
            </div>

            <Link
              href="/book-consultation"
              className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 px-6 text-sm font-bold text-[#020711] shadow-[0_0_35px_rgba(34,211,238,0.18)] transition hover:-translate-y-0.5"
            >
              Discuss your challenge

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProblemOutcomeCard({
  problem,
  index,
}: {
  problem: ProblemCard;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, {
    stiffness: 170,
    damping: 24,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 170,
    damping: 24,
  });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const glow = useMotionTemplate`
    radial-gradient(
      430px circle at ${glowX}% ${glowY}%,
      rgba(34, 211, 238, 0.11),
      transparent 66%
    )
  `;

  function handlePointerMove(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    const bounds =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - bounds.left) / bounds.width;

    const y =
      (event.clientY - bounds.top) / bounds.height;

    glowX.set(x * 100);
    glowY.set(y * 100);

    if (!reduceMotion) {
      rawRotateX.set((0.5 - y) * 5);
      rawRotateY.set((x - 0.5) * 5);
    }
  }

  function handlePointerLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
            }
      }
      className="group relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#06101c]/50 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-colors duration-300 hover:border-cyan-300/20 sm:p-8"
    >
      {/* Cursor glow */}
      <motion.div
        aria-hidden="true"
        style={{
          background: glow,
        }}
        className="pointer-events-none absolute inset-0"
      />

      {/* Top light */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -right-28 h-64 w-64 rounded-full bg-blue-500/[0.07] blur-[85px]"
      />

      <div
        className="relative flex h-full flex-col"
        style={{
          transform: "translateZ(28px)",
        }}
      >
        <div className="flex items-start justify-between gap-6">
          <span className="flex h-13 w-13 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] p-3 text-cyan-200 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
            {problem.icon}
          </span>

          <span className="font-mono text-[11px] tracking-[0.22em] text-cyan-300/35">
            {problem.number}
          </span>
        </div>

        <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300/65">
          {problem.eyebrow}
        </p>

        <h3 className="mt-3 max-w-xl text-2xl font-bold tracking-[-0.035em] text-white sm:text-3xl">
          {problem.title}
        </h3>

        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
          {problem.description}
        </p>

        <div className="mt-7 space-y-3">
          {problem.outcomes.map((outcome) => (
            <div
              key={outcome}
              className="flex items-start gap-3 text-sm text-slate-300"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200">
                <CheckIcon />
              </span>

              {outcome}
            </div>
          ))}
        </div>

        <Link
          href={problem.href}
          className="group/link mt-auto flex items-center justify-between border-t border-white/[0.07] pt-6 text-sm font-semibold text-cyan-100"
        >
          {problem.cta}

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-200 transition duration-300 group-hover/link:translate-x-1 group-hover/link:border-cyan-300/30 group-hover/link:bg-cyan-300/[0.11]">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-3 w-3"
      aria-hidden="true"
    >
      <path
        d="m5.5 10.2 2.7 2.7 6.2-6.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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

function RocketIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M14 5c2.3-1.7 4.7-1.8 6-1.7.1 1.3 0 3.7-1.7 6L13 14.6l-3.6-3.6L14 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="m9.4 11-3.6.7-2.5 2.5 4.3 1.1M13 14.6l-.7 3.6-2.5 2.5-1.1-4.3M15.5 8.5h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ModernizeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M20 7v5h-5M4 17v-5h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M6.1 8.3A7 7 0 0 1 18.6 7M17.9 15.7A7 7 0 0 1 5.4 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M9 12h6M12 9v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AutomationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <rect
        x="7"
        y="7"
        width="10"
        height="10"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6 8 8M16 16l2.4 2.4M18.4 5.6 16 8M8 16l-2.4 2.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <circle
        cx="12"
        cy="12"
        r="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <circle
        cx="9"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M3.5 19c.5-3.3 2.3-5 5.5-5s5 1.7 5.5 5M16 8h5M18.5 5.5v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M15.5 14.4c2.9.2 4.6 1.7 5 4.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}