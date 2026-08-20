"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState, type ReactNode } from "react";
import { BarChart3, Bell, Download, Flame, LayoutDashboard, Menu, PanelLeftClose, Search, ShieldCheck, UserCheck, UserRoundSearch, Users, X } from "lucide-react";
import { DashboardBrandLogo } from "@/src/components/dashboard-theme/dashboard-brand-logo";
import { DashboardThemeToggle } from "@/src/components/dashboard-theme/theme-toggle";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";

const nav = [
  { href: "/lead-management", label: "Sales Overview", icon: LayoutDashboard, permission: "lead-management.use", exact: true },
  { href: "/lead-management/leads", label: "Lead Pipeline", icon: Users, permission: "lead-management.use" },
  { href: "/lead-management/leads?view=my", label: "My Leads", icon: UserCheck, permission: "lead-management.use" },
  { href: "/lead-management/leads?view=unassigned", label: "Unassigned Leads", icon: UserRoundSearch, permission: "lead-management.assign" },
  { href: "/lead-management/leads?view=hot", label: "High Opportunity", icon: Flame, permission: "lead-management.use" },
  { href: "/lead-management/leads?view=followups", label: "Follow-ups", icon: Bell, permission: "lead-management.use" },
  { href: "/lead-management/import-export", label: "Import & Export", icon: Download, permission: "lead-management.import-export" },
  { href: "/lead-management/analytics", label: "Analytics", icon: BarChart3, permission: "lead-management.analytics" },
];

export function LeadManagementShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const me = useGetMeQuery();
  const [mobile, setMobile] = useState(false);
  const [compact, setCompact] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => setMobile(false), [pathname]);
  useEffect(() => setCompact(localStorage.getItem("qf-lead-sidebar-compact") === "true"), []);
  const user = me.data?.data;
  const permissions = user?.permissions ?? [];
  const superAdmin = user?.role === "super-admin";
  const legacy = permissions.includes("leads.manage");
  const has = (permission: string) => superAdmin || legacy || permissions.includes(permission) || (permission === "lead-management.use" && permissions.includes("lead-management.view-all"));
  const canAccess = has("lead-management.use");
  const pagePermission = pathname.startsWith("/lead-management/import-export") ? "lead-management.import-export" : pathname.startsWith("/lead-management/analytics") ? "lead-management.analytics" : pathname.startsWith("/lead-management/leads/new") ? "lead-management.edit" : "lead-management.use";
  const pageAllowed = has(pagePermission);
  const visible = useMemo(() => nav.filter((item) => has(item.permission)), [permissions, user?.role]);
  const filtered = search.trim() ? visible.filter((item) => item.label.toLowerCase().includes(search.trim().toLowerCase())) : [];
  const toggleCompact = () => setCompact((value) => { const next = !value; localStorage.setItem("qf-lead-sidebar-compact", String(next)); return next; });

  if (me.isLoading) return <div className="qf-app-shell grid min-h-screen place-items-center text-sm">Loading Lead Management…</div>;
  if (!canAccess) return <div className="qf-app-shell grid min-h-screen place-items-center p-6"><div className="qf-surface qf-shadow max-w-lg rounded-2xl border p-8 text-center"><ShieldCheck className="mx-auto h-10 w-10 text-blue-600"/><h1 className="qf-text mt-4 text-2xl font-black">Lead Management access required</h1><p className="qf-muted mt-3 text-sm leading-6">Your role does not include access to the sales CRM workspace. A Super Admin can grant a Lead Management role or individual permissions.</p><Link href="/profile" className="qf-primary-button mt-6 inline-flex rounded-xl px-5 py-3 text-sm font-bold">Return to profile</Link></div></div>;

  const sidebar = <aside className={`${compact ? "lg:w-[88px]" : "lg:w-[292px]"} qf-surface flex h-full w-[292px] flex-col border-r transition-[width] duration-200`}>
    <div className="qf-border flex h-20 items-center justify-between border-b px-4">
      <div className="flex min-w-0 items-center gap-3"><DashboardBrandLogo href="/" label="QuantumFinix home" className={`${compact ? "h-10 w-12" : "h-10 w-[152px]"} object-contain object-left`}/>{!compact ? <span className="qf-muted border-l pl-3 text-[10px] font-black uppercase tracking-[.16em]">CRM</span> : null}</div>
      <button onClick={toggleCompact} className="qf-icon-button hidden h-9 w-9 lg:grid" aria-label="Toggle lead sidebar"><PanelLeftClose className={`h-4 w-4 ${compact ? "rotate-180" : ""}`}/></button>
    </div>
    <nav className="qf-sidebar-scroll min-h-0 flex-1 overflow-y-auto px-3 py-4">
      <p className={`qf-muted mb-2 px-3 text-[10px] font-black uppercase tracking-[.16em] ${compact ? "hidden" : ""}`}>Lead Management</p>
      <Suspense fallback={<LeadNavItemsFallback items={visible} compact={compact} pathname={pathname}/>}>
        <LeadNavItems items={visible} compact={compact} pathname={pathname}/>
      </Suspense>
    </nav>
    {!compact ? <div className="qf-border border-t p-3"><div className="qf-surface-muted rounded-xl border p-4"><p className="qf-text text-xs font-black">Sales CRM</p><p className="qf-muted mt-1 text-[11px] leading-5">Prioritize opportunity, assign ownership, communicate, follow up and convert from one workspace.</p></div></div> : null}
  </aside>;

  return <div className="qf-app-shell min-h-screen">
    <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{sidebar}</div>
    {mobile ? <div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-slate-950/50" onClick={() => setMobile(false)} aria-label="Close Lead Management navigation"/><div className="relative h-full">{sidebar}<button onClick={() => setMobile(false)} className="qf-icon-button absolute right-3 top-3"><X className="h-4 w-4"/></button></div></div> : null}
    <div className={`${compact ? "lg:pl-[88px]" : "lg:pl-[292px]"} transition-[padding] duration-200`}>
      <header className="qf-surface sticky top-0 z-30 flex h-20 items-center gap-3 border-b px-4 backdrop-blur md:px-6">
        <button onClick={() => setMobile(true)} className="qf-icon-button lg:hidden"><Menu className="h-5 w-5"/></button>
        <div className="hidden min-w-0 md:block"><p className="text-[10px] font-black uppercase tracking-[.18em] text-blue-600">Quantum Finix · Sales CRM</p><p className="qf-text mt-1 truncate text-sm font-black">Lead Management</p></div>
        <div className="relative ml-auto max-w-xl flex-1 md:ml-5"><Search className="qf-muted pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search CRM modules…" className="qf-input h-11 w-full rounded-xl pl-10 pr-4 text-sm"/>{search.trim() ? <div className="qf-surface qf-shadow absolute left-0 right-0 top-12 z-50 rounded-xl border p-2">{filtered.length ? filtered.map((item) => { const Icon = item.icon; return <Link onClick={() => setSearch("")} key={item.href} href={item.href} className="qf-text-secondary flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold hover:bg-[var(--qf-surface-muted)]"><Icon className="h-4 w-4 text-blue-600"/>{item.label}</Link>; }) : <p className="qf-muted px-3 py-4 text-sm">No matching CRM module.</p>}</div> : null}</div>
        <DashboardThemeToggle/><Link href="/profile/notifications" className="qf-icon-button"><Bell className="h-5 w-5"/></Link><Link href="/profile" className="qf-secondary-button hidden h-11 items-center gap-2 rounded-xl px-3 md:flex"><span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-600 text-[10px] font-black text-white">{user?.email?.slice(0,2).toUpperCase()}</span><span className="max-w-36 truncate text-xs font-bold">{user?.email}</span></Link>
      </header>
      <main className="mx-auto max-w-[1720px] p-4 md:p-6 xl:p-8">{pageAllowed ? children : <div className="grid min-h-[55vh] place-items-center"><div className="qf-surface qf-shadow max-w-lg rounded-2xl border p-8 text-center"><ShieldCheck className="mx-auto h-9 w-9 text-blue-600"/><h1 className="qf-text mt-4 text-2xl font-black">CRM module access required</h1><p className="qf-muted mt-3 text-sm leading-6">Your role can enter Lead Management but does not include this operation. A Super Admin can grant the corresponding Lead Management permission.</p><Link href="/lead-management" className="qf-primary-button mt-6 inline-flex rounded-xl px-5 py-3 text-sm font-bold">Return to Sales Overview</Link></div></div>}</main>
    </div>
  </div>;
}


