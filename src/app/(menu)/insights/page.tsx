"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useMemo,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

type RoleProfile = {
  id: string;
  title: string;
  field: string;
  exposure: number;
  complement: number;
  summary: string;
  automate: string[];
  amplify: string[];
  humanEdge: string[];
};

type ActionAudience = "worker" | "leader" | "policy";

type ScenarioState = {
  routine: number;
  digital: number;
  judgement: number;
  people: number;
};

const SOURCE_LINKS = {
  wef: "https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/",
  ilo: "https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure",
  imf2026:
    "https://www.imf.org/en/blogs/articles/2026/01/14/new-skills-and-ai-are-reshaping-the-future-of-work",
  imf2024:
    "https://www.imf.org/en/blogs/articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity",
};

const roleProfiles: RoleProfile[] = [
  {
    id: "support",
    title: "Customer support specialist",
    field: "Service",
    exposure: 76,
    complement: 68,
    summary:
      "Routine questions can be resolved instantly, while emotionally complex or high-stakes cases become more valuable human work.",
    automate: [
      "Classifying tickets",
      "Drafting standard replies",
      "Summarizing conversation history",
    ],
    amplify: [
      "Real-time knowledge retrieval",
      "Suggested next-best actions",
      "Multilingual communication",
    ],
    humanEdge: ["Empathy", "De-escalation", "Commercial judgement"],
  },
  {
    id: "developer",
    title: "Software developer",
    field: "Technology",
    exposure: 71,
    complement: 86,
    summary:
      "Code generation speeds up implementation, but architecture, product judgement, security and verification become the differentiators.",
    automate: [
      "Boilerplate code",
      "First-pass tests",
      "Documentation drafts",
    ],
    amplify: [
      "Rapid prototyping",
      "Codebase navigation",
      "Debugging hypotheses",
    ],
    humanEdge: ["Systems thinking", "Trade-offs", "Accountability"],
  },
  {
    id: "accounting",
    title: "Accountant",
    field: "Finance",
    exposure: 69,
    complement: 72,
    summary:
      "Data extraction and reconciliation are increasingly automatable; interpretation, controls and trusted advice remain central.",
    automate: [
      "Invoice extraction",
      "Transaction matching",
      "Variance summaries",
    ],
    amplify: [
      "Anomaly detection",
      "Scenario analysis",
      "Faster close preparation",
    ],
    humanEdge: ["Governance", "Context", "Professional responsibility"],
  },
  {
    id: "designer",
    title: "Graphic designer",
    field: "Creative",
    exposure: 74,
    complement: 70,
    summary:
      "Production becomes faster and cheaper, increasing the premium on direction, taste, originality and brand coherence.",
    automate: [
      "Asset variations",
      "Background cleanup",
      "Basic layout exploration",
    ],
    amplify: [
      "Moodboard generation",
      "Concept iteration",
      "Localization at scale",
    ],
    humanEdge: ["Taste", "Narrative", "Cultural sensitivity"],
  },
  {
    id: "teacher",
    title: "Teacher",
    field: "Education",
    exposure: 47,
    complement: 82,
    summary:
      "AI can generate materials and personalize practice, but motivation, safeguarding and social learning are deeply human.",
    automate: [
      "Worksheet drafts",
      "Routine feedback",
      "Lesson resource formatting",
    ],
    amplify: [
      "Differentiated learning",
      "Progress pattern detection",
      "Administrative support",
    ],
    humanEdge: ["Mentorship", "Classroom judgement", "Belonging"],
  },
  {
    id: "nurse",
    title: "Nurse",
    field: "Healthcare",
    exposure: 32,
    complement: 78,
    summary:
      "Documentation and monitoring can improve, while physical care, trust and responsibility keep the role human-led.",
    automate: [
      "Note structuring",
      "Routine reminders",
      "Administrative handoffs",
    ],
    amplify: [
      "Risk flagging",
      "Clinical information retrieval",
      "Care coordination",
    ],
    humanEdge: ["Compassion", "Physical care", "Clinical accountability"],
  },
];

const actionContent: Record<
  ActionAudience,
  {
    eyebrow: string;
    title: string;
    intro: string;
    actions: { number: string; title: string; description: string }[];
  }
> = {
  worker: {
    eyebrow: "For individuals",
    title: "Build a career around leverage, not resistance.",
    intro:
      "The goal is not to outrun every model. It is to become the person who can frame the problem, direct the system, verify the output and own the result.",
    actions: [
      {
        number: "01",
        title: "Map your tasks",
        description:
          "List recurring tasks, then mark which are routine, digital, judgement-heavy or relationship-heavy.",
      },
      {
        number: "02",
        title: "Automate one workflow",
        description:
          "Choose a low-risk task and learn the full loop: prompt, context, output, review and correction.",
      },
      {
        number: "03",
        title: "Deepen a human advantage",
        description:
          "Pair AI fluency with domain expertise, communication, negotiation, care, leadership or creative direction.",
      },
    ],
  },
  leader: {
    eyebrow: "For organizations",
    title: "Redesign work before reducing people.",
    intro:
      "The durable advantage comes from rebuilding workflows around human-machine teams, not simply adding an AI tool to a broken process.",
    actions: [
      {
        number: "01",
        title: "Start at task level",
        description:
          "Measure where time is spent, where errors occur and where employees already create the most judgement-based value.",
      },
      {
        number: "02",
        title: "Create transition paths",
        description:
          "Connect declining tasks to adjacent growing roles, with protected learning time and visible internal mobility.",
      },
      {
        number: "03",
        title: "Keep accountability human",
        description:
          "Define who reviews consequential outputs, handles exceptions and remains responsible to customers and workers.",
      },
    ],
  },
  policy: {
    eyebrow: "For public systems",
    title: "Make adaptation possible before disruption arrives.",
    intro:
      "Education, social protection and labour-market institutions determine whether productivity gains become broadly shared prosperity or deeper inequality.",
    actions: [
      {
        number: "01",
        title: "Fund portable learning",
        description:
          "Make training affordable, modular and recognized across employers, especially for workers in exposed occupations.",
      },
      {
        number: "02",
        title: "Protect mobility",
        description:
          "Modernize safety nets, job matching, credential recognition and support for workers moving between roles.",
      },
      {
        number: "03",
        title: "Measure job quality",
        description:
          "Track wages, autonomy, surveillance, workload and access to advancement—not only the number of jobs created.",
      },
    ],
  },
};

const chapters = [
  ["01", "The shift", "shift"],
  ["02", "Jobs are tasks", "tasks"],
  ["03", "The numbers", "numbers"],
  ["04", "Human edge", "human-edge"],
  ["05", "Action plan", "action"],
] as const;

