"use client";

import Image from "next/image";
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

type ProjectType =
  | "knowledge-assistant"
  | "workflow-automation"
  | "research-platform";

type CaseStudy = {
  number: string;
  status: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  evidence: string;
  metricStatus: string;
  technologies: string[];
  href: string;
  type: ProjectType;
};

const caseStudies: CaseStudy[] = [
  {
    number: "01",
    status: "Internal product prototype",
    title: "QuantumDesk AI",
    industry: "Customer service and knowledge operations",
    challenge:
      "Support teams often lose time searching scattered documents and repeatedly answering the same operational questions.",
    solution:
      "A source-grounded AI assistant designed to retrieve internal knowledge, generate cited answers and route uncertain requests to a human reviewer.",
    evidence:
      "The working proof of concept demonstrates document ingestion, referenced answers, conversation history and a human-review workflow.",
    metricStatus:
      "Business-impact metrics will be published only after a verified pilot.",
    technologies: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Vector Search",
      "OpenAI",
    ],
    href: "/case-studies/quantumdesk-ai",
    type: "knowledge-assistant",
  },
  {
    number: "02",
    status: "Automation proof of concept",
    title: "OpsFlow Intelligence",
    industry: "Business operations and back-office workflows",
    challenge:
      "Manual intake, document review and approval processes create delays, inconsistent decisions and limited visibility.",
    solution:
      "An intelligent workflow system that captures requests, extracts structured information and moves each task through review and approval stages.",
    evidence:
      "The prototype validates a complete intake-to-approval flow with document extraction, review checkpoints and visible task status.",
    metricStatus:
      "No time-saving or cost-reduction claim is displayed until measured in a real operational environment.",
    technologies: [
      "React",
      "Node.js",
      "Python",
      "PostgreSQL",
      "AI Extraction",
      "Docker",
    ],
    href: "/case-studies/opsflow-intelligence",
    type: "workflow-automation",
  },
  {
    number: "03",
    status: "Research platform concept",
    title: "Quantum Research Network",
    industry: "Education, student innovation and applied research",
    challenge:
      "Students and early researchers need a clearer way to discover practical challenges, contribute work and document their progress.",
    solution:
      "A collaborative platform concept for publishing research challenges, forming contributor groups and recording experiments and outcomes.",
    evidence:
      "The concept prototype demonstrates project discovery, contributor onboarding, experiment updates and structured progress documentation.",
    metricStatus:
      "Participation and learning outcomes will be reported after the first structured community programme.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Cloud Storage",
      "Analytics",
    ],
    href: "/case-studies/quantum-research-network",
    type: "research-platform",
  },
];

