"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useCreateJobMutation,
  useDeleteJobMutation,
  useGetJobsByStatusQuery,
  useGetManagedJobByIdQuery,
  useUpdateJobMutation,
  useUpdateJobStatusMutation,
} from "@/src/lib/features/jobs/job-api";
import type {
  AdminJobDetail,
  EmploymentType,
  ExperienceLevel,
  JobStatus,
  JobUpdatePayload,
  JobWritePayload,
  ScreeningQuestionType,
  WorkplaceType,
} from "@/src/lib/features/jobs/job-types";
import {
  Button,
  Empty,
  ErrorNotice,
  Field,
  LoadingRows,
  Metric,
  Panel,
  PanelTitle,
  StatusBadge,
  SuccessNotice,
  formatDate,
  inputClass,
  splitLines,
  textareaClass,
} from "./admin-ui";

const statuses: JobStatus[] = ["Draft", "Published", "Paused", "Closed"];
const employmentTypes: EmploymentType[] = [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Internship",
  "Freelance",
];
const workplaceTypes: WorkplaceType[] = ["Remote", "Hybrid", "On-Site"];
const experienceLevels: ExperienceLevel[] = [
  "Fresher",
  "Junior",
  "Mid-Level",
  "Senior",
  "Lead",
];
const screeningTypes: ScreeningQuestionType[] = [
  "text",
  "textarea",
  "radio",
  "checkbox",
  "number",
];

type ScreeningForm = {
  question: string;
  type: ScreeningQuestionType;
  required: boolean;
  options: string;
};

function createDummyJobJson(): string {
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 30);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 45);

  return JSON.stringify(
    {
      title: "Senior Full Stack Developer",
      slug: "senior-full-stack-developer",
      department: "Engineering",
      employmentType: "Full-Time",
      workplaceType: "Hybrid",
      location: {
        country: "India",
        state: "Maharashtra",
        city: "Pune",
        address: "Hinjewadi Phase 1, Pune",
      },
      company: {
        name: "QuantumFinix",
        logo: "https://example.com/company-logo.png",
      },
      shortDescription:
        "Join our engineering team to build scalable web applications and modern digital products.",
      description:
        "We are looking for an experienced Full Stack Developer who can design, build, test and maintain reliable web applications. You will collaborate with designers, product managers and backend engineers to deliver high-quality customer experiences.",
      responsibilities: [
        "Develop and maintain frontend and backend applications",
        "Design secure and scalable APIs",
        "Review code and support engineering best practices",
        "Collaborate with product and design teams",
        "Troubleshoot production issues",
      ],
      requirements: [
        "Strong knowledge of TypeScript and JavaScript",
        "Experience with React and Next.js",
        "Experience with Node.js and Express",
        "Experience with MongoDB or another document database",
        "Good understanding of REST APIs and authentication",
      ],
      preferredQualifications: [
        "Experience with AWS or another cloud platform",
        "Experience with Docker and CI/CD pipelines",
        "Knowledge of automated testing",
      ],
      skills: [
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "MongoDB",
        "Git",
      ],
      experience: {
        level: "Senior",
        min: 5,
        max: 8,
      },
      salary: {
        min: 1800000,
        max: 2600000,
        currency: "INR",
        isNegotiable: true,
        hideSalary: false,
      },
      hiringStages: [
        {
          name: "Application Review",
          order: 0,
        },
        {
          name: "Technical Interview",
          order: 1,
        },
        {
          name: "Manager Interview",
          order: 2,
        },
        {
          name: "HR Discussion",
          order: 3,
        },
      ],
      benefits: [
        "Health insurance",
        "Paid time off",
        "Learning and development budget",
        "Provident fund",
      ],
      perks: [
        "Flexible working hours",
        "Hybrid work",
        "Modern equipment",
        "Team outings",
      ],
      applicationSettings: {
        deadline: deadline.toISOString(),
        vacancies: 3,
        allowReferral: true,
        externalApplyLink: "https://example.com/careers/apply",
      },
      screeningQuestions: [
        {
          question: "How many years of TypeScript experience do you have?",
          type: "number",
          required: true,
        },
        {
          question: "Describe one challenging project you worked on.",
          type: "textarea",
          required: true,
        },
        {
          question: "Which work arrangement do you prefer?",
          type: "radio",
          required: true,
          options: ["Remote", "Hybrid", "On-Site"],
        },
        {
          question: "Which technologies have you used professionally?",
          type: "checkbox",
          required: false,
          options: ["React", "Next.js", "Node.js", "MongoDB"],
        },
      ],
      seo: {
        title: "Senior Full Stack Developer Job",
        description:
          "Apply for the Senior Full Stack Developer role at QuantumFinix.",
      },
      isFeatured: true,
      isUrgentHiring: true,
      expiresAt: expiresAt.toISOString(),
    },
    null,
    2,
  );
}

const emptyForm = {
  title: "",
  slug: "",
  department: "",
  employmentType: "Full-Time" as EmploymentType,
  workplaceType: "Remote" as WorkplaceType,
  country: "India",
  state: "",
  city: "",
  address: "",
  companyId: "",
  companyName: "QuantumFinix",
  companyLogo: "",
  shortDescription: "",
  description: "",
  responsibilities: "",
  requirements: "",
  preferredQualifications: "",
  skills: "",
  experienceLevel: "Fresher" as ExperienceLevel,
  experienceMin: "0",
  experienceMax: "",
  salaryMin: "",
  salaryMax: "",
  currency: "INR",
  salaryNegotiable: false,
  hideSalary: false,
  hiringStages: "",
  benefits: "",
  perks: "",
  deadline: "",
  vacancies: "1",
  allowReferral: true,
  externalApplyLink: "",
  seoTitle: "",
  seoDescription: "",
  isFeatured: false,
  isUrgentHiring: false,
  expiresAt: "",
  screeningQuestions: [] as ScreeningForm[],
};

