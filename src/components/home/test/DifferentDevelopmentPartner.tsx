"use client";

// Standalone transparent module: DifferentDevelopmentPartner

import { motion } from "motion/react";

const differentiators = [
  {
    number: "01",
    title: "Business-First Engineering",
    description:
      "We connect technical decisions to a clear product, operational or commercial objective.",
    detail:
      "Architecture exists to support the outcome—not to make the project unnecessarily complicated.",
    icon: "↗",
    size: "lg:col-span-2",
  },
  {
    number: "02",
    title: "Founder-Led Technical Direction",
    description:
      "Early projects receive direct attention from the people shaping QuantumFinix.",
    detail:
      "You receive direct communication, fewer handovers and faster technical decisions.",
    icon: "◎",
    size: "",
  },
  {
    number: "03",
    title: "Transparent Delivery",
    description:
      "Progress is demonstrated through visible iterations, written decisions and regular reviews.",
    detail:
      "You can see what is being built, what changed and what happens next.",
    icon: "◫",
    size: "",
  },
  {
    number: "04",
    title: "Security by Design",
    description:
      "Access control, data handling, testing and system boundaries are considered from the beginning.",
    detail:
      "Security is treated as part of product design rather than a final checklist.",
    icon: "◇",
    size: "",
  },
  {
    number: "05",
    title: "Scalable Foundations",
    description:
      "We design products so features, users, integrations and infrastructure can evolve responsibly.",
    detail:
      "The goal is practical scalability without premature engineering overhead.",
    icon: "⌁",
    size: "",
  },
  {
    number: "06",
    title: "Post-Launch Continuity",
    description:
      "A launch is a transition into monitoring, learning, improvement and product growth.",
    detail:
      "We plan for maintenance and iteration before the first production release.",
    icon: "∞",
    size: "lg:col-span-2",
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

export default function DifferentDevelopmentPartner() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-white sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
      <ModuleHeader
        eyebrow="A different kind of development partner"
        title="Technical decisions shaped by"
        gradientTitle="long-term results."
        description="QuantumFinix is being built around a simple principle: software should remain useful after the first release, and every engineering decision should support a real objective."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {differentiators.map((item, index) => (
          <motion.article
            key={item.number}
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              delay: index * 0.07,
            }}
            whileHover={{
              y: -7,
            }}
            className={[
              "group relative min-h-72 overflow-hidden rounded-[2rem] border border-white/[0.08] p-6 transition-colors hover:border-cyan-300/20 sm:p-7",
              item.size,
            ].join(" ")}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 28 + index * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-dashed border-cyan-300/[0.07]"
            />

            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/15 text-xl text-cyan-200">
                  {item.icon}
                </span>

                <span className="font-mono text-[10px] tracking-[0.22em] text-cyan-300/35">
                  {item.number}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-bold tracking-[-0.025em] text-white">
                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                {item.description}
              </p>

              <p className="mt-auto border-t border-white/[0.07] pt-5 text-xs leading-6 text-slate-600">
                {item.detail}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
    </section>
  );
}
