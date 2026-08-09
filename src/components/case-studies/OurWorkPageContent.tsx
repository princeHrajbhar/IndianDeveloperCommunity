"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

type ProjectCategory =
  | "AI Solutions"
  | "Custom Software"
  | "Web Applications"
  | "Mobile Applications"
  | "Automation";

type Project = {
  id: string;
  category: ProjectCategory;
  service: string;
  industry: string;
  title: string;
  summary: string;
  outcomes: string[];
  visual: ProjectVisualType;
};

type ProjectVisualType =
  | "knowledge"
  | "logistics"
  | "healthcare"
  | "support"
  | "education"
  | "fintech";

const categories: Array<"All Projects" | ProjectCategory> = [
  "All Projects",
  "AI Solutions",
  "Custom Software",
  "Web Applications",
  "Mobile Applications",
  "Automation",
];

const projects: Project[] = [
  {
    id: "knowledge-assistant",
    category: "AI Solutions",
    service: "AI Development",
    industry: "Professional Services",
    title: "Internal AI Knowledge Assistant",
    summary:
      "A demonstration platform showing how employees could find reliable information across approved documents and internal resources.",
    outcomes: [
      "Faster document discovery",
      "Fewer repetitive questions",
      "Improved knowledge accessibility",
    ],
    visual: "knowledge",
  },
  {
    id: "logistics-platform",
    category: "Custom Software",
    service: "Custom Software",
    industry: "Logistics",
    title: "Logistics Operations Management Platform",
    summary:
      "A demonstration operations workspace for managing deliveries, customer information, status updates and internal reporting.",
    outcomes: [
      "Simplified daily operations",
      "Better shipment visibility",
      "Less duplicate data entry",
    ],
    visual: "logistics",
  },
  {
    id: "patient-portal",
    category: "Web Applications",
    service: "Web Application",
    industry: "Healthcare",
    title: "Patient Appointment and Communication Portal",
    summary:
      "A secure portal concept for appointment management, service updates and communication between patients and staff.",
    outcomes: [
      "Easier appointment management",
      "Faster communication",
      "Clearer administrative workflows",
    ],
    visual: "healthcare",
  },
  {
    id: "support-automation",
    category: "Automation",
    service: "AI Automation",
    industry: "E-commerce",
    title: "AI Customer Support Automation",
    summary:
      "A support automation concept that answers common product questions and routes complex requests to the appropriate team.",
    outcomes: [
      "Faster initial responses",
      "Reduced repetitive workload",
      "More consistent information",
    ],
    visual: "support",
  },
  {
    id: "learning-app",
    category: "Mobile Applications",
    service: "Mobile Development",
    industry: "Education",
    title: "Learning and Progress Tracking Application",
    summary:
      "A mobile learning concept for accessing lessons, completing activities and reviewing individual progress.",
    outcomes: [
      "Improved content access",
      "Better progress visibility",
      "Simpler student engagement",
    ],
    visual: "education",
  },
  {
    id: "financial-dashboard",
    category: "Custom Software",
    service: "SaaS Development",
    industry: "Fintech",
    title: "Financial Reporting Dashboard",
    summary:
      "A secure reporting concept that organizes financial information and presents important operational insights.",
    outcomes: [
      "Centralized reporting",
      "Faster report preparation",
      "Improved information visibility",
    ],
    visual: "fintech",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Product Strategy",
    description:
      "We define product requirements, technical direction and a practical development roadmap.",
    icon: <StrategyIcon />,
  },
  {
    number: "02",
    title: "UX and Interface Design",
    description:
      "We create clear, usable experiences based on real workflows and user requirements.",
    icon: <DesignIcon />,
  },
  {
    number: "03",
    title: "Software and AI Development",
    description:
      "We build secure applications, intelligent workflows and practical digital products.",
    icon: <DevelopmentIcon />,
  },
  {
    number: "04",
    title: "Support and Optimization",
    description:
      "We maintain, monitor and improve the product as requirements and usage evolve.",
    icon: <OptimizationIcon />,
  },
];