function LeadNavItems({ items, compact, pathname }: { items: typeof nav; compact: boolean; pathname: string }) {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view");
  return <div className="space-y-1">{items.map((item) => {
    const baseHref = item.href.split("?")[0];
    const itemView = new URLSearchParams(item.href.split("?")[1] ?? "").get("view");
    const active = item.exact
      ? pathname === baseHref
      : itemView
        ? pathname === baseHref && currentView === itemView
        : (pathname === baseHref && !currentView) || pathname.startsWith(`${baseHref}/`);
    const Icon = item.icon;
    return <Link key={item.href} href={item.href} title={compact ? item.label : undefined} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition ${active ? "bg-blue-600 text-white" : "qf-text-secondary hover:bg-[var(--qf-surface-muted)] hover:text-[var(--qf-text)]"} ${compact ? "justify-center px-2" : ""}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${active ? "bg-white/12" : "bg-[var(--qf-surface-muted)] text-blue-600"}`}><Icon className="h-4 w-4"/></span>{!compact ? <span className="truncate">{item.label}</span> : null}</Link>;
  })}</div>;
}

function LeadNavItemsFallback({ items, compact, pathname }: { items: typeof nav; compact: boolean; pathname: string }) {
  return <div className="space-y-1">{items.map((item) => {
    const baseHref = item.href.split("?")[0];
    const active = item.exact ? pathname === baseHref : pathname === baseHref || pathname.startsWith(`${baseHref}/`);
    const Icon = item.icon;
    return <Link key={item.href} href={item.href} title={compact ? item.label : undefined} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition ${active ? "bg-blue-600 text-white" : "qf-text-secondary hover:bg-[var(--qf-surface-muted)] hover:text-[var(--qf-text)]"} ${compact ? "justify-center px-2" : ""}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${active ? "bg-white/12" : "bg-[var(--qf-surface-muted)] text-blue-600"}`}><Icon className="h-4 w-4"/></span>{!compact ? <span className="truncate">{item.label}</span> : null}</Link>;
  })}</div>;
}
