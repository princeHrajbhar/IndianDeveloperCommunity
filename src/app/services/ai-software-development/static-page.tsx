import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { PublicAccountLink } from "@/src/components/auth/public-account-link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronRight,
  LockKeyhole,
  Menu,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

/**
 * Single-file Next.js App Router page.
 * Place this file at app/services/ai-software-development/page.tsx
 * for the Metadata API to be applied automatically.
 */

const SITE_URL = "https://www.quantumfinix.com";
const PAGE_PATH = "/services/ai-software-development";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const COMPANY = {
  name: "QuantumFinix",
  email: "hello@quantumfinix.com",
};

const IMAGES = {
  hero:
    "/ai-page-image/ai-hero.png",
  engineering:
    "/ai-page-image/ai-square.png",
  analytics:
    "/ai-page-image/ai-product.png",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AI Software Development Services | QuantumFinix",
  description:
    "Custom AI software development designed around your workflows, data, users, security requirements, and business goals—from opportunity discovery to production deployment.",
  keywords: [
    "AI software development",
    "custom AI software development",
    "AI development services",
    "AI product development",
    "generative AI development",
    "AI agent development",
    "enterprise AI solutions",
    "AI integration services",
    "machine learning development",
    "RAG development",
    "AI consulting",
    "MLOps",
    "AI workflow automation",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: COMPANY.name,
    title: "AI Software Development Services | QuantumFinix",
    description:
      "Design, build, integrate, test, deploy, and improve production AI products around your business.",
    images: [
      {
        url: IMAGES.hero,
        width: 1200,
        height: 630,
        alt: "QuantumFinix AI software development team collaboration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Software Development Services | QuantumFinix",
    description:
      "Custom AI products designed around your workflows, data, users, security requirements, and business goals.",
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

const SERVICES = [
  {
    number: "01",
    title: "Custom AI product development",
    description:
      "Complete web and mobile products where intelligence is part of the customer experience, internal workflow, and business model.",
    examples:
      "AI-native SaaS, intelligent internal platforms, decision-support products, and AI features for established software.",
  },
  {
    number: "02",
    title: "Generative AI and AI agents",
    description:
      "Controlled systems that analyse information, generate structured outputs, use approved tools, and complete multistep tasks.",
    examples:
      "Generative AI applications, agent orchestration, human approvals, tool permissions, recovery, and audit trails.",
  },
  {
    number: "03",
    title: "RAG and enterprise knowledge",
    description:
      "Permission-aware applications that retrieve answers from approved documents, databases, and organisational systems.",
    examples:
      "Document ingestion, hybrid search, citations, source traceability, access control, evaluation, and monitoring.",
  },
  {
    number: "04",
    title: "Machine learning and document intelligence",
    description:
      "Systems for forecasting, classification, scoring, recommendations, anomaly detection, extraction, and workflow routing.",
    examples:
      "Predictive models, invoice and email processing, call analysis, computer vision, drift monitoring, and retraining.",
  },
  {
    number: "05",
    title: "AI integration and MLOps",
    description:
      "Add AI to an existing product and operate it with the reliability, observability, versioning, and cost controls production software requires.",
    examples:
      "CRM, ERP, support tools, identity systems, data stores, deployment pipelines, model evaluation, and incident response.",
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Opportunity definition",
    description:
      "Clarify the business problem, intended users, current workflow, measurable outcome, cost of failure, and whether AI is genuinely appropriate.",
    output:
      "Opportunity brief, success metrics, assumptions, constraints, and build-versus-buy direction.",
  },
  {
    number: "02",
    title: "Data and feasibility",
    description:
      "Review data access, quality, permissions, integrations, model options, security requirements, and the assumptions most likely to fail.",
    output:
      "Feasibility findings, initial architecture, data-readiness plan, evaluation baseline, and risk register.",
  },
  {
    number: "03",
    title: "Product and experience design",
    description:
      "Design the user journey, AI-supported workflow, review stages, fallback experience, product requirements, and delivery roadmap.",
    output:
      "UX prototype, product specification, evaluation criteria, technical plan, and phased roadmap.",
  },
  {
    number: "04",
    title: "Production engineering",
    description:
      "Build the application, AI orchestration, data pipelines, integrations, authentication, permissions, guardrails, testing, observability, and infrastructure.",
    output:
      "Maintainable production software, deployment configuration, documentation, and operational controls.",
  },
  {
    number: "05",
    title: "Validation, launch, and improvement",
    description:
      "Test functionality, AI output quality, edge cases, performance, security, and user acceptance before launch, then monitor the system in operation.",
    output:
      "Validated release, launch monitoring, team training, support plan, and prioritised product roadmap.",
  },
];

const BUYER_QUESTIONS = [
  {
    question: "How do we know AI is the right solution?",
    answer:
      "QuantumFinix begins with the task, users, workflow, data, cost of errors, review requirements, and success metrics. When conventional software or simpler automation is a better fit, we recommend that instead.",
  },
  {
    question: "How much does custom AI software cost?",
    answer:
      "Investment depends on product scope, data readiness, integrations, model and infrastructure requirements, evaluation depth, security, usage volume, and post-launch support. A phased recommendation follows discovery rather than an unsupported fixed price.",
  },
  {
    question: "How long does an AI development project take?",
    answer:
      "A focused feasibility stage can take weeks, while a production platform may require several months. The plan is defined after reviewing the data, integrations, product scope, risk level, and validation requirements.",
  },
  {
    question: "Can the system use private company information?",
    answer:
      "Often, yes. The architecture can include controlled ingestion, permission-aware retrieval, encryption, role-based access, audit logs, sensitive-data redaction, retention rules, and client-approved deployment choices.",
  },
  {
    question: "How do you reduce hallucinations and inaccurate outputs?",
    answer:
      "We combine narrowly defined tasks, approved sources, structured outputs, retrieval, validation rules, evaluation datasets, model comparison, fallback behaviour, monitoring, and human review where an incorrect result carries meaningful risk.",
  },
  {
    question: "Who owns the product and source code?",
    answer:
      "Source-code ownership, reusable components, third-party licences, model terms, infrastructure, administrative access, and intellectual-property transfer are defined clearly before development begins.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Post-launch support can include monitoring, issue resolution, quality evaluation, cost and latency tracking, prompt or model changes, dependency updates, security maintenance, incident handling, and continued product development.",
  },
];

const FAQS = [
  {
    question: "What types of AI software does QuantumFinix develop?",
    answer:
      "Custom AI products, generative AI applications, controlled AI agents, RAG and knowledge systems, document intelligence, machine-learning products, AI integrations, workflow automation, and the production infrastructure around them.",
  },
  {
    question: "Can you add AI to our existing product?",
    answer:
      "Yes. We review the current architecture, APIs, authentication, data access, product experience, and operational constraints before recommending the safest and most maintainable integration path.",
  },
  {
    question: "Can you work with our internal engineering or data team?",
    answer:
      "Yes. QuantumFinix can own a focused workstream, provide specialist AI engineering, share architecture responsibility, or work as part of a combined product team with clearly defined roles.",
  },
  {
    question: "Do we need a large, clean dataset before starting?",
    answer:
      "Not always. Some products use approved existing models and business documents, while predictive systems may require stronger historical data. Discovery identifies what is usable, what is missing, and what must improve.",
  },
  {
    question: "Which AI models do you use?",
    answer:
      "Model selection depends on output quality, latency, privacy, deployment, cost, context requirements, tool support, and vendor constraints. The architecture may use proprietary, open-source, specialist, small, large, or hybrid model strategies.",
  },
  {
    question: "Will model providers train on our data?",
    answer:
      "That depends on the selected provider, account configuration, service terms, and contract. We review provider data terms and recommend an architecture aligned with the project requirements.",
  },
  {
    question: "Can sensitive actions require human approval?",
    answer:
      "Yes. Approval can be required before messages, transactions, system updates, financial actions, customer decisions, or any other operation where an incorrect action carries material risk.",
  },
  {
    question: "How do you test an AI system?",
    answer:
      "Testing can include functional QA, evaluation datasets, source-grounding checks, structured-output validation, adversarial tests, edge cases, regression testing, performance, cost, security, user acceptance, and production monitoring.",
  },
  {
    question: "Should we begin with a proof of concept or an MVP?",
    answer:
      "A proof of concept is useful when a technical assumption must be tested. An MVP is appropriate when the opportunity is sufficiently validated and the goal is a usable first release for real users.",
  },
  {
    question: "What should we prepare for the first call?",
    answer:
      "Bring the business problem, intended users, current workflow, available data or systems, cost of errors, desired outcome, known constraints, expected timing, and the people involved in the decision.",
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
      name: "AI Software Development",
      serviceType: "Custom AI Software Development",
      url: PAGE_URL,
      description:
        "Custom AI software development, generative AI development, AI agent development, RAG development, machine learning development, AI integration services, and MLOps.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: "Worldwide",
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
          name: "AI Software Development",
          item: PAGE_URL,
        },
      ],
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

  /**
   * Integration placeholder:
   * Send validated data to your CRM, email provider, or database here.
   * This demo does not store personal data.
   */
  redirect(`${PAGE_PATH}?form=success#contact`);
}

type PageProps = {
  searchParams?: Promise<{ form?: string | string[] }>;
};

export default async function AISoftwareDevelopmentPage({
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

      <div className="min-h-screen overflow-x-clip bg-[#f4f1ea] text-[#15161a] selection:bg-[#6d63ff] selection:text-white">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-white px-4 py-2 text-sm font-bold text-black shadow-lg transition focus:translate-y-0"
        >
          Skip to content
        </a>

        <header className="absolute inset-x-0 top-0 z-50 text-white">
          <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-4 sm:px-7 lg:px-10">
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
              <ul className="flex items-center gap-8 text-sm font-medium text-white/65">
                <li><Link href="#services" className="transition hover:text-white">Services</Link></li>
                <li><Link href="#process" className="transition hover:text-white">Process</Link></li>
                <li><Link href="#questions" className="transition hover:text-white">Client questions</Link></li>
                <li><Link href="#faq" className="transition hover:text-white">FAQ</Link></li>
              </ul>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <PublicAccountLink className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.10]" />
              <Link
                href="#contact"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#111216] transition hover:-translate-y-0.5 hover:bg-[#b8b0ff]"
              >
                Discuss your AI project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <details className="qf-mobile-menu relative lg:hidden">
              <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-white/20 bg-white/[0.05] backdrop-blur marker:hidden">
                <Menu className="qf-menu-open h-5 w-5" aria-hidden="true" />
                <span className="qf-menu-close text-2xl leading-none" aria-hidden="true">×</span>
                <span className="sr-only">Toggle navigation</span>
              </summary>

              <nav
                aria-label="Mobile navigation"
                className="absolute right-0 top-14 w-[min(88vw,340px)] border border-white/10 bg-[#111218]/95 p-5 shadow-2xl backdrop-blur-2xl"
              >
                <div className="grid">
                  {[
                    ["Services", "#services"],
                    ["Process", "#process"],
                    ["Client questions", "#questions"],
                    ["FAQ", "#faq"],
                  ].map(([label, href]) => (
                    <Link key={href} href={href} className="flex min-h-12 items-center justify-between border-b border-white/10 text-sm font-semibold text-white/75">
                      {label}
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
                <PublicAccountLink className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-white hover:bg-white/[0.10] px-5 text-sm font-semibold transition" />
                <Link href="#contact" className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-black">
                  Discuss your AI project
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </nav>
            </details>
          </div>
        </header>

        <main id="main-content">
          <section className="relative isolate overflow-hidden bg-[#090b10] px-4 pb-20 pt-28 text-white sm:px-7 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-16 lg:pt-28">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_12%_10%,rgba(84,71,220,0.34),transparent_30%),radial-gradient(circle_at_86%_22%,rgba(205,111,190,0.18),transparent_28%),linear-gradient(145deg,#07090d_0%,#10131d_55%,#07080b_100%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-20 opacity-[0.2] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />
            </div>
            <div
              aria-hidden="true"
              className="qf-hero-glow absolute -right-44 top-28 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#7869ff]/20 blur-[150px]"
            />

            <div className="mx-auto max-w-[1320px]">
              <nav aria-label="Breadcrumb" className="mb-8 lg:mb-10">
                <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/42">
                  <li>
                    <Link href="/" className="transition hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/services" className="transition hover:text-white">
                      Services
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-white/72">
                    AI Software Development
                  </li>
                </ol>
              </nav>

              <div className="grid gap-12 lg:min-h-[720px] lg:grid-cols-[minmax(0,1.04fr)_minmax(420px,0.96fr)] lg:items-center lg:gap-16 xl:gap-20">
                <div className="qf-hero-copy relative z-10 max-w-3xl">
                  <div className="inline-flex items-center gap-3 border-l border-[#b9b1ff] pl-4 text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-[#b9b1ff] opacity-30" />
                      <span className="relative h-2 w-2 rounded-full bg-[#b9b1ff]" />
                    </span>
                    Business-first AI product engineering
                  </div>

                  <h1 className="mt-7 max-w-4xl text-[clamp(3.25rem,6.25vw,6.1rem)] font-black leading-[0.9] tracking-[-0.07em]">
                    <span className="block">AI software</span>
                    <span className="block">development</span>
                    <span className="block bg-gradient-to-r from-[#cbc5ff] via-[#9488ff] to-[#e6a8df] bg-clip-text text-transparent">
                      built for production.
                    </span>
                  </h1>

                  <p className="mt-7 max-w-2xl text-xl font-bold leading-8 tracking-[-0.025em] text-white sm:text-2xl">
                    From a valuable business problem to software your team can
                    operate with confidence.
                  </p>

                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/58 sm:text-lg">
                    QuantumFinix designs the complete AI product—experience,
                    application, data, integrations, evaluation, security, and
                    post-launch operations—not only the model connection.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="#contact"
                      className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-black shadow-[0_18px_55px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:bg-[#b9b1ff]"
                    >
                      Discuss your AI project
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>

                    <Link
                      href="#process"
                      className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 px-7 text-sm font-bold text-white transition hover:border-white/42 hover:bg-white/[0.05]"
                    >
                      View the delivery process
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <p className="mt-4 text-xs leading-5 text-white/36">
                    30-minute technical discovery · NDA available · No sales pressure
                  </p>

                  <div className="mt-9 grid gap-4 border-y border-white/10 py-5 sm:grid-cols-3">
                    {[
                      ["01", "Opportunity before technology"],
                      ["02", "Human review where risk requires it"],
                      ["03", "Source code, documentation, and handover"],
                    ].map(([number, item]) => (
                      <div key={number} className="flex gap-3">
                        <span className="font-mono text-[10px] text-[#b9b1ff]">
                          {number}
                        </span>
                        <p className="text-xs font-semibold leading-5 text-white/52">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <figure className="qf-hero-visual relative mx-auto w-full max-w-[600px]">
                  <div className="qf-hero-frame relative aspect-[5/6] overflow-hidden border border-white/12 sm:aspect-[16/12] lg:aspect-[5/6]">
                    <img
                      src={IMAGES.hero}
                      alt="A multidisciplinary software product team collaborating on an AI development project"
                      width={1200}
                      height={1440}
                      fetchPriority="high"
                      className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/15 to-[#090b10]/10" />
                    <div className="absolute inset-5 border border-white/15 sm:inset-7" />
                    <div className="qf-hero-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-[#b9b1ff]/15 to-transparent" />

                    <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9c3ff]">
                        AI product system
                      </p>
                      <p className="mt-2 max-w-[220px] text-xs leading-5 text-white/48">
                        Designed around the workflow—not around a preferred model.
                      </p>
                    </div>

                    <div className="absolute right-5 top-5 flex items-center gap-2 border border-white/15 bg-black/25 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white/70 backdrop-blur sm:right-7 sm:top-7">
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      Review active
                    </div>

                    <div className="absolute inset-x-5 bottom-5 border-t border-white/16 pt-5 sm:inset-x-7 sm:bottom-7">
                      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
                        <HeroNode number="01" label="Workflow" />
                        <HeroConnector />
                        <HeroNode number="02" label="Data" />
                        <HeroConnector className="hidden sm:block" />
                        <HeroNode number="03" label="Intelligence" className="hidden sm:block" />
                      </div>

                      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center sm:grid-cols-[1fr_auto_1fr] sm:px-[15%]">
                        <HeroNode number="04" label="Human review" />
                        <HeroConnector />
                        <HeroNode number="05" label="Outcome" />
                      </div>
                    </div>
                  </div>

                  <div className="qf-float-note absolute -bottom-5 -left-2 hidden border-l border-[#b9b1ff] bg-[#10131b]/92 px-4 py-3 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:block lg:-left-7">
                    <ShieldCheck
                      className="h-4 w-4 text-[#b9b1ff]"
                      aria-hidden="true"
                    />
                    <p className="mt-2 text-xs font-bold text-white">
                      Controlled by design
                    </p>
                    <p className="mt-1 text-[10px] text-white/40">
                      Permissions · Evaluation · Audit
                    </p>
                  </div>

                  <div className="absolute -right-3 bottom-10 hidden border-r border-[#e6a8df] bg-[#10131b]/92 px-4 py-3 text-right shadow-[0_22px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:block lg:-right-7">
                    <Sparkles
                      className="ml-auto h-4 w-4 text-[#e6a8df]"
                      aria-hidden="true"
                    />
                    <p className="mt-2 text-xs font-bold text-white">
                      Measured after launch
                    </p>
                    <p className="mt-1 text-[10px] text-white/40">
                      Quality · Usage · Cost
                    </p>
                  </div>
                </figure>
              </div>
            </div>
          </section>

          <section aria-label="QuantumFinix delivery principles" className="border-b border-black/10 bg-[#f4f1ea] px-4 sm:px-7 lg:px-10">
            <div className="mx-auto grid max-w-[1320px] sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", "Business-first", "Outcome before technology"],
                ["02", "Production-ready", "Complete software engineering"],
                ["03", "Controlled", "Security and human review"],
                ["04", "Maintainable", "Documentation and support"],
              ].map(([number, title, text], index) => (
                <div key={number} className={`py-6 ${index > 0 ? "border-t border-black/10 sm:border-l sm:border-t-0 sm:pl-6 lg:pl-8" : ""}`}>
                  <p className="font-mono text-[10px] text-[#6d63ff]">{number}</p>
                  <p className="mt-2 text-sm font-black">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-black/48">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
              <SectionLabel>Our approach</SectionLabel>
              <div>
                <h2 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                  The model is one layer.
                  <span className="block text-black/30">The product around it creates the value.</span>
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-8 text-black/56">
                  A dependable AI product also needs a clear user experience, trusted data, software integrations, permissions, evaluation, failure handling, monitoring, cost control, documentation, and a team prepared to operate it.
                </p>
              </div>
            </div>
          </section>

          <section id="services" className="scroll-mt-24 border-y border-black/10 bg-[#eae6de] px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1320px]">
              <SectionHeading
                eyebrow="AI development services"
                title="What QuantumFinix designs and develops"
                description="A focused set of custom AI software development services for new products, established platforms, internal workflows, and enterprise AI initiatives."
              />

              <div className="mt-14 grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
                <figure className="relative lg:sticky lg:top-24 lg:self-start">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={IMAGES.engineering}
                      alt="Computer hardware representing the engineering infrastructure behind production AI systems"
                      width={1200}
                      height={900}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 max-w-md text-xs leading-5 text-black/45">
                    Production AI combines product design, application engineering, data, model orchestration, security, observability, and long-term operations.
                  </figcaption>
                </figure>

                <div className="border-t border-black/15">
                  {SERVICES.map((service) => (
                    <article key={service.number} className="qf-service-row grid gap-4 border-b border-black/15 py-7 sm:grid-cols-[auto_1fr] sm:gap-6 sm:py-8">
                      <p className="font-mono text-[10px] text-[#6d63ff]">{service.number}</p>
                      <div>
                        <h3 className="text-2xl font-black leading-tight tracking-[-0.04em] sm:text-3xl">{service.title}</h3>
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-black/58 sm:text-base sm:leading-8">{service.description}</p>
                        <p className="mt-4 max-w-3xl text-xs leading-6 text-black/42">
                          <strong className="font-bold text-black/65">Typical delivery:</strong> {service.examples}
                        </p>
                        <Link href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-black transition hover:text-[#6d63ff]">
                          Discuss this capability
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <SectionLabel>Should this use AI?</SectionLabel>
                <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl">An honest recommendation before a large commitment.</h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-black/56">We qualify the opportunity before recommending a model, architecture, or delivery plan.</p>

                <div className="mt-8 border-t border-black/15">
                  {[
                    ["Strong AI opportunity", "High-volume knowledge work, unstructured information, interpretation, repeated pattern-based decisions, or partial automation with measurable value."],
                    ["Conventional software may be better", "Deterministic rules, simple database operations, low-volume tasks, perfect output with no review, or insufficient data and feedback."],
                    ["Questions we evaluate", "Who uses the output, what an error costs, which data exists, how success is measured, and where human review belongs."],
                  ].map(([title, text]) => (
                    <div key={title} className="grid gap-3 border-b border-black/15 py-6 sm:grid-cols-[0.38fr_0.62fr]">
                      <h3 className="text-sm font-black">{title}</h3>
                      <p className="text-sm leading-7 text-black/55">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden bg-[#151821] px-6 py-10 text-white sm:px-9 sm:py-12 lg:px-12">
                <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#6d63ff]/25 blur-[90px]" />
                <Sparkles className="relative h-6 w-6 text-[#b8b0ff]" aria-hidden="true" />
                <p className="relative mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#b8b0ff]">First-step deliverable</p>
                <h3 className="relative mt-4 text-3xl font-black leading-tight tracking-[-0.045em] sm:text-4xl">AI Opportunity and Feasibility Map</h3>
                <p className="relative mt-5 text-sm leading-7 text-white/58 sm:text-base sm:leading-8">
                  A focused assessment covering prioritised use cases, feasibility, data readiness, initial architecture, risk and governance, build-versus-buy direction, delivery phases, and success metrics.
                </p>
                <Link href="#contact" className="relative mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-black transition hover:bg-[#b8b0ff]">
                  Evaluate my AI opportunity
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <section id="process" className="scroll-mt-24 bg-[#111319] px-4 py-20 text-white sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1320px]">
              <SectionHeading
                dark
                eyebrow="Visible delivery process"
                title="From business problem to dependable production software"
                description="Every stage produces a decision, deliverable, or validated learning. Clients can see what is being built, why it matters, and what happens next."
              />

              <ol className="mt-14 border-t border-white/12">
                {PROCESS.map((step) => (
                  <li key={step.number} className="qf-process-row grid gap-5 border-b border-white/12 py-8 sm:grid-cols-[0.12fr_0.34fr_0.54fr] sm:gap-7 sm:py-9">
                    <p className="font-mono text-[10px] text-[#b8b0ff]">{step.number}</p>
                    <h3 className="text-xl font-black tracking-[-0.035em] sm:text-2xl">{step.title}</h3>
                    <div>
                      <p className="text-sm leading-7 text-white/58 sm:text-base sm:leading-8">{step.description}</p>
                      <p className="mt-4 text-xs leading-6 text-white/34"><strong className="font-bold text-white/62">Deliverable:</strong> {step.output}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-7 max-w-5xl border-l border-[#b8b0ff] pl-5 text-sm leading-7 text-white/45">
                Project duration depends on data readiness, integration complexity, risk level, product scope, and validation requirements. QuantumFinix defines the plan after discovery rather than promising an unrealistic launch date.
              </p>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.48fr_0.52fr] lg:gap-16">
              <figure>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={IMAGES.analytics}
                    alt="Analytics dashboard representing measurable AI product quality, usage, and operational performance"
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-4 text-xs leading-5 text-black/45">Production systems require visible quality, usage, latency, cost, incidents, and improvement signals.</figcaption>
              </figure>

              <div>
                <SectionLabel>Prototype versus production</SectionLabel>
                <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl">A working demonstration is not a production AI product.</h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-black/56">
                  A prototype proves that an idea may work. Production software must also be secure, measurable, supportable, integrated, and understandable to the team that owns it.
                </p>
                <div className="mt-8 grid gap-x-8 gap-y-5 border-t border-black/15 pt-7 sm:grid-cols-2">
                  {["Authentication and permissions", "Source traceability and citations", "Repeatable output evaluation", "Human approval for sensitive actions", "Fallback and failure handling", "Monitoring and cost controls", "Versioning and integration testing", "Documentation and support"].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#6d63ff]" aria-hidden="true" />
                      <p className="text-sm font-semibold leading-6 text-black/65">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-black/10 bg-[#ddd6ff] px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
              <SectionLabel>Security and responsible AI</SectionLabel>
              <div>
                <h2 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-6xl">Security is a product requirement, not a launch checklist.</h2>
                <p className="mt-6 max-w-3xl text-base leading-8 text-black/58">The controls depend on the data, users, actions, industry, and consequences of an incorrect or unauthorised result.</p>
                <div className="mt-9 grid gap-x-10 gap-y-5 border-t border-black/15 pt-8 sm:grid-cols-2">
                  {["Data minimisation and retention controls", "Encryption and secret management", "Role-based and least-privilege access", "Permission-aware retrieval", "Prompt-injection and tool boundaries", "Human approval for sensitive actions", "Audit logs and output traceability", "Evaluation, incident response, and versioning"].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <LockKeyhole className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                      <p className="text-sm font-semibold leading-6 text-black/68">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-9 max-w-4xl border-l border-black/35 pl-5 text-sm leading-7 text-black/52">
                  Specific controls, certifications, and compliance requirements are defined for each engagement. QuantumFinix does not display a certification unless it has been earned or the relevant infrastructure is contractually covered by it.
                </p>
              </div>
            </div>
          </section>

          <section id="questions" className="scroll-mt-24 px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1320px]">
              <SectionHeading
                eyebrow="Before you commit"
                title="The questions clients should have answered first"
                description="Commercial, technical, security, accuracy, ownership, and support concerns should be clear before the only remaining step is a project conversation."
              />

              <div className="mt-14 border-t border-black/15">
                {BUYER_QUESTIONS.map((item, index) => (
                  <details key={item.question} className="group border-b border-black/15" open={index === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-7 marker:hidden sm:py-8">
                      <span className="flex max-w-5xl gap-4 sm:gap-6">
                        <span className="mt-1.5 font-mono text-[10px] text-[#6d63ff]">{String(index + 1).padStart(2, "0")}</span>
                        <span className="text-xl font-black leading-tight tracking-[-0.035em] sm:text-2xl">{item.question}</span>
                      </span>
                      <span aria-hidden="true" className="qf-details-plus text-2xl font-light text-[#6d63ff]">+</span>
                    </summary>
                    <div className="qf-details-answer max-w-4xl pb-8 pl-8 text-sm leading-7 text-black/56 sm:pl-11 sm:text-base sm:leading-8">{item.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="scroll-mt-24 border-y border-black/10 bg-[#faf8f3] px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-16">
              <SectionHeading
                eyebrow="Frequently asked questions"
                title="Clear answers before the first call"
                description="Useful answers about product fit, integration, data, models, testing, approvals, and how to prepare."
              />

              <div className="border-t border-black/15">
                {FAQS.map((faq) => (
                  <details key={faq.question} className="group border-b border-black/15">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-7 py-6 marker:hidden">
                      <span className="text-base font-black leading-6 tracking-[-0.02em] sm:text-lg">{faq.question}</span>
                      <span aria-hidden="true" className="qf-details-plus text-2xl font-light text-[#6d63ff]">+</span>
                    </summary>
                    <div className="qf-details-answer max-w-3xl pb-7 text-sm leading-7 text-black/56">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="scroll-mt-24 bg-[#0b0d13] px-4 py-20 text-white sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20">
              <div>
                <SectionLabel dark>Project conversations open</SectionLabel>
                <h2 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl lg:text-6xl">Turn your AI idea into a clear, testable product plan.</h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/55">
                  Tell us what you want to improve, automate, or build. QuantumFinix will help identify the most practical next step, even when that step is not a large development project.
                </p>
                <div className="mt-9 border-t border-white/12 pt-7">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/30">What you can expect</p>
                  <div className="mt-5 space-y-3">
                    {["NDA available before detailed discovery", "Direct conversation with a technical specialist", "Clear recommendation and next step", "No obligation to begin development"].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm font-semibold text-white/65">
                        <Check className="h-4 w-4 text-[#b8b0ff]" aria-hidden="true" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <form action={submitProjectBrief} className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                <div className="sr-only" aria-hidden="true">
                  <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
                </div>

                <LineField label="Full name" htmlFor="name">
                  <input id="name" name="name" required autoComplete="name" className={LINE_INPUT_CLASS} />
                </LineField>
                <LineField label="Work email" htmlFor="email">
                  <input id="email" name="email" type="email" required autoComplete="email" className={LINE_INPUT_CLASS} />
                </LineField>
                <LineField label="Company" htmlFor="company">
                  <input id="company" name="company" required autoComplete="organization" className={LINE_INPUT_CLASS} />
                </LineField>
                <LineField label="Desired timeline" htmlFor="timeline">
                  <select id="timeline" name="timeline" defaultValue="" className={LINE_INPUT_CLASS}>
                    <option value="" className="text-black">Select a range</option>
                    <option className="text-black">Exploring the opportunity</option>
                    <option className="text-black">Within 3 months</option>
                    <option className="text-black">3–6 months</option>
                    <option className="text-black">6–12 months</option>
                  </select>
                </LineField>

                <div className="sm:col-span-2">
                  <LineField label="What are you trying to build or improve?" htmlFor="project">
                    <textarea id="project" name="project" required minLength={30} rows={5} placeholder="Describe the users, workflow, current friction, systems involved, and desired outcome." className={LINE_INPUT_CLASS} />
                  </LineField>
                </div>

                <div className="sm:col-span-2">
                  <button type="submit" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#b8b0ff]">
                    Submit project brief
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                  <p className="mt-3 max-w-xl text-xs leading-5 text-white/30">We will only use this information to evaluate and respond to your inquiry.</p>

                  {formState === "success" && (
                    <p role="status" className="mt-5 border-l-2 border-emerald-300 pl-4 text-sm text-emerald-200">
                      Your project brief passed validation. Connect the marked server-action placeholder to your CRM or email workflow before publishing.
                    </p>
                  )}
                  {formState === "error" && (
                    <p role="alert" className="mt-5 border-l-2 border-rose-300 pl-4 text-sm text-rose-200">
                      Please provide your name, a valid work email, company, and a project description of at least 30 characters.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </section>

          <section aria-label="Related AI services" className="border-t border-white/10 bg-[#0b0d13] px-4 pb-10 text-white sm:px-7 lg:px-10">
            <div className="mx-auto flex max-w-[1320px] flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/28">Related services</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/52">
                <Link href="/services/ai-consulting" className="hover:text-white">AI consulting</Link>
                <Link href="/services/generative-ai-development" className="hover:text-white">Generative AI development</Link>
                <Link href="/services/ai-agent-development" className="hover:text-white">AI agent development</Link>
                <Link href="/services/machine-learning-development" className="hover:text-white">Machine learning development</Link>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-[#0b0d13] px-4 py-9 text-white sm:px-7 lg:px-10">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-black tracking-[-0.04em]">{COMPANY.name}</p>
              <p className="mt-2 text-sm text-white/32">Custom AI software development and product engineering.</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/45">
              <Link href="/security" className="hover:text-white">Security</Link>
              <Link href="/responsible-ai" className="hover:text-white">Responsible AI</Link>
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <a href={`mailto:${COMPANY.email}`} className="hover:text-white">{COMPANY.email}</a>
            </div>
          </div>
        </footer>

        <style>{`
          html { scroll-behavior: smooth; }
          .qf-mobile-menu summary::-webkit-details-marker { display: none; }
          .qf-menu-close { display: none; }
          .qf-mobile-menu[open] .qf-menu-open { display: none; }
          .qf-mobile-menu[open] .qf-menu-close { display: block; }
          .qf-hero-copy { animation: qf-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both; }
          .qf-hero-visual { animation: qf-rise 1s 0.12s cubic-bezier(0.16, 1, 0.3, 1) both; }
          .qf-float-note { animation: qf-float 6s ease-in-out infinite; }
          .qf-hero-glow { animation: qf-drift 16s ease-in-out infinite; }
          .qf-hero-scan { animation: qf-scan 7s ease-in-out infinite; }
          .qf-hero-connector { animation: qf-line-pulse 2.8s ease-in-out infinite; }
          .qf-service-row, .qf-process-row { transition: padding-left 280ms ease, border-color 280ms ease; }
          .qf-service-row:hover, .qf-process-row:hover { padding-left: 0.5rem; border-color: rgba(109,99,255,0.45); }
          details .qf-details-plus { transition: transform 240ms ease; }
          details[open] .qf-details-plus { transform: rotate(45deg); }
          details[open] .qf-details-answer { animation: qf-answer 260ms ease both; }
          @keyframes qf-rise {
            from { opacity: 0; transform: translateY(26px); filter: blur(8px); }
            to { opacity: 1; transform: translateY(0); filter: blur(0); }
          }
          @keyframes qf-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes qf-drift {
            0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
            50% { transform: translate3d(-42px, 24px, 0) scale(1.12); }
          }
          @keyframes qf-scan {
            0%, 12% { transform: translateY(-140%); opacity: 0; }
            28% { opacity: 1; }
            70% { opacity: 0.7; }
            100% { transform: translateY(720%); opacity: 0; }
          }
          @keyframes qf-line-pulse {
            0%, 100% { opacity: 0.35; transform: scaleX(0.82); }
            50% { opacity: 1; transform: scaleX(1); }
          }
          @keyframes qf-answer {
            from { opacity: 0; transform: translateY(-6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 639px) {
            .qf-service-row:hover, .qf-process-row:hover { padding-left: 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            .qf-hero-copy, .qf-hero-visual, .qf-float-note, .qf-hero-glow, .qf-hero-scan, .qf-hero-connector, details[open] .qf-details-answer { animation: none; }
            *, *::before, *::after {
              scroll-behavior: auto !important;
              transition-duration: 0.01ms !important;
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}


function HeroNode({
  number,
  label,
  className = "",
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-[9px] text-[#b9b1ff]">{number}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/75 sm:text-[11px]">
        {label}
      </p>
    </div>
  );
}

function HeroConnector({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`qf-hero-connector h-px w-7 bg-gradient-to-r from-[#b9b1ff]/20 via-[#b9b1ff] to-[#e6a8df]/20 sm:w-10 ${className}`}
    />
  );
}

function SectionLabel({ children, dark = false }: { children?: ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-px w-9 ${dark ? "bg-[#b8b0ff]" : "bg-[#6d63ff]"}`} />
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${dark ? "text-[#b8b0ff]" : "text-[#6d63ff]"}`}>{children}</p>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-4xl">
      <SectionLabel dark={dark}>{eyebrow}</SectionLabel>
      <h2 className={`mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-6xl ${dark ? "text-white" : "text-[#15161a]"}`}>{title}</h2>
      <p className={`mt-6 max-w-2xl text-base leading-8 ${dark ? "text-white/48" : "text-black/54"}`}>{description}</p>
    </div>
  );
}

function LineField({ label, htmlFor, children }: { label: string; htmlFor: string; children?: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-xs font-bold uppercase tracking-[0.16em] text-white/36">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

const LINE_INPUT_CLASS =
  "min-h-12 w-full border-b border-white/18 bg-transparent px-0 py-3 text-base text-white outline-none transition placeholder:text-white/20 focus:border-[#b8b0ff]";