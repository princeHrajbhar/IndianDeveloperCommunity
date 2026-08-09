"use client";

import {
  ArrowRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CloudCog,
  Code2,
  Database,
  FileSearch,
  Gauge,
  Layers3,
  LockKeyhole,
  Menu,
  MessageSquareText,
  Network,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import Link from "next/link";

import { PublicAccountLink } from "@/src/components/auth/public-account-link";
import {
  cloneElement,
  FormEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

const COMPANY = {
  name: "QuantumFinix",
  email: "hello@quantumfinix.com",
  location: "India · Remote delivery",
  domain: "https://www.quantumfinix.com",
};

const PAGE_COPY = {
  eyebrow: "Business-first AI product engineering",
  title: "AI Software Development",
  description: "Custom AI products designed around your business.",
  supportingCopy:
    "From opportunity discovery and rapid validation to secure production deployment, QuantumFinix designs and builds AI software that works with your data, users, systems, and operational requirements.",
  primaryCta: "Discuss your AI project",
  secondaryCta: "See how we work",
  reassurance: "30-minute technical discovery • NDA available • No sales pressure",
  finalHeadline: "Turn your AI idea into a clear, testable product plan",
};

const navItems = [
  ["Services", "#services"],
  ["Use cases", "#use-cases"],
  ["Process", "#process"],
  ["Security", "#security"],
  ["FAQ", "#faq"],
] as const;

const trustStatements = [
  "Business case before model selection.",
  "Production engineering, not prototype theatre.",
  "Clear ownership, documentation, and handover.",
];

const proofItems: Array<{
  label: string;
  value: string;
  href?: string;
}> = [];

const buyerProblems = [
  "Starting with a fashionable model instead of a valuable business problem.",
  "Underestimating data quality, permissions, and integration requirements.",
  "Building a demonstration without planning how it will operate in production.",
  "Launching without measurable evaluation criteria or failure thresholds.",
  "Ignoring privacy, security, monitoring, cost, and user adoption.",
  "Automating sensitive decisions without appropriate human review.",
];

const outcomes = [
  {
    icon: Workflow,
    title: "Reduce repetitive operational work",
    description:
      "Automate high-volume tasks while preserving review points for exceptions, uncertainty, and sensitive actions.",
    approach: "AI agents, workflow orchestration, document intelligence",
  },
  {
    icon: Search,
    title: "Make internal knowledge easier to use",
    description:
      "Give teams permission-aware access to approved policies, product information, records, and operational guidance.",
    approach: "RAG, hybrid search, citations, access control",
  },
  {
    icon: MessageSquareText,
    title: "Improve service capacity and consistency",
    description:
      "Help support teams retrieve context, prepare responses, summarize interactions, and route cases more effectively.",
    approach: "Knowledge assistants, classification, human review",
  },
  {
    icon: FileSearch,
    title: "Process documents and communications",
    description:
      "Extract, classify, validate, and route information from documents, email, images, calls, and structured records.",
    approach: "NLP, multimodal models, extraction pipelines",
  },
  {
    icon: Gauge,
    title: "Support faster decisions",
    description:
      "Surface patterns, risks, recommendations, and relevant evidence without hiding uncertainty from decision-makers.",
    approach: "Predictive models, decision support, evaluation",
  },
  {
    icon: Sparkles,
    title: "Create AI-native product experiences",
    description:
      "Design products where intelligence is part of the workflow, not an isolated chatbot added after development.",
    approach: "Generative AI, product engineering, model routing",
  },
  {
    icon: BrainCircuit,
    title: "Detect anomalies and important patterns",
    description:
      "Identify unusual activity, quality issues, operational risks, or opportunities for focused human investigation.",
    approach: "Machine learning, anomaly detection, monitoring",
  },
  {
    icon: BriefcaseBusiness,
    title: "Develop new digital revenue opportunities",
    description:
      "Validate and build focused AI products, industry tools, intelligent SaaS platforms, and paid product features.",
    approach: "AI product strategy, MVP development, MLOps",
  },
];

const services = [
  {
    icon: Layers3,
    title: "Custom AI products",
    summary:
      "Complete web or mobile products built around an AI-enabled user experience, business model, and operating workflow.",
    useful:
      "Best when intelligence is central to the product rather than a small isolated feature.",
    examples: [
      "AI-native SaaS platforms",
      "Internal productivity products",
      "Customer-facing intelligent applications",
      "Industry-specific decision-support software",
    ],
    considerations:
      "Product strategy, user experience, architecture, evaluation, security, deployment, and long-term ownership.",
  },
  {
    icon: Sparkles,
    title: "Generative AI applications",
    summary:
      "Applications that use language or multimodal models for analysis, reasoning, communication, and knowledge work.",
    useful:
      "Useful for variable language tasks where fixed rules are too limited and controlled interpretation adds value.",
    examples: [
      "Structured output generation",
      "Tool calling and model routing",
      "Multimodal input",
      "Cost and latency optimization",
    ],
    considerations:
      "Prompt and context architecture, quality evaluation, source grounding, fallbacks, and vendor constraints.",
  },
  {
    icon: Bot,
    title: "AI agents and workflow automation",
    summary:
      "Controlled systems that retrieve information, use approved tools, update business systems, and complete multistep tasks.",
    useful:
      "Useful when a workflow contains repeated decisions, system actions, and reviewable handoffs.",
    examples: [
      "Agent orchestration",
      "Human approval stages",
      "Audit logs and recovery",
      "Workflow state management",
    ],
    considerations:
      "High-risk actions should not be fully autonomous without permissions, limits, monitoring, and review.",
  },
  {
    icon: Database,
    title: "RAG and enterprise knowledge systems",
    summary:
      "Secure applications that answer questions using approved organizational information with source traceability.",
    useful:
      "Useful when teams need faster access to fragmented documents, policies, records, and internal knowledge.",
    examples: [
      "Document ingestion and parsing",
      "Hybrid and vector search",
      "Permission-aware retrieval",
      "Citations and evaluation",
    ],
    considerations:
      "Data ownership, access rules, metadata quality, retrieval accuracy, freshness, and monitoring.",
  },
  {
    icon: BrainCircuit,
    title: "Machine learning and predictive systems",
    summary:
      "Custom models for forecasting, classification, scoring, recommendations, optimization, and anomaly detection.",
    useful:
      "Useful when historical data contains repeatable signals that can support measurable decisions.",
    examples: [
      "Data preparation",
      "Feature engineering",
      "Model validation",
      "Drift and retraining workflows",
    ],
    considerations:
      "Baseline comparison, data leakage, explainability, validation design, deployment, and ongoing drift.",
  },
  {
    icon: MessageSquareText,
    title: "Language, voice, and document intelligence",
    summary:
      "Systems that understand, transform, classify, summarize, extract, or generate language and speech.",
    useful:
      "Useful for support, contracts, invoices, calls, emails, meetings, and multilingual workflows.",
    examples: [
      "Call analysis",
      "Contract and invoice processing",
      "Email classification",
      "Voice and multilingual applications",
    ],
    considerations:
      "Accuracy by document type, sensitive-data handling, review requirements, and failure recovery.",
  },
  {
    icon: Search,
    title: "Computer vision",
    summary:
      "Software that analyzes images or video for detection, recognition, inspection, measurement, and classification.",
    useful:
      "Useful when visual information is central to quality, safety, operations, or product experience.",
    examples: [
      "Visual inspection",
      "Image classification",
      "Object detection",
      "Measurement and workflow routing",
    ],
    considerations:
      "Image quality, annotation strategy, edge cases, deployment environment, and privacy.",
  },
  {
    icon: Network,
    title: "AI modernization and integration",
    summary:
      "Add AI capabilities to an existing product or connect intelligence with current business systems.",
    useful:
      "Useful when the business already has users, workflows, and systems that should be improved rather than replaced.",
    examples: [
      "CRM and ERP integration",
      "Databases and document stores",
      "Support and collaboration tools",
      "Identity and analytics systems",
    ],
    considerations:
      "Existing architecture, API quality, access control, rollout strategy, and backward compatibility.",
  },
  {
    icon: CloudCog,
    title: "MLOps and AI lifecycle management",
    summary:
      "Production infrastructure for deployment, evaluation, observability, versioning, cost tracking, and improvement.",
    useful:
      "Useful when an AI capability must remain dependable after the first production release.",
    examples: [
      "Evaluation pipelines",
      "Model and prompt versioning",
      "Cost and token monitoring",
      "Incident and regression management",
    ],
    considerations:
      "Operational ownership, alerts, rollback, vendor changes, data drift, and measurable service levels.",
  },
];

type UseCase = {
  friction: string;
  workflow: string;
  human: string;
  kpis: string;
};

type UseCaseCategory = {
  id: string;
  label: string;
  cases: UseCase[];
};

const useCaseCategories: UseCaseCategory[] = [
  {
    id: "product",
    label: "Product and customer experience",
    cases: [
      {
        friction: "Users struggle to discover the right feature, product, or next action.",
        workflow:
          "A context-aware assistant recommends relevant options using approved product data and user signals.",
        human: "Product teams define recommendation boundaries and review performance.",
        kpis: "Feature adoption, completion rate, recommendation acceptance, retention.",
      },
      {
        friction: "Customers abandon complex onboarding or configuration journeys.",
        workflow:
          "An assistant explains requirements, collects structured input, and routes exceptions.",
        human: "Operations teams review sensitive or incomplete cases.",
        kpis: "Completion rate, time to activation, support requests, drop-off rate.",
      },
      {
        friction: "Existing products contain valuable data but limited intelligent workflows.",
        workflow:
          "New AI features summarize, predict, classify, or recommend within the existing interface.",
        human: "Product owners approve use cases, thresholds, and release criteria.",
        kpis: "Usage, task completion, user satisfaction, error rate.",
      },
      {
        friction: "Users receive generic experiences despite meaningful context.",
        workflow:
          "A controlled personalization layer selects content, actions, or guidance based on permitted signals.",
        human: "Teams define exclusions, quality checks, and fairness reviews.",
        kpis: "Engagement, conversion, opt-out rate, complaint rate.",
      },
    ],
  },
  {
    id: "sales",
    label: "Sales and marketing",
    cases: [
      {
        friction: "Teams manually research accounts across multiple systems.",
        workflow:
          "An assistant collects approved account context and prepares a reviewable opportunity brief.",
        human: "The sales representative validates insights before outreach.",
        kpis: "Research time, meeting conversion, data completeness, seller adoption.",
      },
      {
        friction: "Lead qualification is inconsistent and slow.",
        workflow:
          "A scoring workflow combines rules, behavioral data, and model signals to prioritize review.",
        human: "Sales operations defines thresholds and handles exceptions.",
        kpis: "Speed to lead, qualification accuracy, conversion, false positives.",
      },
      {
        friction: "Campaign content requires repeated manual adaptation.",
        workflow:
          "A controlled generator prepares channel-specific drafts using approved claims and brand guidance.",
        human: "Marketing reviews and approves every external asset.",
        kpis: "Production time, approval rate, revision count, engagement.",
      },
      {
        friction: "Conversation insights are lost after calls.",
        workflow:
          "Calls are summarized, actions extracted, and CRM updates proposed.",
        human: "The account owner confirms updates before they are saved.",
        kpis: "CRM completeness, follow-up time, action completion, adoption.",
      },
    ],
  },
  {
    id: "support",
    label: "Customer service",
    cases: [
      {
        friction: "Agents search multiple systems before answering customers.",
        workflow:
          "A permission-aware assistant retrieves approved knowledge, account context, and previous interactions.",
        human: "The representative reviews and sends the response.",
        kpis: "Handling time, first response, escalation rate, answer acceptance.",
      },
      {
        friction: "Requests are manually classified and routed.",
        workflow:
          "A classifier identifies intent, urgency, language, and routing requirements.",
        human: "Support operations reviews uncertain or sensitive cases.",
        kpis: "Routing accuracy, backlog age, transfer rate, response time.",
      },
      {
        friction: "Quality reviews cover only a small sample of conversations.",
        workflow:
          "An evaluation system scores interactions against documented criteria and flags cases for review.",
        human: "Quality leads investigate findings and coach teams.",
        kpis: "Coverage, policy adherence, repeat contacts, coaching effectiveness.",
      },
      {
        friction: "Customers repeat information across channels.",
        workflow:
          "Conversation summaries and structured context move with the case.",
        human: "Agents verify context before relying on it.",
        kpis: "Repeat explanation rate, resolution time, satisfaction, reopens.",
      },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    cases: [
      {
        friction: "Teams copy information between email, documents, and internal tools.",
        workflow:
          "A document and workflow layer extracts data, validates fields, and proposes system updates.",
        human: "Operators approve low-confidence or high-value transactions.",
        kpis: "Processing time, rework, exception rate, throughput.",
      },
      {
        friction: "Operational issues are detected after they become expensive.",
        workflow:
          "Anomaly detection surfaces unusual patterns and relevant evidence.",
        human: "Operations leads investigate and decide the response.",
        kpis: "Detection time, false alerts, incident cost, resolution time.",
      },
      {
        friction: "Standard operating procedures are hard to find and follow.",
        workflow:
          "A guided assistant retrieves current procedures and collects completion evidence.",
        human: "Process owners maintain approved content and audit exceptions.",
        kpis: "Compliance, search time, completion quality, policy deviations.",
      },
      {
        friction: "Managers lack a consistent view of operational activity.",
        workflow:
          "A decision-support layer summarizes activity, risks, and unresolved exceptions.",
        human: "Managers validate critical recommendations.",
        kpis: "Decision cycle, backlog, exception age, operational variance.",
      },
    ],
  },
  {
    id: "finance",
    label: "Finance and risk",
    cases: [
      {
        friction: "Invoice and expense reviews require repetitive manual checks.",
        workflow:
          "Documents are extracted, matched, validated, and routed based on policy.",
        human: "Finance reviews exceptions, approvals, and unusual activity.",
        kpis: "Processing time, exception rate, duplicate detection, cycle time.",
      },
      {
        friction: "Risk teams review large volumes of cases with limited prioritization.",
        workflow:
          "A scoring system ranks cases and presents contributing evidence.",
        human: "Analysts make the final decision and record reasoning.",
        kpis: "Review time, hit rate, false positives, backlog age.",
      },
      {
        friction: "Management reporting requires repeated data preparation.",
        workflow:
          "A controlled reporting assistant prepares summaries from approved data sources.",
        human: "Finance validates every external or executive statement.",
        kpis: "Preparation time, revision rate, data discrepancies, timeliness.",
      },
      {
        friction: "Policy questions interrupt specialist teams.",
        workflow:
          "A permission-aware knowledge assistant answers routine questions with citations.",
        human: "Specialists handle ambiguous, material, or exceptional decisions.",
        kpis: "Question volume, response time, escalation rate, answer acceptance.",
      },
    ],
  },
  {
    id: "hr",
    label: "HR and internal knowledge",
    cases: [
      {
        friction: "Employees cannot quickly find current internal guidance.",
        workflow:
          "A role-aware assistant retrieves approved policies and source documents.",
        human: "HR maintains content and handles sensitive interpretation.",
        kpis: "Search time, ticket volume, source usage, answer acceptance.",
      },
      {
        friction: "Onboarding is inconsistent across teams.",
        workflow:
          "A guided workflow presents role-specific tasks, knowledge, and checkpoints.",
        human: "Managers confirm completion and address exceptions.",
        kpis: "Time to productivity, completion, manager effort, new-hire feedback.",
      },
      {
        friction: "Recruiting teams manually screen repetitive application data.",
        workflow:
          "A structured extraction system summarizes evidence against explicit job criteria.",
        human: "Recruiters make decisions and review bias risks.",
        kpis: "Review time, consistency, candidate experience, audit quality.",
      },
      {
        friction: "Learning content is difficult to personalize and maintain.",
        workflow:
          "A learning assistant recommends approved material based on role and progress.",
        human: "Subject experts approve content and assess outcomes.",
        kpis: "Completion, assessment performance, content usage, learner feedback.",
      },
    ],
  },
  {
    id: "logistics",
    label: "Logistics and supply chain",
    cases: [
      {
        friction: "Teams react late to shipment or inventory exceptions.",
        workflow:
          "A monitoring system detects anomalies, gathers context, and proposes next actions.",
        human: "Operators choose and execute the response.",
        kpis: "Exception detection, delay duration, service level, intervention time.",
      },
      {
        friction: "Planning relies on fragmented historical information.",
        workflow:
          "Forecasting models support demand, capacity, or inventory decisions.",
        human: "Planners adjust assumptions and approve commitments.",
        kpis: "Forecast error, stockouts, utilization, plan stability.",
      },
      {
        friction: "Documents arrive in inconsistent formats from multiple partners.",
        workflow:
          "Document intelligence extracts and validates shipment, customs, and order data.",
        human: "Specialists review low-confidence or regulated fields.",
        kpis: "Processing time, field accuracy, exceptions, clearance delay.",
      },
      {
        friction: "Route and service decisions require too many manual comparisons.",
        workflow:
          "An optimization layer ranks feasible options under defined constraints.",
        human: "Dispatchers approve decisions and handle real-world changes.",
        kpis: "Cost per movement, on-time rate, utilization, manual adjustments.",
      },
    ],
  },
  {
    id: "industry",
    label: "Industry-specific workflows",
    cases: [
      {
        friction: "Specialist knowledge is trapped in documents and individual experience.",
        workflow:
          "A domain assistant retrieves approved evidence and structures analysis for review.",
        human: "Qualified specialists remain responsible for decisions.",
        kpis: "Research time, source coverage, consistency, review quality.",
      },
      {
        friction: "Quality checks depend on inconsistent manual inspection.",
        workflow:
          "Computer vision or structured evaluation flags possible defects and anomalies.",
        human: "Quality teams validate findings and disposition.",
        kpis: "Inspection coverage, defect escape, false alerts, cycle time.",
      },
      {
        friction: "Complex records must be classified against changing requirements.",
        workflow:
          "A configurable classification pipeline prepares evidence and routes exceptions.",
        human: "Compliance or domain teams approve sensitive classifications.",
        kpis: "Review time, consistency, exception volume, audit findings.",
      },
      {
        friction: "Customers need guidance that depends on specialized context.",
        workflow:
          "A controlled decision-support experience asks structured questions and presents approved options.",
        human: "Experts review high-risk or nonstandard cases.",
        kpis: "Completion, escalation, satisfaction, decision quality.",
      },
    ],
  },
];

const processSteps = [
  {
    title: "Discovery and opportunity definition",
    activities:
      "Stakeholder interviews, workflow analysis, requirements, system review, success metrics, risk identification, and build-versus-buy evaluation.",
    deliverable: "Opportunity brief, prioritized use case, initial scope, assumptions, and constraints.",
  },
  {
    title: "Data and technical feasibility",
    activities:
      "Data-source assessment, quality review, integration analysis, model experiments, security requirements, and focused feasibility testing.",
    deliverable: "Feasibility findings, architecture recommendation, data-readiness plan, and risk register.",
  },
  {
    title: "Product and experience design",
    activities:
      "User journeys, workflow design, wireframes, review stages, fallback experiences, product requirements, and evaluation criteria.",
    deliverable: "Product specification, UX prototype, technical plan, and delivery roadmap.",
  },
  {
    title: "Focused proof of concept or MVP",
    activities:
      "Validate the highest-risk assumptions, test selected models, connect representative data, establish baselines, and collect user feedback.",
    deliverable: "Evidence-based decision on what should move into production engineering.",
  },
  {
    title: "Production engineering",
    activities:
      "Application development, AI orchestration, data pipelines, authentication, permissions, integrations, guardrails, testing, observability, and infrastructure.",
    deliverable: "A maintainable production system rather than a disposable demonstration.",
  },
  {
    title: "Validation, security, and launch",
    activities:
      "Functional QA, model evaluation, edge-case testing, performance, security review, user acceptance, deployment, training, and launch monitoring.",
    deliverable: "Validated release, operational documentation, training, and launch plan.",
  },
  {
    title: "Monitoring and improvement",
    activities:
      "Quality monitoring, cost and latency tracking, user feedback, retrieval or model improvements, incident handling, drift monitoring, and roadmap development.",
    deliverable: "Ongoing improvement plan with measurable operational signals.",
  },
];

const comparisonRows = [
  ["Business success metrics", "Often informal", "Defined and monitored"],
  ["User authentication", "Sometimes absent", "Required"],
  ["Role-based permissions", "Limited", "Designed into workflows"],
  ["Data privacy", "Basic handling", "Documented controls"],
  ["Source traceability", "Optional", "Implemented where required"],
  ["Output evaluation", "Manual spot checks", "Repeatable evaluation criteria"],
  ["Human approval", "Ad hoc", "Explicit review stages"],
  ["Failure handling", "Happy path only", "Fallbacks and escalation"],
  ["Monitoring", "Minimal", "Operational and AI observability"],
  ["Versioning", "Limited", "Model, prompt, and configuration history"],
  ["Cost controls", "Not prioritized", "Usage and vendor cost tracking"],
  ["Integration testing", "Partial", "Production workflows tested"],
  ["Audit logs", "Often absent", "Included for relevant actions"],
  ["Documentation", "Brief", "Architecture, operation, and handover"],
  ["Support after launch", "Unclear", "Defined maintenance model"],
];

const differentiators = [
  {
    title: "Business-first recommendations",
    description:
      "QuantumFinix assesses whether AI is genuinely the best approach before recommending implementation.",
  },
  {
    title: "Complete product engineering",
    description:
      "We handle the application, workflow, data, integrations, infrastructure, and user experience—not only the model connection.",
  },
  {
    title: "Model-aware, not model-led",
    description:
      "Models are selected according to quality, cost, latency, privacy, deployment needs, and vendor constraints.",
  },
  {
    title: "Reliability by design",
    description:
      "Evaluation, fallbacks, human review, monitoring, and failure handling are planned early.",
  },
  {
    title: "Transparent collaboration",
    description:
      "Clients receive visible milestones, demonstrations, decisions, risks, documentation, and scope clarity.",
  },
  {
    title: "Long-term ownership",
    description:
      "Agreed source code, architecture decisions, deployment information, documentation, and handover are defined contractually.",
  },
];

const securityControls = [
  "Data minimization and retention controls",
  "Encryption in transit and at rest",
  "Secret management",
  "Role-based and least-privilege access",
  "Tenant isolation where applicable",
  "Permission-aware retrieval",
  "Sensitive-data detection and redaction",
  "Prompt-injection defenses",
  "Agent tool and permission boundaries",
  "Human approval for sensitive actions",
  "Audit logs and output traceability",
  "Evaluation datasets and regression tests",
  "Hallucination and factuality testing",
  "Abuse prevention and rate limits",
  "Incident response planning",
  "Model and prompt versioning",
  "Vendor-risk and deployment-region review",
  "Private cloud or self-hosting where feasible",
];

const technologyGroups = [
  {
    title: "Application development",
    items: ["Next.js", "React", "TypeScript", "Node.js", "Python", "FastAPI", "REST and GraphQL APIs"],
  },
  {
    title: "AI model providers",
    items: ["OpenAI", "Anthropic", "Google Gemini", "AWS Bedrock", "Azure AI services", "Approved open-source models"],
  },
  {
    title: "AI and orchestration",
    items: ["Structured outputs", "Tool calling", "Model routing", "Agent orchestration", "Custom orchestration", "MCP integrations"],
  },
  {
    title: "Retrieval and data",
    items: ["PostgreSQL", "pgvector", "OpenSearch", "Vector databases", "Redis", "Object storage", "ETL pipelines"],
  },
  {
    title: "Machine learning",
    items: ["PyTorch", "TensorFlow where appropriate", "scikit-learn", "Hugging Face", "Experiment tracking", "Model registries"],
  },
  {
    title: "Cloud and infrastructure",
    items: ["AWS", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes where justified", "Serverless", "Infrastructure as code", "CI/CD"],
  },
  {
    title: "Observability and evaluation",
    items: ["Application monitoring", "Structured logs", "Tracing", "AI output evaluation", "Cost monitoring", "Feedback capture", "Regression testing"],
  },
];

const engagementModels = [
  {
    title: "AI opportunity workshop",
    bestFor: "Teams with several possible use cases but no clear priority.",
    outputs:
      "Opportunity map, feasibility findings, risks, architecture direction, and recommended next step.",
  },
  {
    title: "Feasibility or discovery sprint",
    bestFor: "A defined use case with important technical, data, or product unknowns.",
    outputs:
      "Requirements, prototype experiments, evaluation baseline, architecture, roadmap, and estimate.",
  },
  {
    title: "MVP development",
    bestFor: "A validated opportunity that needs a focused first release for real users.",
    outputs:
      "Designed and developed product, core integrations, deployment, analytics, documentation, and launch support.",
  },
  {
    title: "Production system or dedicated product team",
    bestFor: "Complex products, enterprise integrations, scaling requirements, or ongoing AI development.",
    outputs:
      "Cross-functional delivery, AI lifecycle management, continuous improvement, and operational support.",
  },
];

const deliverables = [
  "Product and technical requirements",
  "UX flows and product designs",
  "Application source code according to contract",
  "AI prompts and orchestration logic where contractually included",
  "Infrastructure configuration",
  "Data-pipeline documentation",
  "Architecture diagrams",
  "Model and vendor decision records",
  "Evaluation methodology",
  "Test coverage",
  "Deployment documentation",
  "Monitoring plan",
  "Security considerations",
  "Administrative access",
  "Team training and handover sessions",
  "Post-launch support plan",
];

const faqs = [
  {
    question: "What types of AI software do you develop?",
    answer:
      "QuantumFinix develops AI-enabled web and mobile products, generative AI applications, controlled agents, workflow automation, enterprise knowledge systems, machine-learning products, document intelligence, computer vision, AI integrations, and the surrounding production infrastructure.",
  },
  {
    question: "How do you determine whether AI is appropriate for our problem?",
    answer:
      "We begin with the task, users, workflow, available data, cost of errors, review requirements, and success metrics. When deterministic software or conventional automation is more suitable, we recommend that instead of forcing AI into the solution.",
  },
  {
    question: "Can you add AI to our existing product?",
    answer:
      "Yes. We review the existing architecture, APIs, data access, authentication, product experience, and operational constraints before defining the safest integration path.",
  },
  {
    question: "Can you work with our internal engineering or data team?",
    answer:
      "Yes. Engagements can be structured around a dedicated workstream, shared architecture ownership, specialist AI support, or a combined delivery team with clearly defined responsibilities.",
  },
  {
    question: "Do we need a large, clean dataset before starting?",
    answer:
      "Not always. Some solutions use approved existing models and organizational documents, while predictive systems may require substantial historical data. Discovery identifies what data is actually required and whether it is usable.",
  },
  {
    question: "Which AI models do you use?",
    answer:
      "Model selection depends on quality, latency, privacy, deployment, cost, context size, tool support, and vendor constraints. We may use proprietary, open-source, specialist, small, large, or hybrid model strategies.",
  },
  {
    question: "Can the system use our private company information?",
    answer:
      "Often, yes. The design can include controlled ingestion, permission-aware retrieval, encryption, access policies, logging, and deployment choices aligned with the sensitivity of the information.",
  },
  {
    question: "How do you protect confidential information?",
    answer:
      "Specific controls are defined per engagement and may include an NDA, least-privilege access, separate environments, encrypted services, secret management, redaction, audit logs, and documented retention rules.",
  },
  {
    question: "Will model providers train on our data?",
    answer:
      "That depends on the selected provider, account type, configuration, and contract. We review provider data terms and choose an architecture that matches the client’s requirements rather than making a universal claim.",
  },
  {
    question: "How do you reduce hallucinations and inaccurate outputs?",
    answer:
      "We combine scoped tasks, approved sources, structured outputs, retrieval, validation, evaluation datasets, model comparison, human review, fallback behavior, and monitoring. No method removes all uncertainty, so risk is handled explicitly.",
  },
  {
    question: "Can AI actions require human approval?",
    answer:
      "Yes. Approval stages can be required before sensitive messages, transactions, system updates, financial actions, customer decisions, or other high-impact operations.",
  },
  {
    question: "How do you test an AI system?",
    answer:
      "Testing can include functional QA, evaluation datasets, source-grounding checks, structured-output validation, adversarial testing, edge cases, regression tests, latency, cost, user acceptance, and production monitoring.",
  },
  {
    question: "How do you measure business value and ROI?",
    answer:
      "We define operational metrics connected to the original problem, such as time, throughput, quality, adoption, escalation, cost, risk, or revenue signals. Improvements are measured after deployment rather than promised before evidence exists.",
  },
  {
    question: "How much does custom AI software cost?",
    answer:
      "Cost depends on product scope, data readiness, integrations, model and infrastructure requirements, evaluation depth, security needs, usage volume, human-review requirements, and post-launch support. A scoped recommendation follows discovery.",
  },
  {
    question: "How long does an AI development project take?",
    answer:
      "Duration depends on data readiness, integration complexity, risk, product scope, and validation requirements. We define phases after discovery rather than presenting a universal timeline as a guarantee.",
  },
  {
    question: "Should we begin with a proof of concept or an MVP?",
    answer:
      "A proof of concept is useful when a technical assumption must be tested. An MVP is appropriate when the core opportunity is sufficiently validated and the goal is a usable release for real users.",
  },
  {
    question: "Who owns the source code and intellectual property?",
    answer:
      "Ownership, third-party licenses, model terms, reusable components, and intellectual-property transfer are defined in the agreement before development begins.",
  },
  {
    question: "Can you deploy inside our cloud environment?",
    answer:
      "Often, yes. Deployment options depend on access, architecture, provider availability, security requirements, and the responsibilities your internal team is able to operate.",
  },
  {
    question: "Do you provide maintenance and monitoring?",
    answer:
      "Yes. Post-launch support can include issue resolution, evaluation monitoring, model or prompt changes, dependency updates, cost tracking, performance work, security updates, and product improvements.",
  },
  {
    question: "What happens if the selected model changes or is discontinued?",
    answer:
      "We document dependencies, isolate model-specific logic where practical, maintain evaluation criteria, and plan migration options. Complete vendor independence is not always realistic, so tradeoffs are explained clearly.",
  },
  {
    question: "Can you support regulated industries?",
    answer:
      "Potentially, but the engagement must begin with the applicable legal, security, data, audit, and human-oversight requirements. QuantumFinix does not claim certifications or compliance coverage that has not been verified.",
  },
  {
    question: "What information should we prepare for the first call?",
    answer:
      "Bring the business problem, current workflow, intended users, available data or systems, cost of errors, desired outcome, known constraints, timeline expectations, and the people involved in the decision.",
  },
];

const verifiedTestimonials: Array<{
  quote: string;
  name: string;
  role: string;
  company: string;
  sourceUrl: string;
}> = [];

type FormData = {
  name: string;
  email: string;
  company: string;
  role: string;
  website: string;
  project: string;
  systems: string;
  timeline: string;
  budget: string;
  security: string;
  nda: boolean;
  contactMethod: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  name: "",
  email: "",
  company: "",
  role: "",
  website: "",
  project: "",
  systems: "",
  timeline: "",
  budget: "",
  security: "",
  nda: false,
  contactMethod: "Email",
};

function trackEvent(
  name:
    | "hero_primary_cta"
    | "hero_secondary_cta"
    | "service_card_click"
    | "process_interaction"
    | "faq_expansion"
    | "form_start"
    | "form_validation_error"
    | "form_submission"
    | "form_submission_success"
    | "sticky_cta_click",
  properties?: Record<string, string | number | boolean>,
) {
  if (process.env.NODE_ENV === "development") {
    console.info("[analytics placeholder]", name, properties ?? {});
  }
}

export default function AISoftwareDevelopment() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeUseCase, setActiveUseCase] = useState(useCaseCategories[0].id);
  const [activeProcess, setActiveProcess] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formStarted, setFormStarted] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const formId = useId();

  const currentUseCases = useMemo(
    () =>
      useCaseCategories.find((category) => category.id === activeUseCase) ??
      useCaseCategories[0],
    [activeUseCase],
  );

  function selectUseCase(id: string) {
    setActiveUseCase(id);
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % useCaseCategories.length;
    }

    if (event.key === "ArrowLeft") {
      nextIndex =
        (index - 1 + useCaseCategories.length) % useCaseCategories.length;
    }

    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = useCaseCategories.length - 1;

    const nextCategory = useCaseCategories[nextIndex];
    setActiveUseCase(nextCategory.id);
    tabRefs.current[nextIndex]?.focus();
  }

  function updateForm<K extends keyof FormData>(field: K, value: FormData[K]) {
    if (!formStarted) {
      setFormStarted(true);
      trackEvent("form_start");
    }

    setFormData((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validateForm() {
    const errors: FormErrors = {};

    if (!formData.name.trim()) errors.name = "Please enter your full name.";

    if (!formData.email.trim()) {
      errors.email = "Please enter your work email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.company.trim()) {
      errors.company = "Please enter your company name.";
    }

    if (!formData.project.trim() || formData.project.trim().length < 30) {
      errors.project =
        "Please describe the project in at least 30 characters.";
    }

    return errors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("idle");

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      trackEvent("form_validation_error", {
        errorCount: Object.keys(errors).length,
      });
      return;
    }

    trackEvent("form_submission");
    setFormStatus("loading");

    try {
      /**
       * Submission handler placeholder.
       * Replace this timeout with your real server action or API route.
       */
      await new Promise((resolve) => window.setTimeout(resolve, 700));
      setFormStatus("success");
      setFormData(initialFormData);
      setFormStarted(false);
      trackEvent("form_submission_success");
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-[#02050c] text-white selection:bg-cyan-300 selection:text-[#02050c]">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-[#02050c] transition focus:translate-y-0"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#02050c]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:h-20 sm:px-7 lg:px-10 xl:px-16">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/20 text-cyan-200">
              QF
            </span>
            <span className="font-black tracking-[-0.03em]">
              {COMPANY.name}
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navItems.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="rounded-md text-sm text-slate-400 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <PublicAccountLink className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 px-5 text-sm font-semibold text-white transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.06]" />
            <Link
              href="#project-inquiry"
              onClick={() => trackEvent("hero_primary_cta")}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-5 text-sm font-bold text-[#020711] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              Discuss your AI project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`overflow-hidden border-t border-white/[0.07] transition-[max-height,opacity] duration-300 lg:hidden ${
            mobileOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-[1440px] px-4 py-5 sm:px-7"
          >
            <ul className="space-y-1">
              {navItems.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-12 items-center justify-between rounded-xl px-3 text-sm text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    {label}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <PublicAccountLink className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/10 px-5 text-sm font-semibold text-white transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.06]" />

            <Link
              href="#project-inquiry"
              onClick={() => {
                setMobileOpen(false);
                trackEvent("hero_primary_cta");
              }}
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-5 text-sm font-bold text-[#020711]"
            >
              Discuss your AI project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="relative isolate overflow-hidden px-4 pb-20 pt-8 sm:px-7 sm:pb-24 lg:px-10 lg:pb-28 xl:px-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_22%,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_15%_35%,rgba(37,99,235,0.10),transparent_30%)]"
          />

          <div className="mx-auto max-w-[1440px]">
            <nav aria-label="Breadcrumb" className="py-5">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
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
                <li aria-current="page" className="text-slate-300">
                  AI Software Development
                </li>
              </ol>
            </nav>

            <div className="grid items-center gap-14 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
              <div className="max-w-3xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-200/70 sm:text-xs">
                  {PAGE_COPY.eyebrow}
                </p>

                <h1 className="mt-6 text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                  {PAGE_COPY.title}
                </h1>

                <p className="mt-7 max-w-2xl text-xl font-semibold leading-8 text-cyan-100 sm:text-2xl">
                  {PAGE_COPY.description}
                </p>

                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                  {PAGE_COPY.supportingCopy}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#project-inquiry"
                    onClick={() => trackEvent("hero_primary_cta")}
                    className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-7 text-sm font-bold text-[#020711] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                  >
                    {PAGE_COPY.primaryCta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <Link
                    href="#process"
                    onClick={() => trackEvent("hero_secondary_cta")}
                    className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/10 px-7 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    {PAGE_COPY.secondaryCta}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  {PAGE_COPY.reassurance}
                </p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                  {trustStatements.map((statement) => (
                    <li
                      key={statement}
                      className="flex items-start gap-3 border-t border-white/[0.08] pt-4 text-xs leading-6 text-slate-400"
                    >
                      <CircleCheck
                        className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300"
                        aria-hidden="true"
                      />
                      {statement}
                    </li>
                  ))}
                </ul>
              </div>

              <ArchitectureVisual />
            </div>
          </div>
        </section>

        {proofItems.length > 0 && (
          <section
            aria-label="Client and independent proof"
            className="border-y border-white/[0.07] px-4 py-7 sm:px-7 lg:px-10 xl:px-16"
          >
            <div className="mx-auto max-w-[1440px]">
              <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Trusted for complex product and automation challenges
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                {proofItems.map((item) => (
                  <span
                    key={`${item.label}-${item.value}`}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300"
                  >
                    {item.label}: {item.value}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        <Section
          id="buyer-problem"
          eyebrow="The real delivery challenge"
          title="AI projects rarely fail because of the model alone."
          description="The difficult work is defining the right problem, building the surrounding product, connecting trusted data, controlling risk, and making the new workflow usable."
        >
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-3 sm:grid-cols-2">
              {buyerProblems.map((problem) => (
                <div
                  key={problem}
                  className="rounded-2xl border border-white/[0.08] p-5"
                >
                  <div className="flex gap-3">
                    <X
                      className="mt-1 h-4 w-4 shrink-0 text-rose-300/80"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-7 text-slate-400">{problem}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-white/[0.09] p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Two different mindsets
              </p>

              <div className="mt-7">
                <p className="text-sm font-semibold text-rose-200/80">
                  Prototype mindset
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                  {["Prompt", "Model", "Demo"].map((item, index, items) => (
                    <span key={item} className="contents">
                      <span className="rounded-xl border border-white/[0.08] px-3 py-2">
                        {item}
                      </span>
                      {index < items.length - 1 && (
                        <ArrowRight
                          className="h-4 w-4 text-slate-700"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-white/[0.08] pt-8">
                <p className="text-sm font-semibold text-cyan-200">
                  Production mindset
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                  {[
                    "Business objective",
                    "Workflow",
                    "Data",
                    "Model",
                    "Integrations",
                    "Evaluation",
                    "Guardrails",
                    "Monitoring",
                    "Adoption",
                  ].map((item, index, items) => (
                    <span key={item} className="contents">
                      <span className="rounded-xl border border-cyan-300/15 px-3 py-2">
                        {item}
                      </span>
                      {index < items.length - 1 && (
                        <ArrowRight
                          className="h-4 w-4 text-cyan-300/40"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-8 text-base font-semibold leading-8 text-white">
                We address the complete product and operating system around the
                AI—not only the API call.
              </p>
            </div>
          </div>
        </Section>

        <Section
          id="outcomes"
          eyebrow="Business outcomes"
          title="Built for an outcome, not an AI checkbox"
          description="Every engagement begins with the operational or product result that should improve. The AI approach comes second."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {outcomes.map((outcome) => {
              const Icon = outcome.icon;
              return (
                <article
                  key={outcome.title}
                  className="group rounded-[1.6rem] border border-white/[0.08] p-6 transition hover:-translate-y-1 hover:border-cyan-300/20"
                >
                  <Icon
                    className="h-6 w-6 text-cyan-300"
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 text-lg font-bold tracking-[-0.025em]">
                    {outcome.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {outcome.description}
                  </p>
                  <p className="mt-5 border-t border-white/[0.07] pt-4 text-[10px] uppercase leading-5 tracking-[0.15em] text-cyan-200/50">
                    {outcome.approach}
                  </p>
                </article>
              );
            })}
          </div>
        </Section>

        <Section
          id="services"
          eyebrow="Complete AI development offering"
          title="AI software we design and develop"
          description="QuantumFinix builds the product, workflow, data, integrations, controls, and production systems around the selected AI capability."
        >
          <div className="grid gap-5 lg:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="group rounded-[2rem] border border-white/[0.08] p-6 transition hover:border-cyan-300/20 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/15 text-cyan-200">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <Link
                      href="#project-inquiry"
                      onClick={() =>
                        trackEvent("service_card_click", {
                          service: service.title,
                        })
                      }
                      className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-200 transition hover:text-white"
                    >
                      Discuss this capability
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>

                  <h3 className="mt-7 text-2xl font-bold tracking-[-0.035em]">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {service.summary}
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/60">
                        When it is useful
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-400">
                        {service.useful}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/60">
                        Typical examples
                      </p>
                      <ul className="mt-3 space-y-2">
                        {service.examples.map((example) => (
                          <li
                            key={example}
                            className="flex gap-2 text-sm leading-6 text-slate-400"
                          >
                            <Check
                              className="mt-1 h-3.5 w-3.5 shrink-0 text-cyan-300"
                              aria-hidden="true"
                            />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="mt-6 border-t border-white/[0.07] pt-5 text-xs leading-6 text-slate-500">
                    <span className="font-semibold text-slate-300">
                      Delivery considerations:
                    </span>{" "}
                    {service.considerations}
                  </p>
                </article>
              );
            })}
          </div>
        </Section>

        <Section
          id="use-cases"
          eyebrow="Use cases by business function"
          title="Where custom AI creates practical value"
          description="Select a business function to review example workflows, the role of human judgment, and metrics that may be useful to track."
        >
          <div
            role="tablist"
            aria-label="AI use-case categories"
            className="flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {useCaseCategories.map((category, index) => {
              const active = category.id === activeUseCase;
              return (
                <button
                  key={category.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${category.id}`}
                  aria-selected={active}
                  aria-controls={`panel-${category.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => selectUseCase(category.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    active
                      ? "border-cyan-300/25 bg-cyan-300/[0.08] text-cyan-100"
                      : "border-white/[0.08] text-slate-500 hover:text-white"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div
            id={`panel-${currentUseCases.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentUseCases.id}`}
            className="mt-7 grid gap-4 md:grid-cols-2"
          >
            {currentUseCases.cases.map((useCase, index) => (
              <article
                key={`${currentUseCases.id}-${index}`}
                className="rounded-[1.75rem] border border-white/[0.08] p-6 sm:p-7"
              >
                <p className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/40">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <UseCaseRow label="Current friction" value={useCase.friction} />
                <UseCaseRow
                  label="AI-supported workflow"
                  value={useCase.workflow}
                />
                <UseCaseRow label="Human involvement" value={useCase.human} />
                <UseCaseRow label="Potential KPIs" value={useCase.kpis} />
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="qualification"
          eyebrow="AI opportunity qualification"
          title="Should this problem use AI?"
          description="A responsible recommendation starts by determining whether intelligence adds enough value to justify the uncertainty, cost, and operating requirements."
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <QualificationCard
              title="Strong AI opportunity"
              icon={CircleCheck}
              items={[
                "High-volume knowledge work",
                "Large amounts of unstructured information",
                "Repeated decisions based on patterns",
                "Tasks requiring interpretation rather than fixed rules",
                "Workflows where partial automation still creates value",
              ]}
            />

            <QualificationCard
              title="Conventional software may be better"
              icon={Code2}
              items={[
                "Fully deterministic business rules",
                "Simple database operations",
                "Low-volume tasks",
                "Workflows requiring perfect output with no review",
                "Problems without usable data or a feedback mechanism",
              ]}
            />

            <QualificationCard
              title="Questions we evaluate"
              icon={Search}
              items={[
                "What task or decision should improve?",
                "Who uses the output?",
                "What is the cost of an incorrect result?",
                "Which data sources are available?",
                "How will success be measured?",
                "What level of human review is required?",
                "How will the system fit the existing workflow?",
                "What is the expected operating cost?",
              ]}
            />

            <div className="rounded-[2rem] border border-cyan-300/18 p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/60">
                First-step deliverable
              </p>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.035em]">
                AI Opportunity and Feasibility Map
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                A focused assessment can clarify the best opportunity before a
                large development commitment is made.
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {[
                  "Prioritized use cases",
                  "Feasibility assessment",
                  "Data-readiness findings",
                  "Initial architecture",
                  "Risk and governance considerations",
                  "Build-versus-buy recommendation",
                  "Estimated implementation phases",
                  "Suggested success metrics",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-6 text-slate-400"
                  >
                    <Check
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-cyan-300"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="#project-inquiry"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-6 text-sm font-bold text-[#020711]"
              >
                Evaluate my AI opportunity
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Section>

        <Section
          id="process"
          eyebrow="Development process"
          title="From business problem to dependable production software"
          description="Each stage produces a decision, deliverable, or validated learning. The sequence reduces uncertainty without hiding tradeoffs."
        >
          <div className="grid gap-7 lg:grid-cols-[0.38fr_0.62fr]">
            <div className="space-y-2" role="list" aria-label="Process steps">
              {processSteps.map((step, index) => {
                const active = activeProcess === index;
                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => {
                      setActiveProcess(index);
                      trackEvent("process_interaction", {
                        step: index + 1,
                      });
                    }}
                    className={`flex min-h-14 w-full items-center gap-4 rounded-2xl border px-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                      active
                        ? "border-cyan-300/22 bg-cyan-300/[0.06] text-white"
                        : "border-white/[0.07] text-slate-500 hover:text-white"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-cyan-300/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold">{step.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-[2rem] border border-white/[0.09] p-6 sm:p-8 lg:p-10">
              <p className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/45">
                STEP {String(activeProcess + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 text-3xl font-bold tracking-[-0.04em]">
                {processSteps[activeProcess].title}
              </h3>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/60">
                    Activities
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {processSteps[activeProcess].activities}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/60">
                    Deliverable
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {processSteps[activeProcess].deliverable}
                  </p>
                </div>
              </div>

              <div
                aria-label={`Process progress: ${activeProcess + 1} of ${processSteps.length}`}
                className="mt-9 h-1 overflow-hidden rounded-full bg-white/[0.06]"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 transition-[width] duration-500"
                  style={{
                    width: `${((activeProcess + 1) / processSteps.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <p className="mt-7 rounded-2xl border border-white/[0.07] p-5 text-sm leading-7 text-slate-500">
            Project duration depends on data readiness, integration complexity,
            risk level, product scope, and validation requirements. QuantumFinix
            defines the delivery plan after discovery rather than promising an
            unrealistic launch date.
          </p>
        </Section>

        <Section
          id="prototype-vs-production"
          eyebrow="Production readiness"
          title="A working demonstration is not a production AI product"
          description="A prototype answers whether an idea may work. A production system must also be secure, measurable, supportable, and connected to real operating workflows."
        >
          <div
            role="region"
            aria-label="Prototype and production comparison"
            tabIndex={0}
            className="overflow-x-auto rounded-[2rem] border border-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <table className="min-w-[760px] w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="p-5 text-xs uppercase tracking-[0.15em] text-slate-500">
                    Capability
                  </th>
                  <th className="p-5 text-xs uppercase tracking-[0.15em] text-slate-500">
                    Early prototype
                  </th>
                  <th className="p-5 text-xs uppercase tracking-[0.15em] text-cyan-200/70">
                    Production-ready system
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([label, prototype, production]) => (
                  <tr
                    key={label}
                    className="border-b border-white/[0.06] last:border-0"
                  >
                    <th className="p-5 text-sm font-semibold text-white">
                      {label}
                    </th>
                    <td className="p-5 text-sm text-slate-500">{prototype}</td>
                    <td className="p-5 text-sm text-slate-300">
                      {production}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          id="case-study"
          eyebrow="Example engagement structure"
          title="What credible AI delivery looks like"
          description="The following structure is illustrative and is not presented as completed client work."
        >
          <article className="rounded-[2rem] border border-white/[0.09] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/70">
                  Illustrative — not a client claim
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-[-0.035em]">
                  Permission-aware internal knowledge and workflow assistant
                </h3>
              </div>
              <span className="w-fit rounded-full border border-white/[0.08] px-4 py-2 text-xs text-slate-400">
                Confidential engagement format available
              </span>
            </div>

            <div className="mt-8 grid gap-7 lg:grid-cols-2">
              <CaseStudyBlock
                label="Client"
                value="[CLIENT NAME OR CONFIDENTIAL INDUSTRY DESCRIPTION]"
              />
              <CaseStudyBlock
                label="Challenge"
                value="Describe the current workflow, the people involved, the information they need, and the operational constraint."
              />
              <CaseStudyBlock
                label="Why existing tools were insufficient"
                value="Explain the integration, permissions, usability, data, or workflow requirements that justify a custom product."
              />
              <CaseStudyBlock
                label="Solution"
                value="Describe the application, retrieval or model approach, integrations, evaluation criteria, and human-review model."
              />
              <CaseStudyBlock
                label="Security and reliability"
                value="Document relevant access controls, source traceability, approval points, testing, monitoring, and incident handling."
              />
              <CaseStudyBlock
                label="Measured results"
                value="[VERIFIED RESULT 1] · [VERIFIED RESULT 2] · [VERIFIED RESULT 3]"
              />
            </div>

            <div className="mt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/60">
                Simplified architecture
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {[
                  "Identity",
                  "Permission layer",
                  "Application",
                  "AI orchestration",
                  "Approved sources",
                  "Human review",
                  "Monitoring",
                ].map((item, index, items) => (
                  <span key={item} className="contents">
                    <span className="rounded-xl border border-white/[0.08] px-3 py-2 text-sm text-slate-300">
                      {item}
                    </span>
                    {index < items.length - 1 && (
                      <ArrowRight
                        className="h-4 w-4 text-cyan-300/40"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                ))}
              </div>
            </div>

            <blockquote className="mt-8 border-l-2 border-cyan-300/30 pl-5 text-sm italic leading-7 text-slate-500">
              [VERIFIED TESTIMONIAL]
            </blockquote>
          </article>
        </Section>

        <Section
          id="why-quantumfinix"
          eyebrow="Why QuantumFinix"
          title="A product partner for the difficult parts of AI"
          description="The value of an AI partner is not only model access. It is the ability to connect technology with business logic, reliable software, user experience, and operational responsibility."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {differentiators.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[1.6rem] border border-white/[0.08] p-6"
              >
                <span className="font-mono text-[10px] text-cyan-300/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="security"
          eyebrow="Security and responsible AI"
          title="Security and responsible AI are product requirements"
          description="Controls must reflect the data, users, actions, industry, and consequences of an incorrect or unauthorized outcome."
        >
          <div className="grid gap-8 lg:grid-cols-[0.62fr_0.38fr]">
            <div className="grid gap-3 sm:grid-cols-2">
              {securityControls.map((control) => (
                <div
                  key={control}
                  className="flex items-start gap-3 rounded-2xl border border-white/[0.07] p-4"
                >
                  <ShieldCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-6 text-slate-400">
                    {control}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-cyan-300/15 p-6 sm:p-8">
              <LockKeyhole
                className="h-7 w-7 text-cyan-300"
                aria-hidden="true"
              />
              <h3 className="mt-6 text-2xl font-bold tracking-[-0.035em]">
                Controls follow the engagement context
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                Specific controls, certifications, and compliance requirements
                are defined for each engagement. QuantumFinix does not display a
                certification unless it has been earned or the relevant
                infrastructure is contractually covered by it.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Identity",
                  "Permission layer",
                  "Application",
                  "AI orchestration",
                  "Approved data sources",
                  "Monitoring and audit",
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/15 font-mono text-[9px] text-cyan-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="technology"
          eyebrow="Purpose-selected technology"
          title="Technology selected for your requirements"
          description="QuantumFinix does not force every project into the same stack. Technology is selected according to security, scalability, latency, cost, team capability, vendor constraints, and long-term maintainability."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {technologyGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-[1.6rem] border border-white/[0.08] p-6"
              >
                <h3 className="text-lg font-bold tracking-[-0.025em]">
                  {group.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-slate-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="engagement"
          eyebrow="Engagement models"
          title="Start at the level of certainty you have today"
          description="The right first step depends on how clearly the opportunity, data, product, and risks are already understood."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {engagementModels.map((model, index) => (
              <article
                key={model.title}
                className="rounded-[1.75rem] border border-white/[0.08] p-6 sm:p-7"
              >
                <span className="font-mono text-[10px] text-cyan-300/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-2xl font-bold tracking-[-0.035em]">
                  {model.title}
                </h3>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/60">
                  Best for
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  {model.bestFor}
                </p>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/60">
                  Typical outputs
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  {model.outputs}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-[2rem] border border-cyan-300/15 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="text-xl font-bold">What affects project cost?</h3>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">
                Product scope, data readiness, integrations, model and
                infrastructure requirements, evaluation depth, security,
                autonomy, usage volume, and support needs.
              </p>
            </div>
            <Link
              href="#project-inquiry"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-6 text-sm font-bold text-[#020711]"
            >
              Get a scoped recommendation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Section>

        <Section
          id="deliverables"
          eyebrow="Handover and ownership"
          title="Built to remain understandable and maintainable"
          description="Exact ownership and licensing terms are defined in the agreement. The objective is to avoid creating a product that only its original development team can operate."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((deliverable) => (
              <div
                key={deliverable}
                className="flex items-start gap-3 rounded-2xl border border-white/[0.07] p-4"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300"
                  aria-hidden="true"
                />
                <span className="text-sm leading-6 text-slate-400">
                  {deliverable}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="collaboration"
          eyebrow="Collaboration experience"
          title="You should always know what is being built and why"
          description="QuantumFinix structures delivery around visible progress, documented decisions, and direct access to the people responsible for important technical work."
        >
          <div className="grid gap-8 lg:grid-cols-[0.52fr_0.48fr]">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Named project lead",
                "Regular planning sessions",
                "Short delivery cycles",
                "Working software demonstrations",
                "Shared roadmap",
                "Documented decisions",
                "Visible risks and dependencies",
                "Budget and scope tracking",
                "Access to relevant technical experts",
                "Clear escalation path",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/[0.07] p-4"
                >
                  <CircleCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-6 text-slate-400">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-white/[0.09] p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/60">
                Sample project rhythm
              </p>
              <div className="mt-6 space-y-6">
                <RhythmItem
                  label="Monday"
                  text="Planning and priority confirmation."
                />
                <RhythmItem
                  label="During the week"
                  text="Development, testing, written updates, and issue resolution."
                />
                <RhythmItem
                  label="End of cycle"
                  text="Working product demonstration, results review, and next-cycle decisions."
                />
              </div>
            </div>
          </div>
        </Section>

        {verifiedTestimonials.length > 0 && (
          <Section
            id="testimonials"
            eyebrow="Independent proof"
            title="What clients say about working with us"
            description="Only verified testimonials with permission and a source link are displayed."
          >
            <div className="grid gap-5 md:grid-cols-2">
              {verifiedTestimonials.map((testimonial) => (
                <blockquote
                  key={`${testimonial.name}-${testimonial.company}`}
                  className="rounded-[2rem] border border-white/[0.08] p-7"
                >
                  <p className="text-lg leading-8 text-slate-200">
                    “{testimonial.quote}”
                  </p>
                  <footer className="mt-6 border-t border-white/[0.07] pt-5 text-sm text-slate-400">
                    {testimonial.name}, {testimonial.role}, {testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>
          </Section>
        )}

        <Section
          id="faq"
          eyebrow="Frequently asked questions"
          title="Clear answers before the first conversation"
          description="These answers explain the intended approach. Final scope, ownership, confidentiality, security, and commercial terms are confirmed in the project agreement."
        >
          <div className="mx-auto max-w-4xl space-y-3">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border transition ${
                    open
                      ? "border-cyan-300/20"
                      : "border-white/[0.07]"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-button-${index}`}
                      onClick={() => {
                        setOpenFaq(open ? null : index);
                        trackEvent("faq_expansion", {
                          question: index + 1,
                        });
                      }}
                      className="flex min-h-16 w-full items-center justify-between gap-5 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300 sm:px-6"
                    >
                      <span className="flex gap-4">
                        <span className="mt-1 font-mono text-[9px] text-cyan-300/40">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-semibold text-slate-100 sm:text-base">
                          {faq.question}
                        </span>
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-cyan-200 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    hidden={!open}
                    className="border-t border-white/[0.06] px-5 py-5 sm:px-6"
                  >
                    <p className="text-sm leading-7 text-slate-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <section
          id="project-inquiry"
          className="scroll-mt-24 px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28 xl:px-16"
        >
          <div className="mx-auto max-w-[1440px] rounded-[2.25rem] border border-cyan-300/16 p-6 sm:p-9 lg:p-12">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200/65">
                  Project conversations open
                </p>
                <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl">
                  {PAGE_COPY.finalHeadline}
                </h2>
                <p className="mt-6 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                  Tell us what you want to improve, automate, or build. We’ll
                  help identify the most practical next step—even when that step
                  is not a large development project.
                </p>

                <ul className="mt-7 space-y-3">
                  {[
                    "NDA available before detailed discovery",
                    "Direct conversation with a technical specialist",
                    "Clear recommendation and next step",
                    "No obligation to begin development",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-400"
                    >
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-cyan-300"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <form
                aria-labelledby={`${formId}-title`}
                noValidate
                onSubmit={handleSubmit}
                className="grid gap-5 sm:grid-cols-2"
              >
                <h3 id={`${formId}-title`} className="sr-only">
                  Submit your AI project brief
                </h3>

                <Field
                  label="Full name"
                  required
                  error={formErrors.name}
                  input={
                    <input
                      value={formData.name}
                      onChange={(event) => updateForm("name", event.target.value)}
                      autoComplete="name"
                      className={fieldClassName}
                    />
                  }
                />

                <Field
                  label="Work email"
                  required
                  error={formErrors.email}
                  input={
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) =>
                        updateForm("email", event.target.value)
                      }
                      autoComplete="email"
                      className={fieldClassName}
                    />
                  }
                />

                <Field
                  label="Company"
                  required
                  error={formErrors.company}
                  input={
                    <input
                      value={formData.company}
                      onChange={(event) =>
                        updateForm("company", event.target.value)
                      }
                      autoComplete="organization"
                      className={fieldClassName}
                    />
                  }
                />

                <Field
                  label="Role"
                  input={
                    <input
                      value={formData.role}
                      onChange={(event) => updateForm("role", event.target.value)}
                      autoComplete="organization-title"
                      className={fieldClassName}
                    />
                  }
                />

                <Field
                  label="Company website"
                  input={
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(event) =>
                        updateForm("website", event.target.value)
                      }
                      placeholder="https://"
                      className={fieldClassName}
                    />
                  }
                />

                <Field
                  label="Preferred contact method"
                  input={
                    <select
                      value={formData.contactMethod}
                      onChange={(event) =>
                        updateForm("contactMethod", event.target.value)
                      }
                      className={fieldClassName}
                    >
                      <option>Email</option>
                      <option>Phone</option>
                      <option>Video call</option>
                    </select>
                  }
                />

                <div className="sm:col-span-2">
                  <Field
                    label="What are you trying to build or improve?"
                    required
                    error={formErrors.project}
                    input={
                      <textarea
                        rows={5}
                        value={formData.project}
                        onChange={(event) =>
                          updateForm("project", event.target.value)
                        }
                        placeholder="Describe the workflow, users, desired outcome, and current challenge."
                        className={fieldClassName}
                      />
                    }
                  />
                </div>

                <div className="sm:col-span-2">
                  <Field
                    label="Existing data or systems involved"
                    input={
                      <textarea
                        rows={3}
                        value={formData.systems}
                        onChange={(event) =>
                          updateForm("systems", event.target.value)
                        }
                        placeholder="CRM, databases, document stores, APIs, cloud environment, or data sources."
                        className={fieldClassName}
                      />
                    }
                  />
                </div>

                <Field
                  label="Desired timeline"
                  input={
                    <select
                      value={formData.timeline}
                      onChange={(event) =>
                        updateForm("timeline", event.target.value)
                      }
                      className={fieldClassName}
                    >
                      <option value="">Select a range</option>
                      <option>Exploring options</option>
                      <option>Within 3 months</option>
                      <option>3–6 months</option>
                      <option>6–12 months</option>
                      <option>More than 12 months</option>
                    </select>
                  }
                />

                <Field
                  label="Approximate budget range"
                  input={
                    <select
                      value={formData.budget}
                      onChange={(event) =>
                        updateForm("budget", event.target.value)
                      }
                      className={fieldClassName}
                    >
                      <option value="">Select a range</option>
                      <option>Need guidance</option>
                      <option>Discovery or feasibility budget</option>
                      <option>Focused MVP budget</option>
                      <option>Production platform budget</option>
                      <option>Ongoing product team budget</option>
                    </select>
                  }
                />

                <div className="sm:col-span-2">
                  <Field
                    label="Security or compliance requirements"
                    input={
                      <textarea
                        rows={3}
                        value={formData.security}
                        onChange={(event) =>
                          updateForm("security", event.target.value)
                        }
                        placeholder="Describe confidential data, deployment requirements, audit needs, or applicable regulations."
                        className={fieldClassName}
                      />
                    }
                  />
                </div>

                <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/[0.08] px-4 text-sm text-slate-300 sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={formData.nda}
                    onChange={(event) => updateForm("nda", event.target.checked)}
                    className="h-4 w-4 accent-cyan-300"
                  />
                  I would like to discuss an NDA before sharing detailed
                  confidential information.
                </label>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-7 text-sm font-bold text-[#020711] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {formStatus === "loading"
                      ? "Submitting…"
                      : "Submit project brief"}
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <p className="mt-3 text-xs leading-6 text-slate-600">
                    We’ll only use this information to evaluate and respond to
                    your inquiry.
                  </p>

                  {formStatus === "success" && (
                    <p
                      role="status"
                      className="mt-4 rounded-xl border border-emerald-300/20 p-4 text-sm text-emerald-200"
                    >
                      Your demo submission was accepted locally. Replace the
                      placeholder handler with your real server action or API
                      route before publishing.
                    </p>
                  )}

                  {formStatus === "error" && (
                    <p
                      role="alert"
                      className="mt-4 rounded-xl border border-rose-300/20 p-4 text-sm text-rose-200"
                    >
                      Something went wrong. Please try again or contact{" "}
                      {COMPANY.email}.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.07] px-4 py-12 sm:px-7 lg:px-10 xl:px-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="text-xl font-black tracking-[-0.03em]">
              {COMPANY.name}
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
              Business-first AI software development, product engineering, and
              workflow automation for startups and established teams.
            </p>
            <p className="mt-5 text-xs text-slate-600">{COMPANY.location}</p>
          </div>

          <FooterColumn
            title="Services"
            links={[
              ["AI consulting", "/services/ai-consulting"],
              ["Generative AI", "/services/generative-ai-development"],
              ["AI agents", "/services/ai-agent-development"],
              ["Machine learning", "/services/machine-learning-development"],
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              ["Process", "#process"],
              ["Security", "/security"],
              ["Responsible AI", "/responsible-ai"],
              ["Contact", "#project-inquiry"],
            ]}
          />

          <FooterColumn
            title="Legal"
            links={[
              ["Privacy policy", "/privacy"],
              ["Terms", "/terms"],
              ["LinkedIn", "#"],
              ["GitHub", "#"],
            ]}
          />
        </div>

        <div className="mx-auto mt-10 flex max-w-[1440px] flex-col gap-3 border-t border-white/[0.07] pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p>AI Software Development · India and remote delivery</p>
        </div>
      </footer>

      <Link
        href="#project-inquiry"
        onClick={() => trackEvent("sticky_cta_click")}
        className="fixed inset-x-4 bottom-4 z-40 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-5 text-sm font-bold text-[#020711] shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:hidden"
      >
        Discuss your AI project
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

function ArchitectureVisual() {
  const nodes = [
    {
      icon: Workflow,
      title: "Business workflow",
      description: "Users, tasks, decisions, and measurable objective",
    },
    {
      icon: Database,
      title: "Data and integrations",
      description: "Approved systems, documents, APIs, and context",
    },
    {
      icon: BrainCircuit,
      title: "AI intelligence layer",
      description: "Retrieval, models, tools, rules, and evaluation",
    },
    {
      icon: ShieldCheck,
      title: "Human review and guardrails",
      description: "Permissions, approvals, fallback, and audit",
    },
    {
      icon: Gauge,
      title: "Measured outcome",
      description: "Quality, adoption, time, cost, and operational value",
    },
  ];

  return (
    <div className="relative rounded-[2rem] border border-white/[0.09] p-5 sm:p-7">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/60">
            Product architecture
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            Complete workflow, not an isolated model
          </p>
        </div>
        <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-emerald-200/60">
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          Review active
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <div key={node.title}>
              <div className="flex gap-4 rounded-2xl border border-white/[0.07] p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 text-cyan-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {node.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {node.description}
                  </p>
                </div>
              </div>
              {index < nodes.length - 1 && (
                <div className="flex h-5 justify-center">
                  <ChevronDown
                    className="h-4 w-4 text-cyan-300/40"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28 xl:px-16"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200/65 sm:text-[11px]">
            {eyebrow}
          </p>
          <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            {description}
          </p>
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function UseCaseRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-cyan-200/55">
        {label}
      </p>
      <p className="mt-2 text-sm leading-7 text-slate-400">{value}</p>
    </div>
  );
}

function QualificationCard({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: typeof CircleCheck;
  items: string[];
}) {
  return (
    <article className="rounded-[2rem] border border-white/[0.08] p-6 sm:p-8">
      <Icon className="h-6 w-6 text-cyan-300" aria-hidden="true" />
      <h3 className="mt-5 text-2xl font-bold tracking-[-0.035em]">{title}</h3>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-7 text-slate-400"
          >
            <Check
              className="mt-1.5 h-3.5 w-3.5 shrink-0 text-cyan-300"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function CaseStudyBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/60">
        {label}
      </p>
      <p className="mt-3 text-sm leading-7 text-slate-400">{value}</p>
    </div>
  );
}

function RhythmItem({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex gap-4">
      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border border-cyan-200/40 bg-cyan-300/20" />
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
      </div>
    </div>
  );
}

type FieldInputProps =
  | InputHTMLAttributes<HTMLInputElement>
  | SelectHTMLAttributes<HTMLSelectElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>;

function Field({
  label,
  required = false,
  error,
  input,
}: {
  label: string;
  required?: boolean;
  error?: string;
  input: ReactElement<FieldInputProps>;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-200">
        {label}
        {required && <span className="ml-1 text-cyan-300">*</span>}
      </label>
      <div className="mt-2">
        {cloneElement(input, {
          id,
          required,
          "aria-invalid": Boolean(error),
          "aria-describedby": error ? errorId : undefined,
        })}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-xs text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<[string, string]>;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <li key={`${title}-${label}`}>
            <Link
              href={href}
              className="text-sm text-slate-500 transition hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const fieldClassName =
  "min-h-12 w-full rounded-xl border border-white/[0.09] bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-300/35 focus:ring-2 focus:ring-cyan-300/10";