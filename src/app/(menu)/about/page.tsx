"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type IconName =
  | "strategy"
  | "communication"
  | "ai"
  | "engineering"
  | "partnership"
  | "collaboration"
  | "transparent"
  | "responsible"
  | "outcome"
  | "mission"
  | "vision";

type CompanyFact = {
  value: string;
  label: string;
};

const differentiators = [
  {
    number: "01",
    eyebrow: "Strategy",
    title: "Business-First Thinking",
    description:
      "We begin with the problem, expected outcome and user needs before selecting the technology.",
    icon: "strategy" as IconName,
  },
  {
    number: "02",
    eyebrow: "Communication",
    title: "Clear and Honest Communication",
    description:
      "You receive regular progress updates, product demonstrations and direct access to the people working on your project.",
    icon: "communication" as IconName,
  },
  {
    number: "03",
    eyebrow: "Applied AI",
    title: "Practical AI Development",
    description:
      "We focus on AI solutions that improve real workflows, use business data responsibly and integrate with existing systems.",
    icon: "ai" as IconName,
  },
  {
    number: "04",
    eyebrow: "Engineering",
    title: "Scalable Engineering",
    description:
      "We build products that are secure, maintainable and prepared for future users, features and integrations.",
    icon: "engineering" as IconName,
  },
  {
    number: "05",
    eyebrow: "Partnership",
    title: "Long-Term Partnership",
    description:
      "Our involvement does not have to end at launch. We can continue supporting, monitoring and improving your product as your business grows.",
    icon: "partnership" as IconName,
  },
];

const workPrinciples = [
  {
    title: "Collaborative",
    description:
      "We involve clients throughout planning, design and development.",
    icon: "collaboration" as IconName,
  },
  {
    title: "Transparent",
    description:
      "We communicate progress, risks and decisions clearly.",
    icon: "transparent" as IconName,
  },
  {
    title: "Responsible",
    description:
      "We consider security, privacy, performance and maintainability from the beginning.",
    icon: "responsible" as IconName,
  },
  {
    title: "Outcome-Focused",
    description:
      "We measure success by the value the product creates, not by the amount of code written.",
    icon: "outcome" as IconName,
  },
];

/*
  Add verified company facts here. The section remains hidden while this array
  is empty, preventing placeholder or invented numbers from appearing.
*/
const companyFacts: CompanyFact[] = [];

