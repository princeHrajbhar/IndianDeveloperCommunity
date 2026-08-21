"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Activity, Bell, Blocks, CalendarDays, ChartNoAxesCombined, ChevronDown, CircleGauge, FolderKanban, LayoutDashboard, MessageSquareText, PanelLeftClose, Plus, Search, Settings, ShieldCheck, Sparkles, Target, Users, X, Zap } from "lucide-react";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";
import { useGetPMNotificationsQuery, useGetPMProjectQuery, useLazyGlobalPMSearchQuery } from "@/src/lib/features/product-management/product-management-api";
import type { PMProject } from "@/src/lib/features/product-management/product-management-types";
import { DashboardThemeToggle } from "@/src/components/dashboard-theme/theme-toggle";
import { DashboardBrandLogo } from "@/src/components/dashboard-theme/dashboard-brand-logo";

const nav=[
  {href:"/product-management",label:"Overview",icon:LayoutDashboard,tone:"qf-status-info"},
  {href:"/product-management/projects",label:"Projects",icon:FolderKanban,tone:"qf-status-info"},
  {href:"/product-management/my-work",label:"My Work",icon:Target,tone:"qf-status-info"},
  {href:"/product-management/chat",label:"Chat",icon:MessageSquareText,tone:"qf-status-info"},
  {href:"/product-management/notifications",label:"Notifications",icon:Bell,tone:"qf-status-info"},
  {href:"/product-management/performance",label:"Performance",icon:Activity,tone:"qf-status-info"},
  {href:"/product-management/reports",label:"Reports",icon:ChartNoAxesCombined,tone:"qf-status-info",permission:"product-management.reports.view"},
  {href:"/product-management/team",label:"Team",icon:Users,tone:"qf-status-info",permission:"product-management.team.manage"},
  {href:"/product-management/settings",label:"Settings",icon:Settings,tone:"qf-status-info",permission:"product-management.projects.manage"},
];
const projectNav=[
  ["","Project overview",CircleGauge],["/backlog","Backlog",Blocks],["/board","Work Board",FolderKanban],["/sprints","Sprints",Zap],["/timeline","Timeline",CalendarDays],["/tasks","Work Items",Target],["/releases","Releases",Sparkles],["/calendar","Calendar",CalendarDays],["/team","Project Team",Users],["/reports","Reports",ChartNoAxesCombined],["/activity","Activity",Activity],["/settings","Project Settings",Settings],
] as const;

