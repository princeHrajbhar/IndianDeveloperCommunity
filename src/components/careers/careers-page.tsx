"use client";

import Link from "next/link";
import { BriefcaseBusiness, Building2, MapPin, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useGetFeaturedJobsQuery, useGetJobsQuery, useGetUrgentJobsQuery } from "@/src/lib/features/jobs/job-api";
import type { EmploymentType, JobListItem, WorkplaceType } from "@/src/lib/features/jobs/job-types";

const employmentTypes: Array<EmploymentType | ""> = ["", "Full-Time", "Part-Time", "Contract", "Internship", "Freelance"];
const workplaceTypes: Array<WorkplaceType | ""> = ["", "Remote", "Hybrid", "On-Site"];

export function CareersPage() {
  const [search, setSearch] = useState("");
  const [employmentType, setEmploymentType] = useState<EmploymentType | "">("");
  const [workplaceType, setWorkplaceType] = useState<WorkplaceType | "">("");
  const [page, setPage] = useState(1);
  const params = useMemo(() => ({
    page,
    limit: 9,
    ...(search.trim() ? { search: search.trim() } : {}),
    ...(employmentType ? { employmentType } : {}),
    ...(workplaceType ? { workplaceType } : {}),
  }), [employmentType, page, search, workplaceType]);

  const jobs = useGetJobsQuery(params);
  const featured = useGetFeaturedJobsQuery(3);
  const urgent = useGetUrgentJobsQuery(3);
  const items = jobs.data?.data.jobs ?? [];
  const pagination = jobs.data?.data.pagination;

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-16 pt-32 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,.14),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(59,130,246,.12),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200"><Sparkles size={15} /> Build meaningful systems</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">Careers for people who turn ambitious ideas into <span className="text-cyan-300">working products.</span></h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">Explore open roles across engineering, AI, product, operations, and research. Every published opportunity below is loaded directly from our recruitment API.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        {(featured.data?.data.length || urgent.data?.data.length) ? (
          <div className="mb-12 grid gap-5 lg:grid-cols-2">
            <HighlightBlock title="Featured opportunities" jobs={featured.data?.data ?? []} />
            <HighlightBlock title="Urgent hiring" jobs={urgent.data?.data ?? []} urgent />
          </div>
        ) : null}

        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_220px_220px]">
            <label className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search roles, skills or departments" className="h-12 w-full rounded-xl border border-white/10 bg-[#07101f] pl-11 pr-4 text-sm outline-none transition focus:border-cyan-300/50" />
            </label>
            <select value={employmentType} onChange={(event) => { setEmploymentType(event.target.value as EmploymentType | ""); setPage(1); }} className="h-12 rounded-xl border border-white/10 bg-[#07101f] px-4 text-sm outline-none focus:border-cyan-300/50">
              {employmentTypes.map((value) => <option key={value || "all"} value={value}>{value || "All employment types"}</option>)}
            </select>
            <select value={workplaceType} onChange={(event) => { setWorkplaceType(event.target.value as WorkplaceType | ""); setPage(1); }} className="h-12 rounded-xl border border-white/10 bg-[#07101f] px-4 text-sm outline-none focus:border-cyan-300/50">
              {workplaceTypes.map((value) => <option key={value || "all"} value={value}>{value || "All workplace types"}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Open positions</p><h2 className="mt-2 text-3xl font-black">Find your next role</h2></div>
          {pagination ? <p className="text-sm text-slate-500">{pagination.totalItems} role{pagination.totalItems === 1 ? "" : "s"}</p> : null}
        </div>

        {jobs.isLoading || jobs.isFetching && !jobs.data ? <JobGridSkeleton /> : jobs.error ? (
          <EmptyState title="Jobs are temporarily unavailable" description="The careers API could not be reached. Please try again shortly." />
        ) : items.length ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{items.map((job) => <JobCard key={job.id} job={job} />)}</div>
        ) : <EmptyState title="No matching roles" description="Try removing a filter or using a broader search term." />}

        {pagination && pagination.totalPages > 1 ? (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button disabled={!pagination.hasPrevPage} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold disabled:opacity-40">Previous</button>
            <span className="text-sm text-slate-400">Page {pagination.currentPage} of {pagination.totalPages}</span>
            <button disabled={!pagination.hasNextPage} onClick={() => setPage((value) => value + 1)} className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 disabled:opacity-40">Next</button>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function HighlightBlock({ title, jobs, urgent = false }: { title: string; jobs: JobListItem[]; urgent?: boolean }) {
  if (!jobs.length) return null;
  return <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.055] to-transparent p-6"><p className={`text-xs font-bold uppercase tracking-[0.2em] ${urgent ? "text-amber-300" : "text-cyan-300"}`}>{title}</p><div className="mt-4 space-y-3">{jobs.map((job) => <Link key={job.id} href={`/job/${job.slug}`} className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-black/20 p-4 transition hover:border-cyan-300/30"><div><p className="font-bold">{job.title}</p><p className="mt-1 text-xs text-slate-500">{job.company.name} · {job.location.city}</p></div><span className="text-cyan-300">→</span></Link>)}</div></div>;
}

export function JobCard({ job }: { job: JobListItem }) {
  return <article className="group flex min-h-[320px] flex-col rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/[0.045]">
    <div className="flex items-start justify-between gap-4"><div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300"><BriefcaseBusiness size={22} /></div><div className="flex flex-wrap justify-end gap-2">{job.isFeatured ? <Badge>Featured</Badge> : null}{job.isUrgentHiring ? <Badge urgent>Urgent</Badge> : null}</div></div>
    <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">{job.department}</p><h3 className="mt-2 text-2xl font-black">{job.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{job.shortDescription}</p>
    <div className="mt-5 space-y-2 text-sm text-slate-400"><p className="flex items-center gap-2"><Building2 size={15} />{job.company.name}</p><p className="flex items-center gap-2"><MapPin size={15} />{job.location.city}, {job.location.state} · {job.workplaceType}</p></div>
    <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/8 pt-5"><div><p className="text-xs text-slate-500">{job.employmentType}</p><p className="mt-1 text-sm font-bold text-white">{formatSalary(job)}</p></div><Link href={`/job/${job.slug}`} className="rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-950">View role</Link></div>
  </article>;
}

function Badge({ children, urgent = false }: { children: React.ReactNode; urgent?: boolean }) { return <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${urgent ? "border-amber-300/20 bg-amber-300/10 text-amber-200" : "border-cyan-300/20 bg-cyan-300/10 text-cyan-200"}`}>{children}</span>; }
function formatSalary(job: JobListItem): string { if (job.salary.hideSalary) return "Salary disclosed later"; if (job.salary.isNegotiable && job.salary.min == null) return "Negotiable"; if (job.salary.min != null || job.salary.max != null) return `${job.salary.currency} ${job.salary.min?.toLocaleString() ?? ""}${job.salary.max != null ? ` – ${job.salary.max.toLocaleString()}` : "+"}`; return "Competitive compensation"; }
function EmptyState({ title, description }: { title: string; description: string }) { return <div className="mt-6 rounded-3xl border border-dashed border-white/15 bg-white/[0.025] px-6 py-16 text-center"><h3 className="text-xl font-black">{title}</h3><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">{description}</p></div>; }
function JobGridSkeleton() { return <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-80 animate-pulse rounded-3xl border border-white/8 bg-white/[0.035]" />)}</div>; }