export default function OurWorkPageContent() {
  return (
    <main className="overflow-hidden bg-transparent text-white">
      <OurWorkHero />
      <FeaturedCaseStudy />
      <ProjectsSection />
      <CapabilitiesSection />
      <TestimonialPlaceholder />
      <OurWorkFinalCTA />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function OurWorkHero() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="relative m-0 min-h-[100svh] overflow-hidden p-0">
      <div className="mx-auto grid min-h-[100svh] w-full max-w-[1540px] gap-12 px-5 sm:px-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-10 xl:px-16">
        <motion.div
          initial={
            reduceMotion
              ? undefined
              : { opacity: 0, x: -32 }
          }
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10"
        >
          <SectionLabel>Our Work</SectionLabel>

          <h1 className="mt-6 max-w-4xl text-[3rem] font-black leading-[0.94] tracking-[-0.065em] text-white sm:text-6xl lg:text-[4.8rem] xl:text-[5.7rem]">
            Software and AI solutions built for
            <span className="block bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              real business challenges.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Explore how we approach operational improvement,
            digital product development and practical AI
            implementation.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryLink href="/contact">
              Discuss Your Project
              <ArrowIcon />
            </PrimaryLink>

            <SecondaryLink href="#case-studies">
              Explore Case Studies
              <DownIcon />
            </SecondaryLink>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
            {[
              "Custom Software",
              "AI Development",
              "Product Engineering",
              "Automation",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.16em] text-slate-600"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/65" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <ProjectConstellation reduceMotion={reduceMotion} />
      </div>
    </section>
  );
}

function ProjectConstellation({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  const nodes = [
    {
      label: "AI",
      title: "Knowledge",
      position: "left-[7%] top-[12%]",
      delay: 0,
    },
    {
      label: "WEB",
      title: "Platforms",
      position: "right-[3%] top-[18%]",
      delay: 0.4,
    },
    {
      label: "OPS",
      title: "Automation",
      position: "left-[3%] bottom-[17%]",
      delay: 0.8,
    },
    {
      label: "APP",
      title: "Products",
      position: "right-[8%] bottom-[10%]",
      delay: 1.2,
    },
  ];

  return (
    <motion.div
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              scale: 0.92,
              x: 30,
            }
      }
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
      }}
      transition={{
        duration: 1,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative mx-auto flex h-[480px] w-full max-w-[700px] items-center justify-center sm:h-[580px]"
    >
      <svg
        viewBox="0 0 700 580"
        fill="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {[
          "M350 290 C250 210 180 165 115 120",
          "M350 290 C460 210 530 175 610 145",
          "M350 290 C245 370 175 425 95 475",
          "M350 290 C455 380 530 430 615 500",
        ].map((path, index) => (
          <g key={path}>
            <path
              d={path}
              stroke="rgba(103,232,249,0.12)"
              strokeWidth="1"
            />

            {!reduceMotion && (
              <motion.path
                d={path}
                stroke={
                  index > 1
                    ? "rgb(96,165,250)"
                    : "rgb(103,232,249)"
                }
                strokeWidth="1.5"
                strokeDasharray="5 15"
                animate={{
                  strokeDashoffset: [0, -60],
                }}
                transition={{
                  duration: 3 + index * 0.25,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </g>
        ))}
      </svg>

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-72 w-72 rounded-full border border-dashed border-cyan-300/15 sm:h-80 sm:w-80"
      />

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-56 w-56 rounded-full border border-blue-300/15 sm:h-64 sm:w-64"
      />

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -7, 0],
                scale: [1, 1.03, 1],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 flex h-40 w-40 flex-col items-center justify-center rounded-[2.5rem] border border-cyan-300/25 bg-[#03101a]/70 text-center shadow-[0_0_90px_rgba(34,211,238,0.18)] backdrop-blur-xl sm:h-48 sm:w-48"
      >
        <WorkIcon />

        <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-300/60">
          Selected work
        </p>

        <p className="mt-2 text-lg font-bold text-white">
          Digital Solutions
        </p>
      </motion.div>

      {nodes.map((node, index) => (
        <motion.div
          key={node.title}
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  scale: 0.8,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            y: reduceMotion ? 0 : [0, -6, 0],
          }}
          transition={{
            opacity: {
              duration: 0.6,
              delay: 0.5 + index * 0.12,
            },
            scale: {
              duration: 0.6,
              delay: 0.5 + index * 0.12,
            },
            y: {
              duration: 4 + index * 0.3,
              delay: node.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className={`absolute min-w-28 border-l border-cyan-300/25 pl-4 ${node.position}`}
        >
          <p className="font-mono text-[8px] tracking-[0.2em] text-cyan-300/50">
            {node.label}
          </p>

          <p className="mt-2 text-sm font-semibold text-white">
            {node.title}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Featured case study                                                        */
/* -------------------------------------------------------------------------- */

function FeaturedCaseStudy() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section
      id="case-studies"
      className="relative scroll-mt-24 bg-transparent py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <motion.div
          initial={
            reduceMotion
              ? undefined
              : { opacity: 0, y: 24 }
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
            duration: 0.75,
          }}
          className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-16"
        >
          <FeaturedProjectVisual reduceMotion={reduceMotion} />

          <div>
            <SectionLabel>Featured Demonstration Project</SectionLabel>

            <h2 className="mt-6 text-4xl font-black leading-[1] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              AI-powered knowledge platform for
              <span className="block text-cyan-300">
                faster information access.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              A representative AI knowledge assistant showing how
              a service company could search approved internal
              information, answer recurring questions and make
              important knowledge easier to access.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-y border-white/[0.09] py-6">
              {[
                ["Industry", "Professional Services"],
                ["Service", "AI Development"],
                ["Solution", "Knowledge Assistant"],
                ["Platform", "Web Application"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[8px] uppercase tracking-[0.18em] text-slate-600">
                    {label}
                  </p>

                  <p className="mt-2 text-xs font-medium text-slate-200">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300/60">
              Potential outcomes
            </p>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Faster access to business information",
                "More consistent responses",
                "Fewer repetitive support tasks",
                "Simpler employee onboarding",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-400"
                >
                  <CheckCircleIcon />
                  {item}
                </li>
              ))}
            </ul>

            <PrimaryLink
              href="/case-studies/ai-knowledge-platform-demo"
              className="mt-8"
            >
              View Full Case Study
              <ArrowIcon />
            </PrimaryLink>

            <p className="mt-5 text-xs leading-6 text-slate-600">
              Demonstration project. Replace with a real client or
              internal project before publishing it as completed
              client work.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProjectVisual({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[760px]">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#03101a]/65 shadow-[0_40px_130px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-blue-300/50" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
          </div>

          <span className="text-[8px] uppercase tracking-[0.18em] text-slate-600">
            Knowledge workspace
          </span>
        </div>

        <div className="grid min-h-[480px] grid-cols-[125px_1fr] sm:grid-cols-[180px_1fr]">
          <div className="border-r border-white/[0.07] p-4">
            <div className="h-7 rounded-lg border border-cyan-300/15" />

            <div className="mt-7 space-y-3">
              {[72, 88, 64, 80, 55].map((width, index) => (
                <div
                  key={width}
                  className="flex items-center gap-2"
                >
                  <span
                    className={[
                      "h-2 w-2 rounded-full",
                      index === 1
                        ? "bg-cyan-300"
                        : "bg-slate-700",
                    ].join(" ")}
                  />

                  <span
                    style={{ width: `${width}%` }}
                    className="h-1.5 rounded-full bg-white/[0.08]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 text-cyan-200">
                <KnowledgeIcon />
              </span>

              <div>
                <p className="text-xs font-semibold text-white">
                  Ask company knowledge
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-slate-600">
                  Approved sources only
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-white/[0.08] p-4 text-xs text-slate-400">
              How should a new service request be assigned?
            </div>

            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -4, 0],
                  }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-5 border-l border-cyan-300/30 pl-5"
            >
              <p className="text-sm leading-7 text-slate-300">
                New requests should be reviewed by the service
                coordinator and assigned according to service type,
                region and current workload.
              </p>

              <div className="mt-5 space-y-3">
                {[
                  "Operations handbook · Section 4",
                  "Service assignment policy",
                ].map((source) => (
                  <div
                    key={source}
                    className="flex items-center justify-between border-b border-white/[0.07] pb-3"
                  >
                    <span className="text-[10px] text-slate-500">
                      {source}
                    </span>

                    <span className="font-mono text-[8px] text-cyan-300/50">
                      SOURCE
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="absolute bottom-5 right-5 flex items-end gap-1.5">
              {[25, 42, 34, 58, 46, 68].map(
                (height, index) => (
                  <motion.span
                    key={height}
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scaleY: [0.55, 1, 0.7],
                          }
                    }
                    transition={{
                      duration: 1.5 + index * 0.15,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    style={{ height }}
                    className="w-1.5 origin-bottom rounded-full bg-cyan-300/45"
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-12 left-1/2 -z-10 h-36 w-2/3 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[90px]" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Filters and project grid                                                   */
/* -------------------------------------------------------------------------- */

function ProjectsSection() {
  const reduceMotion = Boolean(useReducedMotion());
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All Projects");

  const visibleProjects = useMemo(() => {
    if (activeCategory === "All Projects") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeCategory,
    );
  }, [activeCategory]);

  return (
    <section className="relative bg-transparent py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <SectionLabel>Project Explorer</SectionLabel>

            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[1] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Find projects relevant to
              <span className="block text-cyan-300">
                your business.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Filter the demonstration concepts by the type of
            solution you are considering.
          </p>
        </div>

        <div
          aria-label="Filter projects"
          className="mt-10 flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={active}
                className={[
                  "shrink-0 rounded-full border px-5 py-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                  active
                    ? "border-cyan-300/35 bg-cyan-300/[0.09] text-cyan-100"
                    : "border-white/[0.09] bg-transparent text-slate-500 hover:border-cyan-300/20 hover:text-slate-200",
                ].join(" ")}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-16 flex items-end justify-between gap-6">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300/60">
              Selected work
            </p>

            <h3 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
              Demonstration project collection
            </h3>
          </div>

          <span className="hidden font-mono text-[9px] tracking-[0.18em] text-slate-700 sm:block">
            {String(visibleProjects.length).padStart(2, "0")} PROJECTS
          </span>
        </div>

        <motion.div
          layout
          className="mt-8 grid gap-x-7 gap-y-14 md:grid-cols-2 xl:grid-cols-3"
        >
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  reduceMotion,
}: {
  project: Project;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      layout
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              y: 24,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
      }}
      className="group min-w-0"
    >
      <ProjectVisual type={project.visual} />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-300/65">
          {project.service}
        </span>

        <span className="h-1 w-1 rounded-full bg-slate-700" />

        <span className="text-[9px] uppercase tracking-[0.17em] text-slate-600">
          {project.industry}
        </span>
      </div>

      <h4 className="mt-4 text-2xl font-bold leading-tight tracking-[-0.035em] text-white">
        {project.title}
      </h4>

      <p className="mt-3 text-sm leading-7 text-slate-400">
        {project.summary}
      </p>

      <div className="mt-6 border-t border-white/[0.08] pt-5">
        <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Potential outcomes
        </p>

        <ul className="mt-4 space-y-2.5">
          {project.outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex items-start gap-3 text-xs leading-5 text-slate-400"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/65" />
              {outcome}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={`/case-studies/${project.id}`}
        className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      >
        View Demonstration Case Study

        <span className="transition-transform group-hover/link:translate-x-1">
          <ArrowIcon />
        </span>
      </Link>
    </motion.article>
  );
}

function ProjectVisual({
  type,
}: {
  type: ProjectVisualType;
}) {
  return (
    <div className="relative aspect-[1.35/1] overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-[#03101a]/55 p-5 transition duration-500 group-hover:border-cyan-300/20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {type === "knowledge" && <KnowledgePreview />}
      {type === "logistics" && <LogisticsPreview />}
      {type === "healthcare" && <HealthcarePreview />}
      {type === "support" && <SupportPreview />}
      {type === "education" && <EducationPreview />}
      {type === "fintech" && <FintechPreview />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Representational project previews                                          */
/* -------------------------------------------------------------------------- */

function KnowledgePreview() {
  return (
    <div className="grid h-full grid-cols-[82px_1fr] gap-4">
      <div className="border-r border-white/[0.07] pr-4">
        <div className="h-7 rounded-md border border-cyan-300/15" />

        <div className="mt-5 space-y-3">
          {[80, 55, 72, 62].map((width) => (
            <div
              key={width}
              style={{ width: `${width}%` }}
              className="h-1.5 rounded-full bg-white/[0.09]"
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-[8px] uppercase tracking-[0.16em] text-cyan-300/50">
          Knowledge query
        </p>

        <div className="mt-4 rounded-lg border border-white/[0.08] p-3 text-[9px] text-slate-500">
          Find the approved onboarding process
        </div>

        <div className="mt-4 border-l border-cyan-300/25 pl-4">
          <div className="h-1.5 w-full rounded-full bg-white/[0.1]" />
          <div className="mt-2 h-1.5 w-4/5 rounded-full bg-white/[0.08]" />
          <div className="mt-2 h-1.5 w-2/3 rounded-full bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

function LogisticsPreview() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-between">
        <span className="text-[8px] uppercase tracking-[0.16em] text-cyan-300/50">
          Active operations
        </span>

        <span className="font-mono text-[8px] text-slate-600">
          LIVE
        </span>
      </div>

      <div className="mt-5 grid flex-1 grid-cols-3 gap-3">
        {[74, 48, 63].map((height, index) => (
          <div
            key={height}
            className="relative overflow-hidden rounded-lg border border-white/[0.07]"
          >
            <div
              style={{ height: `${height}%` }}
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-500/20 to-cyan-300/10"
            />

            <span className="absolute left-3 top-3 font-mono text-[8px] text-slate-600">
              0{index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HealthcarePreview() {
  return (
    <div className="grid h-full grid-cols-[1fr_0.7fr] gap-4">
      <div>
        <p className="text-[8px] uppercase tracking-[0.16em] text-cyan-300/50">
          Appointments
        </p>

        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 border-b border-white/[0.07] pb-3"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/15 font-mono text-[8px] text-cyan-200">
                {item}
              </span>

              <div className="flex-1">
                <div className="h-1.5 w-3/4 rounded-full bg-white/[0.1]" />
                <div className="mt-2 h-1.5 w-1/2 rounded-full bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center rounded-xl border border-white/[0.07]">
        <div className="relative h-24 w-24 rounded-full border border-cyan-300/15">
          <div className="absolute inset-5 rounded-full border border-blue-300/15" />
          <span className="absolute inset-0 flex items-center justify-center text-cyan-200">
            <CalendarIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

function SupportPreview() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/15 text-cyan-200">
          <MessageIcon />
        </span>

        <div>
          <p className="text-xs font-semibold text-white">
            Support assistant
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-slate-600">
            Request routing
          </p>
        </div>
      </div>

      <div className="mt-5 ml-auto w-4/5 rounded-xl border border-white/[0.08] p-3 text-[9px] text-slate-500">
        Can I change my delivery address?
      </div>

      <div className="mt-3 w-5/6 rounded-xl border border-cyan-300/15 p-3 text-[9px] leading-5 text-slate-400">
        Address changes are available before dispatch. Complex
        requests are assigned to the support team.
      </div>
    </div>
  );
}

function EducationPreview() {
  return (
    <div className="mx-auto flex h-full max-w-[210px] flex-col rounded-[1.7rem] border border-white/[0.09] p-4">
      <div className="mx-auto h-1.5 w-12 rounded-full bg-white/[0.1]" />

      <p className="mt-5 text-[8px] uppercase tracking-[0.16em] text-cyan-300/50">
        Learning progress
      </p>

      <div className="mt-4 space-y-4">
        {[72, 46, 88].map((width, index) => (
          <div key={width}>
            <div className="flex justify-between text-[8px] text-slate-600">
              <span>Module {index + 1}</span>
              <span>{width}%</span>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                style={{ width: `${width}%` }}
                className="h-full rounded-full bg-cyan-300/55"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FintechPreview() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[8px] uppercase tracking-[0.16em] text-cyan-300/50">
            Financial overview
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            Reporting
          </p>
        </div>

        <ChartIcon />
      </div>

      <div className="mt-auto flex h-28 items-end gap-2">
        {[38, 62, 47, 78, 55, 86, 70, 92].map(
          (height) => (
            <div
              key={height}
              style={{ height: `${height}%` }}
              className="w-full rounded-t-sm bg-gradient-to-t from-blue-600/20 to-cyan-300/55"
            />
          ),
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Capabilities                                                               */
/* -------------------------------------------------------------------------- */

function CapabilitiesSection() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="relative bg-transparent py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
          <div>
            <SectionLabel>Capabilities</SectionLabel>

            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              What we
              <span className="block text-cyan-300">
                deliver.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              Product thinking, design, engineering and ongoing
              improvement brought together around one practical
              delivery process.
            </p>

            <SecondaryLink
              href="/services"
              className="mt-8"
            >
              Explore Our Services
              <ArrowIcon />
            </SecondaryLink>
          </div>

          <div className="grid border-t border-white/[0.09] sm:grid-cols-2">
            {capabilities.map((capability, index) => (
              <motion.article
                key={capability.number}
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
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className={[
                  "group border-b border-white/[0.09] py-8 sm:p-8",
                  index % 2 === 0
                    ? "sm:border-r"
                    : "",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <span className="text-cyan-200">
                    {capability.icon}
                  </span>

                  <span className="font-mono text-[9px] tracking-[0.18em] text-slate-700">
                    {capability.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold tracking-[-0.03em] text-white">
                  {capability.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {capability.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Testimonial placeholder                                                    */
/* -------------------------------------------------------------------------- */

function TestimonialPlaceholder() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="relative bg-transparent py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-10">
        <motion.div
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 24,
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
            duration: 0.7,
          }}
          className="relative border-y border-white/[0.09] py-12 text-center sm:py-16"
        >
          <QuoteIcon />

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/65">
            Client testimonial placeholder
          </p>

          <blockquote className="mx-auto mt-6 max-w-4xl text-2xl font-semibold leading-relaxed tracking-[-0.035em] text-white sm:text-3xl lg:text-4xl">
            “Publish a verified client testimonial here after
            receiving approval for the quote, identity, company
            information and photograph.”
          </blockquote>

          <div className="mx-auto mt-8 h-px w-16 bg-cyan-300/45" />

          <p className="mt-6 text-sm font-semibold text-slate-300">
            Verified client name
          </p>

          <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-slate-600">
            Position · Company
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                  */
/* -------------------------------------------------------------------------- */

function OurWorkFinalCTA() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="relative bg-transparent pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <motion.div
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.75,
          }}
          className="relative border-y border-white/[0.1] py-12 sm:py-16 lg:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-16">
            <div>
              <SectionLabel>Start a Project</SectionLabel>

              <h2 className="mt-6 max-w-5xl text-4xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-7xl">
                Your project could become
                <span className="block text-cyan-300">
                  our next case study.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                Tell us about the product you want to build, the
                process you want to improve or the business challenge
                you need to solve.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                We will help define the technical approach and
                recommend a practical next step.
              </p>
            </div>

            <div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <PrimaryLink href="/contact">
                  Start Your Project
                  <ArrowIcon />
                </PrimaryLink>

                <SecondaryLink href="/book-consultation">
                  Book a Consultation
                  <ArrowIcon />
                </SecondaryLink>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                {[
                  "NDA available",
                  "Clear project estimates",
                  "No sales pressure",
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.16em] text-slate-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/65" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared elements                                                            */
/* -------------------------------------------------------------------------- */

function SectionLabel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-10 bg-cyan-300/55" />

      <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-cyan-300/70">
        {children}
      </p>
    </div>
  );
}

function PrimaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex min-h-14 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 px-7 text-sm font-bold text-[#020711] shadow-[0_18px_55px_rgba(34,211,238,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(34,211,238,0.27)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${className}`}
    >
      <span className="absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 group-hover:translate-x-[140%]" />

      <span className="relative flex items-center gap-2">
        {children}
      </span>
    </Link>
  );
}

function SecondaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-7 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${className}`}
    >
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
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

function DownIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 transition-transform group-hover:translate-y-1"
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

function CheckCircleIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-200">
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
    </span>
  );
}

function WorkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-8 w-8 text-cyan-200"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="6"
        width="18"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M8 6V4h8v2M3 11h18M9 11v2h6v-2"
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
        d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M8 20V7h10M9.5 10h5M9.5 13h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="5"
        width="16"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M8 3v4M16 3v4M4 9h16M8 13h3M13 13h3M8 16h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M4 5h16v11H9l-5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M8 9h8M8 12h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 text-cyan-200"
      aria-hidden="true"
    >
      <path
        d="M5 19V9M12 19V5M19 19v-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="m4 6 5-3 5 3 6-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StrategyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="m14 10 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DesignIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M5 4h14v16H5V4Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M5 9h14M9 9v11M12 6h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DevelopmentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OptimizationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M4 18V8M10 18V5M16 18v-7M22 18H2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="m4 6 5-3 5 3 6-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="mx-auto h-10 w-10 text-cyan-300/60"
      aria-hidden="true"
    >
      <path
        d="M8 27c0-9 4-15 13-19v7c-4 2-6 5-6 9h7v16H8V27ZM27 27c0-9 4-15 13-19v7c-4 2-6 5-6 9h7v16H27V27Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}