export function ProductManagementShell({children}:{children:ReactNode}){
  const pathname=usePathname(); const router=useRouter(); const projectId=useMemo(()=>pathname.match(/^\/product-management\/projects\/([^/]+)/)?.[1]??"",[pathname]);
  const me=useGetMeQuery(); const projectQuery=useGetPMProjectQuery(projectId,{skip:!projectId}); const notifications=useGetPMNotificationsQuery();
  const user=me.data?.data; const permissions=user?.permissions??[]; const isClient=user?.role==="client-viewer"; const isSuper=user?.role==="super-admin"; const has=(permission:string)=>isSuper||permissions.includes(permission); const hasAccess=isSuper||permissions.includes("product-management.use")||permissions.includes("developer-workspace.use");
  const routeAllowed=useMemo(()=>{
    if(!user)return true;
    if(isSuper)return true;
    if(isClient){
      if(pathname==="/product-management"||pathname==="/product-management/projects"||pathname==="/product-management/chat"||pathname==="/product-management/notifications")return true;
      return /^\/product-management\/projects\/[^/]+(?:\/(?:timeline|releases|calendar))?$/.test(pathname);
    }
    if(pathname==="/product-management/projects/new")return has("product-management.projects.manage");
    if(pathname==="/product-management/reports")return has("product-management.reports.view");
    if(pathname==="/product-management/team")return has("product-management.team.manage");
    if(pathname==="/product-management/settings")return has("product-management.projects.manage")||has("product-management.workflow.manage");
    if(/\/projects\/[^/]+\/reports$/.test(pathname))return has("product-management.reports.view");
    if(/\/projects\/[^/]+\/team$/.test(pathname))return has("product-management.team.manage")||has("product-management.projects.manage");
    if(/\/projects\/[^/]+\/settings$/.test(pathname))return has("product-management.projects.manage")||has("product-management.workflow.manage");
    return true;
  },[user,isClient,isSuper,pathname,permissions]);
  const [mobile,setMobile]=useState(false); const [compact,setCompact]=useState(false); const [projectOpen,setProjectOpen]=useState(true); const [query,setQuery]=useState(""); const [search,{data:searchData,isFetching}]=useLazyGlobalPMSearchQuery();
  const project=projectQuery.data?.data; const unread=(notifications.data?.data??[]).filter(n=>!n.readAt).length;
  useEffect(()=>{if(query.trim().length<2)return;const id=setTimeout(()=>void search(query.trim()),250);return()=>clearTimeout(id);},[query,search]);
  useEffect(()=>setMobile(false),[pathname]);
  if(me.isLoading)return <div className="grid min-h-screen place-items-center qf-app-shell text-slate-700">Loading Product Management…</div>;
  if(!hasAccess)return <div className="grid min-h-screen place-items-center qf-app-shell p-6 text-slate-900"><div className="max-w-lg rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-sm"><ShieldCheck className="mx-auto h-10 w-10 text-rose-500"/><h1 className="mt-4 text-2xl font-black">Product Management access required</h1><p className="mt-3 text-sm leading-6 text-slate-500">Your account is authenticated, but this workspace is restricted by role and permission.</p><Link href="/profile" className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white">Return to profile</Link></div></div>;
  if(!routeAllowed)return <div className="grid min-h-screen place-items-center qf-app-shell p-6 text-slate-900"><div className="max-w-lg rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-sm"><ShieldCheck className="mx-auto h-10 w-10 text-amber-500"/><h1 className="mt-4 text-2xl font-black">This Product Management page is restricted</h1><p className="mt-3 text-sm leading-6 text-slate-500">Your workspace role does not include this page. Route access is checked separately from navigation visibility and backend resource authorization.</p><Link href="/product-management" className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white">Open Product Management overview</Link></div></div>;
  const sidebar=(
    <aside className={`${compact?"lg:w-[84px]":"lg:w-[270px]"} flex h-full w-[286px] flex-col qf-surface border-r transition-all`}>
      <div className="flex h-20 items-center justify-between qf-border border-b px-5">
        <div className="flex min-w-0 items-center gap-3"><DashboardBrandLogo href="/" label="QuantumFinix home" className={`${compact?"h-10 w-12":"h-10 w-[150px]"} object-contain object-left`}/>{!compact&&<span className="min-w-0 border-l border-slate-200 pl-3"><b className="block truncate text-xs text-slate-900">Product Management</b><span className="text-[10px] font-semibold text-slate-400">Workspace</span></span>}</div>
        <button onClick={()=>setCompact(!compact)} className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:block"><PanelLeftClose className={`h-4 w-4 ${compact?"rotate-180":""}`}/></button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="space-y-1">
          {nav.filter(item=>(!isClient||["Overview","Projects","Chat","Notifications"].includes(item.label))&&(!item.permission||user?.role==="super-admin"||permissions.includes(item.permission))).map(item=>{const active=item.href==="/product-management"?pathname===item.href:pathname.startsWith(item.href);const Icon=item.icon;return <Link key={item.href} href={item.href} title={compact?item.label:undefined} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${active?"qf-primary-button":"qf-text-secondary hover:bg-[var(--qf-surface-muted)] hover:text-[var(--qf-text)]"}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${active?"bg-white/15 text-white":item.tone}`}><Icon className="h-4 w-4"/></span>{!compact&&<span className="flex-1">{item.label}</span>}{!compact&&item.label==="Notifications"&&unread>0&&<span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] text-white">{unread}</span>}</Link>})}
        </nav>
        {projectId&&!compact&&<div className="mt-6 border-t border-slate-100 pt-4"><button onClick={()=>setProjectOpen(!projectOpen)} className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left"><span className="min-w-0"><span className="block text-[10px] font-black uppercase tracking-[.14em] text-slate-400">Current project</span><span className="mt-1 block truncate text-sm font-black text-slate-800">{project?.key??"Project"} · {project?.name??"Loading"}</span></span><ChevronDown className={`h-4 w-4 text-slate-400 transition ${projectOpen?"rotate-180":""}`}/></button>{projectOpen&&<div className="mt-1 space-y-0.5">{projectNav.filter(([,label])=>{if(isClient)return ["Project overview","Timeline","Releases","Calendar"].includes(label);if(user?.role==="super-admin")return true;if(label==="Reports")return permissions.includes("product-management.reports.view");if(label==="Project Settings")return permissions.includes("product-management.projects.manage")||permissions.includes("product-management.workflow.manage");if(label==="Project Team")return permissions.includes("product-management.team.manage")||permissions.includes("product-management.projects.manage");return true}).map(([suffix,label,Icon])=>{const href=`/product-management/projects/${projectId}${suffix}`;const active=suffix===""?pathname===href:pathname===href;return <Link key={suffix} href={href} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-bold ${active?"bg-blue-50 text-blue-700":"text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}><Icon className="h-3.5 w-3.5"/>{label}</Link>})}</div>}</div>}
      </div>
      <div className="border-t border-slate-100 p-3">{!compact&&<div className="rounded-2xl qf-surface-muted border border-[var(--qf-border)] p-4"><p className="qf-text text-xs font-black">Advanced workspace</p><p className="mt-1 text-[11px] leading-5 text-slate-500">Planning → execution → release → client delivery.</p></div>}</div>
    </aside>
  );
  return <div className="qf-product-management qf-app-shell min-h-screen">
    <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{sidebar}</div>
    {mobile&&<div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Close navigation" className="absolute inset-0 bg-slate-950/35" onClick={()=>setMobile(false)}/><div className="relative h-full">{sidebar}<button onClick={()=>setMobile(false)} className="absolute right-3 top-3 rounded-lg bg-slate-100 p-2"><X className="h-4 w-4"/></button></div></div>}
    <div className={`${compact?"lg:pl-[84px]":"lg:pl-[270px]"} transition-all`}>
      <header className="sticky top-0 z-30 flex h-20 items-center gap-3 qf-surface border-b px-4 backdrop-blur md:px-6">
        <button onClick={()=>setMobile(true)} className="qf-secondary-button h-10 rounded-xl px-3 text-xs font-black lg:hidden">Navigation</button>
        <div className="relative max-w-2xl flex-1"><Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects, work items, bugs, stories, epics, releases…" className="qf-input h-11 w-full rounded-xl pl-10 pr-4 text-sm"/>{query.trim().length>=2&&<SearchResults data={searchData?.data} loading={isFetching} close={()=>setQuery("")}/>}</div>
        {projectId&&!isClient&&has("product-management.work.manage")&&<Link href={`/product-management/projects/${projectId}/tasks?new=1`} className="hidden h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-black text-white shadow-sm hover:bg-blue-700 sm:flex"><Plus className="h-4 w-4"/>Work item</Link>}
        <DashboardThemeToggle/><Link href="/product-management/notifications" className="qf-icon-button relative"><Bell className="h-5 w-5"/>{unread>0&&<span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[9px] font-black text-white">{unread>99?"99+":unread}</span>}</Link>
        <button onClick={()=>router.push("/profile")} className="qf-secondary-button hidden h-11 items-center gap-2 rounded-xl px-3 text-left md:flex"><span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-600 text-[10px] font-black text-white">{user?.email?.slice(0,2).toUpperCase()}</span><span className="max-w-32 truncate text-xs font-bold text-slate-700">{user?.email}</span></button>
      </header>
      <main className="mx-auto max-w-[1700px] p-4 md:p-6 xl:p-8">{children}</main>
    </div>
  </div>;
}
function SearchResults({data,loading,close}:{data?:{projects:PMProject[];tasks:Array<{_id:string;projectId:string;key:string;title:string;type:string;status:string}>;releases:Array<{_id:string;projectId:string;name:string;status:string}>};loading:boolean;close:()=>void}){
  return <div className="qf-surface qf-shadow absolute left-0 right-0 top-12 z-50 max-h-[70vh] overflow-auto rounded-2xl border p-2"><div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400">{loading?"Searching…":"Global results"}</div>{!loading&&!data?.projects.length&&!data?.tasks.length&&!data?.releases.length&&<p className="px-3 py-5 text-sm text-slate-500">No permitted results found.</p>}{data?.projects.map(p=><Link onClick={close} key={p._id} href={`/product-management/projects/${p._id}`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-[var(--qf-surface-muted)]"><span className="qf-status-info grid h-8 w-8 place-items-center rounded-lg border"><FolderKanban className="h-4 w-4"/></span><span><b className="text-sm">{p.key} · {p.name}</b><span className="block text-[11px] text-slate-400">Project</span></span></Link>)}{data?.tasks.map(t=><Link onClick={close} key={t._id} href={`/product-management/projects/${t.projectId}/tasks?task=${t._id}`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-[var(--qf-surface-muted)]"><span className="qf-status-info grid h-8 w-8 place-items-center rounded-lg border"><Target className="h-4 w-4"/></span><span className="min-w-0"><b className="block truncate text-sm">{t.key} · {t.title}</b><span className="block text-[11px] text-slate-400">{t.type} · {t.status}</span></span></Link>)}{data?.releases.map(r=><Link onClick={close} key={r._id} href={`/product-management/projects/${r.projectId}/releases`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-[var(--qf-surface-muted)]"><span className="qf-status-info grid h-8 w-8 place-items-center rounded-lg border"><Sparkles className="h-4 w-4"/></span><span><b className="text-sm">{r.name}</b><span className="block text-[11px] text-slate-400">Release · {r.status}</span></span></Link>)}</div>;
}
