"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useGetMyJobApplicationQuery,
  useGetOwnJobApplicationQuery,
  useUpdateOwnJobApplicationMutation,
  useWithdrawOwnJobApplicationMutation,
} from "@/src/lib/features/job-applications/job-application-api";
import type {
  ApplicationEducation,
  ApplicationExperience,
  ApplicationPersonalInfo,
  JobApplication,
  JobReference,
} from "@/src/lib/features/job-applications/job-application-types";
import { useGetJobByIdQuery } from "@/src/lib/features/jobs/job-api";
import { useGetMyHRInterviewsQuery, useSelectHRInterviewSlotMutation } from "@/src/lib/features/hr-management/hr-recruitment-api";
import type { HRInterview } from "@/src/lib/features/hr-management/hr-recruitment-types";

export function ProfileApplicationsList() {
  const [submissionNotice, setSubmissionNotice] = useState<{ submitted: boolean; emailQueued: boolean }>({ submitted: false, emailQueued: true });
  const query = useGetMyJobApplicationQuery(undefined, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSubmissionNotice({
      submitted: params.get("submitted") === "1",
      emailQueued: params.get("emailQueued") !== "0",
    });
  }, []);
  const applications = query.data?.data ?? [];

  if (query.isLoading) return <Loading />;
  if (query.error) return <ErrorState message={getApiErrorMessage(query.error)} retry={() => void query.refetch()} />;

  return (
    <div className="space-y-6">
      <Header
        eyebrow="Candidate workspace"
        title="My applications"
        description="Track every job application from its own detail route."
        action={<Link href="/job" className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950">Browse jobs</Link>}
      />
      {submissionNotice.submitted ? (
        <Notice tone="success">
          {submissionNotice.emailQueued
            ? "Application submitted successfully. A confirmation email was queued; if it is not in your inbox, check the spam or junk folder."
            : "Application submitted successfully. Your application is saved, but the confirmation email could not be queued."}
        </Notice>
      ) : null}
      {applications.length ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      ) : (
        <EmptyApplication />
      )}
    </div>
  );
}

