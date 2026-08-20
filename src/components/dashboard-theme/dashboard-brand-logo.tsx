"use client";

import Link from "next/link";
import { useDashboardTheme } from "./dashboard-theme-provider";

export const LIGHT_DASHBOARD_LOGO = "https://res.cloudinary.com/dieuobok1/image/upload/v1787073557/managed/69c62b38bc6a31b6df9b6819/media/chatgpt-image-jul-4-2026-01-39-13-pm-9ce8ec966683.webp";
export const DARK_DASHBOARD_LOGO = "/logo.png";

export function DashboardBrandLogo({
  href,
  className = "h-10 w-[152px] object-contain object-left",
  label = "QuantumFinix workspace home",
}: {
  href: string;
  className?: string;
  label?: string;
}) {
  const { theme } = useDashboardTheme();
  const src = theme === "light" ? LIGHT_DASHBOARD_LOGO : DARK_DASHBOARD_LOGO;
  return (
    <Link href={href} aria-label={label} className="flex min-w-0 items-center overflow-hidden">
      <img src={src} alt="QuantumFinix" className={className} referrerPolicy="no-referrer" onError={(event) => { if (!event.currentTarget.src.endsWith("/logo.png")) event.currentTarget.src = DARK_DASHBOARD_LOGO; }} />
    </Link>
  );
}
