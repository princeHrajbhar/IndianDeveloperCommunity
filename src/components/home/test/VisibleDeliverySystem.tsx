"use client";

// Standalone transparent module: VisibleDeliverySystem

import Link from "next/link";
import { motion } from "motion/react";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Understand the business problem, users, constraints and desired outcome.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Define priorities, scope, architecture, delivery stages and commercial assumptions.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Create journeys, flows, wireframes and prototypes before committing to full development.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Build the product in reviewable iterations with visible progress and technical documentation.",
  },
  {
    number: "05",
    title: "Validation",
    description:
      "Test functionality, usability, performance, integrations, security and edge cases.",
  },
  {
    number: "06",
    title: "Launch",
    description:
      "Deploy safely, monitor the release and prepare the people responsible for operating it.",
  },
  {
    number: "07",
    title: "Growth",
    description:
      "Measure, maintain, improve and scale the product based on real usage and new priorities.",
  },
];

function ModuleHeader({
  eyebrow,
  title,
  gradientTitle,
  description,
}: {
  eyebrow: string;
  title: string;
  gradientTitle: string;
  description: string;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.58fr] lg:items-end">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-100/75">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-cyan-200" />
          </span>
          {eyebrow}
        </div>

        <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl">
          {title}
          <span className="block bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            {gradientTitle}
          </span>
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.12 }}
        className="text-base leading-8 text-slate-400"
      >
        {description}
      </motion.p>
    </div>
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

export default function VisibleDeliverySystem() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-white sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
      <ModuleHeader
        eyebrow="A visible delivery system"
        title="From idea to launch"
        gradientTitle="and beyond."
        description="A structured process reduces uncertainty without making the engagement rigid. Each stage produces a decision, deliverable or validated learning."
      />

      {/* Desktop timeline */}
      <div className="relative mt-16 hidden lg:block">
        <div className="absolute left-[7%] right-[7%] top-7 h-px bg-white/[0.08]">
          <motion.div
            initial={{
              scaleX: 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-px origin-left bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300"
          />
        </div>

        <div className="grid grid-cols-7 gap-3">
          {processSteps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{
                opacity: 0,
                y: 22,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.15 + index * 0.1,
              }}
              className="group relative pt-16"
            >
              <motion.div
                whileHover={{
                  scale: 1.12,
                }}
                className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-300/20 font-mono text-[10px] text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
              >
                {step.number}
              </motion.div>

              <div className="rounded-2xl border border-white/[0.07] p-4 text-center transition group-hover:-translate-y-1 group-hover:border-cyan-300/20">
                <h3 className="text-sm font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-xs leading-5 text-slate-600">
                  {step.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Mobile timeline */}
      <div className="relative mt-12 space-y-4 lg:hidden">
        <div className="absolute bottom-8 left-6 top-8 w-px bg-gradient-to-b from-cyan-300/50 via-blue-400/20 to-transparent" />

        {processSteps.map((step, index) => (
          <motion.article
            key={step.number}
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.06,
            }}
            className="relative flex gap-5"
          >
            <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 font-mono text-[10px] text-cyan-200">
              {step.number}
            </span>

            <div className="flex-1 rounded-2xl border border-white/[0.07] p-5">
              <h3 className="font-semibold text-white">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {step.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/process"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-cyan-300/20 px-6 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-300/40"
        >
          See how we work

          <span className="transition-transform group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </div>
    </section>
  );
}
