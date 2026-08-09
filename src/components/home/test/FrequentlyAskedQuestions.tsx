"use client";

// Standalone transparent module: FrequentlyAskedQuestions

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const faqs = [
  {
    question: "How much does a software development project cost?",
    answer:
      "Cost depends on the product scope, number of user roles, integrations, data requirements, security needs and delivery risk. We begin with a focused discovery process and provide a written scope and estimate before full development.",
  },
  {
    question: "How long does it take to develop an application?",
    answer:
      "A focused prototype may take several weeks, while a production platform can require several months. The most reliable timeline is created after the main workflows, integrations and quality expectations are defined.",
  },
  {
    question: "Can you improve an existing software product?",
    answer:
      "Yes. An engagement can begin with a technical and product review covering architecture, performance, usability, security, maintainability and delivery priorities.",
  },
  {
    question: "Do you work with startups or established companies?",
    answer:
      "QuantumFinix is designed to support founders validating new products and established teams exploring modernization, automation or focused AI initiatives.",
  },
  {
    question: "Who owns the source code?",
    answer:
      "Ownership, third-party licenses and intellectual-property terms should be clearly defined in the project agreement. Our intention is to keep ownership arrangements transparent before development begins.",
  },
  {
    question: "How do you protect confidential information?",
    answer:
      "Depending on the engagement, protection may include an NDA, controlled access, separate environments, encrypted services, least-privilege permissions and documented data-handling rules.",
  },
  {
    question: "Can AI be integrated into our existing systems?",
    answer:
      "Often, yes. The first step is to review the available APIs, data permissions, workflows and business risks. AI should be integrated only where it produces a useful and controllable outcome.",
  },
  {
    question: "Do you provide maintenance after launch?",
    answer:
      "Post-launch work can include monitoring, issue resolution, dependency updates, performance improvements, feature development and technical support based on an agreed maintenance plan.",
  },
];

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

export default function FrequentlyAskedQuestions() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative isolate overflow-hidden py-24 text-white sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
      <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
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
            duration: 0.8,
          }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-cyan-100/70">
            Frequently asked questions
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
            Clear answers before
            <span className="block bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              the first conversation.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-500">
            These answers explain our intended approach. Final scope,
            ownership, confidentiality and commercial terms are always
            confirmed in the project agreement.
          </p>

          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-cyan-100"
          >
            Ask another question
            <ArrowIcon />
          </Link>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.045,
                }}
                className={[
                  "overflow-hidden rounded-2xl border transition-colors",
                  open
                    ? "border-cyan-300/20"
                    : "border-white/[0.07]",
                ].join(" ")}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() =>
                    setOpenIndex(open ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
                >
                  <span className="flex items-start gap-4">
                    <span className="mt-0.5 font-mono text-[9px] text-cyan-300/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm font-semibold text-slate-100 sm:text-base">
                      {faq.question}
                    </span>
                  </span>

                  <motion.span
                    animate={{
                      rotate: open ? 45 : 0,
                    }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-cyan-200"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-white/[0.06] px-5 py-5 pl-12 text-sm leading-7 text-slate-500 sm:px-6 sm:pl-16">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
    </section>
  );
}
