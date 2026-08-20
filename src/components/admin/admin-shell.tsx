"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Code2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Folder,
  FolderCog,
  Home,
  LogOut,
  Menu,
  Newspaper,
  PanelsTopLeft,
  ShieldAlert,
  ShieldCheck,
  Tags,
  UserRoundSearch,
  Users,
  Video,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useGetMeQuery, useLogoutMutation } from "@/src/lib/features/auth/auth-api";
import { useGetProfileQuery } from "@/src/lib/features/profiles/profile-api";
import { DashboardThemeToggle } from "@/src/components/dashboard-theme/theme-toggle";
import { DashboardBrandLogo } from "@/src/components/dashboard-theme/dashboard-brand-logo";

type NavigationItem = {
  href: string;
  label: string;
  icon: typeof Home;
  exact?: boolean;
  permission: string;
};

type NavigationGroup = {
  label: string;
  icon: typeof Home;
  items: NavigationItem[];
};

const overviewNavigation: NavigationItem = {
  href: "/dashboard",
  label: "Overview",
  icon: Home,
  exact: true,
  permission: "dashboard.view",
};

const navigationGroups: NavigationGroup[] = [
  {
    label: "Content Management",
    icon: Folder,
    items: [
      { href: "/dashboard/courses", label: "Courses", icon: BookOpen, permission: "courses.manage" },
      { href: "/dashboard/course-categories", label: "Course Categories", icon: Tags, permission: "course-categories.manage" },
      { href: "/dashboard/blog", label: "Blog", icon: Newspaper, permission: "blogs.manage" },
      { href: "/dashboard/blog-category", label: "Blog Categories", icon: Tags, permission: "blog-categories.manage" },
      { href: "/dashboard/videos", label: "Videos", icon: Video, permission: "videos.manage" },
      { href: "/dashboard/services", label: "Service Pages", icon: PanelsTopLeft, permission: "services.manage" },
    ],
  },
  {
    label: "Human Resources",
    icon: Users,
    items: [
      { href: "/hr-management", label: "HR Management", icon: Users, permission: "hr-management.use" },
    ],
  },
  {
    label: "Lead Management",
    icon: UserRoundSearch,
    items: [
      { href: "/lead-management", label: "Lead Management", icon: UserRoundSearch, permission: "lead-management.use" },
    ],
  },
  {
    label: "User Management",
    icon: Users,
    items: [
      { href: "/dashboard/user", label: "Users & Profiles", icon: Users, permission: "users.manage" },
      { href: "/dashboard/roles", label: "Roles & Access", icon: ShieldCheck, permission: "roles.manage" },
    ],
  },
  {
    label: "File Management",
    icon: FolderCog,
    items: [
      { href: "/dashboard/file", label: "Files", icon: FolderCog, permission: "files.manage" },
    ],
  },
  {
    label: "Product Management",
    icon: Code2,
    items: [
      { href: "/product-management", label: "Product Management", icon: Code2, permission: "product-management.use" },
    ],
  },
  {
    label: "Administration",
    icon: ShieldAlert,
    items: [
      { href: "/dashboard/security", label: "Security", icon: ShieldAlert, permission: "security.manage" },
    ],
  },
];

const navigation: NavigationItem[] = [
  overviewNavigation,
  ...navigationGroups.flatMap((group) => group.items),
];

