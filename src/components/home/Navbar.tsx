"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";
import { useGetPublishedServicePagesQuery } from "@/src/lib/features/service-pages/service-page-api";

type DropdownName = "services" | "more" | null;

type DropdownItem = {
  title: string;
  description: string;
  href: string;
};

const staticServices: DropdownItem[] = [
  {
    title: "AI Software Development",
    description: "Custom AI products designed around your business.",
    href: "/services/ai-software-development",
  },
  {
    title: "Custom Software Development",
    description: "Scalable web, mobile, cloud and enterprise software.",
    href: "/services/custom-software-development",
  },
  {
    title: "Automation & Integration",
    description: "Automate workflows and connect your existing systems.",
    href: "/services/automation-integration",
  },
  {
    title: "Research & Development",
    description: "Future-focused technology research and experimentation.",
    href: "/services/research-development",
  },
];

const moreItems: DropdownItem[] = [
  {
    title: "Blog",
    description: "Read insights, guides and the latest company updates.",
    href: "/blog",
  },
  {
    title: "About",
    description: "Learn more about QuantumFinix, our mission and our team.",
    href: "/about",
  },
  {
    title: "Videos",
    description: "Watch product explainers, tutorials and technology videos.",
    href: "/videos",
  },
  {
    title: "Case Studies",
    description: "Explore real projects, solutions and measurable outcomes.",
    href: "/case-studies",
  },
];

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const { data: sessionResponse, isLoading, isFetching } = useGetMeQuery(
    undefined,
    {
      refetchOnMountOrArgChange: false,
    },
  );
  const currentUser = sessionResponse?.data;
  const checkingSession = !currentUser && (isLoading || isFetching);
  const publishedServices = useGetPublishedServicePagesQuery(
    { page: 1, limit: 100 },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true },
  );
  const services = useMemo<DropdownItem[]>(() => {
    const dynamic = (publishedServices.data?.data ?? []).map((item) => ({
      title: item.title,
      description: item.description || item.seoDescription || "Explore this QuantumFinix service.",
      href: `/services/${item.slug}`,
    }));
    const byHref = new Map<string, DropdownItem>();
    [...dynamic, ...staticServices].forEach((item) => {
      if (!byHref.has(item.href)) byHref.set(item.href, item);
    });
    return [...byHref.values()];
  }, [publishedServices.data]);

  const [desktopDropdown, setDesktopDropdown] =
    useState<DropdownName>(null);

  const [mobileDropdown, setMobileDropdown] =
    useState<DropdownName>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        closeAllMenus();
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeAllMenus();
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  function closeAllMenus() {
    setDesktopDropdown(null);
    setMobileDropdown(null);
    setMobileMenuOpen(false);
  }

  return (
    <motion.header
      ref={headerRef}
      initial={{
        opacity: 0,
        y: -18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="sticky inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#020711]/90 shadow-[0_15px_45px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-5 sm:px-7 lg:px-10 xl:px-16">
        <BrandLogo onClick={closeAllMenus} />

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 xl:flex"
        >
          <DesktopDropdown
            name="services"
            label="Services"
            items={services}
            activeDropdown={desktopDropdown}
            setActiveDropdown={setDesktopDropdown}
          />

          <DesktopLink
            label="AI Solutions"
            href="/ai-solutions"
            onClick={closeAllMenus}
          />

          <DesktopLink
            label="Careers"
            href="/job"
            onClick={closeAllMenus}
          />

          <DesktopLink
            label="Courses"
            href="/course"
            onClick={closeAllMenus}
          />

          <DesktopDropdown
            name="more"
            label="See more"
            items={moreItems}
            activeDropdown={desktopDropdown}
            setActiveDropdown={setDesktopDropdown}
            showViewAll={false}
          />
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <AccountAction
            authenticated={Boolean(currentUser)}
            checking={checkingSession}
            onClick={closeAllMenus}
          />

          {currentUser?.permissions?.includes("dashboard.view") ? (
            <Link
              href="/dashboard"
              onClick={closeAllMenus}
              className="inline-flex h-11 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-5 text-sm font-semibold text-amber-100"
            >
              Dashboard
            </Link>
          ) : null}

          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] px-5 text-sm font-medium text-slate-200 transition duration-300 hover:border-cyan-300/30 hover:bg-cyan-300/[0.07] hover:text-white"
            >
              Contact
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/book-consultation"
              className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 px-6 text-sm font-bold text-[#020711] shadow-[0_0_35px_rgba(34,211,238,0.22)]"
            >
              <span className="absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/65 to-transparent transition-transform duration-700 group-hover:translate-x-[140%]" />

              <span className="relative flex items-center gap-2">
                Book a Free Consultation
                <ArrowIcon />
              </span>
            </Link>
          </motion.div>
        </div>

        <button
          type="button"
          aria-label={
            mobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={mobileMenuOpen}
          onClick={() => {
            setMobileMenuOpen((current) => !current);
            setDesktopDropdown(null);
          }}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-white transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.07] xl:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileMenuOpen ? (
              <motion.span
                key="close"
                initial={{
                  opacity: 0,
                  rotate: -90,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 90,
                  scale: 0.7,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <CloseIcon />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{
                  opacity: 0,
                  rotate: 90,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: -90,
                  scale: 0.7,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <MenuIcon />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden border-t border-white/[0.07] bg-[#020711]/98 xl:hidden"
          >
            <div className="max-h-[calc(100dvh-80px)] overflow-y-auto px-5 py-5 sm:px-7">
              <div className="mx-auto max-w-2xl">
                <MobileDropdown
                  name="services"
                  label="Services"
                  items={services}
                  activeDropdown={mobileDropdown}
                  setActiveDropdown={setMobileDropdown}
                  closeMenu={closeAllMenus}
                />

                <MobileLink
                  label="AI Solutions"
                  href="/ai-solutions"
                  onClick={closeAllMenus}
                />

                <MobileLink
                  label="Careers"
                  href="/job"
                  onClick={closeAllMenus}
                />

                <MobileLink
                  label="Courses"
                  href="/course"
                  onClick={closeAllMenus}
                />

                <MobileDropdown
                  name="more"
                  label="See more"
                  items={moreItems}
                  activeDropdown={mobileDropdown}
                  setActiveDropdown={setMobileDropdown}
                  closeMenu={closeAllMenus}
                />

                <div className="mt-6 grid gap-3 border-t border-white/[0.07] pt-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <AccountAction
                      authenticated={Boolean(currentUser)}
                      checking={checkingSession}
                      onClick={closeAllMenus}
                      mobile
                    />

                    {currentUser?.permissions?.includes("dashboard.view") ? (
                      <Link
                        href="/dashboard"
                        onClick={closeAllMenus}
                        className="inline-flex h-12 w-full items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/[0.07] text-sm font-semibold text-amber-100"
                      >
                        Admin Dashboard
                      </Link>
                    ) : null}
                  </div>

                  <Link
                    href="/contact"
                    onClick={closeAllMenus}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-sm font-medium text-white"
                  >
                    Contact
                  </Link>

                  <Link
                    href="/book-consultation"
                    onClick={closeAllMenus}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-5 text-center text-sm font-bold text-[#020711]"
                  >
                    Book a Free Consultation
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function AccountAction({
  authenticated,
  checking,
  onClick,
  mobile = false,
}: {
  authenticated: boolean;
  checking: boolean;
  onClick: () => void;
  mobile?: boolean;
}) {
  if (checking) {
    return (
      <span
        aria-label="Checking account session"
        className={[
          "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-sm text-slate-500",
          mobile ? "h-12 w-full" : "h-11 min-w-24 px-5",
        ].join(" ")}
      >
        Checking…
      </span>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={mobile ? "w-full" : undefined}
    >
      <Link
        href={authenticated ? "/profile/personal" : "/login"}
        onClick={onClick}
        className={[
          "inline-flex items-center justify-center rounded-full border text-sm font-semibold transition duration-300",
          mobile ? "h-12 w-full" : "h-11 px-5",
          authenticated
            ? "border-cyan-300/25 bg-cyan-300/[0.08] text-cyan-100 hover:bg-cyan-300/[0.14]"
            : "border-white/10 bg-white/[0.035] text-white hover:border-cyan-300/30 hover:bg-cyan-300/[0.07]",
        ].join(" ")}
      >
        {authenticated ? "My Profile" : "Login"}
      </Link>
    </motion.div>
  );
}

function BrandLogo({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="QuantumFinix home"
      className="group flex shrink-0 items-center gap-3"
    >
      <span className="relative h-10 w-[148px] shrink-0 transition group-hover:opacity-90 sm:h-11 sm:w-[164px]">
        <Image src="/logo.png" alt="QuantumFinix logo" fill priority sizes="(min-width: 640px) 164px, 148px" className="object-contain object-left" />
      </span>
    </Link>
  );
}

type DesktopDropdownProps = {
  name: Exclude<DropdownName, null>;
  label: string;
  items: DropdownItem[];
  activeDropdown: DropdownName;
  setActiveDropdown: (name: DropdownName) => void;
  showViewAll?: boolean;
};

function DesktopDropdown({
  name,
  label,
  items,
  activeDropdown,
  setActiveDropdown,
  showViewAll = true,
}: DesktopDropdownProps) {
  const open = activeDropdown === name;

  return (
    <div
      className="relative"
      onMouseEnter={() => setActiveDropdown(name)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setActiveDropdown(open ? null : name)}
        className={[
          "flex h-11 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition",
          open
            ? "bg-cyan-300/[0.07] text-cyan-100"
            : "text-slate-400 hover:bg-white/[0.035] hover:text-white",
        ].join(" ")}
      >
        {label}

        <motion.span
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <ChevronIcon />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-4"
          >
            <div
              role="menu"
              className="rounded-2xl border border-white/10 bg-[#06101c]/95 p-2 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
            >
              {items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setActiveDropdown(null)}
                  className="group flex items-start gap-4 rounded-xl px-4 py-3.5 transition hover:bg-cyan-300/[0.07]"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-300/10 bg-cyan-300/[0.06] text-cyan-200 transition group-hover:border-cyan-300/25">
                    <SmallArrowIcon />
                  </span>

                  <span>
                    <span className="block text-sm font-medium text-slate-100 group-hover:text-cyan-100">
                      {item.title}
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      {item.description}
                    </span>
                  </span>
                </Link>
              ))}

              {showViewAll ? (
                <div className="mt-2 border-t border-white/[0.07] px-4 pb-2 pt-4">
                  <Link
                    href={`/${name}`}
                    onClick={() => setActiveDropdown(null)}
                    className="group flex items-center justify-between text-xs font-medium text-cyan-200"
                  >
                    View all {label.toLowerCase()}

                    <span className="transition group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </Link>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DesktopLink({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex h-11 items-center rounded-full px-3.5 text-[13px] font-medium text-slate-400 transition hover:bg-white/[0.035] hover:text-white"
    >
      {label}
    </Link>
  );
}

type MobileDropdownProps = {
  name: Exclude<DropdownName, null>;
  label: string;
  items: DropdownItem[];
  activeDropdown: DropdownName;
  setActiveDropdown: (name: DropdownName) => void;
  closeMenu: () => void;
};

function MobileDropdown({
  name,
  label,
  items,
  activeDropdown,
  setActiveDropdown,
  closeMenu,
}: MobileDropdownProps) {
  const open = activeDropdown === name;

  return (
    <div className="border-b border-white/[0.06]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setActiveDropdown(open ? null : name)}
        className="flex w-full items-center justify-between py-4 text-sm font-medium text-slate-200"
      >
        {label}

        <motion.span
          animate={{
            rotate: open ? 180 : 0,
          }}
        >
          <ChevronIcon />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="overflow-hidden"
          >
            <div className="space-y-1 pb-4">
              {items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-xl bg-white/[0.025] px-4 py-3 transition hover:bg-cyan-300/[0.06]"
                >
                  <span className="block text-sm text-slate-200">
                    {item.title}
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-slate-600">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileLink({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex border-b border-white/[0.06] py-4 text-sm font-medium text-slate-200 transition hover:text-cyan-200"
    >
      {label}
    </Link>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M4 10h12m-4-4 4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmallArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M5 10h10m-3-3 3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        d="m6 8 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}