const reveal = (reduceMotion: boolean, delay = 0) => ({
  initial: reduceMotion ? undefined : { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration: 0.7,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

export default function AboutUsPage() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <main className="relative overflow-hidden bg-[#020617] text-white">
      <AmbientBackground reduceMotion={reduceMotion} />

      <HeroSection reduceMotion={reduceMotion} />
      <IntroductionSection reduceMotion={reduceMotion} />
      <MissionVisionSection reduceMotion={reduceMotion} />
      <DifferentiatorsSection reduceMotion={reduceMotion} />
      <TeamCultureSection reduceMotion={reduceMotion} />

      {companyFacts.length > 0 && (
        <CompanyFactsSection
          facts={companyFacts}
          reduceMotion={reduceMotion}
        />
      )}

      <FinalCtaSection reduceMotion={reduceMotion} />
    </main>
  );
}

function AmbientBackground({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />

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
        className="absolute -right-40 top-[38rem] h-[36rem] w-[36rem] rounded-full bg-blue-500/[0.07] blur-[130px]"
      />
    </div>
  );
}

function HeroSection({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section className="relative border-b border-white/[0.07] pb-20 sm:pb-24 lg:pb-28 pt-[22.4px] sm:pt-[28.8px] lg:pt-[35.2px]"> {/* 80% of original padding */}
      <div className="mx-auto grid w-full max-w-[1440px] gap-16 px-5 sm:px-7 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:px-10 xl:px-16">
        <motion.div {...reveal(reduceMotion)} className="relative z-10">
          <SectionLabel>About Us</SectionLabel>

          <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
            We build technology that helps businesses
            <span className="block bg-gradient-to-r from-cyan-200 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              move forward.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            We are a software and AI development company helping startups and
            established businesses turn ideas, challenges and manual processes
            into reliable digital products.
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Our team combines product thinking, design and engineering to build
            solutions that are practical, scalable and aligned with real
            business goals.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="/contact">Work With Us</PrimaryButton>
            <SecondaryButton href="/work">Explore Our Work</SecondaryButton>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/[0.08] pt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span className="flex items-center gap-2">
              <StatusDot /> Custom Software
            </span>
            <span className="flex items-center gap-2">
              <StatusDot /> AI Products
            </span>
            <span className="flex items-center gap-2">
              <StatusDot /> Business Automation
            </span>
          </div>
        </motion.div>

        <HeroVisual reduceMotion={reduceMotion} />
      </div>
    </section>
  );
}

function HeroVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const nodes = [
    { label: "Discover", position: "left-[4%] top-[20%]" },
    { label: "Design", position: "right-[5%] top-[18%]" },
    { label: "Build", position: "left-[1%] bottom-[18%]" },
    { label: "Improve", position: "right-[0%] bottom-[14%]" },
  ];

  return (
    <motion.div
      {...reveal(reduceMotion, 0.16)}
      className="relative mx-auto flex min-h-[420px] w-full max-w-[540px] items-center justify-center lg:min-h-[570px]"
      aria-hidden="true"
    >
      <div className="absolute inset-[9%] rounded-full border border-dashed border-cyan-300/15" />
      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[18%] rounded-full border border-cyan-300/15"
      />
      <motion.div
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 31, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[28%] rounded-full border border-blue-300/15"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_45%)]" />

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : { y: [0, -8, 0], scale: [1, 1.025, 1] }
        }
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex h-52 w-52 flex-col items-center justify-center rounded-full border border-cyan-300/25 bg-slate-950/65 text-center shadow-[0_0_100px_rgba(34,211,238,0.11)] backdrop-blur-xl sm:h-60 sm:w-60"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-cyan-300/20 text-cyan-200">
          <ProductIcon />
        </span>
        <span className="mt-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-300/60">
          Product partner
        </span>
        <span className="mt-2 text-2xl font-bold tracking-[-0.04em] text-white">
          Idea to impact
        </span>
        <span className="mt-2 text-[9px] uppercase tracking-[0.17em] text-slate-600">
          Strategy · Design · Engineering
        </span>
      </motion.div>

      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          animate={
            reduceMotion
              ? undefined
              : { y: [0, index % 2 === 0 ? -5 : 5, 0], opacity: [0.7, 1, 0.7] }
          }
          transition={{
            duration: 3.4 + index * 0.45,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute ${node.position} z-20 flex items-center gap-3 rounded-full border border-white/[0.09] bg-slate-950/65 px-4 py-3 backdrop-blur-md`}
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-300">
            {node.label}
          </span>
        </motion.div>
      ))}

      <span className="absolute left-[15%] top-1/2 h-px w-[22%] bg-gradient-to-r from-transparent to-cyan-300/30" />
      <span className="absolute right-[15%] top-1/2 h-px w-[22%] bg-gradient-to-l from-transparent to-cyan-300/30" />
    </motion.div>
  );
}

function IntroductionSection({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-[1440px] gap-14 px-5 sm:px-7 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-20 lg:px-10 xl:px-16">
        <TeamImagePlaceholder reduceMotion={reduceMotion} />

        <motion.div {...reveal(reduceMotion, 0.08)}>
          <SectionLabel>Company Introduction</SectionLabel>
          <SectionHeading>
            More than a
            <span className="block text-cyan-300">development team.</span>
          </SectionHeading>

          <p className="mt-7 text-lg font-medium leading-8 text-slate-200">
            We work as a technology partner, not just a service provider.
          </p>

          <div className="mt-6 space-y-5 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            <p>
              Before writing code, we take time to understand your business,
              users, existing systems and long-term objectives. This helps us
              recommend the right solution instead of adding unnecessary
              features or technologies.
            </p>
            <p>
              Our work includes custom software, web and mobile applications,
              AI-powered products, business automation and cloud-based
              platforms.
            </p>
            <p>
              From early product planning to development, launch and ongoing
              improvement, we support the complete product journey.
            </p>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {[
              "Product strategy and planning",
              "UX and interface design",
              "Software and AI engineering",
              "Launch, support and improvement",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-t border-white/[0.08] py-4 text-sm text-slate-300"
              >
                <CheckIcon />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TeamImagePlaceholder({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      {...reveal(reduceMotion)}
      className="relative min-h-[450px] overflow-hidden border border-white/[0.09] bg-slate-950/60 sm:min-h-[560px]"
    >
      {/* Replace this visual with a genuine team or office photograph. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.14),transparent_38%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="absolute inset-x-8 top-8 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        <span>Team / Studio</span>
        <span className="flex items-center gap-2 text-cyan-300/60">
          <StatusDot /> Working together
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex h-52 w-64 items-end justify-center border border-white/[0.08] bg-slate-900/40 p-7 backdrop-blur-sm sm:h-64 sm:w-80">
          <span className="absolute left-5 top-5 h-12 w-12 border-l border-t border-cyan-300/25" />
          <span className="absolute bottom-5 right-5 h-12 w-12 border-b border-r border-cyan-300/25" />

          <div className="flex items-end gap-3">
            {[64, 88, 74, 98].map((height, index) => (
              <motion.div
                key={height}
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, index % 2 === 0 ? -6 : 5, 0] }
                }
                transition={{
                  duration: 3.4 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center"
              >
                <span className="h-9 w-9 rounded-full border border-cyan-300/20 bg-slate-800" />
                <span
                  className="mt-2 w-11 rounded-t-full border border-white/[0.08] bg-slate-800/80"
                  style={{ height }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 right-8 border-t border-white/[0.08] pt-5">
        <p className="text-xs leading-6 text-slate-500">
          Replace this panel with a real photograph of your team, office or a
          collaborative working session.
        </p>
      </div>
    </motion.div>
  );
}

function MissionVisionSection({ reduceMotion }: { reduceMotion: boolean }) {
  const cards = [
    {
      label: "Our Mission",
      title: "Make advanced technology practical and valuable.",
      description:
        "To make advanced software and AI technology practical, reliable and valuable for businesses. We aim to create products that simplify work, improve customer experiences and support sustainable growth.",
      icon: "mission" as IconName,
    },
    {
      label: "Our Vision",
      title: "Build digital products with long-term value.",
      description:
        "To become a trusted technology partner for companies that want to innovate responsibly and build digital products with long-term value.",
      icon: "vision" as IconName,
    },
  ];

  return (
    <section className="relative border-y border-white/[0.07] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <motion.div {...reveal(reduceMotion)} className="mx-auto max-w-4xl text-center">
          <SectionLabel centered>Purpose and Direction</SectionLabel>
          <SectionHeading centered>
            What guides the way
            <span className="block text-cyan-300">we build.</span>
          </SectionHeading>
        </motion.div>

        <div className="mt-14 grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] lg:grid-cols-2">
          {cards.map((card, index) => (
            <motion.article
              key={card.label}
              {...reveal(reduceMotion, index * 0.1)}
              className="group relative bg-[#020617]/95 p-7 sm:p-10 lg:p-12"
            >
              <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan-300 to-blue-400 transition-transform duration-500 group-hover:scale-x-100" />

              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-200">
                <Icon name={card.icon} />
              </span>

              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.21em] text-cyan-300/60">
                {card.label}
              </p>
              <h3 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-[-0.045em] text-white sm:text-4xl">
                {card.title}
              </h3>
              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                {card.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferentiatorsSection({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <motion.div
          {...reveal(reduceMotion)}
          className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"
        >
          <div>
            <SectionLabel>What Makes Us Different</SectionLabel>
            <SectionHeading>
              Technology decisions based on
              <span className="block text-cyan-300">business needs.</span>
            </SectionHeading>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8 lg:justify-self-end">
            The strongest products are not defined by how many technologies they
            use. They are defined by how clearly they solve a problem, support
            users and create measurable value.
          </p>
        </motion.div>

        <div className="mt-16 border-t border-white/[0.08]">
          {differentiators.map((item, index) => (
            <motion.article
              key={item.number}
              {...reveal(reduceMotion, index * 0.055)}
              className="group grid gap-5 border-b border-white/[0.08] py-8 sm:grid-cols-[80px_1fr] lg:grid-cols-[100px_0.85fr_1.15fr] lg:items-center lg:py-10"
            >
              <div className="flex items-center gap-4 sm:block">
                <span className="font-mono text-xs tracking-[0.2em] text-cyan-300/45">
                  {item.number}
                </span>
                <span className="ml-auto h-px flex-1 bg-white/[0.08] sm:hidden" />
              </div>

              <div className="flex items-start gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-200 transition-colors duration-300 group-hover:border-cyan-300/45 group-hover:bg-cyan-300/[0.06]">
                  <Icon name={item.icon} />
                </span>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-2 text-xl font-bold tracking-[-0.03em] text-white sm:text-2xl">
                    {item.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm leading-7 text-slate-400 sm:col-start-2 lg:col-start-auto lg:max-w-xl lg:justify-self-end">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCultureSection({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section className="relative border-y border-white/[0.07] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div {...reveal(reduceMotion)}>
            <SectionLabel>Team and Culture</SectionLabel>
            <SectionHeading>
              A team that works with you,
              <span className="block text-cyan-300">not around you.</span>
            </SectionHeading>

            <p className="mt-7 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              Our team brings together software engineers, AI specialists,
              designers, quality analysts and product professionals.
            </p>
            <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              We value curiosity, ownership and straightforward communication.
              Every team member is encouraged to understand the business purpose
              behind the work—not only the technical task.
            </p>

            <div className="mt-10 border-y border-white/[0.08] py-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/60">
                One integrated product team
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Product", "Design", "Engineering", "AI", "Quality"].map(
                  (role) => (
                    <span
                      key={role}
                      className="rounded-full border border-white/[0.09] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400"
                    >
                      {role}
                    </span>
                  ),
                )}
              </div>
            </div>
          </motion.div>

          <div>
            <motion.div {...reveal(reduceMotion, 0.08)}>
              <SectionLabel>How We Work</SectionLabel>
            </motion.div>

            <div className="mt-6 grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
              {workPrinciples.map((item, index) => (
                <motion.article
                  key={item.title}
                  {...reveal(reduceMotion, 0.1 + index * 0.07)}
                  className="group min-h-56 bg-[#020617]/95 p-7 sm:p-8"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-200 transition-transform duration-300 group-hover:-translate-y-1">
                    <Icon name={item.icon} />
                  </span>
                  <h3 className="mt-7 text-xl font-bold tracking-[-0.03em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanyFactsSection({
  facts,
  reduceMotion,
}: {
  facts: CompanyFact[];
  reduceMotion: boolean;
}) {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <motion.div {...reveal(reduceMotion)} className="mx-auto max-w-4xl text-center">
          <SectionLabel centered>Company Facts</SectionLabel>
          <SectionHeading centered>
            Built on experience, trust and
            <span className="block text-cyan-300">continuous improvement.</span>
          </SectionHeading>
        </motion.div>

        <div className="mt-14 grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-5">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.label}
              {...reveal(reduceMotion, index * 0.06)}
              className="bg-[#020617] p-7 text-center lg:p-8"
            >
              <p className="text-4xl font-black tracking-[-0.05em] text-white">
                {fact.value}
              </p>
              <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-500">
                {fact.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section className="relative px-5 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-32 xl:px-16">
      <motion.div
        {...reveal(reduceMotion)}
        className="relative mx-auto max-w-[1312px] overflow-hidden border border-cyan-300/15 bg-slate-950/75 px-6 py-14 text-center shadow-[0_0_120px_rgba(34,211,238,0.06)] backdrop-blur-xl sm:px-10 sm:py-16 lg:px-16 lg:py-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_46%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <span className="absolute left-6 top-6 h-10 w-10 border-l border-t border-cyan-300/25" />
        <span className="absolute bottom-6 right-6 h-10 w-10 border-b border-r border-cyan-300/25" />

        <div className="relative z-10">
          <SectionLabel centered>Start a Project</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
            Let&apos;s build something
            <span className="block text-cyan-300">valuable together.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            Whether you are planning a new product, improving an existing system
            or exploring how AI could support your business, we can help you
            define a practical path forward.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            Tell us about your goals, current challenges and the type of support
            you need.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryButton href="/contact">Start a Conversation</PrimaryButton>
            <SecondaryButton href="/case-studies">
              View Case Studies
            </SecondaryButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            <span>NDA available</span>
            <span className="hidden h-1 w-1 rounded-full bg-cyan-300/50 sm:block" />
            <span>No-obligation consultation</span>
            <span className="hidden h-1 w-1 rounded-full bg-cyan-300/50 sm:block" />
            <span>Clear technical guidance</span>
          </div>
        </div>
      </motion.div>
    </section>
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
    <div
      className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
    >
      {centered && (
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-300/60" />
      )}
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

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
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

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
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

function Icon({ name }: { name: IconName }) {
  if (name === "strategy") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="m14.5 9.5 4-4M16 5.5h2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "communication") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M5 5h14v10H9l-4 4V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "ai") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <rect x="5" y="5" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 14.5 12 9l3 5.5M10.2 12.5h3.6M3 9h2M3 15h2M19 9h2M19 15h2M9 3v2M15 3v2M9 19v2M15 19v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "engineering") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "partnership") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="m8.5 12 3 3a2.1 2.1 0 0 0 3-3l-3.3-3.3a2.4 2.4 0 0 0-3.4 0L5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m15.5 12-3-3a2.1 2.1 0 0 0-3 3l3.3 3.3a2.4 2.4 0 0 0 3.4 0l2.8-2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "collaboration") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3.5 19c.4-3.5 2-5 4.5-5s4.1 1.5 4.5 5M13 17c.7-2 2-3 4-3 2.2 0 3.5 1.3 3.8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "transparent") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M2.8 12s3.4-5 9.2-5 9.2 5 9.2 5-3.4 5-9.2 5-9.2-5-9.2-5Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (name === "responsible") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M12 3 5 6v5c0 4.3 2.6 7.2 7 9 4.4-1.8 7-4.7 7-9V6l-7-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "outcome") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="m4 7 5-4 6 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "mission") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="m14 10 6-6M16.5 4H20v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 17 10 7l4 6 2-3 4 7H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ProductIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
      <path d="M12 3 4.5 7.2v9.6L12 21l7.5-4.2V7.2L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m4.8 7.4 7.2 4.1 7.2-4.1M12 11.5V21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m8.5 5 7.2 4.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-200">
      <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3" aria-hidden="true">
        <path d="m5 10 3 3 7-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
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