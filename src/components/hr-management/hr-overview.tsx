"use client";
import Link from "next/link";
import {Activity,BadgeIndianRupee,BriefcaseBusiness,Building2,CalendarCheck,ClipboardCheck,FileSearch,FileText,Mail,PackageCheck,Star,UserRoundPlus,Users} from "lucide-react";
import {getApiErrorMessage} from "@/src/lib/api/error";
import {useGetHROverviewQuery} from "@/src/lib/features/hr-management/hr-management-api";
import {Badge,Card,CardHeader,ErrorBox,HRPageTitle,Metric} from "./hr-ui";

const modules=[
 {href:"/hr-management/jobs",title:"Jobs",desc:"Create, publish, pause and close openings directly inside HRMS.",icon:BriefcaseBusiness},
 {href:"/hr-management/applications",title:"Applications",desc:"Review, shortlist, progress, offer, hire or reject candidates.",icon:FileText},
 {href:"/hr-management/external-applications",title:"External Applications",desc:"Manage candidates received outside the main careers application flow.",icon:FileSearch},
 {href:"/hr-management/interviews",title:"Interviews",desc:"Schedule rounds, notify candidates and capture structured scorecards.",icon:CalendarCheck},
 {href:"/hr-management/employees",title:"Employee Management",desc:"Employee master, managers, employment lifecycle and secure HR records.",icon:Users},
 {href:"/hr-management/departments",title:"Department Dashboards",desc:"Department-specific people, document and communication workspaces.",icon:Building2},
 {href:"/hr-management/attendance",title:"Attendance & Shifts",desc:"Shift rules, check-in/out, WFH, overtime and attendance exceptions.",icon:CalendarCheck},
 {href:"/hr-management/leave",title:"Leave Management",desc:"Employee requests, approvals, rejection notes and leave operations.",icon:ClipboardCheck},
 {href:"/hr-management/payroll",title:"Payroll",desc:"Monthly payroll, earnings, deductions, reimbursements and payment status.",icon:BadgeIndianRupee},
 {href:"/hr-management/onboarding",title:"Onboarding",desc:"Joiner checklists, ownership, due dates, access and policy completion.",icon:UserRoundPlus},
 {href:"/hr-management/performance",title:"Performance",desc:"Goals, ratings, competencies, strengths and review cycles.",icon:Star},
 {href:"/hr-management/assets",title:"Employee Assets",desc:"Equipment assignments, returns, repair, lost and retired assets.",icon:PackageCheck},
 {href:"/hr-management/documents",title:"Documents & Letters",desc:"Templates, offer/appointment letters, bulk issue, print and download.",icon:FileText},
 {href:"/hr-management/communication",title:"Communication",desc:"Announcements, bulk email, templates, queues and delivery visibility.",icon:Mail},
];

export function HROverviewWorkspace(){const q=useGetHROverviewQuery();const m=q.data?.data.metrics;return <>
 <HRPageTitle eyebrow="Human Resources Management System" title="One professional workspace for the" accent="complete employee lifecycle." description="Hiring, employee records, department operations, attendance, leave, payroll, documents and communication are managed inside the Quantum Finix HRMS without switching back to the general admin dashboard."/>
 {q.error&&<ErrorBox message={getApiErrorMessage(q.error)}/>} 
 <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
  <Metric label="Active employees" value={m?.activeEmployees??"—"} helper={`${m?.onboarding??0} currently onboarding`} icon={<Users className="h-5 w-5"/>} gradient="from-emerald-500 to-teal-500"/>
  <Metric label="Attendance today" value={`${m?.attendanceRate??0}%`} helper={`${m?.presentToday??0} marked present / WFH`} icon={<CalendarCheck className="h-5 w-5"/>} gradient="from-sky-500 to-blue-500"/>
  <Metric label="Hiring pipeline" value={m?.applications??"—"} helper={`${m?.openJobs??0} published jobs`} icon={<BriefcaseBusiness className="h-5 w-5"/>} gradient="from-violet-500 to-fuchsia-500"/>
  <Metric label="Pending HR action" value={(m?.pendingLeaves??0)+(m?.payrollDraft??0)} helper={`${m?.pendingLeaves??0} leaves · ${m?.payrollDraft??0} payroll drafts/holds`} icon={<Activity className="h-5 w-5"/>} gradient="from-amber-500 to-rose-500"/>
 </div>
 <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
  <Card><CardHeader title="HRMS modules" description="Operational functions share one employee record, permission model and audit trail."/><div className="grid gap-3 p-4 md:grid-cols-2">{modules.map(item=>{const Icon=item.icon;return <Link key={item.href} href={item.href} className="qf-border group flex gap-4 rounded-2xl border p-4 transition hover:border-blue-300 hover:bg-[var(--qf-surface-muted)]"><span className="qf-status-info grid h-11 w-11 shrink-0 place-items-center rounded-xl border"><Icon className="h-5 w-5"/></span><span><b className="qf-text text-sm group-hover:text-blue-600">{item.title}</b><span className="qf-muted mt-1 block text-xs leading-5">{item.desc}</span></span></Link>})}</div></Card>
  <div className="space-y-6"><Card><CardHeader title="Live HR snapshot" description="Current operational records across the HRMS."/><div className="space-y-3 p-5 text-sm">{[["Total employee records",m?.employees??0],["Pending leave approvals",m?.pendingLeaves??0],["Issued documents this month",m?.issuedDocuments??0],["Active HR announcements",m?.announcements??0]].map(([label,value])=><div key={String(label)} className="qf-surface-muted flex items-center justify-between rounded-xl px-4 py-3"><span className="qf-text-secondary font-semibold">{label}</span><b className="qf-text">{value}</b></div>)}</div></Card>
   <Card><CardHeader title="Recent HR activity" description="Audit-oriented feed of changes across HR records."/><div className="qf-border divide-y">{q.data?.data.recentActivity?.length?q.data.data.recentActivity.map(a=><div key={a.id??a._id} className="flex items-start gap-3 px-5 py-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600"/><div className="min-w-0"><p className="qf-text-secondary truncate text-xs font-black">{a.action.replaceAll("."," ")}</p><p className="qf-muted mt-1 text-[10px]">{a.entityType} · {new Date(a.createdAt).toLocaleString()}</p></div><Badge tone="blue">Audit</Badge></div>):<p className="qf-muted p-5 text-sm">Activity will appear as HR operations are performed.</p>}</div></Card>
  </div>
 </div>
 </>}
