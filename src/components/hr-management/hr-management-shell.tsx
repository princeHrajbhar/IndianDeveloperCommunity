"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BadgeIndianRupee,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  ChartNoAxesCombined,
  ClipboardCheck,
  Clock3,
  FileSearch,
  FileText,
  LayoutDashboard,
  Mail,
  Menu,
  PackageCheck,
  PanelLeftClose,
  Search,
  Settings,
  ShieldCheck,
  Star,
  UserRoundPlus,
  Users,
  X,
} from "lucide-react";
import { DashboardThemeToggle } from "@/src/components/dashboard-theme/theme-toggle";
import { DashboardBrandLogo } from "@/src/components/dashboard-theme/dashboard-brand-logo";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  permission: string;
  exact?: boolean;
};

type NavGroup = { label: string; items: NavItem[] };

const groups: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      { href: "/hr-management", label: "HR Overview", icon: LayoutDashboard, permission: "hr-management.use", exact: true },
    ],
  },
  {
    label: "Talent",
    items: [
      { href: "/hr-management/jobs", label: "Jobs", icon: BriefcaseBusiness, permission: "jobs.manage" },
      { href: "/hr-management/applications", label: "Applications", icon: FileText, permission: "applications.manage" },
      { href: "/hr-management/external-applications", label: "External Applications", icon: FileSearch, permission: "external-applications.manage" },
      { href: "/hr-management/interviews", label: "Interviews", icon: CalendarCheck, permission: "applications.manage" },
      { href: "/hr-management/scheduling", label: "Scheduling", icon: Clock3, permission: "hr-management.communication.manage" },
    ],
  },
  {
    label: "People",
    items: [
      { href: "/hr-management/employees", label: "Employees", icon: Users, permission: "hr-management.employees.manage" },
      { href: "/hr-management/departments", label: "Departments", icon: Building2, permission: "hr-management.employees.manage" },
      { href: "/hr-management/attendance", label: "Attendance & Shifts", icon: CalendarCheck, permission: "hr-management.attendance.manage" },
      { href: "/hr-management/leave", label: "Leave Management", icon: ClipboardCheck, permission: "hr-management.leave.manage" },
      { href: "/hr-management/onboarding", label: "Onboarding", icon: UserRoundPlus, permission: "hr-management.onboarding.manage" },
      { href: "/hr-management/performance", label: "Performance", icon: Star, permission: "hr-management.performance.manage" },
      { href: "/hr-management/payroll", label: "Payroll", icon: BadgeIndianRupee, permission: "hr-management.payroll.manage" },
      { href: "/hr-management/assets", label: "Assets", icon: PackageCheck, permission: "hr-management.assets.manage" },
      { href: "/hr-management/operations", label: "HR Operations", icon: Clock3, permission: "hr-management.operations.manage" },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/hr-management/documents", label: "Documents & Letters", icon: FileText, permission: "documents.manage" },
      { href: "/hr-management/communication", label: "Communication", icon: Mail, permission: "hr-management.communication.manage" },
      { href: "/hr-management/reports", label: "Reports & Analytics", icon: ChartNoAxesCombined, permission: "hr-management.reports.view" },
      { href: "/hr-management/users", label: "User Access", icon: Users, permission: "users.manage" },
      { href: "/hr-management/access", label: "Roles & Permissions", icon: ShieldCheck, permission: "roles.manage" },
      { href: "/hr-management/settings", label: "HR Settings", icon: Settings, permission: "hr-management.use" },
    ],
  },
];

const allNav = groups.flatMap((group) => group.items);

