"use client";

// Standalone transparent module: PurposeSelectedTechnology

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

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

export default function PurposeSelectedTechnology() {
  const [activeCategory, setActiveCategory] =
    useState(technologyCategories[0].id);

  const currentCategory =
    technologyCategories.find(
      (category) => category.id === activeCategory,
    ) ?? technologyCategories[0];

  return (
    <section className="relative isolate overflow-hidden py-24 text-white sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
      <ModuleHeader
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
                    ? "border-cyan-300/20 text-cyan-100"
                    : "border-white/[0.06] text-slate-500 hover:border-white/[0.12] hover:text-white",
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

        <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/[0.08] p-6 sm:p-8">
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
                      className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] p-4 transition hover:border-cyan-300/20"
                    >
                      <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.07]">
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
        </div>
      </div>
    </div>
    </section>
  );
}
