"use client";

import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, CalendarDays, CheckCircle2, MapPin, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetJobBySlugQuery } from "@/src/lib/features/jobs/job-api";

export function JobDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { data, error, isLoading } = useGetJobBySlugQuery(slug, { skip: !slug });
  const job = data?.data;

  if (isLoading) return <div className="min-h-screen bg-[#030712] px-5 pt-36 text-white"><div className="mx-auto h-[520px] max-w-6xl animate-pulse rounded-3xl bg-white/[0.04]" /></div>;
  if (error || !job) return <div className="grid min-h-screen place-items-center bg-[#030712] px-5 text-white"><div className="text-center"><h1 className="text-3xl font-black">Role not found</h1><p className="mt-3 text-slate-400">This opportunity may have closed or expired.</p><Link href="/job" className="mt-6 inline-flex rounded-xl bg-cyan-300 px-5 py-3 font-bold text-slate-950">Browse careers</Link></div></div>;

  const external = job.applicationSettings.externalApplyLink;
  return <div className="min-h-screen bg-[#030712] pb-20 pt-28 text-white">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <Link href="/job" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300"><ArrowLeft size={16} /> Back to careers</Link>
      <section className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,.12),transparent_32%),rgba(255,255,255,.025)] p-7 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{job.department}</p><h1 className="mt-4 max-w-4xl text-4xl font-black sm:text-6xl">{job.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">{job.shortDescription}</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300"><Meta icon={<BriefcaseBusiness size={16} />} text={`${job.company.name} · ${job.employmentType}`} /><Meta icon={<MapPin size={16} />} text={`${job.location.city}, ${job.location.state} · ${job.workplaceType}`} /><Meta icon={<Users size={16} />} text={`${job.applicationSettings.vacancies} opening${job.applicationSettings.vacancies === 1 ? "" : "s"}`} />{job.applicationSettings.deadline ? <Meta icon={<CalendarDays size={16} />} text={`Apply by ${new Date(job.applicationSettings.deadline).toLocaleDateString()}`} /> : null}</div>
        <div className="mt-9 flex flex-wrap gap-3">{external ? <a href={external} target="_blank" rel="noreferrer" className="rounded-xl bg-cyan-300 px-6 py-3.5 font-black text-slate-950">Apply externally</a> : <Link href={`/job/${job.slug}/apply`} className="rounded-xl bg-cyan-300 px-6 py-3.5 font-black text-slate-950">Apply for this role</Link>}<Link href="/contact" className="rounded-xl border border-white/10 px-6 py-3.5 font-bold">Ask a question</Link></div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <main className="space-y-6"><Section title="About the role"><RichText text={job.description} /></Section><ListSection title="Responsibilities" items={job.responsibilities} /><ListSection title="Requirements" items={job.requirements} /><ListSection title="Preferred qualifications" items={job.preferredQualifications} /><ListSection title="Benefits and perks" items={[...job.benefits, ...job.perks]} /></main>
        <aside className="space-y-5"><Section title="Role overview"><Info label="Experience" value={`${job.experience.level} · ${job.experience.min}${job.experience.max != null ? `–${job.experience.max}` : "+"} years`} /><Info label="Workplace" value={job.workplaceType} /><Info label="Employment" value={job.employmentType} /><Info label="Location" value={`${job.location.city}, ${job.location.country}`} /><Info label="Compensation" value={job.salary.hideSalary ? "Discussed during process" : job.salary.isNegotiable ? "Negotiable" : `${job.salary.currency} ${job.salary.min?.toLocaleString() ?? ""}${job.salary.max ? ` – ${job.salary.max.toLocaleString()}` : ""}`} /></Section><Section title="Skills"><div className="flex flex-wrap gap-2">{job.skills.map((skill) => <span key={skill} className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.07] px-3 py-1.5 text-xs text-cyan-100">{skill}</span>)}</div></Section><Section title="Hiring process"><ol className="space-y-3">{job.hiringStages.slice().sort((a,b)=>a.order-b.order).map((stage, index) => <li key={`${stage.order}-${stage.name}`} className="flex gap-3 text-sm text-slate-300"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><span className="pt-1">{stage.name}</span></li>)}</ol></Section></aside>
      </div>
    </div>
  </div>;
}

function Meta({ icon, text }: { icon: React.ReactNode; text: string }) { return <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2">{icon}{text}</span>; }
function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"><h2 className="text-xl font-black">{title}</h2><div className="mt-5">{children}</div></section>; }
function RichText({ text }: { text: string }) { return <div className="whitespace-pre-line text-sm leading-7 text-slate-300">{text}</div>; }
function ListSection({ title, items }: { title: string; items: string[] }) { if (!items.length) return null; return <Section title={title}><ul className="space-y-3">{items.map((item, index) => <li key={`${index}-${item}`} className="flex gap-3 text-sm leading-7 text-slate-300"><CheckCircle2 className="mt-1 shrink-0 text-cyan-300" size={17} /><span>{item}</span></li>)}</ul></Section>; }
function Info({ label, value }: { label: string; value: string }) { return <div className="flex justify-between gap-4 border-b border-white/8 py-3 text-sm last:border-0"><span className="text-slate-500">{label}</span><span className="text-right font-semibold text-slate-200">{value}</span></div>; }
