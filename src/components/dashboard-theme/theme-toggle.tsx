"use client";

import { Moon, Sun } from "lucide-react";
import { useDashboardTheme } from "./dashboard-theme-provider";

export function DashboardThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useDashboardTheme();

  if (compact) {
    const next = theme === "light" ? "dark" : "light";
    return (
      <button
        type="button"
        onClick={() => setTheme(next)}
        aria-label={`Switch to ${next} theme`}
        title={`Switch to ${next} theme`}
        className="qf-icon-button"
      >
        {theme === "light" ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
      </button>
    );
  }

  return (
    <div className="qf-theme-switch" aria-label="Dashboard theme">
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={theme === "light" ? "is-active" : ""}
        aria-pressed={theme === "light"}
        title="Light theme"
      >
        <Sun className="h-4 w-4" />
        <span className="hidden xl:inline">Light</span>
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={theme === "dark" ? "is-active" : ""}
        aria-pressed={theme === "dark"}
        title="Dark theme"
      >
        <Moon className="h-4 w-4" />
        <span className="hidden xl:inline">Dark</span>
      </button>
    </div>
  );
}
