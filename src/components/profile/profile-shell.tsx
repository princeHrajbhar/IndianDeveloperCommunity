"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

import { baseApi } from "@/src/lib/api/base-api";
import { useLogoutMutation } from "@/src/lib/features/auth/auth-api";
import { selectCurrentUser, sessionCleared } from "@/src/lib/features/auth/auth-slice";
import {
  useGetProfileQuery,
  useGetProfileStatsQuery,
} from "@/src/lib/features/profiles/profile-api";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";

type IconName =
  | "user"
  | "document"
  | "application"
  | "support"
  | "notification"
  | "course"
  | "security"
  | "menu"
  | "close"
  | "search"
  | "chevronLeft"
  | "chevronRight"
  | "logout"
  | "arrow";

const navigation: Array<{ label: string; href: string; icon: IconName }> = [
  { label: "Personal Info", href: "/profile/personal", icon: "user" },
  { label: "My Courses", href: "/profile/courses", icon: "course" },
  { label: "Documents", href: "/profile/documents", icon: "document" },
  { label: "Applications", href: "/profile/applications", icon: "application" },
  { label: "Support", href: "/profile/support", icon: "support" },
  { label: "Notifications", href: "/profile/notifications", icon: "notification" },
  { label: "Security", href: "/profile/security", icon: "security" },
];

export function ProfileShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const { data: profileResponse, error: profileError } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const profile = profileResponse?.data;
  const profileMissing = hasHttpStatus(profileError, 404);
  const { data: statsResponse } = useGetProfileStatsQuery(undefined, {
    skip: !profile,
  });

  const displayName = profile?.fullName || formatAccountName(user?.email);
  const initials = getInitials(displayName);
  const avatarUrl = profile?.profilePicture?.url;
  const completion = statsResponse?.data.completion.percentage ?? (profile?.isProfileComplete ? 100 : 0);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030712] text-white">
      <BackgroundEffects />
      <TopNavbar
        onOpenSidebar={() => setMobileOpen(true)}
        displayName={displayName}
        email={user?.email ?? profile?.email ?? ""}
        role={user?.role ?? profile?.role ?? "user"}
        initials={initials}
        avatarUrl={avatarUrl}
      />

      <AnimatePresence>
        {mobileOpen ? (
          <motion.button
            type="button"
            aria-label="Close sidebar overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/75 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapse={() => setCollapsed((value) => !value)}
        onCloseMobile={() => setMobileOpen(false)}
        displayName={displayName}
        email={user?.email ?? profile?.email ?? ""}
        initials={initials}
        avatarUrl={avatarUrl}
        completion={completion}
        profileMissing={profileMissing}
      />

      <main
        className={[
          "relative z-10 min-h-screen pt-[72px] transition-[padding] duration-300",
          collapsed ? "lg:pl-[88px]" : "lg:pl-[288px]",
        ].join(" ")}
      >
        <div className="mx-auto w-full max-w-[1500px] px-5 py-8 sm:px-7 lg:px-10 lg:py-10 xl:px-12">
          {children}
        </div>
      </main>
    </div>
  );
}

function BackgroundEffects() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute left-[16%] top-[-18rem] h-[36rem] w-[36rem] rounded-full bg-cyan-400/[0.055] blur-[120px]" />
      <div className="absolute bottom-[-20rem] right-[-10rem] h-[38rem] w-[38rem] rounded-full bg-blue-500/[0.05] blur-[130px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />
    </div>
  );
}