const reveal = (reduceMotion: boolean, delay = 0) => ({
  initial: reduceMotion ? undefined : { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: {
    duration: 0.75,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

export default function AIJobsImpactBlogPage() {
  const reduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    restDelta: 0.001,
  });
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, 130]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.19], [1, 0.12]);
  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);
  const glowX = useSpring(cursorX, { stiffness: 95, damping: 28 });
  const glowY = useSpring(cursorY, { stiffness: 95, damping: 28 });

  return (
    <main
      className="relative overflow-hidden bg-[#020617] text-white selection:bg-cyan-300 selection:text-slate-950"
      onPointerMove={(event) => {
        if (reduceMotion) return;
        cursorX.set(event.clientX - 190);
        cursorY.set(event.clientY - 190);
      }}
    >
      <motion.div
        className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500"
        style={{ scaleX: progress }}
      />

      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-20 h-[380px] w-[380px] rounded-full bg-cyan-300/[0.035] blur-[90px]"
          style={{ x: glowX, y: glowY }}
        />
      )}

      <AmbientBackground reduceMotion={reduceMotion} />
      <ArticleNavigation />

      <motion.div style={{ y: heroY, opacity: heroOpacity }}>
        <HeroSection reduceMotion={reduceMotion} />
      </motion.div>

      <ArticleIntro reduceMotion={reduceMotion} />
      <TaskShiftSection reduceMotion={reduceMotion} />
      <GlobalNumbersSection reduceMotion={reduceMotion} />
      <ExposureSection reduceMotion={reduceMotion} />
      <EntryLevelSection reduceMotion={reduceMotion} />
      <HumanEdgeSection reduceMotion={reduceMotion} />
      <ScenarioLabSection reduceMotion={reduceMotion} />
      <ActionSection reduceMotion={reduceMotion} />
      <ClosingSection reduceMotion={reduceMotion} />
      <SourcesSection reduceMotion={reduceMotion} />
    </main>
  );
}

function AmbientBackground({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="absolute inset-x-0 top-0 h-[920px] bg-[radial-gradient(circle_at_50%_5%,rgba(34,211,238,0.10),transparent_42%)]" />

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 70, 0], y: [0, 45, 0], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 top-28 h-[34rem] w-[34rem] rounded-full bg-cyan-400/[0.07] blur-[120px]"
      />
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -55, 0], y: [0, 60, 0], scale: [1, 1.12, 1] }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.4,
        }}
        className="absolute -right-40 top-[56rem] h-[36rem] w-[36rem] rounded-full bg-blue-500/[0.07] blur-[130px]"
      />
    </div>
  );
}

