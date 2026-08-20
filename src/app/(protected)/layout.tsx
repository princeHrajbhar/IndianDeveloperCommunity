import type { ReactNode } from "react";
import { DashboardThemeProvider } from "@/src/components/dashboard-theme/dashboard-theme-provider";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <DashboardThemeProvider>{children}</DashboardThemeProvider>;
}