function TopNavbar({
  onOpenSidebar,
  displayName,
  email,
  role,
  initials,
  avatarUrl,
}: {
  onOpenSidebar: () => void;
  displayName: string;
  email: string;
  role: string;
  initials: string;
  avatarUrl?: string;
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  async function signOut() {
    try {
      await logout().unwrap();
    } finally {
      dispatch(sessionCleared());
      dispatch(baseApi.util.resetApiState());
      router.replace("/login");
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-white/[0.08] bg-[#030712]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1800px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Open profile navigation"
          onClick={onOpenSidebar}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] text-slate-400 transition hover:border-cyan-300/20 hover:text-cyan-200 lg:hidden"
        >
          <Icon name="menu" className="h-5 w-5" />
        </button>

        <Link href="/" aria-label="QuantumFinix home" className="group flex shrink-0 items-center">
          <span className="relative h-10 w-[148px] shrink-0 transition group-hover:opacity-90 sm:h-11 sm:w-[164px]">
            <Image src="/logo.png" alt="QuantumFinix logo" fill priority sizes="(min-width: 640px) 164px, 148px" className="object-contain object-left" />
          </span>
        </Link>

        <div className="mx-auto hidden w-full max-w-lg md:block">
          <label className="relative block">
            <span className="sr-only">Search account</span>
            <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
            <input
              type="search"
              placeholder="Search your account..."
              className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/30 focus:bg-white/[0.035] focus:ring-4 focus:ring-cyan-300/[0.05]"
            />
          </label>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/profile/notifications"
            aria-label="Notifications"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] text-slate-400 transition hover:border-cyan-300/20 hover:text-cyan-200"
          >
            <Icon name="notification" className="h-5 w-5" />
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((value) => !value)}
              aria-expanded={profileOpen}
              className="flex items-center gap-2 rounded-xl border border-transparent p-1.5 pr-2 transition hover:border-white/[0.08] hover:bg-white/[0.025]"
            >
              <Avatar initials={initials} avatarUrl={avatarUrl} size="small" />
              <span className="hidden text-left sm:block">
                <span className="block max-w-40 truncate text-xs font-semibold leading-4 text-white">{displayName}</span>
                <span className="block max-w-40 truncate text-[10px] text-slate-600">{email || `${role} account`}</span>
              </span>
              <Icon name="arrow" className="hidden h-4 w-4 rotate-90 text-slate-600 sm:block" />
            </button>

            <AnimatePresence>
              {profileOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  className="absolute right-0 top-12 w-56 rounded-2xl border border-white/[0.1] bg-[#07101f] p-2 shadow-2xl shadow-black/40"
                >
                  <Link href="/profile/personal" className="block rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-white/[0.04] hover:text-cyan-200">Personal information</Link>
                  <Link href="/profile/security" className="block rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-white/[0.04] hover:text-cyan-200">Account security</Link>
                  <div className="my-1 border-t border-white/[0.07]" />
                  <button
                    type="button"
                    disabled={isLoggingOut}
                    onClick={signOut}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-rose-300 hover:bg-rose-300/[0.06] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Icon name="logout" className="h-4 w-4" />
                    {isLoggingOut ? "Signing out..." : "Sign out"}
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

function Sidebar({
  collapsed,
  mobileOpen,
  onCollapse,
  onCloseMobile,
  displayName,
  email,
  initials,
  avatarUrl,
  completion,
  profileMissing,
}: {
  collapsed: boolean;
  mobileOpen: boolean;
  onCollapse: () => void;
  onCloseMobile: () => void;
  displayName: string;
  email: string;
  initials: string;
  avatarUrl?: string;
  completion: number;
  profileMissing: boolean;
}) {
  const pathname = usePathname() || "/profile/personal";
  const safeCompletion = Math.max(0, Math.min(100, Math.round(completion)));

  return (
    <aside
      className={[
        "fixed bottom-0 left-0 top-[72px] z-50 border-r border-white/[0.08] bg-[#050a14]/92 backdrop-blur-xl transition-all duration-300",
        collapsed ? "lg:w-[88px]" : "lg:w-[288px]",
        mobileOpen ? "w-[288px] translate-x-0" : "w-[288px] -translate-x-full lg:translate-x-0",
      ].join(" ")}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-4 lg:hidden">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/60">Account menu</p>
          <button type="button" aria-label="Close navigation" onClick={onCloseMobile} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-white/[0.04] hover:text-white">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-white/[0.07] p-4">
          <div className={`relative overflow-hidden rounded-2xl border border-white/[0.08] p-4 ${collapsed ? "lg:p-3" : ""}`}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent" />
            <div className="flex items-center gap-3">
              <Avatar initials={initials} avatarUrl={avatarUrl} size="large" />
              <div className={collapsed ? "lg:hidden" : ""}>
                <p className="truncate text-sm font-semibold text-white">{displayName}</p>
                <p className="mt-1 max-w-40 truncate text-[10px] text-slate-600">{email || "Authenticated account"}</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.13em] text-cyan-300/45">
                  {profileMissing ? "Profile not created" : `Profile ${safeCompletion}% complete`}
                </p>
              </div>
            </div>
            {profileMissing ? (
              <Link
                href="/profile/personal"
                onClick={onCloseMobile}
                className={`mt-4 flex h-9 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/[0.06] text-[10px] font-semibold uppercase tracking-[0.13em] text-cyan-200 ${collapsed ? "lg:hidden" : ""}`}
              >
                Create profile
              </Link>
            ) : null}
            <div className={`mt-4 h-1 overflow-hidden rounded-full bg-white/[0.07] ${collapsed ? "lg:hidden" : ""}`}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_12px_rgba(34,211,238,.55)]"
                style={{ width: `${safeCompletion}%` }}
              />
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Profile navigation">
          <p className={`px-3 pb-2 pt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-700 ${collapsed ? "lg:hidden" : ""}`}>Workspace</p>
          {navigation.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                title={collapsed ? item.label : undefined}
                className={[
                  "group relative flex min-h-12 items-center gap-3 overflow-hidden rounded-xl px-3 text-sm font-medium transition",
                  active
                    ? "border border-cyan-300/15 bg-cyan-300/[0.065] text-cyan-100"
                    : "border border-transparent text-slate-500 hover:border-white/[0.06] hover:bg-white/[0.025] hover:text-slate-200",
                  collapsed ? "lg:justify-center lg:px-0" : "",
                ].join(" ")}
              >
                {active ? <span className="absolute inset-y-2 left-0 w-px bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.75)]" /> : null}
                <Icon name={item.icon} className="h-[18px] w-[18px] shrink-0" />
                <span className={collapsed ? "lg:hidden" : ""}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.07] p-3">
          <button type="button" onClick={onCollapse} className="hidden min-h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 transition hover:bg-white/[0.025] hover:text-cyan-200 lg:flex">
            <Icon name={collapsed ? "chevronRight" : "chevronLeft"} className="h-4 w-4" />
            <span className={collapsed ? "hidden" : ""}>Collapse</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

function Avatar({
  initials,
  avatarUrl,
  size,
}: {
  initials: string;
  avatarUrl?: string;
  size: "small" | "large";
}) {
  const sizeClass = size === "small" ? "h-9 w-9 rounded-xl" : "h-11 w-11 rounded-xl";
  return (
    <span className={`relative grid shrink-0 place-items-center overflow-hidden border border-cyan-300/20 bg-cyan-300/[0.07] text-xs font-bold text-cyan-200 ${sizeClass}`}>
      {avatarUrl ? (
        // Provider URLs are resolved by the backend and may use different domains.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}

function formatAccountName(email?: string): string {
  if (!email) return "QuantumFinix user";
  const localPart = email.split("@")[0] || "user";
  return localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ") || "QuantumFinix user";
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "QF";
}

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5 };
  const icons: Record<IconName, ReactNode> = {
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.7-4.3 3-6.5 7-6.5s6.3 2.2 7 6.5" /></>,
    document: <><path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v5h5M9 12h6M9 15h6M9 18h4" /></>,
    application: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 13h8M8 16h5" /></>,
    support: <><circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.3 2.3 0 1 1 3.8 1.8c-.9.7-1.6 1.1-1.6 2.2M12 17h.01" /></>,
    notification: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" /><path d="M10 21h4" /></>,
    course: <><path d="m3 8.5 9-4.5 9 4.5-9 4.5-9-4.5Z" /><path d="M6 10v5.5c3.7 2.4 8.3 2.4 12 0V10M21 9v6" /></>,
    security: <><path d="M12 3 5 6v5c0 4.3 2.6 7.2 7 9 4.4-1.8 7-4.7 7-9V6l-7-3Z" /><path d="m9.5 12 1.7 1.7 3.5-3.7" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    logout: <><path d="M10 5H5v14h5M13 8l4 4-4 4M8 12h9" /></>,
    arrow: <path d="m9 18 6-6-6-6" />,
  };
  return <svg {...common} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}

function hasHttpStatus(error: unknown, status: number): boolean {
  return Boolean(
    error &&
      typeof error === "object" &&
      "status" in error &&
      (error as { status?: unknown }).status === status,
  );
}
