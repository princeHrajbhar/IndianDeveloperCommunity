"use client";

// Standalone transparent module: IndustrySolutionPathways

import Link from "next/link";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const industries = [
  {
    code: "PS",
    title: "Professional Services",
    description:
      "Knowledge assistants, document workflows, client portals and internal operations automation.",
    examples: ["Knowledge access", "Document workflows", "Client operations"],
  },
  {
    code: "ED",
    title: "Education",
    description:
      "Learning platforms, research collaboration systems and practical AI-assisted education tools.",
    examples: ["Learning platforms", "Research systems", "Student workflows"],
  },
  {
    code: "EC",
    title: "E-commerce",
    description:
      "Product discovery, recommendation experiences, service automation and operational dashboards.",
    examples: ["Recommendations", "Support automation", "Commerce analytics"],
  },
  {
    code: "LG",
    title: "Logistics",
    description:
      "Shipment visibility, operational workflows, fleet tools and decision-support systems.",
    examples: ["Shipment tracking", "Operations automation", "Route intelligence"],
  },
  {
    code: "RE",
    title: "Real Estate",
    description:
      "Property platforms, lead workflows, document processing and portfolio-management tools.",
    examples: ["Property platforms", "Lead workflows", "Document processing"],
  },
  {
    code: "MF",
    title: "Manufacturing",
    description:
      "Operational dashboards, quality workflows, internal platforms and predictive system concepts.",
    examples: ["Operations visibility", "Quality workflows", "Predictive insights"],
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

function ModuleCard({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion();
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 170, damping: 24 });
  const rotateY = useSpring(rawRotateY, { stiffness: 170, damping: 24 });

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    rawRotateX.set((0.5 - y) * 4);
    rawRotateY.set((x - 0.5) * 4);
  }

  function handlePointerLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      whileHover={{ y: -6 }}
      className="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/[0.08] p-6 transition-colors hover:border-cyan-300/20 sm:p-7"
    >
      <div className="relative flex h-full flex-col">{children}</div>
    </motion.article>
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

export default function IndustrySolutionPathways() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-white sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
      <ModuleHeader
        eyebrow="Industry solution pathways"
        title="Technology designed around"
        gradientTitle="real operating environments."
        description="As a founding-year company, we present the solution areas we are prepared to explore—not unverified claims of deep sector experience."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {industries.map((industry, index) => (
          <ModuleCard key={industry.code} delay={index * 0.07}>
            <div className="flex items-start justify-between">
              <motion.span
                whileHover={{
                  rotate: 8,
                  scale: 1.08,
                }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/15 font-mono text-xs text-cyan-200"
              >
                {industry.code}
              </motion.span>

              <span className="text-[9px] uppercase tracking-[0.18em] text-slate-700">
                Solution area {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mt-7 text-2xl font-bold tracking-[-0.03em] text-white">
              {industry.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              {industry.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {industry.examples.map((example) => (
                <span
                  key={example}
                  className="rounded-full border border-white/[0.07] px-3 py-1.5 text-[10px] text-slate-500"
                >
                  {example}
                </span>
              ))}
            </div>

            <Link
              href={`/industries/${industry.title
                .toLowerCase()
                .replaceAll(" ", "-")}`}
              className="group mt-8 flex items-center justify-between border-t border-white/[0.07] pt-5 text-sm font-semibold text-cyan-100"
            >
              Explore possible solutions

              <span className="transition-transform group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </ModuleCard>
        ))}
      </div>
    </div>
    </section>
  );

}