type JobFormState = typeof emptyForm;

export function JobsPanel({ basePath = "/dashboard/job" }: { basePath?: string } = {}) {
  const draft = useGetJobsByStatusQuery({
    status: "Draft",
    page: 1,
    limit: 100,
  });
  const published = useGetJobsByStatusQuery({
    status: "Published",
    page: 1,
    limit: 100,
  });
  const paused = useGetJobsByStatusQuery({
    status: "Paused",
    page: 1,
    limit: 100,
  });
  const closed = useGetJobsByStatusQuery({
    status: "Closed",
    page: 1,
    limit: 100,
  });
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [updateStatus, statusState] = useUpdateJobStatusMutation();
  const [deleteJob, deleteState] = useDeleteJobMutation();

  const jobs = useMemo(() => {
    const all = [draft, published, paused, closed].flatMap(
      (query) => query.data?.data.jobs ?? [],
    );

    return [...new Map(all.map((job) => [job.id, job])).values()].sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    );
  }, [closed.data, draft.data, paused.data, published.data]);

  const loading = [draft, published, paused, closed].some(
    (query) => query.isLoading,
  );
  const busy = statusState.isLoading || deleteState.isLoading;

  async function changeStatus(id: string, status: JobStatus) {
    setError("");
    setNotice("");

    try {
      await updateStatus({ id, status }).unwrap();
      setNotice(`Job moved to ${status}.`);
    } catch (caught) {
      setError(getApiErrorMessage(caught));
    }
  }

  async function remove(id: string) {
    if (
      !window.confirm(
        "Delete this job permanently? Jobs with applications must be closed instead.",
      )
    ) {
      return;
    }

    setError("");
    setNotice("");

    try {
      await deleteJob(id).unwrap();
      setNotice("Job deleted.");
    } catch (caught) {
      setError(getApiErrorMessage(caught));
    }
  }

  return (
    <section>
      <PageHeading
        eyebrow="Talent inventory"
        title="Jobs"
        description="Create and manage every role through dedicated Next.js routes."
        action={
          <Link
            href={`${basePath}/add`}
            className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950"
          >
            Create job
          </Link>
        }
      />

      <div className="space-y-5">
        {error ? <ErrorNotice message={error} /> : null}
        {notice ? <SuccessNotice message={notice} /> : null}

        <Panel>
          <PanelTitle eyebrow="Inventory" title="All managed jobs" />

          {loading ? (
            <LoadingRows />
          ) : jobs.length ? (
            <div className="max-h-[calc(100vh-260px)] overflow-auto rounded-2xl">
              <table className="w-full min-w-[980px] text-left text-sm">
                <thead className="sticky top-0 z-10 bg-[#07101f] text-[10px] uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Company</th>
                    <th className="pb-3">Location</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Created</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/8">
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td className="py-4">
                        <Link
                          href={`${basePath}/${job.id}`}
                          className="font-bold hover:text-cyan-300"
                        >
                          {job.title}
                        </Link>
                        <p className="mt-1 text-xs text-slate-500">
                          {job.department} · {job.employmentType}
                        </p>
                      </td>

                      <td className="py-4 text-slate-300">
                        {job.company.name}
                      </td>

                      <td className="py-4 text-slate-400">
                        {job.location.city} · {job.workplaceType}
                      </td>

                      <td className="py-4">
                        <StatusBadge value={job.status} />
                      </td>

                      <td className="py-4 text-xs text-slate-500">
                        {formatDate(job.createdAt)}
                      </td>

                      <td className="py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`${basePath}/${job.id}`}
                            className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold"
                          >
                            View
                          </Link>

                          <Link
                            href={`${basePath}/${job.id}/edit`}
                            className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-2 text-xs font-bold text-cyan-200"
                          >
                            Edit
                          </Link>

                          <select
                            value={job.status}
                            disabled={busy}
                            onChange={(event) =>
                              void changeStatus(
                                job.id,
                                event.target.value as JobStatus,
                              )
                            }
                            className="h-9 rounded-xl border border-white/10 bg-[#07101f] px-2 text-xs"
                          >
                            {statuses.map((status) => (
                              <option key={status}>{status}</option>
                            ))}
                          </select>

                          <Button
                            danger
                            disabled={busy}
                            onClick={() => void remove(job.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty
              title="No jobs yet"
              description="Create the first draft to begin publishing careers."
            />
          )}
        </Panel>
      </div>
    </section>
  );
}

export function JobEditor({ jobId, basePath = "/dashboard/job" }: { jobId?: string; basePath?: string }) {
  const router = useRouter();
  const detail = useGetManagedJobByIdQuery(jobId ?? "", {
    skip: !jobId,
  });
  const [form, setForm] = useState<JobFormState>(emptyForm);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [jsonText, setJsonText] = useState(() => createDummyJobJson());
  const [jsonError, setJsonError] = useState("");
  const [showJson, setShowJson] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const [createJob, createState] = useCreateJobMutation();
  const [updateJob, updateState] = useUpdateJobMutation();

  useEffect(() => {
    if (!detail.data?.data) return;

    const next = fromDetail(detail.data.data);
    setForm((current) =>
      current.slug === next.slug && current.title === next.title
        ? current
        : next,
    );
  }, [detail.data?.data]);

  const busy = createState.isLoading || updateState.isLoading;
  const sections = [
    ["identity", "Role & company"],
    ["location", "Location"],
    ["content", "Description"],
    ["compensation", "Experience & salary"],
    ["workflow", "Hiring workflow"],
  ] as const;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    try {
      const payload = buildPayload(form, Boolean(jobId));

      if (jobId) {
        await updateJob({
          id: jobId,
          body: payload as JobUpdatePayload,
        }).unwrap();
        setNotice("Job updated successfully.");
        router.replace(`${basePath}/${jobId}`);
      } else {
        const response = await createJob(payload).unwrap();
        setNotice("Job created as a draft.");
        router.replace(`${basePath}/${response.data.id}`);
      }
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : getApiErrorMessage(caught),
      );
    }
  }

  function patch(value: Partial<JobFormState>) {
    setForm((current) => ({ ...current, ...value }));
  }

  function updateQuestion(index: number, value: Partial<ScreeningForm>) {
    setForm((current) => ({
      ...current,
      screeningQuestions: current.screeningQuestions.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...value } : item,
      ),
    }));
  }

  function scrollTo(section: string) {
    document
      .getElementById(`job-${section}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function importJson(raw = jsonText) {
    setJsonError("");

    try {
      if (!raw.trim()) {
        throw new Error("Paste a JSON document before importing.");
      }

      const parsed = JSON.parse(raw) as unknown;
      const root = objectValue(parsed);

      if (Object.keys(root).length === 0) {
        throw new Error("The JSON root must be an object.");
      }

      const rootData = objectValue(root.data);
      const nestedJob = objectValue(rootData.job);

      const data =
        Object.keys(nestedJob).length > 0
          ? nestedJob
          : Object.keys(rootData).length > 0
            ? rootData
            : root;

      const location = objectValue(data.location);
      const company = objectValue(data.company);
      const salary = objectValue(data.salary);
      const exp = objectValue(data.experience);
      const settings = objectValue(data.applicationSettings);
      const seo = objectValue(data.seo);
      const questions = Array.isArray(data.screeningQuestions)
        ? data.screeningQuestions
        : [];

      const line = (value: unknown) => {
        if (Array.isArray(value)) {
          return value
            .map((item) => {
              if (typeof item === "string") return item;

              const object = objectValue(item);

              return typeof object.name === "string" ? object.name : "";
            })
            .filter(Boolean)
            .join("\n");
        }

        return typeof value === "string" ? value : "";
      };

      const string = (value: unknown, fallback = "") =>
        typeof value === "string" ? value : fallback;

      const number = (value: unknown, fallback = "") =>
        typeof value === "number" || typeof value === "string"
          ? String(value)
          : fallback;

      const bool = (value: unknown, fallback = false) =>
        typeof value === "boolean" ? value : fallback;

      setForm((current) => ({
        ...current,
        title: string(data.title, current.title),
        slug: string(data.slug, current.slug),
        department: string(data.department, current.department),
        employmentType: employmentTypes.includes(
          data.employmentType as EmploymentType,
        )
          ? (data.employmentType as EmploymentType)
          : current.employmentType,
        workplaceType: workplaceTypes.includes(
          data.workplaceType as WorkplaceType,
        )
          ? (data.workplaceType as WorkplaceType)
          : current.workplaceType,
        country: string(location.country, current.country),
        state: string(location.state, current.state),
        city: string(location.city, current.city),
        address: string(location.address, current.address),
        companyId: string(company.companyId ?? company.id, current.companyId),
        companyName: string(company.name, current.companyName),
        companyLogo: string(company.logo, current.companyLogo),
        shortDescription: string(
          data.shortDescription,
          current.shortDescription,
        ),
        description: string(data.description, current.description),
        responsibilities:
          line(data.responsibilities) || current.responsibilities,
        requirements: line(data.requirements) || current.requirements,
        preferredQualifications:
          line(data.preferredQualifications) ||
          current.preferredQualifications,
        skills: line(data.skills) || current.skills,
        experienceLevel: experienceLevels.includes(
          exp.level as ExperienceLevel,
        )
          ? (exp.level as ExperienceLevel)
          : current.experienceLevel,
        experienceMin: number(exp.min, current.experienceMin),
        experienceMax: number(exp.max, current.experienceMax),
        salaryMin: number(salary.min, current.salaryMin),
        salaryMax: number(salary.max, current.salaryMax),
        currency: string(salary.currency, current.currency).toUpperCase(),
        salaryNegotiable: bool(
          salary.isNegotiable,
          current.salaryNegotiable,
        ),
        hideSalary: bool(salary.hideSalary, current.hideSalary),
        hiringStages: Array.isArray(data.hiringStages)
          ? data.hiringStages
              .slice()
              .sort((first, second) => {
                const firstOrder = objectValue(first).order;
                const secondOrder = objectValue(second).order;

                return (
                  (typeof firstOrder === "number" ? firstOrder : 0) -
                  (typeof secondOrder === "number" ? secondOrder : 0)
                );
              })
              .map((item) =>
                typeof item === "string"
                  ? item
                  : string(objectValue(item).name),
              )
              .filter(Boolean)
              .join("\n")
          : current.hiringStages,
        benefits: line(data.benefits) || current.benefits,
        perks: line(data.perks) || current.perks,
        deadline: dateTimeInput(settings.deadline) || current.deadline,
        vacancies: number(settings.vacancies, current.vacancies),
        allowReferral: bool(settings.allowReferral, current.allowReferral),
        externalApplyLink: string(
          settings.externalApplyLink,
          current.externalApplyLink,
        ),
        seoTitle: string(seo.title, current.seoTitle),
        seoDescription: string(seo.description, current.seoDescription),
        isFeatured: bool(data.isFeatured, current.isFeatured),
        isUrgentHiring: bool(data.isUrgentHiring, current.isUrgentHiring),
        expiresAt: dateTimeInput(data.expiresAt) || current.expiresAt,
        screeningQuestions: questions
          .map((item) => {
            const question = objectValue(item);
            const type = screeningTypes.includes(
              question.type as ScreeningQuestionType,
            )
              ? (question.type as ScreeningQuestionType)
              : "text";

            return {
              question: string(question.question),
              type,
              required: bool(question.required),
              options: line(question.options),
            };
          })
          .filter((item) => item.question),
      }));

      setError("");
      setShowJson(false);
      setNotice(
        "Job JSON imported successfully. The complete form has been populated.",
      );
    } catch (caught) {
      setJsonError(
        caught instanceof Error ? caught.message : "Invalid JSON document.",
      );
    }
  }

  async function importFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setJsonText(text);
      importJson(text);
    } catch (caught) {
      setJsonError(
        caught instanceof Error
          ? caught.message
          : "Unable to read the selected JSON file.",
      );
      setShowJson(true);
    } finally {
      event.target.value = "";
    }
  }

  if (jobId && detail.isLoading) return <LoadingRows count={8} />;

  if (jobId && detail.error) {
    return <ErrorNotice message={getApiErrorMessage(detail.error)} />;
  }

  return (
    <section>
      <PageHeading
        eyebrow={jobId ? "Edit role" : "New role"}
        title={jobId ? "Update job details" : "Create a job draft"}
        description="Only the job title is mandatory. Add the remaining information when it is useful, or import a prepared JSON document."
        action={
          <Link
            href={jobId ? `${basePath}/${jobId}` : basePath}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold"
          >
            Cancel
          </Link>
        }
      />

      {error ? <ErrorNotice message={error} /> : null}
      {notice ? <SuccessNotice message={notice} /> : null}

      <input
        ref={fileInput}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(event) => void importFile(event)}
      />

      <div className="grid min-w-0 gap-6 xl:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="self-start xl:sticky xl:top-0">
          <Panel>
            <PanelTitle eyebrow="Form map" title="Job sections" />

            <nav className="space-y-1">
              {sections.map(([id, label], index) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollTo(id)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-400 transition hover:bg-white/[0.05] hover:text-cyan-200"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-lg border border-white/10 text-[10px] text-cyan-300">
                    {index + 1}
                  </span>
                  {label}
                </button>
              ))}
            </nav>

            <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
              <Button
                type="button"
                secondary
                className="w-full"
                onClick={() => fileInput.current?.click()}
              >
                Import JSON file
              </Button>

              <Button
                type="button"
                secondary
                className="w-full"
                onClick={() => {
                  setJsonError("");
                  setShowJson((value) => !value);
                }}
              >
                {showJson ? "Hide JSON importer" : "Paste JSON"}
              </Button>

              <Button
                type="button"
                secondary
                className="w-full"
                onClick={() => {
                  const example = createDummyJobJson();
                  setJsonText(example);
                  importJson(example);
                }}
              >
                Autofill example job
              </Button>
            </div>

            {showJson ? (
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.04] p-3">
                  <p className="text-xs font-bold text-cyan-200">
                    JSON reference
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Edit the example below or replace it with your own JSON.
                    Press Autofill form to populate every matching field.
                  </p>
                </div>

                <textarea
                  rows={18}
                  value={jsonText}
                  onChange={(event) => {
                    setJsonText(event.target.value);
                    if (jsonError) setJsonError("");
                  }}
                  className={`${textareaClass} font-mono text-xs leading-5`}
                  spellCheck={false}
                  placeholder='{"title":"Senior Engineer"}'
                />

                {jsonError ? (
                  <p className="rounded-lg border border-rose-400/20 bg-rose-400/[0.06] px-3 py-2 text-xs text-rose-300">
                    {jsonError}
                  </p>
                ) : null}

                <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => importJson()}
                  >
                    Autofill form
                  </Button>

                  <Button
                    type="button"
                    secondary
                    className="w-full"
                    onClick={() => {
                      setJsonError("");
                      setJsonText(createDummyJobJson());
                    }}
                  >
                    Reset example JSON
                  </Button>
                </div>
              </div>
            ) : null}
          </Panel>
        </aside>

        <form onSubmit={submit} className="min-w-0 space-y-6">
          <div id="job-identity" className="scroll-mt-4">
            <Panel>
              <PanelTitle eyebrow="Identity" title="Role and company" />

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <TextField
                  label="Title"
                  value={form.title}
                  set={(value) => patch({ title: value })}
                  required
                />
                <TextField
                  label="Slug (optional)"
                  value={form.slug}
                  set={(value) => patch({ slug: value })}
                />
                <TextField
                  label="Department (optional)"
                  value={form.department}
                  set={(value) => patch({ department: value })}
                />
                <Select
                  label="Employment type"
                  value={form.employmentType}
                  values={employmentTypes}
                  set={(value) =>
                    patch({ employmentType: value as EmploymentType })
                  }
                />
                <Select
                  label="Workplace type"
                  value={form.workplaceType}
                  values={workplaceTypes}
                  set={(value) =>
                    patch({ workplaceType: value as WorkplaceType })
                  }
                />
                <Select
                  label="Experience level"
                  value={form.experienceLevel}
                  values={experienceLevels}
                  set={(value) =>
                    patch({ experienceLevel: value as ExperienceLevel })
                  }
                />
                <TextField
                  label="Company name (optional)"
                  value={form.companyName}
                  set={(value) => patch({ companyName: value })}
                />
                <TextField
                  label="Company ObjectId (optional)"
                  value={form.companyId}
                  set={(value) => patch({ companyId: value })}
                />
                <TextField
                  label="Company logo URL (optional)"
                  value={form.companyLogo}
                  set={(value) => patch({ companyLogo: value })}
                  type="url"
                />
              </div>
            </Panel>
          </div>

          <div id="job-location" className="scroll-mt-4">
            <Panel>
              <PanelTitle eyebrow="Location" title="Work location" />

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <TextField
                  label="Country (optional)"
                  value={form.country}
                  set={(value) => patch({ country: value })}
                />
                <TextField
                  label="State (optional)"
                  value={form.state}
                  set={(value) => patch({ state: value })}
                />
                <TextField
                  label="City (optional)"
                  value={form.city}
                  set={(value) => patch({ city: value })}
                />
                <TextField
                  label="Address (optional)"
                  value={form.address}
                  set={(value) => patch({ address: value })}
                />
              </div>
            </Panel>
          </div>

          <div id="job-content" className="scroll-mt-4">
            <Panel>
              <PanelTitle eyebrow="Content" title="Role description" />

              <div className="grid gap-4 md:grid-cols-2">
                <Area
                  label="Short description (optional)"
                  value={form.shortDescription}
                  set={(value) => patch({ shortDescription: value })}
                  rows={4}
                />
                <Area
                  label="Full description (optional)"
                  value={form.description}
                  set={(value) => patch({ description: value })}
                  rows={4}
                />
                <Area
                  label="Responsibilities (one per line, optional)"
                  value={form.responsibilities}
                  set={(value) => patch({ responsibilities: value })}
                />
                <Area
                  label="Requirements (one per line, optional)"
                  value={form.requirements}
                  set={(value) => patch({ requirements: value })}
                />
                <Area
                  label="Preferred qualifications (optional)"
                  value={form.preferredQualifications}
                  set={(value) => patch({ preferredQualifications: value })}
                />
                <Area
                  label="Skills (one per line, optional)"
                  value={form.skills}
                  set={(value) => patch({ skills: value })}
                />
              </div>
            </Panel>
          </div>

          <div id="job-compensation" className="scroll-mt-4">
            <Panel>
              <PanelTitle
                eyebrow="Compensation"
                title="Experience, salary and dates"
              />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <TextField
                  label="Minimum experience"
                  value={form.experienceMin}
                  set={(value) => patch({ experienceMin: value })}
                  type="number"
                />
                <TextField
                  label="Maximum experience (optional)"
                  value={form.experienceMax}
                  set={(value) => patch({ experienceMax: value })}
                  type="number"
                />
                <TextField
                  label="Minimum salary (optional)"
                  value={form.salaryMin}
                  set={(value) => patch({ salaryMin: value })}
                  type="number"
                />
                <TextField
                  label="Maximum salary (optional)"
                  value={form.salaryMax}
                  set={(value) => patch({ salaryMax: value })}
                  type="number"
                />
                <TextField
                  label="Currency"
                  value={form.currency}
                  set={(value) => patch({ currency: value.toUpperCase() })}
                />
                <TextField
                  label="Vacancies"
                  value={form.vacancies}
                  set={(value) => patch({ vacancies: value })}
                  type="number"
                />
                <TextField
                  label="Application deadline (optional)"
                  value={form.deadline}
                  set={(value) => patch({ deadline: value })}
                  type="datetime-local"
                />
                <TextField
                  label="Expiry date (optional)"
                  value={form.expiresAt}
                  set={(value) => patch({ expiresAt: value })}
                  type="datetime-local"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-5">
                <Check
                  label="Negotiable salary"
                  checked={form.salaryNegotiable}
                  set={(value) => patch({ salaryNegotiable: value })}
                />
                <Check
                  label="Hide salary"
                  checked={form.hideSalary}
                  set={(value) => patch({ hideSalary: value })}
                />
                <Check
                  label="Allow referral"
                  checked={form.allowReferral}
                  set={(value) => patch({ allowReferral: value })}
                />
                <Check
                  label="Featured"
                  checked={form.isFeatured}
                  set={(value) => patch({ isFeatured: value })}
                />
                <Check
                  label="Urgent hiring"
                  checked={form.isUrgentHiring}
                  set={(value) => patch({ isUrgentHiring: value })}
                />
              </div>
            </Panel>
          </div>

          <div id="job-workflow" className="scroll-mt-4">
            <Panel>
              <PanelTitle
                eyebrow="Workflow"
                title="Hiring, benefits and screening"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <Area
                  label="Hiring stages (one per line, optional)"
                  value={form.hiringStages}
                  set={(value) => patch({ hiringStages: value })}
                />
                <TextField
                  label="External apply URL (optional)"
                  value={form.externalApplyLink}
                  set={(value) => patch({ externalApplyLink: value })}
                  type="url"
                />
                <Area
                  label="Benefits (one per line)"
                  value={form.benefits}
                  set={(value) => patch({ benefits: value })}
                />
                <Area
                  label="Perks (one per line)"
                  value={form.perks}
                  set={(value) => patch({ perks: value })}
                />
                <TextField
                  label="SEO title"
                  value={form.seoTitle}
                  set={(value) => patch({ seoTitle: value })}
                />
                <Area
                  label="SEO description"
                  value={form.seoDescription}
                  set={(value) => patch({ seoDescription: value })}
                  rows={3}
                />
              </div>

              <div className="mt-7 border-t border-white/10 pt-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-black">Screening questions</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Optional questions rendered on the candidate application
                      route.
                    </p>
                  </div>

                  <Button
                    type="button"
                    secondary
                    onClick={() =>
                      patch({
                        screeningQuestions: [
                          ...form.screeningQuestions,
                          {
                            question: "",
                            type: "text",
                            required: false,
                            options: "",
                          },
                        ],
                      })
                    }
                  >
                    Add question
                  </Button>
                </div>

                <div className="mt-4 space-y-4">
                  {form.screeningQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="grid gap-4 md:grid-cols-[1fr_180px_140px_auto]">
                        <TextField
                          label={`Question ${index + 1}`}
                          value={question.question}
                          set={(value) =>
                            updateQuestion(index, { question: value })
                          }
                        />
                        <Select
                          label="Type"
                          value={question.type}
                          values={screeningTypes}
                          set={(value) =>
                            updateQuestion(index, {
                              type: value as ScreeningQuestionType,
                            })
                          }
                        />
                        <div className="flex items-end pb-3">
                          <Check
                            label="Required"
                            checked={question.required}
                            set={(value) =>
                              updateQuestion(index, { required: value })
                            }
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            type="button"
                            danger
                            onClick={() =>
                              patch({
                                screeningQuestions:
                                  form.screeningQuestions.filter(
                                    (_, itemIndex) => itemIndex !== index,
                                  ),
                              })
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      </div>

                      {question.type === "radio" ||
                      question.type === "checkbox" ? (
                        <div className="mt-4">
                          <Area
                            label="Options (one per line)"
                            value={question.options}
                            set={(value) =>
                              updateQuestion(index, { options: value })
                            }
                            rows={3}
                          />
                        </div>
                      ) : null}
                    </div>
                  ))}

                  {!form.screeningQuestions.length ? (
                    <p className="text-sm text-slate-500">
                      No screening questions configured.
                    </p>
                  ) : null}
                </div>
              </div>
            </Panel>
          </div>

          <div className="sticky bottom-0 z-20 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-[#030712]/92 p-4 shadow-2xl backdrop-blur-xl">
            <Button type="submit" disabled={busy}>
              {busy ? "Saving…" : jobId ? "Save changes" : "Create draft"}
            </Button>
            <Link
              href={jobId ? `${basePath}/${jobId}` : basePath}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-bold"
            >
              Cancel
            </Link>
            <span className="ml-auto text-xs text-slate-500">
              Only title is required
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}

function objectValue(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function dateTimeInput(value: unknown): string {
  if (!(value instanceof Date) && (typeof value !== "string" || !value)) {
    return "";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const timezoneOffset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
}

export function JobAdminDetail({ jobId, basePath = "/dashboard/job" }: { jobId: string; basePath?: string }) {
  const job = useGetManagedJobByIdQuery(jobId);
  const [updateStatus, statusState] = useUpdateJobStatusMutation();
  const [deleteJob, deleteState] = useDeleteJobMutation();
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  if (job.isLoading) return <LoadingRows count={8} />;

  if (job.error || !job.data?.data) {
    return (
      <ErrorNotice
        message={getApiErrorMessage(job.error ?? "Job not found")}
      />
    );
  }

  const data = job.data.data;
  const busy = statusState.isLoading || deleteState.isLoading;

  async function changeStatus(status: JobStatus) {
    setError("");
    setNotice("");

    try {
      await updateStatus({ id: jobId, status }).unwrap();
      setNotice(`Job moved to ${status}.`);
    } catch (caught) {
      setError(getApiErrorMessage(caught));
    }
  }

  async function remove() {
    if (!window.confirm("Delete this job permanently?")) return;

    setError("");

    try {
      await deleteJob(jobId).unwrap();
      router.replace(basePath);
    } catch (caught) {
      setError(getApiErrorMessage(caught));
    }
  }

  return (
    <section>
      <PageHeading
        eyebrow={data.department}
        title={data.title}
        description={`${data.company.name} · ${data.location.city}, ${data.location.state} · ${data.workplaceType}`}
        action={
          <div className="flex gap-2">
            <Link
              href={`${basePath}/${jobId}/edit`}
              className="rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-black text-slate-950"
            >
              Edit job
            </Link>
            <Link
              href={basePath}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold"
            >
              Back
            </Link>
          </div>
        }
      />

      {error ? <ErrorNotice message={error} /> : null}
      {notice ? <SuccessNotice message={notice} /> : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Metric label="Views" value={data.analytics.views} />
        <Metric label="Applications" value={data.analytics.applications} />
        <Metric label="Shortlisted" value={data.analytics.shortlisted} />
        <Metric label="Rejected" value={data.analytics.rejected} />
        <Metric label="Hired" value={data.analytics.hired} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Panel>
          <PanelTitle eyebrow="Description" title="Role details" />
          <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
            {data.description}
          </p>
          <DetailList
            title="Responsibilities"
            values={data.responsibilities}
          />
          <DetailList title="Requirements" values={data.requirements} />
          <DetailList title="Skills" values={data.skills} />
          <DetailList
            title="Screening questions"
            values={data.screeningQuestions.map(
              (item) =>
                `${item.question} · ${item.type}${
                  item.required ? " · required" : ""
                }`,
            )}
          />
        </Panel>

        <div className="space-y-6">
          <Panel>
            <PanelTitle eyebrow="Status" title="Publishing controls" />
            <StatusBadge value={data.status} />
            <select
              value={data.status}
              disabled={busy}
              onChange={(event) =>
                void changeStatus(event.target.value as JobStatus)
              }
              className={`${inputClass} mt-4`}
            >
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <Button
              danger
              disabled={busy}
              onClick={() => void remove()}
              className="mt-4 w-full"
            >
              Delete job
            </Button>
          </Panel>

          <Panel>
            <PanelTitle eyebrow="Metadata" title="Job record" />
            <Info label="Job ID" value={data.id} />
            <Info label="Slug" value={data.slug} />
            <Info label="Created" value={formatDate(data.createdAt)} />
            <Info label="Updated" value={formatDate(data.updatedAt)} />
            <Info label="Recruiter" value={data.recruiterId} />
          </Panel>
        </div>
      </div>
    </section>
  );
}

function buildPayload(
  form: JobFormState,
  allowNulls: boolean,
): JobWritePayload {
  const title = form.title.trim();
  if (!title) throw new Error("Job title is required.");

  const responsibilities = splitLines(form.responsibilities);
  const requirements = splitLines(form.requirements);
  const skills = splitLines(form.skills);
  const stages = splitLines(form.hiringStages);
  const experienceMin = Math.max(0, Number(form.experienceMin || 0));
  const experienceMax = form.experienceMax.trim()
    ? Math.max(0, Number(form.experienceMax))
    : undefined;

  if (experienceMax !== undefined && experienceMax < experienceMin) {
    throw new Error("Maximum experience cannot be below minimum experience.");
  }

  if (
    form.salaryMin &&
    form.salaryMax &&
    Number(form.salaryMax) < Number(form.salaryMin)
  ) {
    throw new Error("Maximum salary cannot be below minimum salary.");
  }

  if (form.companyId && !/^[0-9a-f]{24}$/i.test(form.companyId)) {
    throw new Error(
      "Company ID must be a 24-character MongoDB ObjectId when supplied.",
    );
  }

  const iso = (value: string, label: string) => {
    if (!value) return undefined;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      throw new Error(`${label} is not a valid date/time.`);
    }
    return date.toISOString();
  };

  const deadline = iso(form.deadline, "Application deadline");
  const expiresAt = iso(form.expiresAt, "Job expiry date");

  if (deadline && expiresAt && new Date(deadline) > new Date(expiresAt)) {
    throw new Error("Application deadline cannot be later than the job expiry date.");
  }

  const now = Date.now();
  if (deadline && new Date(deadline).getTime() <= now) {
    throw new Error("Application deadline must be in the future.");
  }
  if (expiresAt && new Date(expiresAt).getTime() <= now) {
    throw new Error("Job expiry date must be in the future.");
  }

  const screeningQuestions = form.screeningQuestions
    .filter((item) => item.question.trim())
    .map((item) => {
      const options = splitLines(item.options);

      if (
        (item.type === "radio" || item.type === "checkbox") &&
        options.length < 2
      ) {
        throw new Error(
          `Question “${item.question}” needs at least two options.`,
        );
      }

      return {
        question: item.question.trim(),
        type: item.type,
        required: item.required,
        ...(item.type === "radio" || item.type === "checkbox"
          ? { options }
          : {}),
      };
    });

  const shortDescription =
    form.shortDescription.trim() ||
    form.description.trim().slice(0, 500) ||
    title;
  const description = form.description.trim() || shortDescription;

  return {
    title,
    ...(form.slug.trim()
      ? { slug: form.slug.trim().toLowerCase() }
      : {}),
    department: form.department.trim() || "General",
    employmentType: form.employmentType,
    workplaceType: form.workplaceType,
    location: {
      country: form.country.trim() || "India",
      state: form.state.trim() || "Not specified",
      city:
        form.city.trim() ||
        (form.workplaceType === "Remote" ? "Remote" : "Not specified"),
      ...(form.address.trim() ? { address: form.address.trim() } : {}),
    },
    company: {
      ...(form.companyId.trim()
        ? { companyId: form.companyId.trim() }
        : {}),
      name: form.companyName.trim() || "QuantumFinix",
      ...(form.companyLogo.trim()
        ? { logo: form.companyLogo.trim() }
        : {}),
    },
    shortDescription,
    description,
    responsibilities,
    requirements,
    preferredQualifications: splitLines(form.preferredQualifications),
    skills,
    experience: {
      level: form.experienceLevel,
      min: experienceMin,
      ...(experienceMax !== undefined ? { max: experienceMax } : {}),
    },
    ...(form.salaryMin ||
    form.salaryMax ||
    form.salaryNegotiable ||
    form.hideSalary
      ? {
          salary: {
            ...(form.salaryMin ? { min: Number(form.salaryMin) } : {}),
            ...(form.salaryMax ? { max: Number(form.salaryMax) } : {}),
            currency: form.currency || "INR",
            isNegotiable: form.salaryNegotiable,
            hideSalary: form.hideSalary,
          },
        }
      : allowNulls
        ? { salary: null }
        : {}),
    hiringStages: stages.map((name, order) => ({ name, order })),
    benefits: splitLines(form.benefits),
    perks: splitLines(form.perks),
    applicationSettings: {
      ...(deadline ? { deadline } : {}),
      vacancies: Math.max(1, Number(form.vacancies || 1)),
      allowReferral: form.allowReferral,
      ...(form.externalApplyLink.trim()
        ? { externalApplyLink: form.externalApplyLink.trim() }
        : {}),
    },
    screeningQuestions,
    ...(form.seoTitle.trim() || form.seoDescription.trim()
      ? {
          seo: {
            ...(form.seoTitle.trim()
              ? { title: form.seoTitle.trim() }
              : {}),
            ...(form.seoDescription.trim()
              ? { description: form.seoDescription.trim() }
              : {}),
          },
        }
      : allowNulls
        ? { seo: null }
        : {}),
    isFeatured: form.isFeatured,
    isUrgentHiring: form.isUrgentHiring,
    ...(expiresAt
      ? { expiresAt }
      : allowNulls
        ? { expiresAt: null }
        : {}),
  };
}

function fromDetail(job: AdminJobDetail): JobFormState {
  const local = (value?: string) =>
    value ? dateTimeInput(value) : "";

  return {
    ...emptyForm,
    title: job.title,
    slug: job.slug,
    department: job.department,
    employmentType: job.employmentType,
    workplaceType: job.workplaceType,
    country: job.location.country,
    state: job.location.state,
    city: job.location.city,
    address: job.location.address ?? "",
    companyId: job.company.id,
    companyName: job.company.name,
    companyLogo: job.company.logo ?? "",
    shortDescription: job.shortDescription,
    description: job.description,
    responsibilities: job.responsibilities.join("\n"),
    requirements: job.requirements.join("\n"),
    preferredQualifications: job.preferredQualifications.join("\n"),
    skills: job.skills.join("\n"),
    experienceLevel: job.experience.level,
    experienceMin: String(job.experience.min),
    experienceMax:
      job.experience.max != null ? String(job.experience.max) : "",
    salaryMin: job.salary?.min?.toString() ?? "",
    salaryMax: job.salary?.max?.toString() ?? "",
    currency: job.salary?.currency ?? "INR",
    salaryNegotiable: job.salary?.isNegotiable ?? false,
    hideSalary: job.salary?.hideSalary ?? false,
    hiringStages: job.hiringStages
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((item) => item.name)
      .join("\n"),
    benefits: job.benefits.join("\n"),
    perks: job.perks.join("\n"),
    deadline: local(job.applicationSettings?.deadline),
    vacancies: String(job.applicationSettings?.vacancies ?? 1),
    allowReferral: job.applicationSettings?.allowReferral ?? true,
    externalApplyLink: job.applicationSettings?.externalApplyLink ?? "",
    seoTitle: job.seo?.title ?? "",
    seoDescription: job.seo?.description ?? "",
    isFeatured: job.isFeatured,
    isUrgentHiring: job.isUrgentHiring,
    expiresAt: local(job.expiresAt),
    screeningQuestions: job.screeningQuestions.map((item) => ({
      question: item.question,
      type: item.type,
      required: item.required,
      options: (item.options ?? []).join("\n"),
    })),
  };
}

function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

function TextField({
  label,
  value,
  set,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  set: (value: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <Field label={label}>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => set(event.target.value)}
        className={inputClass}
      />
    </Field>
  );
}

function Select({
  label,
  value,
  values,
  set,
}: {
  label: string;
  value: string;
  values: readonly string[];
  set: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <select
        value={value}
        onChange={(event) => set(event.target.value)}
        className={inputClass}
      >
        {values.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </Field>
  );
}

function Area({
  label,
  value,
  set,
  rows = 5,
}: {
  label: string;
  value: string;
  set: (value: string) => void;
  rows?: number;
}) {
  return (
    <Field label={label}>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => set(event.target.value)}
        className={textareaClass}
      />
    </Field>
  );
}

function Check({
  label,
  checked,
  set,
}: {
  label: string;
  checked: boolean;
  set: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-bold text-slate-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => set(event.target.checked)}
        className="h-4 w-4 accent-cyan-300"
      />
      {label}
    </label>
  );
}

function DetailList({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="mt-7">
      <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300">
        {title}
      </h3>

      {values.length ? (
        <ul className="mt-3 space-y-2">
          {values.map((value, index) => (
            <li
              key={`${title}-${index}`}
              className="rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-sm leading-6 text-slate-300"
            >
              {value}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-slate-500">No data.</p>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/8 py-3 last:border-0">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-all text-sm font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
}