export function ProfileApplicationDetail({ applicationId }: { applicationId: string }) {
  const router = useRouter();
  const query = useGetOwnJobApplicationQuery(applicationId, { refetchOnMountOrArgChange: true });
  const application = query.data?.data;
  const jobId = getJobId(application?.jobId);
  const jobQuery = useGetJobByIdQuery(jobId, { skip: !jobId });
  const [withdraw, withdrawState] = useWithdrawOwnJobApplicationMutation();
  const interviewQuery = useGetMyHRInterviewsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [selectInterviewSlot, selectSlotState] = useSelectHRInterviewSlotMutation();
  const [error, setError] = useState("");
  const [interviewNotice, setInterviewNotice] = useState("");

  async function withdrawApplication() {
    if (!application || !window.confirm("Withdraw this application? This cannot be undone.")) return;
    setError("");
    try {
      await withdraw(application.id).unwrap();
    } catch (reason) {
      setError(getApiErrorMessage(reason));
    }
  }

  if (query.isLoading) return <Loading />;
  if (query.error || !application) return <ErrorState message={getApiErrorMessage(query.error ?? "Application unavailable")} retry={() => void query.refetch()} />;

  const job = jobQuery.data?.data;
  const editable = application.status === "Applied";
  const withdrawable = !["Hired", "Rejected", "Withdrawn"].includes(application.status);
  const applicationInterviews = (interviewQuery.data?.data ?? []).filter((item) => item.applicationId === application.id);

  async function chooseInterviewSlot(interview: HRInterview, slot: string) {
    if (!window.confirm(`Confirm interview for ${formatInterviewDateTime(slot)}?`)) return;
    setError(""); setInterviewNotice("");
    try {
      await selectInterviewSlot({ id: interview.id, slot }).unwrap();
      setInterviewNotice("Interview time confirmed. Your meeting details are now available here and a confirmation email has been sent.");
    } catch (reason) { setError(getApiErrorMessage(reason)); }
  }

  return (
    <div className="space-y-6">
      <Header
        eyebrow="Application detail"
        title={job?.title ?? (populatedJobTitle(application.jobId) || "Job application")}
        description={`Applied ${formatDate(application.appliedAt)} · Application ${application.id}`}
        action={<div className="flex flex-wrap gap-2"><button onClick={() => void query.refetch()} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold">Refresh documents</button><Link href="/profile/applications" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold">Back</Link></div>}
      />
      {error ? <Notice tone="error">{error}</Notice> : null}
      {interviewNotice ? <Notice tone="success">{interviewNotice}</Notice> : null}
      <section className="rounded-3xl border border-cyan-300/15 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,.10),transparent_32%),rgba(255,255,255,.03)] p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Current stage</p><h2 className="mt-3 text-3xl font-black">{application.status}</h2></div>
          <StatusBadge value={application.status} />
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <Stat label="Applied" value={formatDate(application.appliedAt)} />
          <Stat label="Last updated" value={formatDate(application.updatedAt)} />
          <Stat label="Documents" value={String(Object.values(application.documents ?? {}).filter(Boolean).length)} />
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          {editable ? <Link href={`/profile/applications/${application.id}/edit`} className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950">Edit application</Link> : null}
          {withdrawable ? <button disabled={withdrawState.isLoading} onClick={() => void withdrawApplication()} className="rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-5 py-3 text-sm font-bold text-rose-200 disabled:opacity-50">{withdrawState.isLoading ? "Withdrawing…" : "Withdraw"}</button> : null}
          {job ? <Link href={`/job/${job.slug}`} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-bold">View job</Link> : null}
        </div>
      </section>

      {applicationInterviews.length ? <Section title="Interview scheduling & meeting details"><div className="space-y-4">{applicationInterviews.map((interview) => <CandidateInterviewCard key={interview.id} interview={interview} busy={selectSlotState.isLoading} choose={(slot) => void chooseInterviewSlot(interview, slot)} />)}</div></Section> : application.status === "Interview Scheduled" ? <Section title="Interview scheduling"><p className="text-sm leading-6 text-slate-400">HR is preparing your interview availability. Refresh this application when you receive the scheduling notification.</p></Section> : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <Section title="Personal information">
          <Line label="Name" value={`${application.personalInfo.firstName} ${application.personalInfo.lastName}`} />
          <Line label="Email" value={application.personalInfo.email} />
          <Line label="Phone" value={application.personalInfo.phoneNumber} />
          <Line label="Gender" value={application.personalInfo.gender} />
          <Line label="Date of birth" value={formatDate(application.personalInfo.dateOfBirth)} />
          <Line label="Location" value={application.personalInfo.currentLocation} />
        </Section>
        <Section title="Documents">
          <div className="space-y-3">
            {application.documents?.resume ? <DocumentLink label="Resume" href={application.documents.resume.url} name={application.documents.resume.originalName} /> : null}
            {application.documents?.photo ? <DocumentLink label="Photo" href={application.documents.photo.url} name={application.documents.photo.originalName} /> : null}
            {application.documents?.coverLetter ? <DocumentLink label="Cover letter" href={application.documents.coverLetter.url} name={application.documents.coverLetter.originalName} /> : null}
            {!application.documents ? <p className="text-sm text-slate-500">Open this page again or refresh document links.</p> : null}
          </div>
        </Section>
      </div>
      <Section title="Education"><Cards items={application.education.map((item) => ({ title: item.degree, subtitle: item.schoolOrUniversity, body: `${formatDate(item.startDate)} to ${formatDate(item.endDate)}${item.percentageOrCGPA ? ` · ${item.percentageOrCGPA}` : ""}` }))} /></Section>
      <Section title="Experience"><Cards items={application.experience.map((item) => ({ title: item.role, subtitle: item.companyName, body: item.responsibilities }))} empty="No professional experience was added." /></Section>
      {application.screeningAnswers?.length ? <Section title="Screening answers"><div className="space-y-3">{application.screeningAnswers.map((item) => <div key={item.question} className="rounded-2xl border border-white/8 bg-black/20 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{item.question}</p><p className="mt-2 text-sm text-slate-200">{Array.isArray(item.answer) ? item.answer.join(", ") : String(item.answer)}</p></div>)}</div></Section> : null}
      {application.recruiterNotes ? <Section title="Recruiter note"><p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">{application.recruiterNotes}</p></Section> : null}
    </div>
  );
}

export function ProfileApplicationEdit({ applicationId }: { applicationId: string }) {
  const router = useRouter();
  const query = useGetOwnJobApplicationQuery(applicationId);
  const application = query.data?.data;
  const [personal, setPersonal] = useState<Partial<ApplicationPersonalInfo>>({});
  const [education, setEducation] = useState<ApplicationEducation[]>([]);
  const [experience, setExperience] = useState<ApplicationExperience[]>([]);
  const [initialized, setInitialized] = useState("");
  const [error, setError] = useState("");
  const [update, updateState] = useUpdateOwnJobApplicationMutation();

  useEffect(() => {
    if (!application || initialized === application.id) return;
    setInitialized(application.id);
    setPersonal({ ...application.personalInfo, email: undefined });
    setEducation(application.education);
    setExperience(application.experience);
  }, [application, initialized]);

  const valid = useMemo(() => Boolean(
    personal.firstName?.trim() && personal.lastName?.trim() && personal.gender?.trim() &&
    personal.phoneNumber?.trim() && personal.dateOfBirth && personal.currentLocation?.trim() &&
    education.length && education.every((item) => item.schoolOrUniversity.trim() && item.degree.trim() && item.startDate && item.endDate),
  ), [education, personal]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!application || application.status !== "Applied" || !valid) return;
    setError("");
    try {
      await update({
        id: application.id,
        body: {
          personalInfo: {
            firstName: personal.firstName,
            lastName: personal.lastName,
            gender: personal.gender,
            phoneNumber: personal.phoneNumber,
            dateOfBirth: personal.dateOfBirth,
            currentLocation: personal.currentLocation,
          },
          education: education.map(cleanEducation),
          experience: experience.filter((item) => item.companyName.trim()).map(cleanExperience),
        },
      }).unwrap();
      router.replace(`/profile/applications/${application.id}`);
    } catch (reason) {
      setError(getApiErrorMessage(reason));
    }
  }

  if (query.isLoading) return <Loading />;
  if (query.error || !application) return <ErrorState message={getApiErrorMessage(query.error ?? "Application unavailable")} retry={() => void query.refetch()} />;
  if (application.status !== "Applied") return <ErrorState message="This application can no longer be edited because recruitment review has started." />;

  return (
    <form onSubmit={save} className="space-y-6">
      <Header eyebrow="Candidate workspace" title="Edit application" description="Application documents and screening answers cannot be changed after submission." action={<Link href={`/profile/applications/${application.id}`} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold">Cancel</Link>} />
      {error ? <Notice tone="error">{error}</Notice> : null}
      <Section title="Personal information"><div className="grid gap-4 md:grid-cols-2"><Input label="First name" value={personal.firstName ?? ""} set={(value) => setPersonal({ ...personal, firstName: value })} /><Input label="Last name" value={personal.lastName ?? ""} set={(value) => setPersonal({ ...personal, lastName: value })} /><Input label="Phone" value={personal.phoneNumber ?? ""} set={(value) => setPersonal({ ...personal, phoneNumber: value })} /><Input label="Gender" value={personal.gender ?? ""} set={(value) => setPersonal({ ...personal, gender: value })} /><Input label="Date of birth" type="date" value={dateInput(personal.dateOfBirth)} set={(value) => setPersonal({ ...personal, dateOfBirth: value })} /><Input label="Location" value={personal.currentLocation ?? ""} set={(value) => setPersonal({ ...personal, currentLocation: value })} /></div></Section>
      <CollectionEditor education={education} setEducation={setEducation} experience={experience} setExperience={setExperience} />
      <button type="submit" disabled={!valid || updateState.isLoading} className="rounded-xl bg-cyan-300 px-7 py-3.5 font-black text-slate-950 disabled:opacity-50">{updateState.isLoading ? "Saving…" : "Save application"}</button>
    </form>
  );
}

function ApplicationCard({ application }: { application: JobApplication }) {
  const title = populatedJobTitle(application.jobId) || "Job application";
  return <article className="flex min-h-56 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-300/25"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">{formatDate(application.appliedAt)}</p><h2 className="mt-3 text-xl font-black">{title}</h2></div><StatusBadge value={application.status} /></div><p className="mt-4 text-sm text-slate-500">Application {application.id}</p><div className="mt-auto pt-6"><Link href={`/profile/applications/${application.id}`} className="inline-flex rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950">Open application</Link></div></article>;
}
function Header({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) { return <header className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p><h1 className="mt-3 text-3xl font-black sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p></div>{action}</header>; }
function EmptyApplication() { return <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.025] p-10 text-center"><h2 className="text-2xl font-black">No applications submitted</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">Explore published jobs and submit an application. Every application will appear here.</p><Link href="/job" className="mt-6 inline-flex rounded-xl bg-cyan-300 px-6 py-3 font-black text-slate-950">Browse jobs</Link></div>; }
function Loading() { return <div className="space-y-4">{Array.from({ length: 4 }, (_, index) => <div key={index} className="h-32 animate-pulse rounded-3xl bg-white/[0.04]" />)}</div>; }
function ErrorState({ message, retry }: { message: string; retry?: () => void }) { return <div className="rounded-3xl border border-rose-300/20 bg-rose-300/[0.05] p-8 text-center"><h2 className="text-xl font-black">Unable to load application data</h2><p className="mx-auto mt-3 max-w-xl text-sm text-rose-100/80">{message}</p><div className="mt-5 flex justify-center gap-3">{retry ? <button onClick={retry} className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950">Retry</button> : null}<Link href="/profile/applications" className="rounded-xl border border-white/10 px-5 py-3 text-sm font-bold">Applications</Link></div></div>; }
function Notice({ children, tone }: { children: React.ReactNode; tone: "error" | "success" }) { return <div className={`rounded-2xl border px-5 py-4 text-sm ${tone === "error" ? "border-rose-300/20 bg-rose-300/[0.06] text-rose-100" : "border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-100"}`}>{children}</div>; }
function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"><h2 className="text-lg font-black">{title}</h2><div className="mt-4">{children}</div></section>; }
function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-white/8 bg-black/20 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 font-black">{value}</p></div>; }
function Line({ label, value }: { label: string; value?: string }) { return <div className="flex justify-between gap-4 border-b border-white/8 py-3 text-sm last:border-0"><span className="text-slate-500">{label}</span><span className="text-right font-semibold">{value || "—"}</span></div>; }
function StatusBadge({ value }: { value: string }) { return <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1.5 text-xs font-black text-cyan-200">{value}</span>; }
function DocumentLink({ label, href, name }: { label: string; href: string; name: string }) { return <a target="_blank" rel="noreferrer" href={href} className="flex items-center justify-between rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-sm transition hover:border-cyan-300/30"><span><strong>{label}</strong><span className="ml-2 text-slate-500">{name}</span></span><span className="text-cyan-300">Open</span></a>; }
function Cards({ items, empty = "No records available." }: { items: Array<{ title: string; subtitle: string; body: string }>; empty?: string }) { return items.length ? <div className="grid gap-3 md:grid-cols-2">{items.map((item, index) => <div key={`${item.title}-${index}`} className="rounded-2xl border border-white/8 bg-black/20 p-4"><h3 className="font-black">{item.title}</h3><p className="mt-1 text-sm text-cyan-200">{item.subtitle}</p><p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-400">{item.body}</p></div>)}</div> : <p className="text-sm text-slate-500">{empty}</p>; }
function Input({ label, value, set, type = "text" }: { label: string; value: string; set: (value: string) => void; type?: string }) { return <label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span><input required type={type} value={value} onChange={(event) => set(event.target.value)} className="h-11 w-full rounded-xl border border-white/10 bg-[#07101f] px-3 text-sm outline-none focus:border-cyan-300/50" /></label>; }
function CollectionEditor({ education, setEducation, experience, setExperience }: { education: ApplicationEducation[]; setEducation: (value: ApplicationEducation[]) => void; experience: ApplicationExperience[]; setExperience: (value: ApplicationExperience[]) => void }) { return <div className="space-y-6"><Section title="Education"><div className="space-y-3">{education.map((item, index) => <div key={index} className="grid gap-3 rounded-2xl border border-white/8 p-4 md:grid-cols-2"><Input label="Institution" value={item.schoolOrUniversity} set={(value) => setEducation(education.map((entry, i) => i === index ? { ...entry, schoolOrUniversity: value } : entry))} /><Input label="Degree" value={item.degree} set={(value) => setEducation(education.map((entry, i) => i === index ? { ...entry, degree: value } : entry))} /><Input label="Start" type="date" value={dateInput(item.startDate)} set={(value) => setEducation(education.map((entry, i) => i === index ? { ...entry, startDate: value } : entry))} /><Input label="End" type="date" value={dateInput(item.endDate)} set={(value) => setEducation(education.map((entry, i) => i === index ? { ...entry, endDate: value } : entry))} /><button type="button" onClick={() => setEducation(education.filter((_, i) => i !== index))} disabled={education.length === 1} className="text-left text-xs font-bold text-rose-300 disabled:opacity-30">Remove education</button></div>)}</div><button type="button" onClick={() => setEducation([...education, { schoolOrUniversity: "", degree: "", startDate: "", endDate: "" }])} className="mt-4 text-sm font-bold text-cyan-300">+ Add education</button></Section><Section title="Experience"><div className="space-y-3">{experience.map((item, index) => <div key={index} className="grid gap-3 rounded-2xl border border-white/8 p-4 md:grid-cols-2"><Input label="Company" value={item.companyName} set={(value) => setExperience(experience.map((entry, i) => i === index ? { ...entry, companyName: value } : entry))} /><Input label="Role" value={item.role} set={(value) => setExperience(experience.map((entry, i) => i === index ? { ...entry, role: value } : entry))} /><Input label="Start" type="date" value={dateInput(item.startDate)} set={(value) => setExperience(experience.map((entry, i) => i === index ? { ...entry, startDate: value } : entry))} /><Input label="End" type="date" value={dateInput(item.endDate)} set={(value) => setExperience(experience.map((entry, i) => i === index ? { ...entry, endDate: value || undefined } : entry))} /><label className="md:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Responsibilities</span><textarea required rows={3} value={item.responsibilities} onChange={(event) => setExperience(experience.map((entry, i) => i === index ? { ...entry, responsibilities: event.target.value } : entry))} className="w-full rounded-xl border border-white/10 bg-[#07101f] px-3 py-3 text-sm outline-none" /></label><button type="button" onClick={() => setExperience(experience.filter((_, i) => i !== index))} className="text-left text-xs font-bold text-rose-300">Remove experience</button></div>)}</div><button type="button" onClick={() => setExperience([...experience, { companyName: "", role: "", responsibilities: "", startDate: "" }])} className="mt-4 text-sm font-bold text-cyan-300">+ Add experience</button></Section></div>; }
function CandidateInterviewCard({ interview, busy, choose }: { interview: HRInterview; busy: boolean; choose: (slot: string) => void }) {
  const slots = interview.availableSlots ?? [];
  return <div className="rounded-2xl border border-white/10 bg-black/20 p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[.16em] text-cyan-300">{interview.roundName}</p><h3 className="mt-2 text-lg font-black">{interview.status === "awaiting-candidate" ? "Choose your interview time" : interview.status === "scheduled" ? "Interview confirmed" : interview.status === "completed" ? "Interview completed" : "Interview update"}</h3></div><StatusBadge value={interview.status}/></div>{interview.status === "awaiting-candidate" ? <><p className="mt-4 text-sm leading-6 text-slate-400">Choose one available slot below. HR has restricted the date range, weekdays, time window and interviewer availability.</p>{slots.length ? <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{slots.slice(0, 60).map((slot) => <button type="button" disabled={busy} onClick={() => choose(slot)} key={slot} className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-3 text-left text-xs font-bold text-cyan-100 transition hover:border-cyan-300/50 disabled:opacity-50">{formatInterviewDateTime(slot)}</button>)}</div> : <p className="mt-4 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] px-4 py-3 text-sm text-amber-100">No open slots are currently available. HR may update the availability window.</p>}</> : <div className="mt-4 grid gap-3 sm:grid-cols-2"><Stat label="Date & time" value={formatInterviewDateTime(interview.scheduledAt)} /><Stat label="Mode" value={interview.mode} />{interview.location ? <Stat label="Location" value={interview.location}/> : null}{interview.meetingUrl ? <a href={interview.meetingUrl} target="_blank" rel="noreferrer" className="rounded-2xl border border-cyan-300/20 bg-cyan-300 px-4 py-4 text-center text-sm font-black text-slate-950">Open interview meeting</a> : <Stat label="Meeting link" value="HR will add it before the interview"/>}</div>}</div>;
}
function formatInterviewDateTime(value?: string) { if (!value) return "—"; const date = new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }); }

function getJobId(job?: JobReference): string { if (!job) return ""; if (typeof job === "string") return job; return job.id ?? job._id ?? ""; }
function populatedJobTitle(job?: JobReference): string { return job && typeof job !== "string" ? job.title ?? "" : ""; }
function dateInput(value?: string) { return value ? new Date(value).toISOString().slice(0, 10) : ""; }
function formatDate(value?: string) { if (!value) return "—"; const date = new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString(); }
function cleanEducation(value: ApplicationEducation): ApplicationEducation { return { ...value, ...(value.percentageOrCGPA?.trim() ? {} : { percentageOrCGPA: undefined }) }; }
function cleanExperience(value: ApplicationExperience): ApplicationExperience { return { ...value, ...(value.endDate ? {} : { endDate: undefined }), ...(value.currentSalary != null ? {} : { currentSalary: undefined }), ...(value.expectedSalary != null ? {} : { expectedSalary: undefined }) }; }