function getRouteLabel(pathname: string): string {
  const match = [...navigation]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`));
  return match?.label ?? "Dashboard";
}

function SidebarLink({
  item,
  pathname,
  collapsed,
  nested = false,
}: {
  item: NavigationItem;
  pathname: string;
  collapsed: boolean;
  nested?: boolean;
}) {
  const Icon = item.icon;
  const selected = item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={`flex items-center rounded-xl text-sm font-bold transition ${
        nested ? "h-10" : "h-12"
      } ${collapsed ? "justify-center px-2" : nested ? "gap-3 px-3" : "gap-3 px-4"} ${
        selected
          ? "bg-blue-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
      }`}
    >
      <Icon size={nested ? 17 : 19} className="shrink-0" />
      <span className={collapsed ? "md:hidden" : ""}>{item.label}</span>
    </Link>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [logout, logoutState] = useLogoutMutation();
  const me = useGetMeQuery();
  const profile = useGetProfileQuery();

  useEffect(() => {
    setCollapsed(window.localStorage.getItem("qf-admin-sidebar-collapsed") === "true");
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const activeGroup = navigationGroups.find((group) =>
      group.items.some((item) =>
        item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`),
      ),
    );
    if (!activeGroup) return;
    setExpandedGroups((current) =>
      current[activeGroup.label] === undefined
        ? { ...current, [activeGroup.label]: true }
        : current,
    );
  }, [pathname]);

  function toggleCollapsed() {
    setCollapsed((value) => {
      const next = !value;
      window.localStorage.setItem("qf-admin-sidebar-collapsed", String(next));
      return next;
    });
  }

  const user = me.data?.data;
  const can = (permission: string) =>
    user?.role === "super-admin" || Boolean(user?.permissions?.includes(permission)) ||
    (permission === "lead-management.use" && Boolean(user?.permissions?.includes("leads.manage")));
  const allowedGroups = useMemo(
    () => navigationGroups
      .map((group) => ({ ...group, items: group.items.filter((item) => can(item.permission)) }))
      .filter((group) => group.items.length > 0),
    [user?.permissions, user?.role],
  );
  const currentLabel = useMemo(() => getRouteLabel(pathname), [pathname]);
  const currentNavigationItem = [...navigation]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`));
  const hasPageAccess = !currentNavigationItem || can(currentNavigationItem.permission);
  const email = user?.email ?? "Administrator";
  const profilePicture = profile.data?.data.profilePicture?.url;
  const initials = (profile.data?.data.fullName || email).split(/\s+|@/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "U";

  return (
    <div className="qf-app-shell relative flex h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 opacity-40 bg-[radial-gradient(circle_at_8%_4%,rgba(37,99,235,.08),transparent_26%)]" />

      {mobileOpen ? (
        <button
          aria-label="Close dashboard navigation"
          className="fixed inset-0 z-40 bg-slate-950/35 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={`qf-surface fixed inset-y-0 left-0 z-50 flex h-screen min-h-0 flex-col border-r p-3 transition-[width,transform] duration-300 md:relative md:inset-auto md:translate-x-0 ${
          collapsed ? "md:w-20" : "md:w-72"
        } ${mobileOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full"}`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between gap-2 px-1">
          <DashboardBrandLogo
            href="/"
            label="QuantumFinix dashboard home"
            className={`object-contain object-left transition-all ${collapsed ? "h-9 w-12 md:w-12" : "h-10 w-[150px]"}`}
          />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 md:hidden"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="qf-sidebar-scroll mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain pr-1">
          {can(overviewNavigation.permission) ? (
            <SidebarLink
              item={overviewNavigation}
              pathname={pathname}
              collapsed={collapsed}
            />
          ) : null}

          {allowedGroups.map((group) => {
            const GroupIcon = group.icon;
            const groupActive = group.items.some((item) =>
              item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`),
            );
            const expanded = expandedGroups[group.label] ?? groupActive;

            return (
              <div key={group.label} className="qf-surface-muted rounded-2xl border p-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedGroups((current) => ({
                      ...current,
                      [group.label]: !(current[group.label] ?? groupActive),
                    }))
                  }
                  title={collapsed ? group.label : undefined}
                  aria-expanded={expanded}
                  className={`flex h-10 w-full items-center rounded-xl text-xs font-black uppercase tracking-[0.12em] transition ${
                    collapsed ? "justify-center px-2" : "gap-3 px-3"
                  } ${
                    groupActive
                      ? "text-blue-600"
                      : "qf-muted hover:bg-[var(--qf-surface)] hover:text-[var(--qf-text)]"
                  }`}
                >
                  <GroupIcon size={17} className="shrink-0" />
                  <span className={`min-w-0 flex-1 truncate text-left ${collapsed ? "md:hidden" : ""}`}>
                    {group.label}
                  </span>
                  <ChevronDown
                    size={15}
                    className={`${collapsed ? "hidden" : ""} shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>

                {expanded ? (
                  <div className="mt-1 space-y-1">
                    {group.items.map((item) => (
                      <SidebarLink
                        key={item.href}
                        item={item}
                        pathname={pathname}
                        collapsed={collapsed}
                        nested
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="qf-border shrink-0 space-y-2 border-t pt-3">
          <Link
            href="/profile/personal"
            title={collapsed ? "My profile" : undefined}
            className={`qf-secondary-button flex h-11 items-center rounded-xl text-sm font-bold transition ${
              collapsed ? "justify-center px-2" : "justify-center px-4"
            }`}
          >
            <Users size={17} className={collapsed ? "" : "mr-2"} />
            <span className={collapsed ? "md:hidden" : ""}>My profile</span>
          </Link>
          <button
            type="button"
            disabled={logoutState.isLoading}
            onClick={() => void logout()}
            title={collapsed ? "Sign out" : undefined}
            className={`flex h-11 w-full items-center rounded-xl border border-rose-200 bg-rose-50 text-sm font-bold text-rose-700 transition hover:bg-rose-100 ${
              collapsed ? "justify-center px-2" : "justify-center gap-2 px-4"
            }`}
          >
            <LogOut size={17} />
            <span className={collapsed ? "md:hidden" : ""}>Sign out</span>
          </button>
          <button
            type="button"
            onClick={toggleCollapsed}
            className="qf-secondary-button hidden h-10 w-full items-center justify-center rounded-xl transition md:flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </aside>

      <div className="relative z-10 flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <header className="qf-surface z-30 flex h-20 shrink-0 items-center justify-between border-b px-5 backdrop-blur-xl md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="qf-icon-button md:hidden"
              aria-label="Open dashboard navigation"
            >
              <Menu size={20} />
            </button>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Admin workspace</p>
              <div className="mt-1 flex min-w-0 items-center gap-2 text-sm">
                <Link href="/dashboard" className="font-semibold text-slate-400 transition hover:text-blue-700">Dashboard</Link>
                <ChevronRight size={14} className="shrink-0 text-slate-300" />
                <span className="truncate font-bold text-slate-800">{currentLabel}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <DashboardThemeToggle />
            <Link
              href="/"
              target="_blank"
              className="qf-secondary-button hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition md:inline-flex"
            >
              Public site <ExternalLink size={15} />
            </Link>
            <div className="hidden max-w-52 text-right sm:block">
              <p className="truncate text-xs font-bold text-slate-700">{email}</p>
              <p className="mt-0.5 text-[10px] font-black uppercase tracking-widest text-blue-600">{user?.role?.replace(/-/g, " ") || "Administrator"}</p>
            </div>
            <Link href="/profile/personal" className="qf-surface-muted grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border text-xs font-black" aria-label="Open my profile">
              {profilePicture ? <img src={profilePicture} alt={profile.data?.data.fullName || "Profile"} className="h-full w-full object-cover" /> : initials}
            </Link>
          </div>
        </header>

        <main className="qf-admin-surface qf-app-shell min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-7 md:px-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {hasPageAccess ? children : (
              <div className="grid min-h-[60vh] place-items-center">
                <div className="max-w-lg rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
                  <ShieldAlert className="mx-auto text-amber-600" size={34} />
                  <h1 className="mt-5 text-2xl font-black">Module access required</h1>
                  <p className="mt-3 leading-7 text-slate-500">Your role does not include access to this dashboard module. Ask a Super Admin to update the role permissions.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
