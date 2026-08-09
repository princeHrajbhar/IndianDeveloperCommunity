import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { PublicAccountLink } from "@/src/components/auth/public-account-link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Boxes,
  Braces,
  Check,
  ChevronRight,
  CloudCog,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Globe2,
  Layers3,
  LockKeyhole,
  Menu,
  MonitorSmartphone,
  Network,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";

/**
 * Single-file Next.js App Router page.
 * Place at: app/services/custom-software-development/page.tsx
 *
 * Expected image assets:
 * public/software-page/software-hero.jpg
 * public/software-page/product-workshop.jpg
 * public/software-page/software-dashboard.jpg
 * public/software-page/mobile-product.jpg
 */

const SITE_URL = "https://www.quantumfinix.com";
const PAGE_PATH = "/services/custom-software-development";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const COMPANY = {
  name: "QuantumFinix",
  email: "hello@quantumfinix.com",
};

const IMAGES = {
  hero: "/software-page/software-hero.jpg",
  workshop: "/software-page/product-workshop.jpg",
  dashboard: "/software-page/software-dashboard.jpg",
  mobile: "/software-page/mobile-product.jpg",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Custom Software Development Company | QuantumFinix",
  description:
    "QuantumFinix designs and develops custom web, mobile, SaaS, enterprise and internal software—from product discovery and UX to architecture, engineering, launch and long-term improvement.",
  keywords: [
    "custom software development",
    "custom software development company",
    "software product development",
    "web application development",
    "mobile app development",
    "SaaS development company",
    "enterprise software development",
    "software modernization",
    "MVP development",
    "product engineering services",
    "API integration services",
    "cloud software development",
    "dedicated software development team",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: COMPANY.name,
    title: "Custom Software Development Company | QuantumFinix",
    description:
      "Strategy, design and production engineering for dependable custom software products.",
    images: [
      {
        url: IMAGES.hero,
        width: 1200,
        height: 630,
        alt: "QuantumFinix custom software product engineering workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development Company | QuantumFinix",
    description:
      "Custom web, mobile, SaaS and enterprise software built around your users, operations and growth goals.",
    images: [IMAGES.hero],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const PRODUCT_TYPES = [
  {
    icon: Globe2,
    title: "Customer-facing web platforms",
    description:
      "Fast, accessible web applications designed around complex journeys, account experiences, transactions and self-service workflows.",
    examples:
      "Client portals, marketplaces, booking systems, fintech experiences, membership products and digital service platforms.",
  },
  {
    icon: MonitorSmartphone,
    title: "Mobile applications",
    description:
      "Native-quality mobile products with reliable APIs, secure identity, notifications, offline states and app-store readiness.",
    examples:
      "Consumer apps, field-service tools, health and wellness products, logistics apps and connected-device experiences.",
  },
  {
    icon: Layers3,
    title: "SaaS products",
    description:
      "Multi-tenant products with onboarding, subscriptions, roles, usage controls, admin tools, analytics and scalable cloud architecture.",
    examples:
      "B2B SaaS, vertical software, workflow products, collaboration platforms and subscription-based digital services.",
  },
  {
    icon: Workflow,
    title: "Internal business systems",
    description:
      "Purpose-built software that replaces fragmented spreadsheets, repetitive work and disconnected operational tools.",
    examples:
      "Operations dashboards, case management, approval systems, CRM extensions, inventory and workforce platforms.",
  },
  {
    icon: Network,
    title: "Enterprise platforms and integrations",
    description:
      "Secure systems that connect identity, data, legacy platforms, third-party services and business-critical processes.",
    examples:
      "Partner portals, ERP and CRM integrations, data hubs, API layers, workflow orchestration and compliance systems.",
  },
  {
    icon: Wrench,
    title: "Modernisation and rescue",
    description:
      "Practical improvement of slow, fragile or difficult-to-maintain products without unnecessary rewrites.",
    examples:
      "Architecture renewal, frontend rebuilds, cloud migration, performance work, security hardening and technical-debt reduction.",
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Understand the product opportunity",
    description:
      "We clarify the users, business model, existing process, operational pain, expected outcome, constraints and evidence behind the idea.",
    output:
      "Discovery brief, stakeholder map, product goals, success measures, assumptions and initial scope.",
  },
  {
    number: "02",
    title: "Shape the experience and scope",
    description:
      "We map the user journey, prioritise capabilities, prototype important flows and separate the essential first release from later ideas.",
    output:
      "User journeys, wireframes or prototype, prioritised backlog, release definition and acceptance criteria.",
  },
  {
    number: "03",
    title: "Design the technical foundation",
    description:
      "We define application architecture, data models, integrations, identity, permissions, infrastructure, observability and non-functional requirements.",
    output:
      "Solution architecture, integration plan, security approach, delivery plan and technical risk register.",
  },
  {
    number: "04",
    title: "Build in visible increments",
    description:
      "Designers and engineers work in short cycles, demonstrating working software frequently and testing decisions before they become expensive.",
    output:
      "Production-quality code, reviewed increments, automated tests, release notes and a transparent delivery board.",
  },
  {
    number: "05",
    title: "Validate and prepare the launch",
    description:
      "We test critical journeys, edge cases, security, performance, accessibility, data migration and operational readiness with your team.",
    output:
      "Validated release, launch checklist, training, documentation, monitoring and support procedures.",
  },
  {
    number: "06",
    title: "Operate, learn and improve",
    description:
      "After launch, we monitor quality and usage, resolve issues, measure outcomes and prioritise the next improvements using real evidence.",
    output:
      "Operational support, product analytics, maintenance plan and a prioritised improvement roadmap.",
  },
];

const DELIVERABLES = [
  "Product strategy and measurable release goals",
  "UX flows, prototypes and interface design system",
  "Application, API and data architecture",
  "Frontend, backend and mobile engineering",
  "Authentication, roles and permission controls",
  "Third-party, payment, CRM and ERP integrations",
  "Automated functional and integration testing",
  "Cloud environments, CI/CD and release automation",
  "Security, performance and accessibility validation",
  "Source code, documentation and team handover",
  "Production monitoring and incident readiness",
  "Post-launch support and product improvement",
];

const CLIENT_INPUTS = [
  {
    title: "The problem and desired outcome",
    text: "What users struggle with today, what the business needs to improve and how you will recognise success.",
  },
  {
    title: "Users and workflows",
    text: "Who uses the product, the steps they take, where decisions happen and which exceptions matter.",
  },
  {
    title: "Existing systems and data",
    text: "Current software, integrations, databases, spreadsheets, APIs, vendors and ownership constraints.",
  },
  {
    title: "Commercial and operational context",
    text: "Revenue model, internal ownership, launch expectations, compliance needs, budget range and decision process.",
  },
];

const BUYER_QUESTIONS = [
  {
    question: "How will you control scope and avoid surprise costs?",
    answer:
      "We define the release around outcomes and acceptance criteria, make assumptions visible, maintain a prioritised backlog and review delivery evidence frequently. Changes are assessed for impact before they enter the active plan.",
  },
  {
    question: "How will we know what is happening during development?",
    answer:
      "You receive access to the delivery board, design work, working product demonstrations, decisions, risks and release status. The goal is continuous visibility rather than a large reveal at the end.",
  },
  {
    question: "Who owns the source code and product assets?",
    answer:
      "Ownership, third-party licences, reusable components, accounts, infrastructure and intellectual-property transfer are documented before development. Client-specific source code and agreed assets are handed over according to the contract.",
  },
  {
    question: "Can you work with our internal team?",
    answer:
      "Yes. QuantumFinix can own the full product, lead a focused workstream, provide embedded specialists or work alongside internal product, design, engineering, security and data teams.",
  },
  {
    question: "How do you protect security and customer data?",
    answer:
      "Security is considered in architecture, identity, permissions, data handling, dependency management, infrastructure, logging, testing and release operations. Specific controls are aligned to the product risk and regulatory context.",
  },
  {
    question: "What happens if priorities change?",
    answer:
      "The roadmap is treated as a decision framework, not a fixed wish list. We preserve the product goal, review new evidence and trade scope, time and investment openly.",
  },
];

const FAQS = [
  {
    question: "What does custom software development include?",
    answer:
      "It can include discovery, product strategy, UX and UI design, architecture, web or mobile engineering, APIs, integrations, data migration, quality assurance, cloud deployment, documentation, support and continuous product development.",
  },
  {
    question: "How much does custom software development cost?",
    answer:
      "Cost depends on the product scope, number of user roles, workflow complexity, integrations, data migration, security requirements, platforms, quality level and delivery model. QuantumFinix provides a phased recommendation after discovery rather than an unsupported fixed figure.",
  },
  {
    question: "How long does it take to build custom software?",
    answer:
      "A focused prototype or discovery phase may take weeks. A production MVP commonly requires several months, while a larger platform is delivered through multiple releases. The schedule is defined after the important risks and dependencies are understood.",
  },
  {
    question: "Can you build an MVP first?",
    answer:
      "Yes. We define an MVP as the smallest credible product that can serve real users and test the most important business assumptions—not simply a reduced list of features.",
  },
  {
    question: "Which technologies do you use?",
    answer:
      "Technology is selected around product requirements, maintainability, team capability, integration needs, scale, security and cost. The stack may include modern TypeScript and JavaScript frameworks, mobile technologies, cloud platforms, relational or document databases and appropriate managed services.",
  },
  {
    question: "Can you modernise an existing application?",
    answer:
      "Yes. We can assess the current codebase and architecture, stabilise high-risk areas, improve performance and security, replace selected layers, migrate infrastructure or plan a staged rebuild while protecting business continuity.",
  },
  {
    question: "Do you provide maintenance after launch?",
    answer:
      "Yes. Support can include monitoring, incident response, bug fixes, dependency and security updates, performance work, infrastructure management, product analytics and ongoing feature development.",
  },
  {
    question: "What should we prepare for the first call?",
    answer:
      "Bring the business problem, intended users, current workflow, desired outcome, known systems or integrations, important constraints, expected timing and the people involved in the decision.",
  },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: COMPANY.name,
      url: SITE_URL,
      email: COMPANY.email,
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Custom Software Development",
      serviceType: "Custom Software Development Services",
      url: PAGE_URL,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: "Worldwide",
      description:
        "Custom web, mobile, SaaS, enterprise and internal software product development from discovery through launch and long-term improvement.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${SITE_URL}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Custom Software Development",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

async function submitProjectBrief(formData: FormData) {
  "use server";

  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) redirect(`${PAGE_PATH}?form=success#contact`);

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const project = String(formData.get("project") ?? "").trim();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailIsValid || !company || project.length < 30) {
    redirect(`${PAGE_PATH}?form=error#contact`);
  }

  // Integration placeholder: send validated data to your CRM or email provider.
  redirect(`${PAGE_PATH}?form=success#contact`);
}

type PageProps = {
  searchParams?: Promise<{ form?: string | string[] }>;
};

export default async function CustomSoftwareDevelopmentPage({
  searchParams,
}: PageProps = {}) {
  const params = searchParams ? await searchParams : {};
  const formState = Array.isArray(params.form) ? params.form[0] : params.form;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c"),
        }}
      />

      <div className="min-h-screen overflow-x-clip bg-[#f3f0e9] text-[#111318] selection:bg-[#8df0d0] selection:text-[#07130f]">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-white px-4 py-2 text-sm font-bold text-black shadow-xl transition focus:translate-y-0"
        >
          Skip to content
        </a>

        <header className="absolute inset-x-0 top-0 z-50 text-white">
          <div className="mx-auto flex h-20 max-w-[1380px] items-center justify-between px-4 sm:px-7 lg:px-10">
            <Link href="/" aria-label="QuantumFinix home" className="group flex items-center gap-3 sm:gap-4">
              <img
                src="/logo.png"
                alt=""
                width={160}
                height={64}
                className="h-14 w-auto shrink-0 object-contain transition duration-300 group-hover:scale-[1.03] sm:h-16"
                aria-hidden="true"
              />
              <span className="text-[17px] font-black tracking-[-0.04em] transition group-hover:text-[#c8fbea] sm:text-lg">
                {COMPANY.name}
              </span>
            </Link>

            <nav aria-label="Primary navigation" className="hidden lg:block">
              <ul className="flex items-center gap-8 text-sm font-medium text-white/58">
                <li><Link href="#products" className="transition hover:text-white">Products</Link></li>
                <li><Link href="#process" className="transition hover:text-white">Process</Link></li>
                <li><Link href="#delivery" className="transition hover:text-white">Delivery</Link></li>
                <li><Link href="#faq" className="transition hover:text-white">FAQ</Link></li>
              </ul>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <PublicAccountLink className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.10]" />
              <Link
                href="#contact"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#a8f3d8] px-5 text-sm font-black text-[#07140f] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Discuss your product
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <details className="qf-mobile-menu relative lg:hidden">
              <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-white/20 bg-white/[0.05] backdrop-blur marker:hidden">
                <Menu className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Toggle navigation</span>
              </summary>
              <nav
                aria-label="Mobile navigation"
                className="absolute right-0 top-14 w-[min(88vw,340px)] border border-white/10 bg-[#0b0f13]/95 p-5 shadow-2xl backdrop-blur-2xl"
              >
                {[
                  ["Products", "#products"],
                  ["Process", "#process"],
                  ["Delivery", "#delivery"],
                  ["FAQ", "#faq"],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="flex min-h-12 items-center justify-between border-b border-white/10 text-sm font-semibold text-white/75">
                    {label}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
                <PublicAccountLink className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-white hover:bg-white/[0.10] px-5 text-sm font-semibold transition" />
                <Link href="#contact" className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#a8f3d8] px-5 text-sm font-black text-[#07140f]">
                  Discuss your product
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </nav>
            </details>
          </div>
        </header>

        <main id="main-content">
          <section className="relative isolate overflow-hidden bg-[#07100f] px-4 pb-20 pt-28 text-white sm:px-7 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-28">
            <div aria-hidden="true" className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_75%_24%,rgba(45,212,191,0.20),transparent_29%),radial-gradient(circle_at_12%_20%,rgba(59,130,246,0.16),transparent_34%),linear-gradient(145deg,#050a0a_0%,#091511_45%,#06080c_100%)]" />
            <div aria-hidden="true" className="absolute inset-0 -z-20 opacity-[0.18] [mask-image:linear-gradient(to_bottom,black,transparent_94%)]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(167,243,208,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(167,243,208,0.07)_1px,transparent_1px)] bg-[size:78px_78px]" />
            </div>
            <div aria-hidden="true" className="qf-orb absolute -right-48 top-12 -z-10 h-[42rem] w-[42rem] rounded-full bg-emerald-300/10 blur-[150px]" />
            <div aria-hidden="true" className="qf-scan absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-transparent via-emerald-100/[0.035] to-transparent" />

            <div className="mx-auto max-w-[1380px]">
              <nav aria-label="Breadcrumb" className="mb-9">
                <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/40">
                  <li><Link href="/" className="transition hover:text-white">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/services" className="transition hover:text-white">Services</Link></li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-white/72">Custom Software Development</li>
                </ol>
              </nav>

              <div className="grid gap-14 lg:min-h-[730px] lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.92fr)] lg:items-center lg:gap-16 xl:gap-24">
                <div className="qf-rise relative z-10 max-w-4xl">
                  <div className="inline-flex items-center gap-3 rounded-full border border-[#a8f3d8]/20 bg-[#a8f3d8]/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#c8fbea] backdrop-blur-xl">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-[#a8f3d8] opacity-35" />
                      <span className="relative h-2 w-2 rounded-full bg-[#a8f3d8]" />
                    </span>
                    Product strategy · UX · engineering · launch
                  </div>

                  <h1 className="mt-7 max-w-5xl text-[clamp(3.2rem,7vw,7rem)] font-black leading-[0.87] tracking-[-0.075em]">
                    <span className="block">Custom software</span>
                    <span className="block bg-gradient-to-r from-[#f8fffc] via-[#a8f3d8] to-[#8cc8ff] bg-clip-text text-transparent">built around the work.</span>
                  </h1>

                  <p className="mt-8 max-w-2xl text-xl font-bold leading-8 tracking-[-0.025em] text-white sm:text-2xl">
                    Turn a valuable business problem into dependable software your users understand and your team can operate.
                  </p>

                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
                    QuantumFinix designs and develops complete digital products—strategy, experience, application, data, integrations, security, deployment and post-launch improvement—not only screens and code.
                  </p>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link href="#contact" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#a8f3d8] px-7 text-sm font-black text-[#06120d] shadow-[0_18px_70px_rgba(52,211,153,0.18)] transition hover:-translate-y-0.5 hover:bg-white">
                      Plan your software product
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                    <Link href="#process" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/16 px-7 text-sm font-bold text-white transition hover:border-[#a8f3d8]/45 hover:bg-[#a8f3d8]/[0.05]">
                      See how we deliver
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <p className="mt-4 text-xs leading-5 text-white/34">30-minute product discussion · NDA available · Clear next-step recommendation</p>

                  <div className="mt-9 grid gap-4 border-y border-white/10 py-5 sm:grid-cols-3">
                    {[
                      ["01", "Outcome before feature volume"],
                      ["02", "Working software shown frequently"],
                      ["03", "Source code, documentation and handover"],
                    ].map(([number, item]) => (
                      <div key={number} className="flex gap-3">
                        <span className="font-mono text-[10px] text-[#a8f3d8]">{number}</span>
                        <p className="text-xs font-semibold leading-5 text-white/48">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <figure className="qf-float relative mx-auto w-full max-w-[620px]">
                  <div className="relative aspect-[5/6] overflow-hidden rounded-[2.2rem] border border-white/12 bg-[#0b1715] shadow-[0_45px_140px_rgba(0,0,0,0.42)] sm:aspect-[16/13] lg:aspect-[5/6]">
                    <img src={IMAGES.hero} alt="Software product team designing and engineering a custom digital platform" width={1200} height={1440} fetchPriority="high" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06100e] via-[#06100e]/16 to-[#06100e]/10" />
                    <div className="absolute inset-6 rounded-[1.45rem] border border-white/14 sm:inset-8" />
                    <div className="qf-scan-card pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent via-[#a8f3d8]/16 to-transparent" />

                    <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#bdf8e5]">Product operating system</p>
                      <p className="mt-2 max-w-[230px] text-xs leading-5 text-white/46">Strategy, experience and engineering connected in one delivery system.</p>
                    </div>

                    <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/14 bg-black/25 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-white/72 backdrop-blur sm:right-8 sm:top-8">
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      Build active
                    </div>

                    <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/12 bg-[#07110f]/75 p-4 backdrop-blur-xl sm:inset-x-8 sm:bottom-8 sm:p-5">
                      <div className="grid grid-cols-4 gap-2 text-center">
                        {[
                          ["01", "Discover"],
                          ["02", "Design"],
                          ["03", "Build"],
                          ["04", "Improve"],
                        ].map(([number, label], index) => (
                          <div key={number} className="relative">
                            {index < 3 && <span className="absolute left-[70%] top-3 h-px w-[60%] bg-gradient-to-r from-[#a8f3d8]/45 to-transparent" />}
                            <span className="relative mx-auto grid h-7 w-7 place-items-center rounded-full border border-[#a8f3d8]/35 bg-[#a8f3d8]/10 font-mono text-[9px] text-[#c8fbea]">{number}</span>
                            <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.08em] text-white/48">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="qf-note absolute -bottom-5 -left-3 hidden rounded-2xl border border-white/10 bg-[#0a1614]/90 px-5 py-4 shadow-2xl backdrop-blur-xl sm:block lg:-left-9">
                    <ShieldCheck className="h-5 w-5 text-[#a8f3d8]" aria-hidden="true" />
                    <p className="mt-3 text-xs font-black text-white">Production ready</p>
                    <p className="mt-1 text-[10px] text-white/40">Security · testing · operations</p>
                  </div>

                  <div className="qf-note-delay absolute -right-3 bottom-14 hidden rounded-2xl border border-white/10 bg-[#0a1614]/90 px-5 py-4 text-right shadow-2xl backdrop-blur-xl sm:block lg:-right-9">
                    <Gauge className="ml-auto h-5 w-5 text-[#8cc8ff]" aria-hidden="true" />
                    <p className="mt-3 text-xs font-black text-white">Measured after launch</p>
                    <p className="mt-1 text-[10px] text-white/40">Usage · quality · performance</p>
                  </div>
                </figure>
              </div>
            </div>
          </section>

          <section aria-label="QuantumFinix software delivery principles" className="border-b border-black/10 bg-[#f3f0e9] px-4 sm:px-7 lg:px-10">
            <div className="mx-auto grid max-w-[1380px] sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", "Business-led", "The software exists to improve a real outcome"],
                ["02", "User-centred", "Important workflows are designed before they are built"],
                ["03", "Production-grade", "Security, testing and operations are part of delivery"],
                ["04", "Transferable", "Source code, documentation and knowledge stay visible"],
              ].map(([number, title, text], index) => (
                <div key={number} className={`py-7 ${index > 0 ? "border-t border-black/10 sm:border-l sm:border-t-0 sm:pl-7 lg:pl-9" : ""}`}>
                  <p className="font-mono text-[10px] text-[#08785d]">{number}</p>
                  <p className="mt-2 text-sm font-black">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-black/48">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
              <SectionLabel>What custom means</SectionLabel>
              <div>
                <h2 className="max-w-5xl text-4xl font-black leading-[1.01] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                  Software shaped around your operation.
                  <span className="block text-black/28">Not your operation forced into generic software.</span>
                </h2>
                <p className="mt-7 max-w-3xl text-base leading-8 text-black/56 sm:text-lg">
                  Custom development is valuable when your workflows, customer experience, data, integrations or commercial model create requirements that standard products cannot serve well. We identify where differentiation matters and where proven platforms should still be used.
                </p>
              </div>
            </div>
          </section>

          <section id="products" className="scroll-mt-24 border-y border-black/10 bg-[#e8e5de] px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1380px]">
              <SectionHeading eyebrow="Products we build" title="One engineering partner for the complete digital product" description="From a focused internal tool to a customer-facing platform, we build the product around its users, risk, integrations and long-term operating model." />

              <div className="mt-14 grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-3">
                {PRODUCT_TYPES.map((product, index) => {
                  const Icon = product.icon;
                  return (
                    <article key={product.title} className="qf-card group relative min-h-[360px] overflow-hidden bg-[#f3f0e9] p-7 sm:p-9">
                      <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-[#8df0d0]/0 blur-3xl transition duration-500 group-hover:bg-[#8df0d0]/35" />
                      <div className="flex items-start justify-between">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-white/45">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="font-mono text-[10px] text-black/30">0{index + 1}</span>
                      </div>
                      <h3 className="mt-10 text-2xl font-black leading-tight tracking-[-0.04em]">{product.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-black/56">{product.description}</p>
                      <p className="mt-5 border-t border-black/10 pt-5 text-xs leading-6 text-black/42"><strong className="font-bold text-black/67">Typical products:</strong> {product.examples}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1380px] items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
              <figure className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#111815]">
                  <img src={IMAGES.workshop} alt="Product discovery workshop for a custom software platform" width={1200} height={900} loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]" />
                </div>
                <figcaption className="mt-4 max-w-xl text-xs leading-5 text-black/42">Discovery makes the expensive questions visible before they become expensive code.</figcaption>
              </figure>

              <div>
                <SectionLabel>Before we recommend a build</SectionLabel>
                <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl">We need the truth about the workflow—not a perfect specification.</h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-black/56">Clients do not need to arrive with every feature decided. The most useful starting material is the business context, the people involved, the current work and the outcome that matters.</p>

                <div className="mt-9 border-t border-black/15">
                  {CLIENT_INPUTS.map((item, index) => (
                    <div key={item.title} className="grid gap-3 border-b border-black/15 py-6 sm:grid-cols-[auto_0.4fr_0.6fr] sm:gap-5">
                      <span className="font-mono text-[10px] text-[#08785d]">0{index + 1}</span>
                      <h3 className="text-sm font-black">{item.title}</h3>
                      <p className="text-sm leading-7 text-black/54">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="process" className="scroll-mt-24 overflow-hidden bg-[#0a0f0e] px-4 py-20 text-white sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1380px]">
              <SectionHeading dark eyebrow="Visible delivery process" title="From product idea to dependable software in six clear stages" description="Each stage produces working evidence, a decision or a deliverable. You can see what is being built, what changed, which risks remain and what happens next." />

              <ol className="mt-14 border-t border-white/12">
                {PROCESS.map((step) => (
                  <li key={step.number} className="qf-process-row grid gap-5 border-b border-white/12 py-8 sm:grid-cols-[0.1fr_0.32fr_0.58fr] sm:gap-8 sm:py-10">
                    <p className="font-mono text-[10px] text-[#a8f3d8]">{step.number}</p>
                    <h3 className="text-xl font-black tracking-[-0.035em] sm:text-2xl">{step.title}</h3>
                    <div>
                      <p className="text-sm leading-7 text-white/56 sm:text-base sm:leading-8">{step.description}</p>
                      <p className="mt-4 text-xs leading-6 text-white/34"><strong className="font-bold text-white/68">Deliverable:</strong> {step.output}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section id="delivery" className="scroll-mt-24 px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1380px] gap-14 lg:grid-cols-[0.44fr_0.56fr] lg:gap-20">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <SectionLabel>What you receive</SectionLabel>
                <h2 className="mt-5 text-4xl font-black leading-[1.01] tracking-[-0.055em] sm:text-5xl">A complete delivery system—not a collection of developer hours.</h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-black/56">The exact outputs depend on the engagement, but the objective is always the same: software that can be understood, released, operated and improved responsibly.</p>

                <div className="mt-9 overflow-hidden rounded-[1.8rem] bg-[#111815] p-7 text-white sm:p-9">
                  <Sparkles className="h-6 w-6 text-[#a8f3d8]" aria-hidden="true" />
                  <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-[#a8f3d8]">Core principle</p>
                  <p className="mt-4 text-3xl font-black leading-tight tracking-[-0.045em]">Every feature should support a user action, a business outcome or an operational need.</p>
                </div>
              </div>

              <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-2">
                {DELIVERABLES.map((item, index) => (
                  <div key={item} className="flex min-h-28 gap-4 bg-[#f3f0e9] p-6">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#c9f8e7] text-[#075b47]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-[9px] text-black/28">{String(index + 1).padStart(2, "0")}</p>
                      <p className="mt-2 text-sm font-bold leading-6">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-y border-black/10 bg-[#e8e5de] px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1380px]">
              <SectionHeading eyebrow="Inside the product" title="The parts clients cannot afford to discover too late" description="Good custom software is not only the visible interface. These layers determine whether the product remains secure, reliable and maintainable after launch." />

              <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {[
                  { icon: Braces, title: "Application engineering", text: "Maintainable frontend and backend code, APIs, business logic, error handling and automated tests." },
                  { icon: Database, title: "Data and integrations", text: "Clear data ownership, resilient integrations, migration planning, auditability and reliable synchronisation." },
                  { icon: LockKeyhole, title: "Security and permissions", text: "Authentication, roles, least-privilege access, secrets, logging, dependency controls and secure release practices." },
                  { icon: CloudCog, title: "Cloud and operations", text: "Deployment environments, CI/CD, monitoring, backups, performance, incident readiness and cost visibility." },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="rounded-[1.7rem] border border-black/10 bg-[#f3f0e9] p-7">
                      <Icon className="h-6 w-6 text-[#08785d]" aria-hidden="true" />
                      <h3 className="mt-8 text-xl font-black tracking-[-0.035em]">{item.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-black/54">{item.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1380px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <SectionLabel>Product experience</SectionLabel>
                <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl">Powerful software should still feel obvious to use.</h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-black/56">We design around real tasks, information hierarchy, permissions, errors, empty states, mobile behaviour, accessibility and the moments where users need confidence.</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {["User journey mapping", "Interactive prototypes", "Responsive interface systems", "Accessibility considerations", "Complex form and workflow design", "Admin and operational tooling"].map((item) => (
                    <div key={item} className="flex items-center gap-3 border-b border-black/10 py-3 text-sm font-bold">
                      <Check className="h-4 w-4 text-[#08785d]" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <figure className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="overflow-hidden rounded-[2rem] bg-[#111815] sm:translate-y-10">
                  <img src={IMAGES.dashboard} alt="Custom software analytics dashboard interface" width={900} height={1100} loading="lazy" className="h-full min-h-[420px] w-full object-cover transition duration-700 hover:scale-[1.03]" />
                </div>
                <div className="overflow-hidden rounded-[2rem] bg-[#111815]">
                  <img src={IMAGES.mobile} alt="Custom mobile application interface" width={700} height={1000} loading="lazy" className="h-full min-h-[420px] w-full object-cover transition duration-700 hover:scale-[1.03]" />
                </div>
              </figure>
            </div>
          </section>

          <section className="bg-[#111815] px-4 py-20 text-white sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1380px]">
              <SectionHeading dark eyebrow="Engagement options" title="A delivery model matched to the product and your team" description="The right structure depends on ownership, urgency, internal capability, product uncertainty and the amount of coordination required." />

              <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-3">
                {[
                  { title: "End-to-end product team", text: "QuantumFinix leads discovery, design, engineering, launch and ongoing improvement with clear client ownership and governance.", fit: "Best for a new product or major platform where one accountable delivery team is valuable." },
                  { title: "Focused product workstream", text: "We own a defined area such as a customer portal, mobile application, modernisation initiative, integration layer or new product capability.", fit: "Best when an internal team needs a specialist partner for a contained, high-value outcome." },
                  { title: "Embedded specialists", text: "Product, design or engineering specialists join your existing delivery environment with agreed responsibilities, standards and reporting.", fit: "Best when your internal team has strong ownership but needs additional capability or capacity." },
                ].map((item, index) => (
                  <article key={item.title} className="bg-[#111815] p-7 sm:p-9">
                    <p className="font-mono text-[10px] text-[#a8f3d8]">0{index + 1}</p>
                    <h3 className="mt-8 text-2xl font-black tracking-[-0.04em]">{item.title}</h3>
                    <p className="mt-5 text-sm leading-7 text-white/56">{item.text}</p>
                    <p className="mt-7 border-t border-white/12 pt-6 text-xs leading-6 text-white/36"><strong className="text-white/66">Good fit:</strong> {item.fit}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-20">
              <div>
                <SectionLabel>What buyers want to know</SectionLabel>
                <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl">The commercial and delivery questions should be answered early.</h2>
              </div>
              <div className="border-t border-black/15">
                {BUYER_QUESTIONS.map((item, index) => (
                  <details key={item.question} className="group border-b border-black/15 py-1">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 marker:hidden">
                      <span className="flex gap-5">
                        <span className="mt-1 font-mono text-[10px] text-[#08785d]">0{index + 1}</span>
                        <span className="text-lg font-black tracking-[-0.025em] sm:text-xl">{item.question}</span>
                      </span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/15 text-xl transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-3xl pb-7 pl-10 text-sm leading-7 text-black/56 sm:text-base sm:leading-8">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="scroll-mt-24 border-y border-black/10 bg-[#e8e5de] px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1080px]">
              <div className="text-center">
                <SectionLabel centered>Custom software FAQ</SectionLabel>
                <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl">Practical answers before you choose a development partner</h2>
              </div>

              <div className="mt-12 border-t border-black/15">
                {FAQS.map((item) => (
                  <details key={item.question} className="group border-b border-black/15 py-1">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 marker:hidden">
                      <span className="text-lg font-black tracking-[-0.025em] sm:text-xl">{item.question}</span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/15 text-xl transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-4xl pb-7 text-sm leading-7 text-black/56 sm:text-base sm:leading-8">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="scroll-mt-24 bg-[#07100f] px-4 py-20 text-white sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1380px] gap-14 lg:grid-cols-[0.46fr_0.54fr] lg:gap-20">
              <div>
                <SectionLabel dark>Start with the product problem</SectionLabel>
                <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.06em] sm:text-5xl lg:text-6xl">Build the software your operation actually needs.</h2>
                <p className="mt-7 max-w-xl text-base leading-8 text-white/54">Tell us what is happening today, who the software is for and what should improve. We will recommend a sensible next step—discovery, prototype, technical assessment or a delivery plan.</p>

                <div className="mt-9 space-y-4 border-t border-white/12 pt-7">
                  {["NDA available before detailed discussions", "Clear ownership and decision responsibilities", "No obligation to commit to a full build", "Direct access to product and technical specialists"].map((item) => (
                    <div key={item} className="flex gap-3 text-sm text-white/58">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#a8f3d8]" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>

                <a href={`mailto:${COMPANY.email}`} className="mt-9 inline-flex items-center gap-2 text-sm font-black text-[#a8f3d8] transition hover:text-white">
                  {COMPANY.email}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-9">
                {formState === "success" && (
                  <div role="status" className="mb-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">Thank you. Your project brief has been received.</div>
                )}
                {formState === "error" && (
                  <div role="alert" className="mb-6 rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4 text-sm text-rose-100">Please complete every field and include at least 30 characters about the project.</div>
                )}

                <form action={submitProjectBrief} className="grid gap-5">
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" name="name" autoComplete="name" placeholder="Your name" />
                    <Field label="Work email" name="email" type="email" autoComplete="email" placeholder="you@company.com" />
                  </div>
                  <Field label="Company" name="company" autoComplete="organization" placeholder="Company name" />
                  <label className="grid gap-2 text-sm font-bold">
                    What are you trying to build or improve?
                    <textarea name="project" required minLength={30} rows={7} placeholder="Describe the users, current problem, desired outcome, existing systems and any important timing or constraints." className="resize-y rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-sm font-normal leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-[#a8f3d8]/55 focus:ring-4 focus:ring-[#a8f3d8]/10" />
                  </label>

                  <button type="submit" className="group mt-2 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#a8f3d8] px-7 text-sm font-black text-[#06120d] transition hover:-translate-y-0.5 hover:bg-white">
                    Send project brief
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                  <p className="text-xs leading-5 text-white/30">By submitting this form, you agree that QuantumFinix may use these details to respond to your enquiry.</p>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-[#07100f] px-4 py-8 text-white sm:px-7 lg:px-10">
          <div className="mx-auto flex max-w-[1380px] flex-col gap-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {COMPANY.name}. Custom software, AI and product engineering.</p>
            <div className="flex flex-wrap gap-5">
              <Link href="/privacy" className="transition hover:text-white">Privacy</Link>
              <Link href="/terms" className="transition hover:text-white">Terms</Link>
              <Link href="/contact" className="transition hover:text-white">Contact</Link>
            </div>
          </div>
        </footer>

        <style>{`
          @keyframes qf-rise { from { opacity: 0; transform: translateY(28px); filter: blur(10px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
          @keyframes qf-float { 0%,100% { transform: translateY(0) rotate(-0.25deg); } 50% { transform: translateY(-12px) rotate(0.25deg); } }
          @keyframes qf-orb { 0%,100% { transform: scale(.88) translate3d(0,0,0); opacity:.55; } 50% { transform: scale(1.12) translate3d(-40px,30px,0); opacity:.9; } }
          @keyframes qf-scan { from { transform: translateY(-180%); } to { transform: translateY(800%); } }
          @keyframes qf-note { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
          .qf-rise { animation: qf-rise .9s cubic-bezier(.16,1,.3,1) both; }
          .qf-float { animation: qf-float 7s ease-in-out infinite; }
          .qf-orb { animation: qf-orb 15s ease-in-out infinite; }
          .qf-scan { animation: qf-scan 10s linear infinite; }
          .qf-scan-card { animation: qf-scan 7s linear infinite; }
          .qf-note { animation: qf-note .8s .65s cubic-bezier(.16,1,.3,1) both; }
          .qf-note-delay { animation: qf-note .8s .9s cubic-bezier(.16,1,.3,1) both; }
          .qf-card { transition: transform .35s ease, box-shadow .35s ease; }
          .qf-card:hover { transform: translateY(-5px); box-shadow: 0 28px 70px rgba(12,30,24,.10); z-index:1; }
          .qf-process-row { transition: background-color .3s ease, padding-left .3s ease; }
          .qf-process-row:hover { background: rgba(168,243,216,.035); padding-left: .75rem; }
          @media (prefers-reduced-motion: reduce) {
            .qf-rise,.qf-float,.qf-orb,.qf-scan,.qf-scan-card,.qf-note,.qf-note-delay { animation: none !important; }
            .qf-card,.qf-process-row { transition: none !important; }
          }
        `}</style>
      </div>
    </>
  );
}

function SectionLabel({ children, dark = false, centered = false }: { children: ReactNode; dark?: boolean; centered?: boolean }) {
  return (
    <p className={`${centered ? "text-center" : ""} text-[10px] font-black uppercase tracking-[0.22em] ${dark ? "text-[#a8f3d8]" : "text-[#08785d]"}`}>
      {children}
    </p>
  );
}

function SectionHeading({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description: string; dark?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
      <SectionLabel dark={dark}>{eyebrow}</SectionLabel>
      <div>
        <h2 className={`max-w-5xl text-4xl font-black leading-[1.01] tracking-[-0.055em] sm:text-5xl lg:text-6xl ${dark ? "text-white" : "text-[#111318]"}`}>{title}</h2>
        <p className={`mt-6 max-w-3xl text-base leading-8 ${dark ? "text-white/52" : "text-black/56"}`}>{description}</p>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", autoComplete, placeholder }: { label: string; name: string; type?: string; autoComplete?: string; placeholder: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <input name={name} type={type} required autoComplete={autoComplete} placeholder={placeholder} className="min-h-12 rounded-2xl border border-white/12 bg-black/20 px-4 text-sm font-normal text-white outline-none transition placeholder:text-white/25 focus:border-[#a8f3d8]/55 focus:ring-4 focus:ring-[#a8f3d8]/10" />
    </label>
  );
}