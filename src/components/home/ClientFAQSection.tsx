"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  CircleHelp,
  Code2,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

type FAQ = {
  question: string;
  answer: React.ReactNode;
  category: "Solutions" | "Custom Software" | "Marketing" | "Working Together";
};

const faqs: FAQ[] = [
  {
    category: "Solutions",
    question: "Should I buy a ready-made solution or build something custom?",
    answer: (
      <>
        Choose a ready-made solution when the problem is common and you want to
        move quickly. Choose a custom build when your workflow, users,
        integrations or business model need something more specific. If you are
        unsure, we can help you choose the simpler route first.
      </>
    ),
  },
  {
    category: "Solutions",
    question: "What kind of ready-made solutions do you offer?",
    answer: (
      <>
        Our ready-made direction focuses on practical AI agents, business
        software and automation tools designed around repeatable business
        problems. You can browse the current catalogue on the{" "}
        <Link
          href="/solutions"
          className="font-bold text-[#69b7ff] underline decoration-[#69b7ff]/30 underline-offset-4"
        >
          Solutions
        </Link>{" "}
        page.
      </>
    ),
  },
  {
    category: "Custom Software",
    question: "What can you build as a custom solution?",
    answer: (
      <>
        Custom work can combine AI agents, automation, business software, web
        apps, SaaS products, websites and API integrations. The goal is not to
        force your business into a fixed package; it is to design the right
        system around the workflow you actually need.
      </>
    ),
  },
  {
    category: "Custom Software",
    question: "How much does custom software development cost?",
    answer: (
      <>
        Custom software pricing depends on scope, complexity, integrations,
        design requirements and how much needs to be built from scratch. We
        first understand the problem, define the smallest sensible scope and
        then provide a proposal based on that scope rather than guessing a
        one-size-fits-all price.
      </>
    ),
  },
  {
    category: "Custom Software",
    question: "How long does it take to build a custom software product?",
    answer: (
      <>
        The timeline depends on the size of the project and the level of
        complexity. A focused first version can be much faster than a large
        multi-module platform. We normally recommend defining the smallest
        useful release first, then expanding after the core workflow is
        working.
      </>
    ),
  },
  {
    category: "Custom Software",
    question: "Can you build an MVP first instead of the full product?",
    answer: (
      <>
        Yes. For many custom software and SaaS ideas, starting with an MVP is
        the more practical approach. It lets you validate the workflow, user
        experience and core business value before investing in every planned
        feature.
      </>
    ),
  },
  {
    category: "Custom Software",
    question: "Can you integrate with the software and APIs we already use?",
    answer: (
      <>
        Yes, integration can be part of a custom solution when the tools you
        already use provide suitable APIs or integration methods. Typical use
        cases include connecting forms, CRMs, internal systems, email,
        payments, databases and workflow tools so information can move with
        less manual work.
      </>
    ),
  },
  {
    category: "Custom Software",
    question: "Can you automate a process that our team currently does manually?",
    answer: (
      <>
        Often, yes. We first map the existing process, identify repetitive
        decisions and handoffs, then determine what can be automated safely and
        what should remain human-controlled. The aim is to remove unnecessary
        manual work without making the workflow harder to manage.
      </>
    ),
  },
  {
    category: "Working Together",
    question: "What does your development process look like?",
    answer: (
      <>
        We keep it simple: <strong>Understand → Plan → Build → Launch → Scale.</strong>{" "}
        We begin with the business problem, choose the right solution, design
        and implement it, test before launch, and then improve it as the
        business grows.
      </>
    ),
  },
  {
    category: "Working Together",
    question: "Do I need a technical specification before contacting you?",
    answer: (
      <>
        No. You can start with the business outcome you want, the problem you
        are facing or the workflow that is causing friction. We can turn that
        into a clearer technical scope during the planning stage.
      </>
    ),
  },
  {
    category: "Working Together",
    question: "Can you work with our existing team or existing product?",
    answer: (
      <>
        A project can be scoped around an existing system or team rather than
        requiring a complete rebuild. We first review what already exists, what
        should stay, and where new software, automation, AI or integrations
        would add the most value.
      </>
    ),
  },
  {
    category: "Working Together",
    question: "What happens after the software is launched?",
    answer: (
      <>
        Launch is not automatically the end of the work. Depending on the
        project, the next phase may include monitoring, improvements, new
        features, workflow changes or scaling. Ongoing support should be agreed
        as part of the project scope so responsibilities are clear.
      </>
    ),
  },
  {
    category: "Working Together",
    question: "Who owns the software, code and intellectual property?",
    answer: (
      <>
        Ownership, licensing, third-party components and handover terms should
        be defined clearly in the project proposal or contract before work
        begins. That avoids ambiguity and makes sure both sides understand what
        is being delivered.
      </>
    ),
  },
  {
    category: "Working Together",
    question: "How do you handle security and business data?",
    answer: (
      <>
        Security requirements depend on what the product does, what data it
        handles and which systems it connects to. We treat security,
        permissions, data access and appropriate controls as part of solution
        design rather than something added only at the end.
      </>
    ),
  },
  {
    category: "Marketing",
    question: "What digital marketing services do you provide?",
    answer: (
      <>
        The marketing side can cover SEO, social media, PPC / paid advertising,
        email marketing, content, conversion-rate optimisation and analytics.
        The exact mix should depend on the business goal rather than using every
        channel by default.
      </>
    ),
  },
  {
    category: "Marketing",
    question: "Do I need SEO, paid ads, social media or all of them?",
    answer: (
      <>
        Not necessarily all of them. Different channels solve different
        problems. SEO can support long-term discoverability, paid campaigns can
        create faster targeted reach, social can build attention and trust, and
        email can support nurturing and repeat engagement. The right mix
        depends on your audience, offer and growth goal.
      </>
    ),
  },
  {
    category: "Marketing",
    question: "How long does digital marketing take to produce results?",
    answer: (
      <>
        It depends on the channel, starting position, competition, budget,
        website quality and offer. Paid campaigns can generate data relatively
        quickly, while SEO and content usually need a longer horizon. We prefer
        setting channel-specific expectations instead of promising a universal
        result or deadline.
      </>
    ),
  },
  {
    category: "Marketing",
    question: "Can you improve an existing website instead of building a new one?",
    answer: (
      <>
        Yes, when the existing site is a good foundation. The work may focus on
        conversion improvements, content, SEO, analytics, performance,
        integrations or selected redesigns rather than replacing the entire
        website.
      </>
    ),
  },
];