export function HRManagementShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const me = useGetMeQuery();
  const [mobile, setMobile] = useState(false);
  const [compact, setCompact] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => setMobile(false), [pathname]);
  useEffect(() => {
    if (!mobile) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMobile(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKeyDown); };
  }, [mobile]);
  useEffect(() => {
    setCompact(window.localStorage.getItem("qf-hr-sidebar-compact") === "true");
  }, []);

  const user = me.data?.data;
  const permissions = user?.permissions ?? [];
  const has = (permission: string) => user?.role === "super-admin" || permissions.includes(permission);
  const access = has("hr-management.use");
  const visibleGroups = useMemo(
    () => groups
      .map((group) => ({ ...group, items: group.items.filter((item) => has(item.permission)) }))
      .filter((group) => group.items.length),
    [permissions, user?.role],
  );
  const current = [...allNav]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`));
  const hasPageAccess = !current || has(current.permission);

  function toggleCompact() {
    setCompact((value) => {
      const next = !value;
      window.localStorage.setItem("qf-hr-sidebar-compact", String(next));
      return next;
    });
  }

  if (me.isLoading) {
    return <div className="qf-app-shell grid min-h-screen place-items-center text-sm">Loading HR Management…</div>;
  }

  if (!access) {
    return (
      <div className="qf-app-shell grid min-h-screen place-items-center p-6">
        <div className="qf-surface qf-shadow max-w-lg rounded-2xl border p-8 text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-blue-600" />
          <h1 className="qf-text mt-4 text-2xl font-black">HR Management access required</h1>
          <p className="qf-muted mt-3 text-sm leading-6">Your account does not have HR workspace access. A Super Admin can assign an HR role or the required permissions.</p>
          <Link href="/profile" className="qf-primary-button mt-6 inline-flex rounded-xl px-5 py-3 text-sm font-bold">Return to profile</Link>
        </div>
      </div>
    );
  }

  const sidebarCompact = compact && !mobile;
  const sidebar = (
    <aside className={`${sidebarCompact ? "lg:w-[88px]" : "lg:w-[292px]"} qf-surface flex h-full w-[292px] max-w-[88vw] flex-col border-r transition-[width] duration-200`}>
      <div className="qf-border flex h-20 items-center justify-between border-b px-4">
        <div className="flex min-w-0 items-center gap-3">
          <DashboardBrandLogo href="/" label="QuantumFinix home" className={`${sidebarCompact ? "h-10 w-12" : "h-10 w-[152px]"} object-contain object-left`} />
          {!sidebarCompact ? <span className="qf-muted border-l border-slate-200 pl-3 text-[10px] font-black uppercase tracking-[.16em]">HRMS</span> : null}
        </div>
        <button onClick={toggleCompact} className="qf-icon-button hidden h-9 w-9 lg:grid" aria-label="Toggle HR sidebar">
          <PanelLeftClose className={`h-4 w-4 ${sidebarCompact ? "rotate-180" : ""}`} />
        </button>
      </div>

      <nav className="qf-sidebar-scroll min-h-0 flex-1 overflow-y-auto px-3 py-4">
        {visibleGroups.map((group) => (
          <div key={group.label} className="mb-5">
            {!sidebarCompact ? <p className="qf-muted mb-2 px-3 text-[10px] font-black uppercase tracking-[.16em]">{group.label}</p> : null}
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={sidebarCompact ? item.label : undefined}
                    className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition ${active ? "bg-blue-600 text-white" : "qf-text-secondary hover:bg-[var(--qf-surface-muted)] hover:text-[var(--qf-text)]"} ${sidebarCompact ? "justify-center px-2" : ""}`}
                  >
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${active ? "bg-white/12" : "bg-[var(--qf-surface-muted)] text-blue-600"}`}><Icon className="h-4 w-4" /></span>
                    {!sidebarCompact ? <span className="min-w-0 flex-1 truncate">{item.label}</span> : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {!sidebarCompact ? (
        <div className="qf-border border-t p-3">
          <div className="qf-surface-muted rounded-xl border p-4">
            <p className="qf-text text-xs font-black">Quantum Finix HRMS</p>
            <p className="qf-muted mt-1 text-[11px] leading-5">Talent, people, documents, communication and HR operations in one workspace.</p>
          </div>
        </div>
      ) : null}
    </aside>
  );

  const searchResults = query.trim().length
    ? visibleGroups.flatMap((group) => group.items).filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 8)
    : [];

  return (
    <div className="qf-app-shell min-h-screen">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{sidebar}</div>
      {mobile ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-slate-950/50" onClick={() => setMobile(false)} aria-label="Close HR navigation" />
          <div className="relative h-full">{sidebar}<button onClick={() => setMobile(false)} className="qf-icon-button absolute right-3 top-3" aria-label="Close HR navigation"><X className="h-4 w-4" /></button></div>
        </div>
      ) : null}

      <div className={`${compact ? "lg:pl-[88px]" : "lg:pl-[292px]"} transition-[padding] duration-200`}>
        <header className="qf-surface sticky top-0 z-30 flex min-h-16 items-center gap-2 border-b px-3 py-2 backdrop-blur sm:gap-3 sm:px-4 md:h-20 md:px-6 md:py-0">
          <button onClick={() => setMobile(true)} className="qf-icon-button grid h-11 w-11 shrink-0 place-items-center lg:hidden" aria-label="Open HR navigation" aria-expanded={mobile}><Menu className="h-5 w-5" /></button>
          <div className="hidden min-w-0 md:block">
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-blue-600">Quantum Finix · Human Resources</p>
            <p className="qf-text mt-1 truncate text-sm font-black">{current?.label ?? "HR Management"}</p>
          </div>

          <div className="relative ml-auto min-w-0 max-w-xl flex-1 md:ml-5">
            <Search className="qf-muted pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search HR modules…" className="qf-input h-11 w-full rounded-xl pl-10 pr-3 text-sm" />
            {query.trim() ? (
              <div className="qf-surface qf-shadow absolute left-0 right-0 top-12 z-50 rounded-xl border p-2">
                {searchResults.length ? searchResults.map((item) => {
                  const Icon = item.icon;
                  return <Link onClick={() => setQuery("")} key={item.href} href={item.href} className="qf-text-secondary flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold hover:bg-[var(--qf-surface-muted)]"><Icon className="h-4 w-4 text-blue-600" />{item.label}</Link>;
                }) : <p className="qf-muted px-3 py-4 text-sm">No matching HR module.</p>}
              </div>
            ) : null}
          </div>

          <div className="hidden sm:block"><DashboardThemeToggle /></div>
          <Link href="/profile/notifications" className="qf-icon-button relative"><Bell className="h-5 w-5" /></Link>
          <Link href="/profile" className="qf-secondary-button hidden h-11 items-center gap-2 rounded-xl px-3 md:flex">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-600 text-[10px] font-black text-white">{user?.email?.slice(0, 2).toUpperCase()}</span>
            <span className="max-w-36 truncate text-xs font-bold">{user?.email}</span>
          </Link>
        </header>

        <main className="mx-auto max-w-[1720px] p-3 sm:p-4 md:p-6 xl:p-8">{hasPageAccess ? children : <div className="grid min-h-[55vh] place-items-center"><div className="qf-surface qf-shadow max-w-lg rounded-2xl border p-8 text-center"><ShieldCheck className="mx-auto h-9 w-9 text-[var(--qf-primary-text)]"/><h1 className="qf-text mt-4 text-2xl font-black">HR module access required</h1><p className="qf-muted mt-3 text-sm leading-6">Your role does not include this HRMS module. Ask an authorized administrator to update the required permission.</p><Link href="/hr-management" className="qf-primary-button mt-6 inline-flex rounded-xl px-5 py-3 text-sm font-bold">Return to HR Overview</Link></div></div>}</main>
      </div>
    </div>
  );
}
