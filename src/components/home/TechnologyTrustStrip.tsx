"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

type Technology = {
  name: string;
  category: string;
  logo: string;
};

const firstRow: Technology[] = [
  {
    name: "React",
    category: "Frontend",
    logo: "https://cdn.simpleicons.org/react/61DAFB",
  },
  {
    name: "Next.js",
    category: "Framework",
    logo: "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
  },
  {
    name: "TypeScript",
    category: "Language",
    logo: "https://cdn.simpleicons.org/typescript/3178C6",
  },
  {
    name: "Tailwind CSS",
    category: "Interface",
    logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  },
  {
    name: "Node.js",
    category: "Backend",
    logo: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
  },
  {
    name: "Python",
    category: "AI & Backend",
    logo: "https://cdn.simpleicons.org/python/3776AB",
  },
  {
    name: "OpenAI",
    category: "Artificial Intelligence",
    logo: "https://cdn.simpleicons.org/openai/FFFFFF",
  },
  {
    name: "FastAPI",
    category: "API Development",
    logo: "https://cdn.simpleicons.org/fastapi/009688",
  },
  {
    name: "GraphQL",
    category: "API Technology",
    logo: "https://cdn.simpleicons.org/graphql/E10098",
  },
  {
    name: "Vite",
    category: "Build Tool",
    logo: "https://cdn.simpleicons.org/vite/646CFF",
  },
  {
    name: "Prisma",
    category: "Data Layer",
    logo: "https://cdn.simpleicons.org/prisma/FFFFFF",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    logo: "https://cdn.simpleicons.org/postgresql/4169E1",
  },
  {
    name: "MongoDB",
    category: "Database",
    logo: "https://cdn.simpleicons.org/mongodb/47A248",
  },
  {
    name: "Redis",
    category: "Data & Cache",
    logo: "https://cdn.simpleicons.org/redis/FF4438",
  },
  {
    name: "MySQL",
    category: "Database",
    logo: "https://cdn.simpleicons.org/mysql/4479A1",
  },
];

const secondRow: Technology[] = [
  {
    name: "Amazon Web Services",
    category: "Cloud",
    logo: "https://cdn.simpleicons.org/amazonwebservices/FF9900",
  },
  {
    name: "Google Cloud",
    category: "Cloud",
    logo: "https://cdn.simpleicons.org/googlecloud/4285F4",
  },
  {
    name: "Vercel",
    category: "Deployment",
    logo: "https://cdn.simpleicons.org/vercel/FFFFFF",
  },
  {
    name: "Docker",
    category: "Infrastructure",
    logo: "https://cdn.simpleicons.org/docker/2496ED",
  },
  {
    name: "Kubernetes",
    category: "Infrastructure",
    logo: "https://cdn.simpleicons.org/kubernetes/326CE5",
  },
  {
    name: "Cloudflare",
    category: "Security & Network",
    logo: "https://cdn.simpleicons.org/cloudflare/F38020",
  },
  {
    name: "Firebase",
    category: "Application Platform",
    logo: "https://cdn.simpleicons.org/firebase/DD2C00",
  },
  {
    name: "Supabase",
    category: "Backend Platform",
    logo: "https://cdn.simpleicons.org/supabase/3FCF8E",
  },
  {
    name: "GitHub",
    category: "Source Control",
    logo: "https://cdn.simpleicons.org/github/FFFFFF",
  },
  {
    name: "GitLab",
    category: "DevOps",
    logo: "https://cdn.simpleicons.org/gitlab/FC6D26",
  },
  {
    name: "Figma",
    category: "Product Design",
    logo: "https://cdn.simpleicons.org/figma/F24E1E",
  },
  {
    name: "Postman",
    category: "API Testing",
    logo: "https://cdn.simpleicons.org/postman/FF6C37",
  },
  {
    name: "TensorFlow",
    category: "Machine Learning",
    logo: "https://cdn.simpleicons.org/tensorflow/FF6F00",
  },
  {
    name: "PyTorch",
    category: "Machine Learning",
    logo: "https://cdn.simpleicons.org/pytorch/EE4C2C",
  },
  {
    name: "Linux",
    category: "Infrastructure",
    logo: "https://cdn.simpleicons.org/linux/FCC624",
  },
];

export default function TechnologyTrustStrip() {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 text-white">
      <div className="mx-auto mb-12 max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
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
            amount: 0.4,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-100/70 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-cyan-200" />
              </span>

              Technology ecosystem
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Built with technologies made for{" "}
              <span className="bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                modern AI products.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              We select tools according to each project&apos;s
              architecture, security, scalability and product
              requirements—not because one technology fits every
              problem.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-200">
              <StackIcon />
            </span>

            AI · Web · Cloud · Data · DevOps
          </div>
        </motion.div>
      </div>

      <div className="relative space-y-4">
        <EdgeFade position="left" />
        <EdgeFade position="right" />

        <MarqueeRow
          technologies={firstRow}
          duration={50}
        />

        <MarqueeRow
          technologies={secondRow}
          duration={55}
          reverse
        />
      </div>

     
    </section>
  );
}

function MarqueeRow({
  technologies,
  duration,
  reverse = false,
}: {
  technologies: Technology[];
  duration: number;
  reverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="group relative flex overflow-hidden py-1">
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                x: reverse
                  ? ["-50%", "0%"]
                  : ["0%", "-50%"],
              }
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex w-max will-change-transform group-hover:[animation-play-state:paused]"
      >
        <TechnologyGroup technologies={technologies} />

        <TechnologyGroup
          technologies={technologies}
          duplicate
        />
      </motion.div>
    </div>
  );
}

function TechnologyGroup({
  technologies,
  duplicate = false,
}: {
  technologies: Technology[];
  duplicate?: boolean;
}) {
  return (
    <div
      aria-hidden={duplicate}
      className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
    >
      {technologies.map((technology) => (
        <TechnologyCard
          key={`${duplicate ? "duplicate" : "original"}-${technology.name}`}
          technology={technology}
        />
      ))}
    </div>
  );
}

function TechnologyCard({
  technology,
}: {
  technology: Technology;
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="group/card relative flex h-[76px] w-[210px] shrink-0 items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-colors duration-300 hover:border-cyan-300/25 hover:bg-cyan-300/[0.055] sm:h-20 sm:w-[230px]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-black/20">
        <img
          src={technology.logo}
          alt=""
          loading="lazy"
          className="relative z-10 h-6 w-6 object-contain transition-transform duration-300 group-hover/card:scale-110"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        <span className="absolute text-sm font-bold text-cyan-200/70">
          {technology.name.charAt(0)}
        </span>
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-100 transition-colors group-hover/card:text-cyan-100">
          {technology.name}
        </p>

        <p className="mt-1 truncate text-[10px] uppercase tracking-[0.16em] text-slate-600">
          {technology.category}
        </p>
      </div>

      <div className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-cyan-300/30 shadow-[0_0_10px_rgba(34,211,238,0.55)] transition group-hover/card:bg-cyan-200" />
    </motion.div>
  );
}

function EdgeFade({
  position,
}: {
  position: "left" | "right";
}) {
  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-y-0 z-20 hidden w-20 sm:block lg:w-40",
        position === "left"
          ? "left-0 bg-gradient-to-r from-[#02050c]/80 to-transparent"
          : "right-0 bg-gradient-to-l from-[#02050c]/80 to-transparent",
      ].join(" ")}
    />
  );
}

function StackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="m4 8 8-4 8 4-8 4-8-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="m4 12 8 4 8-4M4 16l8 4 8-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

