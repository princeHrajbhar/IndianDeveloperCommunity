"use client";

import type { ReactNode } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

type AISolution = {
  number: string;
  title: string;
  description: string;
  applications: string[];
  icon: ReactNode;
};

const solutions: AISolution[] = [
  {
    number: "01",
    title: "AI Agents & Workflow Automation",
    description:
      "Build controlled AI agents that complete repetitive tasks, coordinate workflows and work with your existing business systems.",
    applications: [
      "Lead qualification",
      "Customer request processing",
      "Internal task automation",
      "Report generation",
    ],
    icon: <AgentIcon />,
  },
  {
    number: "02",
    title: "AI Knowledge Assistants",
    description:
      "Help employees and customers find reliable answers using your approved documents, policies and product information.",
    applications: [
      "Internal knowledge search",
      "Customer self-service",
      "Product support",
      "Policy and document search",
    ],
    icon: <KnowledgeIcon />,
  },
  {
    number: "03",
    title: "Intelligent Document Processing",
    description:
      "Extract, organize and validate useful information from documents that normally require manual review.",
    applications: [
      "Invoice processing",
      "Contract extraction",
      "Form classification",
      "Document comparison",
    ],
    icon: <DocumentIcon />,
  },
  {
    number: "04",
    title: "Custom AI Applications",
    description:
      "Develop focused AI products and features designed around your users, data, workflows and business objectives.",
    applications: [
      "Recommendation systems",
      "Predictive analytics",
      "Conversational products",
      "AI-powered SaaS",
    ],
    icon: <ApplicationIcon />,
  },
];

export default function AISolutionsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="ai-solutions"
      className="relative scroll-mt-24 bg-transparent py-20 text-white sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.62fr] lg:items-end">
          <motion.div
            initial={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 20,
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
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/70">
              Practical AI solutions
            </p>

            <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[1] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              AI designed around
              <span className="block text-cyan-300">
                how your business works.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 18,
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
              duration: 0.65,
              delay: 0.1,
            }}
            className="max-w-xl text-sm leading-7 text-slate-400 sm:text-base"
          >
            We identify where AI can reduce manual work,
            improve access to information and create more
            efficient customer and operational experiences.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-5 md:grid-cols-2">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution.number}
              solution={solution}
              index={index}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionCard({
  solution,
  index,
  reduceMotion,
}: {
  solution: AISolution;
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
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
            }
      }
      className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-transparent p-6 transition-colors duration-300 hover:border-cyan-300/25 sm:p-7"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/15 text-cyan-200">
          {solution.icon}
        </span>

        <span className="font-mono text-[10px] tracking-[0.18em] text-slate-700">
          {solution.number}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-bold tracking-[-0.025em] text-white sm:text-2xl">
        {solution.title}
      </h3>

      <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
        {solution.description}
      </p>

      <div className="mt-6 border-t border-white/[0.07] pt-5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.19em] text-slate-600">
          Common applications
        </p>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {solution.applications.map((application) => (
            <li
              key={application}
              className="flex items-start gap-2.5 text-xs leading-5 text-slate-400"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/70" />

              {application}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function AgentIcon() {
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
        d="M9 12h.01M15 12h.01M9.5 15h5M12 2.5V6M12 18v3.5M2.5 12H6M18 12h3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KnowledgeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M5 4.5h9a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3v-12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M8 19.5v-12h9M9 10h5M9 13h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M6 3h8l4 4v14H6V3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M14 3v5h5M9 12h6M9 15h6M9 18h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ApplicationIcon() {
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
        width="18"
        height="16"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M3 9h18M7 6.5h.01M10 6.5h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="m12 11 1.1 3.8L17 16l-3.9 1.2L12 21l-1.1-3.8L7 16l3.9-1.2L12 11Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}