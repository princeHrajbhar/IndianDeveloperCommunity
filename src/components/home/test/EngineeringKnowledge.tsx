"use client";

// Standalone transparent module: EngineeringKnowledge

import Link from "next/link";
import { motion } from "motion/react";

const insights = [
  {
    category: "Software planning",
    title: "How Much Does Custom Software Development Cost?",
    description:
      "A practical framework for understanding the factors that affect scope, effort, risk and delivery cost.",
    href: "/insights/custom-software-development-cost",
    readTime: "Planning guide",
    number: "01",
  },
  {
    category: "Applied AI",
    title: "AI Agent or Traditional Chatbot: What Does Your Business Need?",
    description:
      "Understand the difference between scripted conversations, grounded assistants and action-oriented AI agents.",
    href: "/insights/ai-agent-vs-chatbot",
    readTime: "Decision guide",
    number: "02",
  },
  {
    category: "AI engineering",
    title: "Building a Secure Retrieval-Augmented Generation Application",
    description:
      "Key design decisions for data access, source grounding, evaluation, permissions and human oversight.",
    href: "/insights/secure-rag-application",
    readTime: "Technical guide",
    number: "03",
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

export default function EngineeringKnowledge() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-white sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
      <ModuleHeader
        eyebrow="Engineering knowledge"
        title="Practical insights for"
        gradientTitle="better technical decisions."
        description="Our editorial focus is not volume. It is clear, useful material that helps founders and teams understand software, AI, delivery risk and product planning."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {insights.map((article, index) => (
          <motion.article
            key={article.title}
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
              delay: index * 0.08,
            }}
            whileHover={{
              y: -7,
            }}
            className="group relative min-h-[390px] overflow-hidden rounded-[2rem] border border-white/[0.08] p-6 transition-colors hover:border-cyan-300/20 sm:p-7"
          >
            <div className="absolute right-5 top-5 font-mono text-[10px] tracking-[0.2em] text-cyan-300/30">
              {article.number}
            </div>

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent opacity-0 transition group-hover:opacity-100" />

            <div className="flex h-full flex-col">
              <span className="w-fit rounded-full border border-cyan-300/15 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-cyan-200/65">
                {article.category}
              </span>

              <h3 className="mt-7 text-2xl font-bold leading-tight tracking-[-0.035em] text-white">
                {article.title}
              </h3>

              <p className="mt-5 text-sm leading-7 text-slate-500">
                {article.description}
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-5">
                <span className="text-[10px] uppercase tracking-[0.17em] text-slate-600">
                  {article.readTime}
                </span>

                <Link
                  href={article.href}
                  aria-label={`Read ${article.title}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/15 text-cyan-200 transition group-hover:translate-x-1 group-hover:border-cyan-300/30"
                >
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-9 flex justify-center">
        <Link
          href="/insights"
          className="group inline-flex items-center gap-3 text-sm font-semibold text-cyan-100"
        >
          Explore all insights

          <span className="transition group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </div>
    </section>
  );
}
