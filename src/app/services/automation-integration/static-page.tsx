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
 * Place at: app/services/automation-integration/page.tsx
 *
 * Expected image assets:
 * public/automation-page/automation-hero.jpg
 * public/automation-page/workflow-workshop.jpg
 * public/automation-page/automation-dashboard.jpg
 * public/automation-page/integration-control.jpg
 */

const SITE_URL = "https://www.quantumfinix.com";
const PAGE_PATH = "/services/automation-integration";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const COMPANY = {
  name: "QuantumFinix",
  email: "hello@quantumfinix.com",
};

const IMAGES = {
  hero: "/automation-page/automation-hero.jpg",
  workshop: "/automation-page/workflow-workshop.jpg",
  dashboard: "/automation-page/automation-dashboard.jpg",
  mobile: "/automation-page/integration-control.jpg",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Automation & Integration Services | QuantumFinix",
  description:
    "QuantumFinix designs secure business automation and system integrations that connect workflows, data, teams and software—from opportunity discovery to production operation and continuous improvement.",
  keywords: [
    "business process automation",
    "business process automation company",
    "workflow automation services",
    "business system integration",
    "API integration services",
    "enterprise automation services",
    "intelligent automation consulting",
    "legacy system integration",
    "CRM automation",
    "ERP integration services",
    "API integration services",
    "cloud integration services",
    "automation development company",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: COMPANY.name,
    title: "Automation & Integration Services | QuantumFinix",
    description:
      "Strategy, orchestration and production engineering for dependable automated operations.",
    images: [
      {
        url: IMAGES.hero,
        width: 1200,
        height: 630,
        alt: "QuantumFinix automation and integration operations workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation & Integration Services | QuantumFinix",
    description:
      "Secure workflow automation and system integrations built around your teams, controls and business outcomes.",
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
  { icon: Workflow, title: "Business process automation", description: "Automate repeatable, rules-based work across teams while preserving approvals, ownership and visibility.", examples: "Lead routing, onboarding, service delivery, approvals, case management, document processing and operational handoffs." },
  { icon: Network, title: "Systems and API integration", description: "Connect cloud platforms, internal applications, databases and partner services through reliable, governed interfaces.", examples: "CRM, ERP, finance, support, identity, payments, logistics, marketing and custom application integrations." },
  { icon: Sparkles, title: "Intelligent document workflows", description: "Extract, classify, validate and route information from documents, messages and unstructured business content.", examples: "Invoices, applications, contracts, claims, emails, forms, reports and knowledge-intensive back-office workflows." },
  { icon: Database, title: "Data synchronisation and operations", description: "Create trusted movement of data between systems with validation, reconciliation, scheduling and clear ownership.", examples: "Master-data sync, event pipelines, reporting feeds, migration workflows, deduplication and cross-system reconciliation." },
  { icon: ShieldCheck, title: "Approval and compliance workflows", description: "Make sensitive actions reviewable with role-based approvals, evidence, audit trails and policy-aware routing.", examples: "Financial approvals, access requests, vendor onboarding, quality checks, compliance reviews and controlled record updates." },
  { icon: Wrench, title: "Legacy workflow modernisation", description: "Replace fragile spreadsheets, inbox-based processes and brittle scripts without disrupting critical operations.", examples: "Spreadsheet replacement, scheduled-job renewal, integration rescue, manual rekeying removal and staged platform modernisation." },
];

const PROCESS = [
  { number: "01", title: "Map the current operation", description: "We document triggers, steps, systems, owners, data, decisions, exceptions, controls and the real cost of delay or error.", output: "Current-state workflow map, pain-point analysis, automation candidates, baseline metrics and dependency register." },
  { number: "02", title: "Prioritise the right opportunities", description: "We compare value, feasibility, risk and change impact so the first automation is useful, measurable and realistic.", output: "Prioritised opportunity portfolio, business case, target metrics and phased roadmap." },
  { number: "03", title: "Design the connected workflow", description: "We define orchestration, APIs, data contracts, approvals, permissions, exception paths, recovery and operator experience.", output: "Future-state workflow, integration architecture, control model, interface contracts and delivery plan." },
  { number: "04", title: "Build and demonstrate in increments", description: "We connect systems and automate steps in short cycles, showing working flows and validating them with real scenarios.", output: "Production-quality integrations, workflow logic, operator interfaces, tests and transparent demonstrations." },
  { number: "05", title: "Validate resilience and control", description: "We test happy paths, bad data, unavailable systems, duplicate events, permissions, performance, security and operational recovery.", output: "Validated release, exception procedures, runbooks, monitoring, training and launch checklist." },
  { number: "06", title: "Operate, measure and optimise", description: "After launch, we observe throughput, failure rates, cycle time and business outcomes, then improve using real evidence.", output: "Operational support, dashboards, incident response, optimisation backlog and automation governance." },
];

const DELIVERABLES = [
  "Current-state and future-state workflow maps",
  "Automation opportunity assessment and business case",
  "Integration and orchestration architecture",
  "API contracts, data mappings and transformation rules",
  "Workflow logic, queues, schedules and event handling",
  "Human approvals, permissions and escalation paths",
  "Validation, deduplication and reconciliation controls",
  "Exception handling, retries and recovery procedures",
  "Automated functional and integration testing",
  "Secure credentials, environments and release automation",
  "Monitoring dashboards, alerts and operational runbooks",
  "Source code, documentation, training and handover",
];

const CLIENT_INPUTS = [
  { title: "The workflow as it happens today", text: "Triggers, steps, handoffs, decisions, workarounds, delays and the exceptions experienced by the people doing the work." },
  { title: "Systems, data and access", text: "Applications, APIs, databases, files, inboxes, credentials, vendors, data owners and environmental constraints." },
  { title: "Risk, controls and approvals", text: "What may be automated, what requires human review, what evidence must be retained and what happens when a step fails." },
  { title: "Outcome and operating ownership", text: "Expected savings, speed, quality or visibility; process owner; support model; timing; budget range and decision process." },
];

const BUYER_QUESTIONS = [
  { question: "How do you decide what should be automated?", answer: "We examine volume, repetition, decision complexity, exception rate, data quality, system access, risk and measurable value. Tasks that require judgment or carry material consequences can remain human-controlled." },
  { question: "How do you prevent fragile automations?", answer: "We engineer validation, idempotency, retries, timeouts, queues, alerts, fallback paths, audit logs and recovery procedures. The design assumes systems and data will occasionally fail." },
  { question: "Can you integrate legacy and modern systems?", answer: "Yes. Depending on available interfaces, we can use APIs, webhooks, databases, files, secure transfer, event streams, browser automation or staged adapters while clearly documenting limitations and risk." },
  { question: "How will our team control the automation?", answer: "We define process ownership, access, approvals, operational dashboards, alerts, pause and recovery procedures, change control and documentation before production launch." },
  { question: "How do you protect credentials and sensitive data?", answer: "Credentials are stored in appropriate secret-management systems, permissions follow least privilege, data movement is minimised, logs are controlled and security requirements are aligned to the workflow risk." },
  { question: "How will you prove the automation creates value?", answer: "We establish a baseline and track relevant measures such as cycle time, touch time, throughput, error rate, backlog, service level, recovery time and cost per transaction." },
];

const FAQS = [
  { question: "What is business process automation?", answer: "Business process automation uses software to coordinate repeatable tasks, decisions, data movement and system actions. Effective automation includes people, approvals, exceptions, monitoring and ownership—not only the happy path." },
  { question: "What systems can QuantumFinix integrate?", answer: "We can integrate CRM, ERP, finance, support, identity, payments, marketing, logistics, databases, cloud platforms, custom applications and partner services where suitable access methods are available." },
  { question: "Do you use low-code platforms or custom code?", answer: "The implementation may use an automation platform, integration platform, cloud service, custom code or a hybrid. The choice depends on complexity, control, scale, security, maintainability, licensing and internal capability." },
  { question: "How much does automation and integration cost?", answer: "Investment depends on workflow complexity, number of systems, interface quality, data transformation, exception handling, security, testing and support. We provide a phased recommendation after assessing the real process." },
  { question: "How long does an automation project take?", answer: "A focused workflow may be assessed and piloted within weeks. Multi-system or business-critical automation may require several phases. Timing is defined after dependencies, access and exception paths are understood." },
  { question: "Can sensitive actions require human approval?", answer: "Yes. Human review can be required before financial actions, customer communications, record changes, access grants, transactions or any step where an incorrect action creates material risk." },
  { question: "What happens when an integrated system is unavailable?", answer: "The workflow can use retries, queues, timeouts, alerts, fallback handling, manual intervention and replay procedures. The exact recovery design is matched to the process and system capabilities." },
  { question: "Do you provide support after launch?", answer: "Yes. Support can include monitoring, incident response, connector and dependency updates, performance optimisation, workflow changes, security maintenance and continued automation development." },
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
      name: "Automation & Integration",
      serviceType: "Automation & Integration Services",
      url: PAGE_URL,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: "Worldwide",
      description:
        "Custom web, mobile, SaaS, enterprise and internal workflow automation services from discovery through launch and long-term improvement.",
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
          name: "Automation & Integration",
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
                <li><Link href="#products" className="transition hover:text-white">Solutions</Link></li>
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
                Discuss your workflow
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
                  ["Solutions", "#products"],
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
                  Discuss your workflow
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </nav>
            </details>
          </div>
        </header>

        <main id="main-content">
          <section className="relative isolate overflow-hidden bg-[#070716] px-4 pb-20 pt-28 text-white sm:px-7 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-28">
            <div aria-hidden="true" className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_76%_22%,rgba(124,92,255,0.30),transparent_30%),radial-gradient(circle_at_18%_18%,rgba(37,211,255,0.18),transparent_32%),radial-gradient(circle_at_52%_88%,rgba(236,72,153,0.10),transparent_34%),linear-gradient(145deg,#050511_0%,#0b1024_48%,#07050f_100%)]" />
            <div aria-hidden="true" className="absolute inset-0 -z-20 opacity-[0.22] [mask-image:linear-gradient(to_bottom,black,transparent_94%)]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(139,132,255,0.075)_1px,transparent_1px),linear-gradient(90deg,rgba(70,210,255,0.065)_1px,transparent_1px)] bg-[size:78px_78px]" />
            </div>
            <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-20 h-px bg-gradient-to-r from-transparent via-cyan-200/45 to-transparent" />
            <div aria-hidden="true" className="qf-orb absolute -right-48 top-12 -z-10 h-[42rem] w-[42rem] rounded-full bg-violet-500/20 blur-[155px]" />
            <div aria-hidden="true" className="absolute -left-40 bottom-[-16rem] -z-10 h-[34rem] w-[34rem] rounded-full bg-cyan-400/10 blur-[145px]" />
            <div aria-hidden="true" className="qf-scan absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-transparent via-violet-100/[0.05] to-transparent" />

            <div className="mx-auto max-w-[1380px]">
              <nav aria-label="Breadcrumb" className="mb-9">
                <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/40">
                  <li><Link href="/" className="transition hover:text-white">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/services" className="transition hover:text-white">Services</Link></li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-white/72">Automation & Integration</li>
                </ol>
              </nav>

              <div className="grid gap-14 lg:min-h-[730px] lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.92fr)] lg:items-center lg:gap-16 xl:gap-24">
                <div className="qf-rise relative z-10 max-w-4xl">
                  <div className="inline-flex items-center gap-3 rounded-full border border-[#a8f3d8]/20 bg-[#a8f3d8]/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#c8fbea] backdrop-blur-xl">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-[#a8f3d8] opacity-35" />
                      <span className="relative h-2 w-2 rounded-full bg-[#a8f3d8]" />
                    </span>
                    Workflow strategy · integration · automation · control
                  </div>

                  <h1 className="mt-7 max-w-5xl text-[clamp(3.2rem,7vw,7rem)] font-black leading-[0.87] tracking-[-0.075em]">
                    <span className="block">Automation that</span>
                    <span className="block bg-gradient-to-r from-[#f8fffc] via-[#a8f3d8] to-[#8cc8ff] bg-clip-text text-transparent">moves work forward.</span>
                  </h1>

                  <p className="mt-8 max-w-2xl text-xl font-bold leading-8 tracking-[-0.025em] text-white sm:text-2xl">
                    Connect systems, remove repetitive work and create dependable operations your team can see, control and improve.
                  </p>

                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
                    QuantumFinix maps the real workflow, connects the right systems and engineers production automation with approvals, exception handling, auditability, security, monitoring and long-term support—not fragile shortcuts.
                  </p>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link href="#contact" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#a8f3d8] px-7 text-sm font-black text-[#06120d] shadow-[0_18px_70px_rgba(52,211,153,0.18)] transition hover:-translate-y-0.5 hover:bg-white">
                      Map your automation opportunity
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                    <Link href="#process" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/16 px-7 text-sm font-bold text-white transition hover:border-[#a8f3d8]/45 hover:bg-[#a8f3d8]/[0.05]">
                      See the automation process
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <p className="mt-4 text-xs leading-5 text-white/34">30-minute workflow discussion · NDA available · Clear next-step recommendation</p>

                  <div className="mt-9 grid gap-4 border-y border-white/10 py-5 sm:grid-cols-3">
                    {[
                      ["01", "Outcome before automation volume"],
                      ["02", "Working workflows demonstrated frequently"],
                      ["03", "Ownership, runbooks and handover"],
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
                    <img src={IMAGES.hero} alt="Operations and technology team designing an integrated automated workflow" width={1200} height={1440} fetchPriority="high" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06100e] via-[#06100e]/16 to-[#06100e]/10" />
                    <div className="absolute inset-6 rounded-[1.45rem] border border-white/14 sm:inset-8" />
                    <div className="qf-scan-card pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent via-[#a8f3d8]/16 to-transparent" />

                    <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#bdf8e5]">Automation control layer</p>
                      <p className="mt-2 max-w-[230px] text-xs leading-5 text-white/46">Systems, decisions and people connected in one controlled workflow.</p>
                    </div>

                    <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/14 bg-black/25 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-white/72 backdrop-blur sm:right-8 sm:top-8">
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      Automation active
                    </div>

                    <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/12 bg-[#07110f]/75 p-4 backdrop-blur-xl sm:inset-x-8 sm:bottom-8 sm:p-5">
                      <div className="grid grid-cols-4 gap-2 text-center">
                        {[
                          ["01", "Map"],
                          ["02", "Connect"],
                          ["03", "Automate"],
                          ["04", "Optimise"],
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
                    <p className="mt-3 text-xs font-black text-white">Controlled by design</p>
                    <p className="mt-1 text-[10px] text-white/40">Approvals · audit · recovery</p>
                  </div>

                  <div className="qf-note-delay absolute -right-3 bottom-14 hidden rounded-2xl border border-white/10 bg-[#0a1614]/90 px-5 py-4 text-right shadow-2xl backdrop-blur-xl sm:block lg:-right-9">
                    <Gauge className="ml-auto h-5 w-5 text-[#8cc8ff]" aria-hidden="true" />
                    <p className="mt-3 text-xs font-black text-white">Observed in operation</p>
                    <p className="mt-1 text-[10px] text-white/40">Throughput · errors · savings</p>
                  </div>
                </figure>
              </div>
            </div>
          </section>

          <section aria-label="QuantumFinix automation delivery principles" className="border-b border-black/10 bg-[#f3f0e9] px-4 sm:px-7 lg:px-10">
            <div className="mx-auto grid max-w-[1380px] sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", "Outcome-led", "Automation must improve a measurable operational outcome"],
                ["02", "People-aware", "Human decisions and exceptions remain visible"],
                ["03", "Resilient", "Retries, alerts and recovery are engineered in"],
                ["04", "Ownable", "Logic, credentials, runbooks and ownership stay clear"],
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
              <SectionLabel>What good automation means</SectionLabel>
              <div>
                <h2 className="max-w-5xl text-4xl font-black leading-[1.01] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                  Automation shaped around the real operation.
                  <span className="block text-black/28">Not a brittle shortcut around it.</span>
                </h2>
                <p className="mt-7 max-w-3xl text-base leading-8 text-black/56 sm:text-lg">
                  Automation creates value when work crosses people, systems and decisions repeatedly. We identify what should be automated, what should remain human, which platforms should be connected and where controls are essential.
                </p>
              </div>
            </div>
          </section>

          <section id="products" className="scroll-mt-24 border-y border-black/10 bg-[#e8e5de] px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1380px]">
              <SectionHeading eyebrow="Solutions we build" title="One partner for the complete automated workflow" description="From a focused approval flow to enterprise-wide orchestration, we design around the process, data, risk, integrations and long-term operating model." />

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
                      <p className="mt-5 border-t border-black/10 pt-5 text-xs leading-6 text-black/42"><strong className="font-bold text-black/67">Typical automation:</strong> {product.examples}</p>
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
                  <img src={IMAGES.workshop} alt="Workflow discovery workshop for business automation and system integration" width={1200} height={900} loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]" />
                </div>
                <figcaption className="mt-4 max-w-xl text-xs leading-5 text-black/42">Mapy makes the expensive questions visible before they become expensive code.</figcaption>
              </figure>

              <div>
                <SectionLabel>Before we automate</SectionLabel>
                <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl">We need the truth about the work—not a polished process diagram.</h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-black/56">Clients do not need a finished automation specification. The most useful starting point is the current workflow, systems, handoffs, exceptions, controls and the outcome that matters.</p>

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
              <SectionHeading dark eyebrow="Visible automation delivery" title="From manual workflow to dependable automation in six clear stages" description="Each stage produces working evidence, a decision or an operational deliverable. You can see what is connected, what is automated, which exceptions remain and how the workflow will be operated." />

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
                <h2 className="mt-5 text-4xl font-black leading-[1.01] tracking-[-0.055em] sm:text-5xl">A complete automation system—not a collection of disconnected recipes.</h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-black/56">The exact outputs depend on the engagement, but the objective is always the same: automation that can be understood, controlled, monitored, recovered and improved responsibly.</p>

                <div className="mt-9 overflow-hidden rounded-[1.8rem] bg-[#111815] p-7 text-white sm:p-9">
                  <Sparkles className="h-6 w-6 text-[#a8f3d8]" aria-hidden="true" />
                  <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-[#a8f3d8]">Core principle</p>
                  <p className="mt-4 text-3xl font-black leading-tight tracking-[-0.045em]">Every automated step should reduce effort, improve speed, strengthen control or create better operational visibility.</p>
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
              <SectionHeading eyebrow="Inside the automation" title="The operational layers clients cannot afford to discover too late" description="Good automation is not only the happy path. These layers determine whether it remains secure, reliable, explainable and maintainable after launch." />

              <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {[
                  { icon: Workflow, title: "Orchestration and state", text: "Clear workflow state, queues, schedules, rules, dependencies and safe progression between steps." },
                  { icon: Database, title: "Data quality and reconciliation", text: "Validation, mapping, deduplication, ownership, traceability and reliable cross-system synchronisation." },
                  { icon: LockKeyhole, title: "Security and approvals", text: "Least-privilege access, managed secrets, human review, audit trails and controlled release practices." },
                  { icon: Gauge, title: "Observability and recovery", text: "Health monitoring, alerts, retries, replay, incident procedures, performance and cost visibility." },
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
                <SectionLabel>Operator experience</SectionLabel>
                <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl">Powerful automation should still feel clear and controllable.</h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-black/56">We design around real decisions, work queues, approvals, permissions, errors, exceptions and the moments where operators need context and confidence.</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {["Operator queues and worklists", "Approval and review interfaces", "Exception and recovery screens", "Operational dashboards and alerts", "Role-based controls", "Audit and history views"].map((item) => (
                    <div key={item} className="flex items-center gap-3 border-b border-black/10 py-3 text-sm font-bold">
                      <Check className="h-4 w-4 text-[#08785d]" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <figure className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="overflow-hidden rounded-[2rem] bg-[#111815] sm:translate-y-10">
                  <img src={IMAGES.dashboard} alt="Automation that analytics dashboard interface" width={900} height={1100} loading="lazy" className="h-full min-h-[420px] w-full object-cover transition duration-700 hover:scale-[1.03]" />
                </div>
                <div className="overflow-hidden rounded-[2rem] bg-[#111815]">
                  <img src={IMAGES.mobile} alt="Integration control interface showing approvals, alerts and workflow status" width={700} height={1000} loading="lazy" className="h-full min-h-[420px] w-full object-cover transition duration-700 hover:scale-[1.03]" />
                </div>
              </figure>
            </div>
          </section>

          <section className="bg-[#111815] px-4 py-20 text-white sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1380px]">
              <SectionHeading dark eyebrow="Engagement options" title="A delivery model matched to the workflow and your team" description="The right structure depends on process ownership, urgency, system complexity, internal capability, risk and the amount of coordination required." />

              <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-3">
                {[
                  { title: "End-to-end automation delivery", text: "QuantumFinix leads workflow discovery, integration architecture, automation engineering, launch and optimisation with clear client ownership.", fit: "Best for a priority process where one accountable partner should deliver the complete outcome." },
                  { title: "Focused integration workstream", text: "We own a defined connection, data flow, approval process, document workflow or operational automation within a larger programme.", fit: "Best when an internal team needs specialist integration capability for a contained outcome." },
                  { title: "Embedded automation specialists", text: "Automation, integration or platform engineers join your existing environment with agreed responsibilities, standards and governance.", fit: "Best when your internal team owns the process but needs additional specialist capability or capacity." },
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
                <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl">The operational, security and ownership questions should be answered early.</h2>
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
                <SectionLabel centered>Automation that FAQ</SectionLabel>
                <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl">Practical answers before you choose an automation partner</h2>
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
                <SectionLabel dark>Start with the workflow problem</SectionLabel>
                <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.06em] sm:text-5xl lg:text-6xl">Build the connected operation your team actually needs.</h2>
                <p className="mt-7 max-w-xl text-base leading-8 text-white/54">Tell us what happens today, which systems are involved, where work slows down and what should improve. We will recommend a sensible next step—workflow assessment, integration architecture, automation pilot or delivery plan.</p>

                <div className="mt-9 space-y-4 border-t border-white/12 pt-7">
                  {["NDA available before detailed discussions", "Clear ownership and decision responsibilities", "No obligation to commit to a full programme", "Direct access to automation and integration specialists"].map((item) => (
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
                  <div role="status" className="mb-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">Thank you. Your workflow brief has been received.</div>
                )}
                {formState === "error" && (
                  <div role="alert" className="mb-6 rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4 text-sm text-rose-100">Please complete every field and include at least 30 characters about the workflow.</div>
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
                    What workflow are you trying to automate or connect?
                    <textarea name="project" required minLength={30} rows={7} placeholder="Describe the current steps, systems, handoffs, exceptions, desired outcome and any important timing, security or compliance constraints." className="resize-y rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-sm font-normal leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-[#a8f3d8]/55 focus:ring-4 focus:ring-[#a8f3d8]/10" />
                  </label>

                  <button type="submit" className="group mt-2 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#a8f3d8] px-7 text-sm font-black text-[#06120d] transition hover:-translate-y-0.5 hover:bg-white">
                    Send workflow brief
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                  <p className="text-xs leading-5 text-white/30">By submitting this form, you agree that QuantumFinix may use these details to respond to your automation enquiry.</p>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-[#07100f] px-4 py-8 text-white sm:px-7 lg:px-10">
          <div className="mx-auto flex max-w-[1380px] flex-col gap-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {COMPANY.name}. Automation that, AI and product engineering.</p>
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