export default function FeaturedCaseStudies() {
  return (
    <section className="relative isolate overflow-hidden bg-transparent py-24 text-white sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
      />

      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <header className="grid gap-10 lg:grid-cols-[1fr_0.58fr] lg:items-end">
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
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-100/75 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-300" />
              </span>

              Founding-year project laboratory
            </div>

            <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl">
              Real prototypes.
              <span className="block bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                No invented success stories.
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
              QuantumFinix is a new venture. These projects are
              clearly presented as internal products, research
              concepts and technical proofs of concept—not
              completed client engagements.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-600">
              <span className="h-px w-12 bg-gradient-to-r from-cyan-300/60 to-transparent" />
              Evidence before promotion
            </div>
          </motion.div>
        </header>

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
            amount: 0.35,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="mt-14 flex flex-col gap-5 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.07] text-emerald-300">
              <EvidenceIcon />
            </span>

            <div>
              <p className="text-sm font-semibold text-white">
                What we show today
              </p>

              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
                Working interfaces, defined use cases, technical
                architecture and validation goals. Verified customer
                outcomes will be added only when supporting evidence
                exists.
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-200/70">
            Build status · Active
          </span>
        </motion.div>

        <div className="mt-8 space-y-8">
          {caseStudies.map((project, index) => (
            <CaseStudyCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative mt-10 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(34,211,238,0.06),rgba(37,99,235,0.045),rgba(255,255,255,0.02))] p-7 backdrop-blur-xl sm:p-9"
        >
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-28 h-64 w-64 rounded-full bg-cyan-400/[0.09] blur-[90px]"
          />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300/70">
                Become an early pilot collaborator
              </p>

              <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
                Have a real problem suitable for one of these
                technologies?
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                Early pilots help transform technical demonstrations
                into useful products while creating the first
                verifiable QuantumFinix case studies.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book-consultation"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 px-6 text-sm font-bold text-[#020711] shadow-[0_0_35px_rgba(34,211,238,0.18)] transition hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/65 to-transparent transition-transform duration-700 group-hover:translate-x-[140%]" />

                <span className="relative flex items-center gap-2">
                  Propose a pilot
                  <ArrowIcon />
                </span>
              </Link>

              <Link
                href="/case-studies"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] px-6 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.07]"
              >
                View project laboratory
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CaseStudyCard({
  project,
  index,
}: {
  project: CaseStudy;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, {
    stiffness: 160,
    damping: 24,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 160,
    damping: 24,
  });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const glow = useMotionTemplate`
    radial-gradient(
      650px circle at ${glowX}% ${glowY}%,
      rgba(34, 211, 238, 0.10),
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
      rawRotateX.set((0.5 - y) * 2.5);
      rawRotateY.set((x - 0.5) * 2.5);
    }
  }

  function handlePointerLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  const visualFirst = index % 2 === 1;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.85,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
      }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/[0.085] bg-[#06101c]/48 shadow-[0_35px_110px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-colors duration-300 hover:border-cyan-300/20"
    >
      <motion.div
        aria-hidden="true"
        style={{
          background: glow,
        }}
        className="pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative grid lg:grid-cols-2">
        <div
          className={[
            "min-w-0 p-6 sm:p-8 lg:p-10",
            visualFirst ? "lg:order-2" : "",
          ].join(" ")}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.055] px-3.5 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-cyan-200/75">
              {project.status}
            </span>

            <span className="font-mono text-[10px] tracking-[0.24em] text-cyan-300/35">
              PROJECT {project.number}
            </span>
          </div>

          <h3 className="mt-7 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
            {project.title}
          </h3>

          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/60">
            Industry context · {project.industry}
          </p>

          <ProjectInformation
            label="Business challenge"
            icon={<ChallengeIcon />}
          >
            {project.challenge}
          </ProjectInformation>

          <ProjectInformation
            label="Solution developed"
            icon={<SolutionIcon />}
          >
            {project.solution}
          </ProjectInformation>

          <ProjectInformation
            label="Current evidence"
            icon={<EvidenceIcon />}
            highlighted
          >
            {project.evidence}
          </ProjectInformation>

          <div className="mt-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.21em] text-slate-600">
              Technologies explored
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[10px] text-slate-400"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-amber-300/10 bg-amber-300/[0.035] p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-amber-200/70">
                <MetricIcon />
              </span>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200/60">
                  Measurable-result status
                </p>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  {project.metricStatus}
                </p>
              </div>
            </div>
          </div>

          <Link
            href={project.href}
            className="group/link mt-8 inline-flex items-center gap-3 text-sm font-semibold text-cyan-100"
          >
            View full project breakdown

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-200 transition duration-300 group-hover/link:translate-x-1 group-hover/link:border-cyan-300/35 group-hover/link:bg-cyan-300/[0.11]">
              <ArrowIcon />
            </span>
          </Link>
        </div>

        <div
          className={[
            "relative min-h-[440px] overflow-hidden border-white/[0.07] p-5 sm:p-7 lg:min-h-full",
            visualFirst
              ? "border-b lg:order-1 lg:border-b-0 lg:border-r"
              : "border-t lg:border-l lg:border-t-0",
          ].join(" ")}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(34,211,238,0.07),transparent_45%)]"
          />

          <ProjectVisual
            type={project.type}
            reduceMotion={Boolean(reduceMotion)}
          />
        </div>
      </div>
    </motion.article>
  );
}

function ProjectInformation({
  label,
  icon,
  highlighted = false,
  children,
}: {
  label: string;
  icon: ReactNode;
  highlighted?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={[
        "mt-6 flex items-start gap-4",
        highlighted
          ? "rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.035] p-4"
          : "",
      ].join(" ")}
    >
      <span
        className={[
          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border",
          highlighted
            ? "border-emerald-300/15 bg-emerald-300/[0.06] text-emerald-300"
            : "border-cyan-300/10 bg-cyan-300/[0.05] text-cyan-200",
        ].join(" ")}
      >
        {icon}
      </span>

      <div>
        <p
          className={[
            "text-[10px] font-semibold uppercase tracking-[0.2em]",
            highlighted
              ? "text-emerald-300/65"
              : "text-slate-600",
          ].join(" ")}
        >
          {label}
        </p>

        <p className="mt-2 text-sm leading-7 text-slate-400">
          {children}
        </p>
      </div>
    </div>
  );
}

function ProjectVisual({
  type,
  reduceMotion,
}: {
  type: ProjectType;
  reduceMotion: boolean;
}) {
  return (
    <div className="relative flex h-full min-h-[390px] items-center justify-center">
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -7, 0],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full max-w-[590px] overflow-hidden rounded-2xl border border-white/[0.1] bg-[#030b16]/90 shadow-[0_35px_100px_rgba(0,0,0,0.45)]"
      >
        <BrowserBar />

        {type === "knowledge-assistant" && (
          <KnowledgeAssistantPreview />
        )}

        {type === "workflow-automation" && (
          <WorkflowPreview />
        )}

        {type === "research-platform" && (
          <ResearchPlatformPreview />
        )}
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [0.9, 1.08, 0.9],
                opacity: [0.15, 0.3, 0.15],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-64 w-64 rounded-full bg-cyan-400/10 blur-[90px]"
      />
    </div>
  );
}

function BrowserBar() {
  return (
    <div className="flex h-11 items-center justify-between border-b border-white/[0.07] px-4">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/50" />
      </div>

      <div className="flex h-6 w-[45%] items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.025]">
        <span className="text-[8px] tracking-[0.15em] text-slate-600">
          QUANTUMFINIX LAB
        </span>
      </div>

      <span className="h-2 w-2 rounded-full bg-cyan-300/50 shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
    </div>
  );
}

function KnowledgeAssistantPreview() {
  return (
    <div className="grid min-h-[360px] grid-cols-[0.34fr_0.66fr]">
      <div className="border-r border-white/[0.06] p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-300/15 bg-cyan-300/[0.06]">
            <Image
              src="/quantumfinix-mark.png"
              alt=""
              width={40}
              height={40}
              className="h-7 w-7 object-contain"
            />
          </span>

          <div>
            <p className="text-[9px] font-semibold text-slate-200">
              QuantumDesk
            </p>
            <p className="text-[7px] text-emerald-300/60">
              Knowledge ready
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          {[
            "New conversation",
            "Customer onboarding",
            "Product documentation",
            "Policy questions",
          ].map((item, index) => (
            <div
              key={item}
              className={[
                "rounded-lg px-3 py-2 text-[8px]",
                index === 1
                  ? "border border-cyan-300/10 bg-cyan-300/[0.06] text-cyan-100"
                  : "text-slate-600",
              ].join(" ")}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col p-4">
        <p className="text-[9px] font-medium text-slate-300">
          Customer onboarding
        </p>

        <div className="mt-5 self-end rounded-xl rounded-br-sm bg-blue-500/15 px-3 py-2 text-[8px] leading-4 text-blue-100">
          What information is required before onboarding?
        </div>

        <motion.div
          initial={{
            opacity: 0.4,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="mt-3 max-w-[88%] rounded-xl rounded-bl-sm border border-white/[0.06] bg-white/[0.03] p-3"
        >
          <p className="text-[8px] leading-4 text-slate-300">
            The onboarding process requires an approved
            service agreement, primary contact details and
            system-access requirements.
          </p>

          <div className="mt-3 rounded-md border border-emerald-300/10 bg-emerald-300/[0.035] px-2 py-1.5 text-[7px] text-emerald-200/60">
            Source · onboarding-guide.pdf · Section 2
          </div>
        </motion.div>

        <div className="mt-auto flex h-9 items-center rounded-lg border border-white/[0.07] bg-white/[0.025] px-3">
          <span className="text-[8px] text-slate-700">
            Ask the knowledge system...
          </span>

          <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-md bg-cyan-300 text-[#020711]">
            <ArrowIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

function WorkflowPreview() {
  const stages = [
    {
      label: "Request received",
      status: "Completed",
    },
    {
      label: "Data extracted",
      status: "Completed",
    },
    {
      label: "Human review",
      status: "In review",
    },
    {
      label: "Final approval",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-[360px] p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-semibold text-slate-200">
            Operations workflow
          </p>

          <p className="mt-1 text-[7px] text-slate-600">
            Request ID · QF-2401
          </p>
        </div>

        <span className="rounded-full border border-amber-300/10 bg-amber-300/[0.05] px-2 py-1 text-[7px] text-amber-200/60">
          Review required
        </span>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2">
        {stages.map((stage, index) => (
          <div key={stage.label} className="relative">
            {index < stages.length - 1 && (
              <div className="absolute left-[55%] top-4 h-px w-[90%] bg-white/[0.07]">
                {index < 2 && (
                  <motion.div
                    animate={{
                      x: ["-100%", "250%"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                    className="h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                  />
                )}
              </div>
            )}

            <div
              className={[
                "relative flex h-8 w-8 items-center justify-center rounded-full border text-[8px]",
                index < 2
                  ? "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-300"
                  : index === 2
                    ? "border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-200"
                    : "border-white/[0.08] bg-white/[0.03] text-slate-600",
              ].join(" ")}
            >
              {index + 1}
            </div>

            <p className="mt-3 text-[7px] font-medium text-slate-300">
              {stage.label}
            </p>

            <p className="mt-1 text-[6px] text-slate-600">
              {stage.status}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
          <p className="text-[7px] uppercase tracking-[0.15em] text-slate-600">
            Extracted information
          </p>

          <div className="mt-3 space-y-2">
            {[
              "Request category",
              "Department",
              "Priority",
              "Review owner",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center justify-between text-[7px]"
              >
                <span className="text-slate-500">
                  {item}
                </span>

                <span className="text-cyan-100/70">
                  {["Software", "Operations", "Medium", "Manager"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
          <p className="text-[7px] uppercase tracking-[0.15em] text-slate-600">
            AI confidence
          </p>

          <div className="mt-4 flex items-end gap-1">
            {[35, 58, 42, 76, 64, 88, 72, 94].map(
              (height, index) => (
                <motion.span
                  key={index}
                  animate={{
                    scaleY: [0.55, 1, 0.7],
                  }}
                  transition={{
                    duration: 2 + index * 0.15,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    height,
                  }}
                  className="w-full origin-bottom rounded-sm bg-gradient-to-t from-blue-500/20 to-cyan-300/70"
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResearchPlatformPreview() {
  const projects = [
    {
      title: "AI for document accessibility",
      category: "Applied AI",
      contributors: "04",
    },
    {
      title: "Responsible agent evaluation",
      category: "AI Safety",
      contributors: "07",
    },
    {
      title: "Smart-city data exploration",
      category: "Data Research",
      contributors: "03",
    },
  ];

  return (
    <div className="min-h-[360px] p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-semibold text-slate-200">
            Research challenges
          </p>

          <p className="mt-1 text-[7px] text-slate-600">
            Discover · Contribute · Document
          </p>
        </div>

        <Link href="/contact" className="rounded-md bg-cyan-300 px-3 py-1.5 text-[7px] font-semibold text-[#020711] transition hover:bg-cyan-200">
          Submit idea
        </Link>
      </div>

      <div className="mt-5 grid gap-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            animate={{
              x: index === 1 ? [0, 3, 0] : undefined,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.3,
            }}
            className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/10 bg-cyan-300/[0.05] text-[8px] text-cyan-200">
              0{index + 1}
            </span>

            <div className="min-w-0">
              <p className="truncate text-[8px] font-medium text-slate-200">
                {project.title}
              </p>

              <p className="mt-1 text-[7px] text-cyan-300/55">
                {project.category}
              </p>
            </div>

            <div className="ml-auto text-right">
              <p className="text-[8px] font-medium text-slate-300">
                {project.contributors}
              </p>

              <p className="text-[6px] text-slate-600">
                contributors
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["Challenges", "03"],
          ["Experiments", "08"],
          ["Updates", "14"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center"
          >
            <p className="text-sm font-semibold text-cyan-100">
              {value}
            </p>

            <p className="mt-1 text-[6px] uppercase tracking-[0.12em] text-slate-600">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvidenceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M5 3h10l4 4v14H5V3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M15 3v5h5M8 13l2.2 2.2L16 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChallengeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M12 3 3.5 19h17L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M12 9v4M12 16h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SolutionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M9 18h6M10 21h4M8.5 15.5C7 14.4 6 12.7 6 10.7A6 6 0 0 1 18 10.7c0 2-1 3.7-2.5 4.8-.7.5-1 1-1.1 1.5H9.6c-.1-.5-.4-1-1.1-1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetricIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M4 20V10M10 20V4M16 20v-7M22 20H2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
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