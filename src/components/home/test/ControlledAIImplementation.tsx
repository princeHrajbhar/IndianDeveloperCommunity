"use client";

// Standalone transparent module: ControlledAIImplementation

import { motion } from "motion/react";

const aiCapabilities = [
  "AI agents",
  "Business-process automation",
  "Custom AI assistants",
  "Retrieval-augmented generation",
  "Document intelligence",
  "Natural-language processing",
  "Predictive analytics",
  "Computer vision",
  "Model integration",
  "Evaluation and monitoring",
  "Human approval workflows",
  "AI security and governance",
];

const aiPipeline = [
  {
    number: "01",
    title: "Business Data",
    description: "Documents, systems, user input and operational context.",
  },
  {
    number: "02",
    title: "AI Layer",
    description: "Retrieval, reasoning, extraction, classification or prediction.",
  },
  {
    number: "03",
    title: "Human Approval",
    description: "Review points for important, uncertain or sensitive decisions.",
  },
  {
    number: "04",
    title: "Business System",
    description: "CRM, internal platform, support tool, workflow or customer product.",
  },
  {
    number: "05",
    title: "Measured Outcome",
    description: "A result evaluated against an agreed operational objective.",
  },
];

function DownArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M10 3v14m-4-4 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

}

export default function ControlledAIImplementation() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-white sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
      <div className="grid gap-12 xl:grid-cols-[0.78fr_1.22fr] xl:items-center">
        <motion.div
          initial={{
            opacity: 0,
            x: -25,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.85,
          }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-100/75">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-cyan-200" />
            </span>

            Controlled AI implementation
          </div>

          <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            Build AI that works
            <span className="block bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              with your business.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400">
            We design practical AI systems connected to your
            documents, applications, workflows and customer
            experiences—with defined permissions, evaluation and
            human control.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {aiCapabilities.map((capability, index) => (
              <motion.span
                key={capability}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.035,
                }}
                whileHover={{
                  y: -3,
                }}
                className="rounded-full border border-white/[0.08] px-3.5 py-2 text-[11px] text-slate-400 transition hover:border-cyan-300/20 hover:text-cyan-100"
              >
                {capability}
              </motion.span>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-emerald-300/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/70">
              Our implementation principle
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              AI should support people, reduce unnecessary work and
              improve decisions. It should not be deployed without
              clear boundaries, review points and a way to evaluate
              whether it is genuinely useful.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
          }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] p-5 sm:p-7"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

          <div className="flex items-center justify-between border-b border-white/[0.07] pb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/60">
                AI delivery architecture
              </p>

              <p className="mt-2 text-sm font-semibold text-white">
                Controlled intelligence pipeline
              </p>
            </div>

            <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-emerald-300/65">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
              Human oversight active
            </span>
          </div>

          <div className="mt-7 grid gap-3 lg:grid-cols-5">
            {aiPipeline.map((node, index) => (
              <div key={node.number} className="relative">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.12,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="relative z-10 h-full rounded-2xl border border-white/[0.08] p-4 text-center transition hover:border-cyan-300/20"
                >
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/15 font-mono text-[9px] text-cyan-200">
                    {node.number}
                  </span>

                  <h3 className="mt-4 text-xs font-semibold text-white">
                    {node.title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-5 text-slate-600">
                    {node.description}
                  </p>
                </motion.div>

                {index < aiPipeline.length - 1 && (
                  <>
                    <motion.div
                      animate={{
                        x: ["-120%", "220%"],
                      }}
                      transition={{
                        duration: 2.4,
                        delay: index * 0.4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute left-[85%] top-1/2 z-20 hidden h-px w-[55%] bg-gradient-to-r from-transparent via-cyan-300 to-transparent lg:block"
                    />

                    <div className="flex justify-center py-2 text-cyan-300/40 lg:hidden">
                      <DownArrowIcon />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["Control", "Permissions and boundaries"],
              ["Evaluation", "Quality and failure testing"],
              ["Governance", "Traceability and review"],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-xl border border-white/[0.06] p-4"
              >
                <p className="text-[10px] font-semibold text-cyan-200">
                  {title}
                </p>

                <p className="mt-2 text-[10px] leading-5 text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    </section>
  );
}