function ArticleNavigation() {
  return (
    <nav className="relative z-50 border-b border-white/[0.07] bg-[#020617]/72 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-7 lg:px-10 xl:px-16">
        <a
          href="#top"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <span className="relative flex h-8 w-8 items-center justify-center border border-cyan-300/25 bg-cyan-300/[0.04]">
            <span className="h-2.5 w-2.5 rotate-45 border border-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.65)]" />
          </span>
          <span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/65">
              Field Notes
            </span>
            <span className="block text-xs font-bold tracking-[-0.02em] text-slate-200">
              Work / Intelligence
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {chapters.map(([number, label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="group inline-flex min-h-10 items-center gap-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <span className="font-mono text-cyan-300/35 group-hover:text-cyan-300/70">
                {number}
              </span>
              {label}
            </a>
          ))}
        </div>

        <a
          href="#scenario-lab"
          className="group inline-flex min-h-10 items-center gap-2 border border-white/[0.12] px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          Test your role
          <ArrowIcon className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </nav>
  );
}

function HeroSection({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <header
      id="top"
      className="relative z-10 min-h-[calc(100svh-4rem)] border-b border-white/[0.07]"
    >
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-[1440px] gap-12 px-5 py-16 sm:px-7 sm:py-20 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:px-10 xl:px-16">
        <motion.div {...reveal(reduceMotion)} className="relative z-10">
          <SectionLabel>Special report · AI and work</SectionLabel>

          <p className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-500">
            <span>12 min read</span>
            <span className="h-1 w-1 rounded-full bg-cyan-300/45" />
            <span>Research updated January 2026</span>
          </p>

          <h1 className="mt-7 max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl xl:text-[6.1rem]">
            AI will not simply
            <span className="block bg-gradient-to-r from-cyan-200 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              take human jobs.
            </span>
            <span className="mt-2 block text-[0.58em] leading-[1.04] tracking-[-0.045em] text-slate-300">
              It will redraw the boundary between tasks, skills and value.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            The real story is not a contest between people and machines. It is a
            fast, uneven redesign of work—where routine output becomes cheap,
            judgement becomes more visible and the ability to learn becomes a
            core economic skill.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="#shift">Enter the story</PrimaryButton>
            <SecondaryButton href="#numbers">Explore the data</SecondaryButton>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08]">
            {[
              ["40%", "Global jobs exposed", "IMF"],
              ["1 in 4", "Jobs with some GenAI exposure", "ILO"],
              ["+78M", "Net jobs forecast by 2030", "WEF"],
            ].map(([value, label, source]) => (
              <div key={label} className="bg-[#020617]/90 p-4 sm:p-5">
                <p className="text-xl font-black tracking-[-0.04em] text-white sm:text-2xl">
                  {value}
                </p>
                <p className="mt-2 text-[9px] leading-4 text-slate-500 sm:text-[10px]">
                  {label}
                </p>
                <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.18em] text-cyan-300/45">
                  {source}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <HeroVisual reduceMotion={reduceMotion} />
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600 lg:flex">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-300/35" />
        Scroll to continue
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </div>
    </header>
  );
}

function HeroVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      {...reveal(reduceMotion, 0.14)}
      className="relative mx-auto min-h-[520px] w-full max-w-[610px] [perspective:1200px] lg:min-h-[680px]"
      aria-label="Abstract visualization of humans and AI collaborating"
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : { rotateX: [8, -4, 8], rotateY: [-8, 8, -8], y: [0, -10, 0] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[8%] [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 rounded-full border border-dashed border-cyan-300/15 [transform:rotateX(68deg)_translateZ(-40px)]" />
        <div className="absolute inset-[12%] rounded-full border border-blue-300/15 [transform:rotateY(70deg)_translateZ(-20px)]" />
        <div className="absolute inset-[22%] rounded-full border border-cyan-300/15 [transform:rotateX(35deg)_rotateY(35deg)]" />

        <div className="absolute inset-[25%] rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.8),rgba(103,232,249,0.34)_8%,rgba(14,116,144,0.17)_30%,rgba(2,6,23,0.88)_66%)] shadow-[0_0_120px_rgba(34,211,238,0.22)] [transform:translateZ(70px)]">
          <div className="absolute inset-[13%] rounded-full border border-white/[0.12]" />
          <div className="absolute inset-[29%] rounded-full border border-cyan-200/20" />
          <motion.div
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[7%] rounded-full border-t border-cyan-200/55"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-semibold uppercase tracking-[0.23em] text-cyan-200/55">
              New unit of work
            </span>
            <span className="mt-3 text-3xl font-black tracking-[-0.055em] text-white sm:text-4xl">
              Human × AI
            </span>
            <span className="mt-3 max-w-40 text-[10px] leading-5 text-slate-400">
              Direction · execution · verification · trust
            </span>
          </div>
        </div>

        <FloatingDataCard
          className="left-0 top-[13%] [transform:translateZ(125px)_rotateY(8deg)]"
          label="Automation"
          value="Routine tasks"
          meta="Faster · cheaper · scalable"
          delay={0}
          reduceMotion={reduceMotion}
        />
        <FloatingDataCard
          className="right-0 top-[23%] [transform:translateZ(95px)_rotateY(-8deg)]"
          label="Augmentation"
          value="Human capability"
          meta="Reach · quality · speed"
          delay={0.6}
          reduceMotion={reduceMotion}
        />
        <FloatingDataCard
          className="bottom-[10%] left-[8%] [transform:translateZ(145px)_rotateX(-5deg)]"
          label="Scarcity shift"
          value="Judgement"
          meta="Context · taste · responsibility"
          delay={1.2}
          reduceMotion={reduceMotion}
        />

        {[0, 1, 2, 3, 4].map((index) => (
          <motion.span
            key={index}
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, index % 2 === 0 ? -8 : 8, 0],
                    opacity: [0.35, 0.9, 0.35],
                  }
            }
            transition={{
              duration: 3.6 + index * 0.55,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.85)]"
            style={{
              left: `${18 + ((index * 19) % 68)}%`,
              top: `${12 + ((index * 23) % 72)}%`,
              transform: `translateZ(${40 + index * 22}px)`,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

function FloatingDataCard({
  className,
  label,
  value,
  meta,
  delay,
  reduceMotion,
}: {
  className: string;
  label: string;
  value: string;
  meta: string;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`absolute z-20 w-44 border border-white/[0.11] bg-slate-950/72 p-4 shadow-2xl backdrop-blur-xl sm:w-52 ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold uppercase tracking-[0.19em] text-cyan-300/55">
          {label}
        </span>
        <StatusDot />
      </div>
      <p className="mt-3 text-sm font-bold tracking-[-0.025em] text-white sm:text-base">
        {value}
      </p>
      <p className="mt-2 text-[9px] leading-4 text-slate-500">{meta}</p>
    </motion.div>
  );
}

function ArticleIntro({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section id="shift" className="relative z-10 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-5 sm:px-7 lg:grid-cols-[0.34fr_0.66fr] lg:gap-20 lg:px-10">
        <motion.aside {...reveal(reduceMotion)} className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-xs tracking-[0.22em] text-cyan-300/45">
            CHAPTER 01
          </p>
          <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-white">
            The morning after the interface changed
          </h2>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-cyan-300/35 to-transparent" />
          <p className="mt-6 text-xs leading-6 text-slate-500">
            A story about one ordinary workday—and why the unit of disruption is
            usually the task, not the job title.
          </p>
        </motion.aside>

        <motion.article {...reveal(reduceMotion, 0.08)}>
          <p className="text-2xl font-semibold leading-[1.55] tracking-[-0.025em] text-slate-200 sm:text-3xl sm:leading-[1.5]">
            At 9:03 a.m., Maya opens her laptop. Overnight, the company has added
            an AI assistant to the tools she already uses. Nothing about her job
            title has changed. Everything about the rhythm of her work has.
          </p>

          <div className="mt-12 space-y-7 text-base leading-8 text-slate-400 sm:text-lg sm:leading-9">
            <p>
              The assistant summarizes yesterday&apos;s customer calls, drafts a
              market brief and turns a rough voice note into a presentation
              outline. By lunch, Maya has completed work that once occupied most
              of her morning.
            </p>
            <p>
              But the saved time does not remove the need for her. It moves the
              difficult part of the job. She now has to decide which customer
              signals matter, which claims are trustworthy, what the team should
              do next and where the machine is confidently wrong.
            </p>
            <p>
              This is the central tension of AI at work: the technology can make
              output abundant while making judgement, context, trust and
              accountability more valuable.
            </p>
          </div>

          <PullQuote>
            The future of work is less about humans versus AI—and more about
            which humans learn to direct, question and combine AI with real-world
            responsibility.
          </PullQuote>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
            {[
              ["Before", "Time spent producing", "Drafting, searching, formatting"],
              ["During", "Time spent verifying", "Checking, correcting, governing"],
              ["After", "Time spent deciding", "Prioritizing, persuading, owning outcomes"],
            ].map(([phase, title, detail]) => (
              <div key={phase} className="bg-[#020617] p-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300/50">
                  {phase}
                </p>
                <h3 className="mt-4 text-lg font-bold tracking-[-0.025em] text-white">
                  {title}
                </h3>
                <p className="mt-3 text-xs leading-6 text-slate-500">{detail}</p>
              </div>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
}

function TaskShiftSection({ reduceMotion }: { reduceMotion: boolean }) {
  const [activeRole, setActiveRole] = useState(roleProfiles[0]);

  return (
    <section
      id="tasks"
      className="relative z-10 border-y border-white/[0.07] py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <motion.div
          {...reveal(reduceMotion)}
          className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"
        >
          <div>
            <SectionLabel>Chapter 02 · Deconstruct the job</SectionLabel>
            <SectionHeading>
              A job is a bundle of
              <span className="block text-cyan-300">very different tasks.</span>
            </SectionHeading>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8 lg:justify-self-end">
            AI rarely encounters an occupation as one indivisible object. It
            encounters emails, analyses, images, forms, conversations and
            decisions. Some can be automated. Some become faster. Some remain
            stubbornly human.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.38fr_0.62fr]">
          <motion.div {...reveal(reduceMotion, 0.05)} className="border border-white/[0.08] bg-slate-950/45 p-3">
            <p className="px-3 pb-3 pt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-600">
              Explore illustrative task profiles
            </p>
            <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
              {roleProfiles.map((role) => {
                const active = role.id === activeRole.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setActiveRole(role)}
                    className={`group flex min-h-[72px] w-full items-center justify-between border px-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                      active
                        ? "border-cyan-300/25 bg-cyan-300/[0.07]"
                        : "border-transparent hover:border-white/[0.08] hover:bg-white/[0.025]"
                    }`}
                  >
                    <span>
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.17em] text-cyan-300/45">
                        {role.field}
                      </span>
                      <span className="mt-2 block text-sm font-bold text-white">
                        {role.title}
                      </span>
                    </span>
                    <span
                      className={`flex h-8 w-8 items-center justify-center border transition-transform group-hover:translate-x-1 ${
                        active
                          ? "border-cyan-300/30 text-cyan-200"
                          : "border-white/[0.08] text-slate-600"
                      }`}
                    >
                      <ArrowIcon />
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.article
            key={activeRole.id}
            initial={reduceMotion ? undefined : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden border border-cyan-300/15 bg-slate-950/62 p-6 shadow-[0_0_100px_rgba(34,211,238,0.045)] sm:p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.10),transparent_38%)]" />
            <div className="relative">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.21em] text-cyan-300/55">
                    {activeRole.field} task profile
                  </p>
                  <h3 className="mt-3 text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">
                    {activeRole.title}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08]">
                  <MiniMetric
                    value={`${activeRole.exposure}`}
                    suffix="/100"
                    label="AI exposure"
                  />
                  <MiniMetric
                    value={`${activeRole.complement}`}
                    suffix="/100"
                    label="Human + AI upside"
                  />
                </div>
              </div>

              <p className="mt-7 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                {activeRole.summary}
              </p>

              <div className="mt-8 grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
                <TaskColumn
                  label="Likely to automate"
                  items={activeRole.automate}
                  icon="minus"
                />
                <TaskColumn
                  label="Likely to amplify"
                  items={activeRole.amplify}
                  icon="plus"
                />
                <TaskColumn
                  label="Human advantage"
                  items={activeRole.humanEdge}
                  icon="spark"
                />
              </div>

              <p className="mt-5 text-[10px] leading-5 text-slate-600">
                Educational task-mix illustration, not an official probability
                of job loss. Actual outcomes depend on workflow design,
                regulation, adoption, cost and demand.
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

function MiniMetric({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix: string;
  label: string;
}) {
  return (
    <div className="min-w-28 bg-[#020617]/85 p-4 text-center">
      <p className="text-2xl font-black tracking-[-0.04em] text-white">
        {value}
        <span className="ml-1 text-[10px] font-medium text-slate-600">{suffix}</span>
      </p>
      <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
    </div>
  );
}

function TaskColumn({
  label,
  items,
  icon,
}: {
  label: string;
  items: string[];
  icon: "minus" | "plus" | "spark";
}) {
  return (
    <div className="bg-[#020617]/92 p-5 sm:p-6">
      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-300/55">
        {label}
      </p>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-xs leading-5 text-slate-400">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-300/15 text-[10px] text-cyan-200">
              {icon === "minus" ? "−" : icon === "plus" ? "+" : "✦"}
            </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function GlobalNumbersSection({ reduceMotion }: { reduceMotion: boolean }) {
  const [mode, setMode] = useState<"movement" | "workforce">("movement");

  return (
    <section id="numbers" className="relative z-10 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <motion.div {...reveal(reduceMotion)} className="mx-auto max-w-4xl text-center">
          <SectionLabel centered>Chapter 03 · The global picture</SectionLabel>
          <SectionHeading centered>
            The headline is disruption.
            <span className="block text-cyan-300">The outcome is still open.</span>
          </SectionHeading>
          <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            The World Economic Forum projects large-scale job creation and
            displacement by 2030. These are employer expectations across many
            forces—not an AI-only forecast—but technology is a central driver.
          </p>
        </motion.div>

        <motion.div
          {...reveal(reduceMotion, 0.08)}
          className="mt-14 overflow-hidden border border-white/[0.09] bg-slate-950/52"
        >
          <div className="flex flex-col gap-5 border-b border-white/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300/55">
                WEF Future of Jobs 2025 · outlook to 2030
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-[-0.03em] text-white sm:text-2xl">
                A labour market in motion
              </h3>
            </div>
            <div className="inline-flex self-start border border-white/[0.09] p-1">
              {[
                ["movement", "Job movement"],
                ["workforce", "Workforce response"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMode(value as "movement" | "workforce")}
                  className={`min-h-9 px-4 text-[9px] font-bold uppercase tracking-[0.14em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    mode === value
                      ? "bg-cyan-300 text-slate-950"
                      : "text-slate-500 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.7fr_0.3fr]">
            <div className="border-b border-white/[0.08] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              {mode === "movement" ? (
                <JobMovementChart reduceMotion={reduceMotion} />
              ) : (
                <WorkforceResponseChart reduceMotion={reduceMotion} />
              )}
            </div>

            <div className="grid bg-white/[0.08] sm:grid-cols-3 lg:grid-cols-1">
              {mode === "movement" ? (
                <>
                  <DataFact value="170M" label="Roles projected to be created" note="Equivalent to 14% of current employment" />
                  <DataFact value="92M" label="Roles projected to be displaced" note="Across structural labour-market change" />
                  <DataFact value="+78M" label="Projected net increase" note="Creation minus displacement" />
                </>
              ) : (
                <>
                  <DataFact value="77%" label="Plan AI-related upskilling" note="Most common response to AI disruption" />
                  <DataFact value="41%" label="Plan workforce reductions" note="Where AI can automate tasks" />
                  <DataFact value="≈50%" label="Plan internal transitions" note="From exposed roles into other work" />
                </>
              )}
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <InsightCard
            reduceMotion={reduceMotion}
            index="01"
            title="Growth is not only technical"
            description="Care, education, delivery, construction and farming are among roles expected to grow strongly in absolute terms."
          />
          <InsightCard
            reduceMotion={reduceMotion}
            index="02"
            title="Clerical work is under pressure"
            description="Cashiers, administrative assistants and other routine information-processing roles face sharper decline."
          />
          <InsightCard
            reduceMotion={reduceMotion}
            index="03"
            title="Skills are the bottleneck"
            description="Nearly 40% of core skills are expected to change by 2030, making transition capacity as important as technology access."
          />
        </div>
      </div>
    </section>
  );
}

function JobMovementChart({ reduceMotion }: { reduceMotion: boolean }) {
  const rows = [
    { label: "Created", value: 170, note: "new roles" },
    { label: "Displaced", value: 92, note: "existing roles" },
    { label: "Net change", value: 78, note: "more roles" },
  ];

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-300">Projected job movement</p>
          <p className="mt-1 text-[10px] text-slate-600">Millions of roles, 2025–2030</p>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-300/45">
          Scale / 180M
        </p>
      </div>

      <div className="mt-9 space-y-7">
        {rows.map((row, index) => (
          <div key={row.label}>
            <div className="mb-3 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-white">{row.label}</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-slate-600">
                  {row.note}
                </p>
              </div>
              <p className="text-3xl font-black tracking-[-0.045em] text-white">
                {row.value}
                <span className="ml-1 text-xs font-medium text-slate-600">M</span>
              </p>
            </div>
            <div className="relative h-12 overflow-hidden border border-white/[0.07] bg-white/[0.025]">
              <motion.div
                initial={reduceMotion ? undefined : { width: 0 }}
                whileInView={{ width: `${(row.value / 180) * 100}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full ${
                  index === 1
                    ? "bg-[linear-gradient(90deg,rgba(100,116,139,0.16),rgba(100,116,139,0.5))]"
                    : "bg-[linear-gradient(90deg,rgba(34,211,238,0.12),rgba(34,211,238,0.58))]"
                }`}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:20%_100%]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkforceResponseChart({ reduceMotion }: { reduceMotion: boolean }) {
  const rows = [
    { label: "Upskill people to work with AI", value: 77 },
    { label: "Reorient business around AI opportunities", value: 50 },
    { label: "Transition exposed workers internally", value: 47 },
    { label: "Reduce workforce where tasks automate", value: 41 },
  ];

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-300">Expected employer response</p>
          <p className="mt-1 text-[10px] text-slate-600">Share of surveyed employers</p>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-300/45">
          Percent
        </p>
      </div>

      <div className="mt-9 space-y-6">
        {rows.map((row, index) => (
          <div key={row.label}>
            <div className="mb-3 flex items-end justify-between gap-4">
              <p className="max-w-md text-xs font-medium leading-5 text-slate-300 sm:text-sm">
                {row.label}
              </p>
              <p className="text-2xl font-black tracking-[-0.04em] text-white">
                {row.value}%
              </p>
            </div>
            <div className="relative h-3 overflow-hidden bg-white/[0.05]">
              <motion.div
                initial={reduceMotion ? undefined : { width: 0 }}
                whileInView={{ width: `${row.value}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.95, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-cyan-300/25 to-cyan-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataFact({ value, label, note }: { value: string; label: string; note: string }) {
  return (
    <div className="bg-[#020617]/95 p-6 lg:p-8">
      <p className="text-4xl font-black tracking-[-0.05em] text-white">{value}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-slate-300">{label}</p>
      <p className="mt-3 text-[10px] leading-5 text-slate-600">{note}</p>
    </div>
  );
}

function InsightCard({
  reduceMotion,
  index,
  title,
  description,
}: {
  reduceMotion: boolean;
  index: string;
  title: string;
  description: string;
}) {
  return (
    <TiltCard reduceMotion={reduceMotion}>
      <article className="group h-full min-h-56 border border-white/[0.08] bg-slate-950/48 p-6 transition-colors hover:border-cyan-300/20 hover:bg-cyan-300/[0.025] sm:p-7">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.18em] text-cyan-300/40">{index}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/60 shadow-[0_0_14px_rgba(103,232,249,0.65)]" />
        </div>
        <h3 className="mt-8 text-xl font-bold tracking-[-0.03em] text-white">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-500">{description}</p>
      </article>
    </TiltCard>
  );
}

function ExposureSection({ reduceMotion }: { reduceMotion: boolean }) {
  const [activeSegment, setActiveSegment] = useState<"limited" | "some" | "highest">("some");
  const segmentCopy = {
    limited: {
      value: "75%",
      title: "Limited or no current GenAI exposure",
      description:
        "Many roles remain grounded in physical environments, complex interpersonal work or tasks current systems cannot reliably perform.",
    },
    some: {
      value: "21.7%",
      title: "Some occupational exposure",
      description:
        "A meaningful share of tasks may change, but the occupation is more likely to be redesigned than removed as a whole.",
    },
    highest: {
      value: "3.3%",
      title: "Highest exposure category",
      description:
        "These jobs contain a concentrated set of tasks that GenAI can potentially perform, with clerical work especially exposed.",
    },
  };

  return (
    <section className="relative z-10 border-y border-white/[0.07] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-5 sm:px-7 lg:grid-cols-[0.48fr_0.52fr] lg:items-center lg:gap-20 lg:px-10 xl:px-16">
        <motion.div {...reveal(reduceMotion)}>
          <SectionLabel>Exposure is not extinction</SectionLabel>
          <SectionHeading>
            One in four jobs may change.
            <span className="block text-cyan-300">Only a fraction sit at the highest exposure.</span>
          </SectionHeading>

          <p className="mt-7 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            The International Labour Organization&apos;s 2025 task-level index finds
            that one in four workers are in an occupation with some exposure to
            generative AI. Yet only 3.3% of global employment is in the highest
            exposure category.
          </p>
          <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            The ILO&apos;s core conclusion is crucial: because most occupations still
            contain tasks requiring human input, transformation is more likely
            than full automation.
          </p>

          <div className="mt-9 border-l border-cyan-300/25 pl-6">
            <p className="text-lg font-semibold leading-8 text-slate-200">
              Exposure measures what technology could touch. It does not measure
              whether firms will adopt it, whether customers will accept it, or
              whether a worker will lose a job.
            </p>
          </div>
        </motion.div>

        <motion.div {...reveal(reduceMotion, 0.1)} className="relative">
          <div className="relative overflow-hidden border border-white/[0.09] bg-slate-950/55 p-6 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_52%)]" />
            <div className="relative grid gap-10 sm:grid-cols-[0.55fr_0.45fr] sm:items-center">
              <ExposureDonut
                active={activeSegment}
                setActive={setActiveSegment}
                reduceMotion={reduceMotion}
              />

              <motion.div
                key={activeSegment}
                initial={reduceMotion ? undefined : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-5xl font-black tracking-[-0.055em] text-white">
                  {segmentCopy[activeSegment].value}
                </p>
                <h3 className="mt-4 text-xl font-bold leading-7 tracking-[-0.03em] text-white">
                  {segmentCopy[activeSegment].title}
                </h3>
                <p className="mt-4 text-xs leading-6 text-slate-500">
                  {segmentCopy[activeSegment].description}
                </p>
              </motion.div>
            </div>

            <div className="relative mt-8 grid gap-2 sm:grid-cols-3">
              {[
                ["limited", "Limited / none", "75%"],
                ["some", "Some exposure", "21.7%"],
                ["highest", "Highest", "3.3%"],
              ].map(([id, label, value]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSegment(id as "limited" | "some" | "highest")}
                  className={`border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    activeSegment === id
                      ? "border-cyan-300/30 bg-cyan-300/[0.07]"
                      : "border-white/[0.08] hover:border-white/[0.16]"
                  }`}
                >
                  <span className="block text-xl font-black tracking-[-0.03em] text-white">
                    {value}
                  </span>
                  <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ExposureDonut({
  active,
  setActive,
  reduceMotion,
}: {
  active: "limited" | "some" | "highest";
  setActive: (value: "limited" | "some" | "highest") => void;
  reduceMotion: boolean;
}) {
  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  const segments = [
    { id: "limited" as const, value: 75, offset: 0, opacity: 0.15 },
    { id: "some" as const, value: 21.7, offset: 75, opacity: 0.68 },
    { id: "highest" as const, value: 3.3, offset: 96.7, opacity: 1 },
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[270px]">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" role="img" aria-label="Global employment exposure to generative AI">
        <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="22" />
        {segments.map((segment, index) => {
          const length = (segment.value / 100) * circumference;
          const offset = -((segment.offset / 100) * circumference);
          const isActive = active === segment.id;
          return (
            <motion.circle
              key={segment.id}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="rgb(103 232 249)"
              strokeWidth={isActive ? 27 : 22}
              strokeLinecap={segment.id === "highest" ? "round" : "butt"}
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={offset}
              initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: isActive ? 1 : segment.opacity }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, delay: index * 0.12 }}
              className="cursor-pointer transition-[stroke-width,opacity] duration-300"
              onClick={() => setActive(segment.id)}
            />
          );
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-black tracking-[-0.05em] text-white">25%</span>
        <span className="mt-2 max-w-24 text-[9px] font-semibold uppercase leading-4 tracking-[0.15em] text-slate-500">
          Some GenAI exposure
        </span>
      </div>
    </div>
  );
}

function EntryLevelSection({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section className="relative z-10 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <motion.div
          {...reveal(reduceMotion)}
          className="relative overflow-hidden border border-white/[0.09] bg-slate-950/62 p-7 sm:p-10 lg:p-14"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_10%,rgba(59,130,246,0.13),transparent_33%),radial-gradient(circle_at_10%_90%,rgba(34,211,238,0.09),transparent_35%)]" />
          <span className="absolute left-6 top-6 h-10 w-10 border-l border-t border-cyan-300/25" />
          <span className="absolute bottom-6 right-6 h-10 w-10 border-b border-r border-cyan-300/25" />

          <div className="relative grid gap-12 lg:grid-cols-[0.52fr_0.48fr] lg:items-center">
            <div>
              <SectionLabel>The fragile first rung</SectionLabel>
              <h2 className="mt-5 text-4xl font-black leading-[1] tracking-[-0.05em] text-white sm:text-5xl">
                AI can remove the practice work that once created experts.
              </h2>
              <p className="mt-7 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                Entry-level employees often learn through research, drafting,
                formatting, basic analysis and repeated exposure to real cases.
                These are exactly the tasks generative AI can perform quickly.
              </p>
              <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                A January 2026 IMF analysis found employment in AI-vulnerable
                occupations was 3.6% lower after five years in regions with high
                demand for AI skills than in regions with lower demand. The IMF
                also notes that entry-level roles have higher exposure.
              </p>
            </div>

            <div className="relative min-h-[420px] [perspective:1000px]">
              <div className="absolute inset-x-[8%] bottom-4 top-4 border border-white/[0.08] bg-[#020617]/55 [transform:rotateY(-6deg)_rotateX(3deg)]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_56px]" />
                <div className="relative p-6 sm:p-8">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.19em] text-cyan-300/50">
                    Traditional learning ladder
                  </p>
                  <div className="mt-7 space-y-4">
                    {[
                      ["04", "Independent judgement", "Own complex outcomes"],
                      ["03", "Pattern recognition", "See many real cases"],
                      ["02", "Guided practice", "Draft, review, correct"],
                      ["01", "Routine production", "Research, format, summarize"],
                    ].map(([number, title, copy], index) => (
                      <motion.div
                        key={number}
                        initial={reduceMotion ? undefined : { opacity: 0, x: 28 }}
                        whileInView={{ opacity: index === 3 ? 0.35 : 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.65, delay: index * 0.1 }}
                        className={`flex items-center gap-4 border p-4 ${
                          index === 3
                            ? "border-dashed border-slate-600/25 bg-slate-900/20"
                            : "border-white/[0.08] bg-white/[0.025]"
                        }`}
                      >
                        <span className="font-mono text-[10px] text-cyan-300/45">{number}</span>
                        <span>
                          <span className="block text-sm font-bold text-white">{title}</span>
                          <span className="mt-1 block text-[10px] text-slate-600">{copy}</span>
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-start gap-3 border-l border-amber-200/25 pl-4 text-[10px] leading-5 text-slate-500">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-200/70" />
                    When level 01 disappears, organizations must intentionally
                    redesign apprenticeships—not assume expertise will still emerge.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HumanEdgeSection({ reduceMotion }: { reduceMotion: boolean }) {
  const [activeSkill, setActiveSkill] = useState(0);
  const skills = [
    {
      title: "Judgement",
      label: "Choose under uncertainty",
      copy: "Recognize incomplete information, weigh trade-offs and decide when the model should not be followed.",
      code: "JDG",
    },
    {
      title: "Context",
      label: "See what the prompt cannot",
      copy: "Understand history, incentives, culture, politics and the unspoken constraints surrounding a decision.",
      code: "CTX",
    },
    {
      title: "Trust",
      label: "Create human confidence",
      copy: "Listen, explain, negotiate and build relationships when stakes are personal or consequences are real.",
      code: "TRS",
    },
    {
      title: "Taste",
      label: "Know what is worth making",
      copy: "Select, refine and direct from a flood of possible outputs rather than accepting the first plausible result.",
      code: "TST",
    },
    {
      title: "Accountability",
      label: "Own the consequence",
      copy: "Stand behind a decision, document the reasoning and remain answerable when an automated system fails.",
      code: "OWN",
    },
  ];

  return (
    <section id="human-edge" className="relative z-10 border-y border-white/[0.07] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <motion.div {...reveal(reduceMotion)} className="mx-auto max-w-4xl text-center">
          <SectionLabel centered>Chapter 04 · The human edge</SectionLabel>
          <SectionHeading centered>
            When output becomes abundant,
            <span className="block text-cyan-300">discernment becomes scarce.</span>
          </SectionHeading>
          <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            The strongest careers will combine AI fluency with capabilities that
            become more—not less—important when machines produce fast,
            persuasive answers.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:items-center">
          <motion.div {...reveal(reduceMotion, 0.08)} className="relative min-h-[520px] [perspective:1200px]">
            <div className="absolute inset-[8%] rounded-full border border-dashed border-cyan-300/15" />
            <motion.div
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[19%] rounded-full border border-cyan-300/14"
            />
            <motion.div
              animate={reduceMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[30%] rounded-full border border-blue-300/15"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                key={skills[activeSkill].code}
                initial={reduceMotion ? undefined : { opacity: 0, scale: 0.88, rotateY: 18 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex h-56 w-56 flex-col items-center justify-center rounded-full border border-cyan-300/25 bg-slate-950/75 p-8 text-center shadow-[0_0_110px_rgba(34,211,238,0.12)] backdrop-blur-xl sm:h-64 sm:w-64"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/50">
                  {skills[activeSkill].code}
                </span>
                <span className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">
                  {skills[activeSkill].title}
                </span>
                <span className="mt-3 text-[10px] uppercase tracking-[0.13em] text-slate-600">
                  {skills[activeSkill].label}
                </span>
              </motion.div>
            </div>

            {skills.map((skill, index) => {
              const positions = [
                "left-[3%] top-[16%]",
                "right-[4%] top-[13%]",
                "left-[1%] bottom-[16%]",
                "right-[0%] bottom-[14%]",
                "left-1/2 top-[2%] -translate-x-1/2",
              ];
              return (
                <button
                  key={skill.code}
                  type="button"
                  onClick={() => setActiveSkill(index)}
                  className={`absolute ${positions[index]} z-20 min-w-32 border px-4 py-3 text-left backdrop-blur-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    activeSkill === index
                      ? "border-cyan-300/35 bg-cyan-300/[0.09] text-white shadow-[0_0_35px_rgba(34,211,238,0.08)]"
                      : "border-white/[0.09] bg-slate-950/68 text-slate-500 hover:border-white/[0.16] hover:text-slate-200"
                  }`}
                >
                  <span className="block text-[8px] font-semibold uppercase tracking-[0.16em] text-cyan-300/45">
                    {skill.code}
                  </span>
                  <span className="mt-1.5 block text-xs font-bold">{skill.title}</span>
                </button>
              );
            })}
          </motion.div>

          <motion.div {...reveal(reduceMotion, 0.12)}>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300/55">
              Selected capability
            </p>
            <motion.div
              key={activeSkill}
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42 }}
              className="mt-5"
            >
              <h3 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
                {skills[activeSkill].title}
              </h3>
              <p className="mt-5 text-lg font-medium leading-8 text-slate-300">
                {skills[activeSkill].label}
              </p>
              <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
                {skills[activeSkill].copy}
              </p>
            </motion.div>

            <div className="mt-9 border-y border-white/[0.08] py-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Durable skill stack
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Domain depth", "AI fluency", "Critical thinking", "Communication", "Ethics"].map((item) => (
                  <span key={item} className="border border-white/[0.09] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-400">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ScenarioLabSection({ reduceMotion }: { reduceMotion: boolean }) {
  const [scenario, setScenario] = useState<ScenarioState>({
    routine: 60,
    digital: 75,
    judgement: 45,
    people: 35,
  });

  const score = useMemo(() => {
    const exposure = Math.round(
      scenario.routine * 0.42 +
        scenario.digital * 0.35 -
        scenario.judgement * 0.12 -
        scenario.people * 0.09,
    );
    const complement = Math.round(
      scenario.digital * 0.26 +
        scenario.judgement * 0.39 +
        scenario.people * 0.31 +
        (100 - scenario.routine) * 0.08,
    );
    return {
      exposure: Math.max(5, Math.min(95, exposure)),
      complement: Math.max(10, Math.min(95, complement)),
    };
  }, [scenario]);

  const interpretation =
    score.exposure >= 68
      ? "A large share of your task mix is technically exposed. Prioritize workflow redesign, verification skills and movement toward judgement-rich responsibilities."
      : score.exposure >= 42
        ? "Your role is likely to be reshaped more than removed. The opportunity is to automate routine output while expanding context, relationship and decision work."
        : "Your task mix is relatively protected from direct automation, but AI can still improve preparation, coordination, access to information and service quality.";

  return (
    <section id="scenario-lab" className="relative z-10 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <motion.div {...reveal(reduceMotion)} className="mx-auto max-w-4xl text-center">
          <SectionLabel centered>Interactive role lab</SectionLabel>
          <SectionHeading centered>
            What part of your work
            <span className="block text-cyan-300">is exposed—and what part grows?</span>
          </SectionHeading>
          <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            Adjust the task mix below. This educational model does not predict
            job loss; it helps reveal where automation and augmentation may
            appear inside a role.
          </p>
        </motion.div>

        <motion.div
          {...reveal(reduceMotion, 0.08)}
          className="mt-14 grid overflow-hidden border border-white/[0.09] bg-white/[0.08] lg:grid-cols-[0.56fr_0.44fr]"
        >
          <div className="bg-[#020617]/95 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300/55">
                  Task profile
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-white">
                  Describe a typical week
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setScenario({ routine: 60, digital: 75, judgement: 45, people: 35 })}
                className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-600 transition-colors hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Reset
              </button>
            </div>

            <div className="mt-9 space-y-8">
              <RangeControl
                label="Routine and repeatable"
                description="Rules, templates, predictable inputs and outputs"
                value={scenario.routine}
                onChange={(routine) => setScenario((current) => ({ ...current, routine }))}
              />
              <RangeControl
                label="Digital and information-based"
                description="Text, data, code, documents, images and screens"
                value={scenario.digital}
                onChange={(digital) => setScenario((current) => ({ ...current, digital }))}
              />
              <RangeControl
                label="Judgement and ambiguity"
                description="Trade-offs, exceptions, incomplete information and risk"
                value={scenario.judgement}
                onChange={(judgement) => setScenario((current) => ({ ...current, judgement }))}
              />
              <RangeControl
                label="Human interaction and trust"
                description="Care, persuasion, leadership, conflict and relationships"
                value={scenario.people}
                onChange={(people) => setScenario((current) => ({ ...current, people }))}
              />
            </div>
          </div>

          <div className="relative overflow-hidden bg-slate-950/92 p-6 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.11),transparent_45%)]" />
            <div className="relative">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300/55">
                Illustrative result
              </p>

              <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08]">
                <ScoreGauge label="Automation exposure" value={score.exposure} />
                <ScoreGauge label="Augmentation upside" value={score.complement} />
              </div>

              <div className="mt-8 border-l border-cyan-300/25 pl-5">
                <p className="text-sm leading-7 text-slate-300">{interpretation}</p>
              </div>

              <div className="mt-8 space-y-3">
                <RecommendationRow
                  index="01"
                  title="Automate the repeatable"
                  active={score.exposure > 45}
                />
                <RecommendationRow
                  index="02"
                  title="Strengthen verification"
                  active={scenario.digital > 45}
                />
                <RecommendationRow
                  index="03"
                  title="Move toward judgement and trust"
                  active={scenario.judgement < 60 || scenario.people < 60}
                />
              </div>

              <p className="mt-6 text-[9px] leading-5 text-slate-700">
                This score is a transparent educational heuristic based only on
                your slider inputs. It is not a labour-market forecast or career
                assessment.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RangeControl({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-end justify-between gap-4">
        <span>
          <span className="block text-sm font-bold text-white">{label}</span>
          <span className="mt-1 block text-[10px] leading-5 text-slate-600">{description}</span>
        </span>
        <span className="font-mono text-sm text-cyan-300">{value}%</span>
      </span>
      <span className="relative mt-4 block h-2 bg-white/[0.06]">
        <span
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-300/35 to-cyan-300"
          style={{ width: `${value}%` }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-label={label}
        />
        <span
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#020617] bg-cyan-200 shadow-[0_0_20px_rgba(103,232,249,0.6)]"
          style={{ left: `${value}%` }}
        />
      </span>
    </label>
  );
}

function ScoreGauge({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-[#020617] p-5 text-center sm:p-6">
      <div
        className="mx-auto flex h-24 w-24 items-center justify-center rounded-full p-[7px]"
        style={{
          background: `conic-gradient(rgb(103 232 249) ${value * 3.6}deg, rgba(255,255,255,0.05) 0deg)`,
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#020617]">
          <span className="text-2xl font-black tracking-[-0.04em] text-white">{value}</span>
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-28 text-[9px] font-semibold uppercase leading-4 tracking-[0.13em] text-slate-500">
        {label}
      </p>
    </div>
  );
}

function RecommendationRow({ index, title, active }: { index: string; title: string; active: boolean }) {
  return (
    <div className={`flex items-center gap-4 border p-4 ${active ? "border-cyan-300/16 bg-cyan-300/[0.035]" : "border-white/[0.06] opacity-40"}`}>
      <span className="font-mono text-[9px] text-cyan-300/45">{index}</span>
      <span className="text-xs font-medium text-slate-300">{title}</span>
      <span className="ml-auto text-cyan-300/70">{active ? "✓" : "—"}</span>
    </div>
  );
}

function ActionSection({ reduceMotion }: { reduceMotion: boolean }) {
  const [audience, setAudience] = useState<ActionAudience>("worker");
  const content = actionContent[audience];

  return (
    <section id="action" className="relative z-10 border-y border-white/[0.07] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <motion.div {...reveal(reduceMotion)} className="grid gap-8 lg:grid-cols-[0.67fr_0.33fr] lg:items-end">
          <div>
            <SectionLabel>Chapter 05 · Turn insight into action</SectionLabel>
            <SectionHeading>
              The transition is manageable
              <span className="block text-cyan-300">when it is designed.</span>
            </SectionHeading>
          </div>
          <div className="flex border border-white/[0.09] p-1 lg:justify-self-end">
            {([
              ["worker", "Individuals"],
              ["leader", "Organizations"],
              ["policy", "Public systems"],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setAudience(id)}
                className={`min-h-10 px-3 text-[8px] font-bold uppercase tracking-[0.13em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:px-4 sm:text-[9px] ${
                  audience === id
                    ? "bg-cyan-300 text-slate-950"
                    : "text-slate-500 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          key={audience}
          initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid gap-8 lg:grid-cols-[0.38fr_0.62fr]"
        >
          <div className="border border-cyan-300/15 bg-slate-950/58 p-7 sm:p-8 lg:p-10">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300/55">
              {content.eyebrow}
            </p>
            <h3 className="mt-5 text-3xl font-black leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl">
              {content.title}
            </h3>
            <p className="mt-6 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              {content.intro}
            </p>
          </div>

          <div className="border-t border-white/[0.08]">
            {content.actions.map((action) => (
              <article key={action.number} className="group grid gap-5 border-b border-white/[0.08] py-7 sm:grid-cols-[70px_0.75fr_1.25fr] sm:items-start sm:py-8">
                <span className="font-mono text-[10px] tracking-[0.18em] text-cyan-300/40">
                  {action.number}
                </span>
                <h4 className="text-xl font-bold tracking-[-0.03em] text-white transition-colors group-hover:text-cyan-200">
                  {action.title}
                </h4>
                <p className="text-sm leading-7 text-slate-500">{action.description}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ClosingSection({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section className="relative z-10 px-5 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-32 xl:px-16">
      <motion.div
        {...reveal(reduceMotion)}
        className="relative mx-auto max-w-[1312px] overflow-hidden border border-cyan-300/15 bg-slate-950/75 px-6 py-16 text-center shadow-[0_0_140px_rgba(34,211,238,0.07)] backdrop-blur-xl sm:px-10 sm:py-20 lg:px-16 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.13),transparent_46%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <span className="absolute left-6 top-6 h-10 w-10 border-l border-t border-cyan-300/25" />
        <span className="absolute bottom-6 right-6 h-10 w-10 border-b border-r border-cyan-300/25" />

        <div className="relative z-10">
          <SectionLabel centered>The final frame</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-5xl text-4xl font-black leading-[0.98] tracking-[-0.057em] text-white sm:text-5xl lg:text-7xl">
            AI does not decide the future of work.
            <span className="block text-cyan-300">People decide how AI enters work.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            Technology sets new possibilities. Institutions, leaders and workers
            decide whether those possibilities become better jobs, fewer entry
            points, wider inequality or a more capable workforce.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-200">
            The most valuable question is no longer “Will AI take my job?” It is
            “Which parts of my work should machines do—and what will I become
            responsible for next?”
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryButton href="#scenario-lab">Revisit your role profile</PrimaryButton>
            <SecondaryButton href="#sources">Read the source notes</SecondaryButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SourcesSection({ reduceMotion }: { reduceMotion: boolean }) {
  const sources = [
    {
      name: "World Economic Forum",
      date: "January 2025",
      title: "Future of Jobs Report 2025",
      note: "Job creation, displacement, skills change and employer workforce strategies through 2030.",
      href: SOURCE_LINKS.wef,
    },
    {
      name: "International Labour Organization",
      date: "May 2025",
      title: "Generative AI and Jobs: A Refined Global Index",
      note: "Task-level exposure estimates and the distinction between job transformation and full automation.",
      href: SOURCE_LINKS.ilo,
    },
    {
      name: "International Monetary Fund",
      date: "January 2026",
      title: "New Skills and AI Are Reshaping the Future of Work",
      note: "New-skill demand, wage premiums, regional employment effects and entry-level exposure.",
      href: SOURCE_LINKS.imf2026,
    },
    {
      name: "International Monetary Fund",
      date: "January 2024",
      title: "AI Will Transform the Global Economy",
      note: "Global, advanced-economy, emerging-market and low-income exposure estimates.",
      href: SOURCE_LINKS.imf2024,
    },
  ];

  return (
    <footer id="sources" className="relative z-10 border-t border-white/[0.07] pb-12 pt-20 sm:pt-24">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <motion.div {...reveal(reduceMotion)} className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr]">
          <div>
            <SectionLabel>Sources and method</SectionLabel>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.045em] text-white">
              Read beyond the headline.
            </h2>
            <p className="mt-5 text-xs leading-6 text-slate-500">
              Statistics are drawn from the linked institutional sources. Role
              profiles and the interactive lab are editorial teaching tools, not
              predictions of individual job loss.
            </p>
          </div>

          <div className="border-t border-white/[0.08]">
            {sources.map((source, index) => (
              <a
                key={source.title}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-4 border-b border-white/[0.08] py-6 transition-colors hover:bg-white/[0.018] sm:grid-cols-[60px_0.85fr_1.15fr_24px] sm:items-center sm:px-3"
              >
                <span className="font-mono text-[9px] tracking-[0.17em] text-cyan-300/40">
                  0{index + 1}
                </span>
                <span>
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan-300/45">
                    {source.name} · {source.date}
                  </span>
                  <span className="mt-2 block text-sm font-bold text-white group-hover:text-cyan-200">
                    {source.title}
                  </span>
                </span>
                <span className="text-xs leading-6 text-slate-600">{source.note}</span>
                <ArrowIcon className="text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-cyan-200" />
              </a>
            ))}
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.07] pt-7 text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <span>Editorial experience · AI and human work</span>
          <span>Designed for thoughtful reading, not fear-driven scrolling</span>
        </div>
      </div>
    </footer>
  );
}

function TiltCard({ children, reduceMotion }: { children: ReactNode; reduceMotion: boolean }) {
  const [style, setStyle] = useState<CSSProperties>({});

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateZ(0)`,
    });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" })}
      className="h-full transition-transform duration-300 ease-out [transform-style:preserve-3d]"
      style={style}
    >
      {children}
    </div>
  );
}

function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="relative my-14 border-y border-white/[0.08] py-9 sm:py-11">
      <span className="absolute left-0 top-0 h-px w-32 bg-gradient-to-r from-cyan-300/60 to-transparent" />
      <span className="text-5xl font-black leading-none text-cyan-300/25">“</span>
      <p className="-mt-3 max-w-4xl text-2xl font-bold leading-[1.45] tracking-[-0.035em] text-white sm:text-3xl">
        {children}
      </p>
    </blockquote>
  );
}

function SectionLabel({
  children,
  centered = false,
}: {
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
      {centered && <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-300/60" />}
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/65">
        {children}
      </p>
      <span className="h-px w-9 bg-gradient-to-r from-cyan-300/60 to-transparent" />
    </div>
  );
}

function SectionHeading({
  children,
  centered = false,
}: {
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <h2
      className={`mt-5 text-4xl font-black leading-[1] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl ${
        centered ? "text-center" : ""
      }`}
    >
      {children}
    </h2>
  );
}

function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex min-h-12 items-center justify-center gap-3 bg-cyan-300 px-6 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
    >
      {children}
      <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex min-h-12 items-center justify-center gap-3 border border-white/[0.13] px-6 text-sm font-bold text-white transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/[0.05] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
    >
      {children}
      <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function StatusDot() {
  return (
    <span className="relative flex h-2 w-2 items-center justify-center">
      <span className="absolute h-2 w-2 animate-ping rounded-full bg-cyan-300/30 motion-reduce:animate-none" />
      <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-300" />
    </span>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`h-4 w-4 ${className}`} aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}