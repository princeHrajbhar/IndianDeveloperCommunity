"use client";

import Image from "next/image";
import Link from "next/link";
import type {
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { useState } from "react";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

/* -------------------------------------------------------------------------- */
/*                                   Content                                  */
/* -------------------------------------------------------------------------- */

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

type Technology = {
  name: string;
  logo: string;
};

type TechnologyCategory = {
  id: string;
  label: string;
  description: string;
  technologies: Technology[];
};

const technologyCategories: TechnologyCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    description:
      "Fast, maintainable and accessible interfaces for web applications and digital products.",
    technologies: [
      {
        name: "React",
        logo: "https://cdn.simpleicons.org/react/61DAFB",
      },
      {
        name: "Next.js",
        logo: "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.simpleicons.org/typescript/3178C6",
      },
      {
        name: "Tailwind CSS",
        logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    description:
      "APIs, application services and data systems designed around reliability and maintainability.",
    technologies: [
      {
        name: "Node.js",
        logo: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
      },
      {
        name: "Python",
        logo: "https://cdn.simpleicons.org/python/3776AB",
      },
      {
        name: "FastAPI",
        logo: "https://cdn.simpleicons.org/fastapi/009688",
      },
      {
        name: "PostgreSQL",
        logo: "https://cdn.simpleicons.org/postgresql/4169E1",
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    description:
      "Native and cross-platform products for customer, workforce and operational use cases.",
    technologies: [
      {
        name: "Flutter",
        logo: "https://cdn.simpleicons.org/flutter/02569B",
      },
      {
        name: "React Native",
        logo: "https://cdn.simpleicons.org/react/61DAFB",
      },
      {
        name: "Swift",
        logo: "https://cdn.simpleicons.org/swift/F05138",
      },
      {
        name: "Kotlin",
        logo: "https://cdn.simpleicons.org/kotlin/7F52FF",
      },
    ],
  },
  {
    id: "ai",
    label: "AI",
    description:
      "Models, orchestration and evaluation tools selected according to the product and data requirements.",
    technologies: [
      {
        name: "PyTorch",
        logo: "https://cdn.simpleicons.org/pytorch/EE4C2C",
      },
      {
        name: "TensorFlow",
        logo: "https://cdn.simpleicons.org/tensorflow/FF6F00",
      },
      {
        name: "LangChain",
        logo: "https://cdn.simpleicons.org/langchain/1C3C3C",
      },
      {
        name: "OpenAI",
        logo: "https://cdn.simpleicons.org/openai/FFFFFF",
      },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    description:
      "Cloud services chosen according to deployment, governance, integration and operational needs.",
    technologies: [
      {
        name: "AWS",
        logo: "https://cdn.simpleicons.org/amazonwebservices/FF9900",
      },
      {
        name: "Microsoft Azure",
        logo: "https://cdn.simpleicons.org/microsoftazure/0078D4",
      },
      {
        name: "Google Cloud",
        logo: "https://cdn.simpleicons.org/googlecloud/4285F4",
      },
      {
        name: "Vercel",
        logo: "https://cdn.simpleicons.org/vercel/FFFFFF",
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    description:
      "Deployment automation, environments, monitoring and infrastructure management.",
    technologies: [
      {
        name: "Docker",
        logo: "https://cdn.simpleicons.org/docker/2496ED",
      },
      {
        name: "Kubernetes",
        logo: "https://cdn.simpleicons.org/kubernetes/326CE5",
      },
      {
        name: "GitHub Actions",
        logo: "https://cdn.simpleicons.org/githubactions/2088FF",
      },
      {
        name: "Cloudflare",
        logo: "https://cdn.simpleicons.org/cloudflare/F38020",
      },
    ],
  },
];

const collaborationStandards = [
  {
    title: "Clear technical reasoning",
    description:
      "Recommendations should explain the trade-offs, not hide them.",
  },
  {
    title: "Visible progress",
    description:
      "Work should be demonstrated in usable increments rather than revealed at the end.",
  },
  {
    title: "Responsible expectations",
    description:
      "Risks, uncertainty and limitations should be communicated honestly.",
  },
];

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

/* -------------------------------------------------------------------------- */
/*                              Combined component                            */
/* -------------------------------------------------------------------------- */

export default function RemainingHomeSections() {
  return (
    <>
      <WhyChooseQuantumFinix />
      <DevelopmentProcess />
      <DedicatedAICapability />
      <IndustriesSection />
      <TechnologyStackSection />
      <TestimonialsSection />
      <AboutQuantumFinix />
      <InsightsSection />
      <FAQSection />
      <FinalProjectCTA />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                              8. Why choose us                              */
/* -------------------------------------------------------------------------- */

export function WhyChooseQuantumFinix() {
  return (
    <TransparentSection>
      <SectionHeader
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
              "group relative min-h-72 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#06101c]/50 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.2)] backdrop-blur-2xl transition-colors hover:border-cyan-300/20 sm:p-7",
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
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] text-xl text-cyan-200">
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
    </TransparentSection>
  );
}

/* -------------------------------------------------------------------------- */
/*                           9. Development process                           */
/* -------------------------------------------------------------------------- */

export function DevelopmentProcess() {
  return (
    <TransparentSection>
      <SectionHeader
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
                className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-300/20 bg-[#061421]/90 font-mono text-[10px] text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur-xl"
              >
                {step.number}
              </motion.div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.022] p-4 text-center backdrop-blur-xl transition group-hover:-translate-y-1 group-hover:border-cyan-300/20 group-hover:bg-cyan-300/[0.035]">
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
            <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-[#061421] font-mono text-[10px] text-cyan-200">
              {step.number}
            </span>

            <div className="flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl">
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
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-6 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/[0.11]"
        >
          See how we work

          <span className="transition-transform group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </TransparentSection>
  );
}

/* -------------------------------------------------------------------------- */
/*                        10. Dedicated AI capability                         */
/* -------------------------------------------------------------------------- */

export function DedicatedAICapability() {
  return (
    <TransparentSection>
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
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-100/75 backdrop-blur-xl">
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
                className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2 text-[11px] text-slate-400 backdrop-blur-xl transition hover:border-cyan-300/20 hover:text-cyan-100"
              >
                {capability}
              </motion.span>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.035] p-5">
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
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#06101c]/52 p-5 shadow-[0_35px_110px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-7"
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
                  className="relative z-10 h-full rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 text-center transition hover:border-cyan-300/20 hover:bg-cyan-300/[0.04]"
                >
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.07] font-mono text-[9px] text-cyan-200">
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
                className="rounded-xl border border-white/[0.06] bg-black/15 p-4"
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
    </TransparentSection>
  );
}

/* -------------------------------------------------------------------------- */
/*                            11. Industries served                           */
/* -------------------------------------------------------------------------- */

export function IndustriesSection() {
  return (
    <TransparentSection>
      <SectionHeader
        eyebrow="Industry solution pathways"
        title="Technology designed around"
        gradientTitle="real operating environments."
        description="As a founding-year company, we present the solution areas we are prepared to explore—not unverified claims of deep sector experience."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {industries.map((industry, index) => (
          <GlowCard key={industry.code} delay={index * 0.07}>
            <div className="flex items-start justify-between">
              <motion.span
                whileHover={{
                  rotate: 8,
                  scale: 1.08,
                }}
                className="flex h-13 w-13 h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] font-mono text-xs text-cyan-200"
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
                  className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[10px] text-slate-500"
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
          </GlowCard>
        ))}
      </div>
    </TransparentSection>
  );
}

/* -------------------------------------------------------------------------- */
/*                            12. Technology stack                            */
/* -------------------------------------------------------------------------- */

export function TechnologyStackSection() {
  const [activeCategory, setActiveCategory] =
    useState(technologyCategories[0].id);

  const currentCategory =
    technologyCategories.find(
      (category) => category.id === activeCategory,
    ) ?? technologyCategories[0];

  return (
    <TransparentSection>
      <SectionHeader
        eyebrow="Purpose-selected technology"
        title="Tools selected for your product"
        gradientTitle="not our convenience."
        description="We select technologies according to product requirements, deployment needs, maintainability, integration constraints and team capability."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
        <div className="space-y-2">
          {technologyCategories.map((category, index) => {
            const active = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={[
                  "group flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition",
                  active
                    ? "border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-100"
                    : "border-white/[0.06] bg-white/[0.02] text-slate-500 hover:border-white/[0.12] hover:text-white",
                ].join(" ")}
              >
                <span className="flex items-center gap-4">
                  <span className="font-mono text-[9px] text-cyan-300/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm font-semibold">
                    {category.label}
                  </span>
                </span>

                <motion.span
                  animate={{
                    rotate: active ? 90 : 0,
                    x: active ? 3 : 0,
                  }}
                >
                  <ArrowIcon />
                </motion.span>
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#06101c]/50 p-6 backdrop-blur-2xl sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/65">
                {currentCategory.label} technologies
              </p>

              <h3 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
                A focused toolset for the job.
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                {currentCategory.description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {currentCategory.technologies.map(
                  (technology, index) => (
                    <motion.div
                      key={technology.name}
                      initial={{
                        opacity: 0,
                        scale: 0.94,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        delay: index * 0.07,
                      }}
                      whileHover={{
                        y: -4,
                      }}
                      className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-cyan-300/20 hover:bg-cyan-300/[0.04]"
                    >
                      <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.07] bg-black/20">
                        <img
                          src={technology.logo}
                          alt={`${technology.name} logo`}
                          loading="lazy"
                          className="h-7 w-7 object-contain transition group-hover:scale-110"
                        />
                      </span>

                      <div>
                        <p className="text-sm font-semibold text-slate-100">
                          {technology.name}
                        </p>

                        <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-slate-600">
                          {currentCategory.label}
                        </p>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan-400/[0.07] blur-[90px]" />
        </div>
      </div>
    </TransparentSection>
  );
}

/* -------------------------------------------------------------------------- */
/*                              13. Testimonials                              */
/* -------------------------------------------------------------------------- */

export function TestimonialsSection() {
  return (
    <TransparentSection>
      <SectionHeader
        eyebrow="Founding-year transparency"
        title="Client feedback will be"
        gradientTitle="earned, not manufactured."
        description="QuantumFinix does not yet publish client testimonials. Verified feedback will appear here only after completed pilots and explicit permission from the people involved."
      />

      <motion.div
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
          amount: 0.25,
        }}
        transition={{
          duration: 0.85,
        }}
        className="relative mt-14 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#06101c]/50 p-6 shadow-[0_35px_110px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:p-9"
      >
        <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-[100px]" />

        <div className="relative grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="flex min-h-64 items-center justify-center">
            <div className="relative flex h-48 w-48 items-center justify-center">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-300/15"
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 19,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-6 rounded-full border border-cyan-300/15"
              />

              <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-cyan-300/20 bg-[#04111e] shadow-[0_0_60px_rgba(34,211,238,0.15)]">
                <Image
                  src="/quantumfinix-mark.png"
                  alt="QuantumFinix"
                  width={180}
                  height={180}
                  className="h-24 w-24 object-contain"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300/65">
              What early collaborators can evaluate
            </p>

            <h3 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
              Judge the work by the process and the evidence.
            </h3>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {collaborationStandards.map((standard, index) => (
                <motion.div
                  key={standard.title}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
                >
                  <span className="font-mono text-[9px] text-cyan-300/45">
                    0{index + 1}
                  </span>

                  <h4 className="mt-4 text-sm font-semibold text-white">
                    {standard.title}
                  </h4>

                  <p className="mt-2 text-xs leading-6 text-slate-600">
                    {standard.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <Link
              href="/book-consultation"
              className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-6 text-sm font-bold text-[#020711] transition hover:-translate-y-0.5"
            >
              Become an early pilot collaborator
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </motion.div>
    </TransparentSection>
  );
}

/* -------------------------------------------------------------------------- */
/*                            14. About the company                           */
/* -------------------------------------------------------------------------- */

export function AboutQuantumFinix() {
  return (
    <TransparentSection>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
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
          className="relative min-h-[480px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#06101c]/50 p-7 backdrop-blur-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(34,211,238,0.09),transparent_45%)]" />

          <div className="relative flex h-full min-h-[420px] items-center justify-center">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 32,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-20 rounded-full border border-dashed border-cyan-300/10"
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 21,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-12 rounded-full border border-cyan-300/12"
              />

              <div className="relative flex h-40 w-40 items-center justify-center rounded-[2.5rem] border border-cyan-300/20 bg-[#04111e] shadow-[0_0_80px_rgba(34,211,238,0.18)]">
                <Image
                  src="/quantumfinix-mark.png"
                  alt="QuantumFinix logo"
                  width={240}
                  height={240}
                  className="h-36 w-36 object-contain"
                />
              </div>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-2">
              {[
                ["Founded", "2026"],
                ["Stage", "Founding year"],
                ["Direction", "AI + software"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/[0.07] bg-black/20 p-3 text-center backdrop-blur-xl"
                >
                  <p className="text-[8px] uppercase tracking-[0.16em] text-slate-600">
                    {label}
                  </p>

                  <p className="mt-2 text-xs font-semibold text-cyan-100">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 25,
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
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-cyan-100/70">
            A new company with a long-term mission
          </div>

          <h2 className="mt-6 text-4xl font-black leading-[1] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            Engineers, designers and strategists
            <span className="block bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              thinking as one team.
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-400">
            QuantumFinix was founded in 2026 to build useful AI
            software and create a research-led environment for future
            innovation. The company is currently in its founding
            stage, developing its capabilities, project laboratory and
            early collaboration network.
          </p>

          <p className="mt-5 text-sm leading-7 text-slate-500">
            Our mission is to make advanced technology practical,
            understandable and responsibly connected to real
            organizational and human needs.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Practical AI implementation",
              "Product and software engineering",
              "Student and research participation",
              "Transparent founding-year growth",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-sm text-slate-300"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200">
                  <CheckIcon />
                </span>

                {item}
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-cyan-100"
          >
            Read the QuantumFinix story

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] transition group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>
      </div>
    </TransparentSection>
  );
}

/* -------------------------------------------------------------------------- */
/*                           15. Insights and resources                       */
/* -------------------------------------------------------------------------- */

export function InsightsSection() {
  return (
    <TransparentSection>
      <SectionHeader
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
            className="group relative min-h-[390px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#06101c]/50 p-6 backdrop-blur-2xl transition-colors hover:border-cyan-300/20 sm:p-7"
          >
            <div className="absolute right-5 top-5 font-mono text-[10px] tracking-[0.2em] text-cyan-300/30">
              {article.number}
            </div>

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent opacity-0 transition group-hover:opacity-100" />

            <div className="flex h-full flex-col">
              <span className="w-fit rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-cyan-200/65">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-200 transition group-hover:translate-x-1 group-hover:border-cyan-300/30 group-hover:bg-cyan-300/[0.11]"
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
    </TransparentSection>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  16. FAQ                                   */
/* -------------------------------------------------------------------------- */

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <TransparentSection>
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
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-cyan-100/70">
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
                  "overflow-hidden rounded-2xl border backdrop-blur-xl transition-colors",
                  open
                    ? "border-cyan-300/20 bg-cyan-300/[0.045]"
                    : "border-white/[0.07] bg-white/[0.02]",
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
    </TransparentSection>
  );
}

/* -------------------------------------------------------------------------- */
/*                              17. Final CTA                                 */
/* -------------------------------------------------------------------------- */

export function FinalProjectCTA() {
  return (
    <section className="relative overflow-hidden bg-transparent px-5 py-24 text-white sm:px-7 sm:py-28 lg:px-10 xl:px-16">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.97,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[2.5rem] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(37,99,235,0.07),rgba(3,10,20,0.7))] px-6 py-16 shadow-[0_40px_140px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:px-10 lg:px-16 lg:py-20"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />

        <motion.div
          animate={{
            scale: [0.85, 1.15, 0.85],
            opacity: [0.12, 0.28, 0.12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-cyan-400/15 blur-[120px]"
        />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-cyan-100/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-300" />
              </span>

              Project conversations open
            </div>

            <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl">
              Have a software or AI
              <span className="block bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                project in mind?
              </span>
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
              Tell us what you are building, what challenge you are
              facing and where you need technical support. We will help
              you identify a practical next step.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/book-consultation"
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 px-7 text-sm font-bold text-[#020711] shadow-[0_0_45px_rgba(34,211,238,0.22)] transition hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/65 to-transparent transition-transform duration-700 group-hover:translate-x-[140%]" />

                <span className="relative flex items-center gap-2">
                  Book a Free Consultation
                  <ArrowIcon />
                </span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/[0.08]"
              >
                Send Project Details
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[10px] uppercase tracking-[0.17em] text-slate-600">
              {[
                "No sales pressure",
                "NDA available",
                "Clear technical recommendations",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/50" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative flex h-64 w-64 items-center justify-center">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-300/20"
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-8 rounded-full border border-cyan-300/15"
              />

              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    "0 0 40px rgba(34,211,238,0.15)",
                    "0 0 90px rgba(34,211,238,0.32)",
                    "0 0 40px rgba(34,211,238,0.15)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="relative flex h-36 w-36 items-center justify-center rounded-[2.5rem] border border-cyan-300/25 bg-[#04111e]"
              >
                <Image
                  src="/quantumfinix-mark.png"
                  alt="QuantumFinix"
                  width={220}
                  height={220}
                  className="h-32 w-32 object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Reusable components                             */
/* -------------------------------------------------------------------------- */

function TransparentSection({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-transparent py-24 text-white sm:py-28 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />

      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
        {children}
      </div>
    </section>
  );
}

function SectionHeader({
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
      >
        <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-100/75 backdrop-blur-xl">
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
          amount: 0.3,
        }}
        transition={{
          duration: 0.8,
          delay: 0.12,
        }}
        className="text-base leading-8 text-slate-400"
      >
        {description}
      </motion.p>
    </div>
  );
}

function GlowCard({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
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
      rawRotateX.set((0.5 - y) * 4);
      rawRotateY.set((x - 0.5) * 4);
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
        delay,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
      }}
      whileHover={{
        y: -6,
      }}
      className="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#06101c]/50 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.2)] backdrop-blur-2xl transition-colors hover:border-cyan-300/20 sm:p-7"
    >
      <motion.div
        style={{
          background: glow,
        }}
        className="pointer-events-none absolute inset-0"
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        {children}
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