const categories = [
  { label: "Solutions", icon: Sparkles },
  { label: "Custom Software", icon: Code2 },
  { label: "Marketing", icon: Megaphone },
  { label: "Working Together", icon: Workflow },
] as const;

export default function ClientFAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [filter, setFilter] = useState<string>("All");
  const reduceMotion = useReducedMotion();

  const visibleFaqs =
    filter === "All" ? faqs : faqs.filter((faq) => faq.category === filter);

  return (
    <section className="relative overflow-hidden bg-[#030712] py-16 text-white sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(96,165,250,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,.06) 1px,transparent 1px)",
            backgroundSize: "84px 84px",
            maskImage: "linear-gradient(to bottom, black, transparent 92%)",
          }}
        />
        <div className="absolute -right-32 top-10 h-[320px] w-[320px] rounded-full bg-[#0b1b34]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          {/* LEFT — sticky context */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-2"
            >
              <CircleHelp size={13} className="text-[#69b7ff]" />
              <span className="text-xs font-black uppercase tracking-[0.12em] text-[#69b7ff]">
                Frequently Asked Questions
              </span>
            </motion.div>

            <h2 className="mt-5 max-w-[620px] text-[clamp(2.8rem,4.8vw,5rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-white">
              Questions before you
              <span className="block text-[#69b7ff]">make a decision.</span>
            </h2>

            <p className="mt-5 max-w-[500px] text-[16px] leading-8 text-slate-400">
              Clear answers about ready-made solutions, custom software,
              automation, AI, digital marketing and what it is like to work
              together.
            </p>

            <div className="mt-7 rounded-[24px] border border-white/[0.08] bg-[#07111f] p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-[#69b7ff]">
                  <ShieldCheck size={17} />
                </span>

                <div>
                  <p className="text-sm font-bold text-white">
                    No inflated promises.
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Timelines, pricing, ownership, security and results depend
                    on the actual scope. The answers below are intentionally
                    practical instead of making promises before we understand
                    the project.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/book-consultation"
              className="group mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[#1769ff] px-6 text-sm font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Still Have a Question?
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* RIGHT */}
          <div>
            {/* category filter */}
            <div className="flex flex-wrap gap-2 border-b border-white/[0.08] pb-5">
              <button
                type="button"
                onClick={() => {
                  setFilter("All");
                  setOpenIndex(0);
                }}
                className={[
                  "rounded-full border px-4 py-2 text-xs font-bold transition-colors",
                  filter === "All"
                    ? "border-[#3b82f6] bg-[#1769ff] text-white"
                    : "border-white/[0.10] bg-[#07111f] text-slate-300 hover:border-[#3b82f6]/50 hover:bg-[#0b1c34] hover:text-white",
                ].join(" ")}
              >
                All Questions
              </button>

              {categories.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setFilter(label);
                    setOpenIndex(0);
                  }}
                  className={[
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-colors",
                    filter === label
                      ? "border-[#3b82f6] bg-[#12305a] text-white shadow-[0_0_0_1px_rgba(59,130,246,0.08)]"
                      : "border-white/[0.10] bg-[#07111f] text-slate-300 hover:border-[#3b82f6]/50 hover:bg-[#0b1c34] hover:text-white",
                  ].join(" ")}
                >
                  <Icon size={12} />
                  {label}
                </button>
              ))}
            </div>

            {/* FAQs */}
            <div className="mt-2">
              {visibleFaqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <article
                    key={`${filter}-${faq.question}`}
                    className="border-b border-white/[0.08]"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="group grid w-full grid-cols-[1fr_auto] items-start gap-5 py-5 text-left sm:py-6"
                    >
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#69b7ff]">
                          {faq.category}
                        </p>

                        <h3
                          className={[
                            "mt-2 text-[17px] font-bold leading-7 transition-colors sm:text-[18px]",
                            isOpen
                              ? "text-white"
                              : "text-slate-300 group-hover:text-white",
                          ].join(" ")}
                        >
                          {faq.question}
                        </h3>
                      </div>

                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease }}
                        className={[
                          "mt-1 flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                          isOpen
                            ? "border-[#3b82f6]/40 bg-[#0b1c34] text-[#69b7ff]"
                            : "border-white/[0.08] bg-white/[0.03] text-slate-500",
                        ].join(" ")}
                      >
                        <ChevronDown size={15} />
                      </motion.span>
                    </button>

                    {/* Answer remains in DOM; motion only changes presentation */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={
                            reduceMotion
                              ? false
                              : { height: 0, opacity: 0, y: -6 }
                          }
                          animate={{ height: "auto", opacity: 1, y: 0 }}
                          exit={{ height: 0, opacity: 0, y: -4 }}
                          transition={{ duration: 0.32, ease }}
                          className="overflow-hidden"
                        >
                          <div className="max-w-[820px] pb-6 pr-10 text-[15px] leading-7 text-slate-400">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>

            {/* SEO/context footer */}
            <div className="mt-7 grid gap-3 rounded-[24px] border border-white/[0.08] bg-[#07111f] p-5 sm:grid-cols-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.1em] text-[#69b7ff]">
                  Ready-made
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Explore products you can deploy faster.
                </p>
              </div>

              <div className="border-white/[0.08] sm:border-l sm:pl-5">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-[#69b7ff]">
                  Custom
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Build software around a specific workflow.
                </p>
              </div>

              <div className="border-white/[0.08] sm:border-l sm:pl-5">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-[#69b7ff]">
                  Growth
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Improve visibility, leads and conversions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}