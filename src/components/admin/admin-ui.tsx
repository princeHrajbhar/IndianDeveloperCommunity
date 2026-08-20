"use client";

import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export const inputClass =
  "qf-input h-11 w-full rounded-xl px-3 text-sm transition";

export const textareaClass =
  "qf-input min-h-28 w-full rounded-xl px-3 py-3 text-sm transition";

type StatusTone =
  | "cyan"
  | "emerald"
  | "amber"
  | "rose"
  | "slate";

type StatusValue =
  | string
  | number
  | boolean
  | null
  | undefined;

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`qf-surface qf-shadow overflow-hidden rounded-2xl border p-5 sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

export function PageHeading({
  eyebrow,
  title,
  accent,
  description,
  action,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={`mb-8 flex flex-wrap items-end justify-between gap-5 ${className}`}
    >
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="mt-2 qf-text text-3xl font-black tracking-tight sm:text-4xl">
          {title}
          {accent ? (
            <>
              {" "}
              <span className="text-blue-600">{accent}</span>
            </>
          ) : null}
        </h1>

        {description ? (
          <p className="qf-muted mt-3 max-w-2xl text-sm leading-6">
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <div className="flex flex-wrap items-center gap-3">
          {action}
        </div>
      ) : null}
    </header>
  );
}

export function PanelHeader({
  eyebrow,
  title,
  description,
  action,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`qf-border mb-5 flex flex-wrap items-start justify-between gap-4 border-b pb-5 ${className}`}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="qf-text mt-1 text-xl font-black">
          {title}
        </h2>

        {description ? (
          <p className="qf-muted mt-1 text-sm leading-6">
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {action}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Backward-compatible alias for existing admin screens.
 */
export function PanelTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <PanelHeader
      eyebrow={eyebrow}
      title={title}
      action={action}
    />
  );
}

export function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="qf-muted mb-2 block text-[11px] font-bold uppercase tracking-wider">
        {label}
      </span>

      {children}

      {hint ? (
        <span className="qf-muted mt-2 block text-xs leading-5">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

type AdminButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    danger?: boolean;
    secondary?: boolean;
  };

export function Button({
  children,
  type = "button",
  disabled,
  danger = false,
  secondary = false,
  className = "",
  ...props
}: AdminButtonProps) {
  const style = danger
    ? "qf-danger-button"
    : secondary
      ? "qf-secondary-button"
      : "qf-primary-button";

  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={`inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-45 ${style} ${className}`}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      {...props}
      className={className}
    >
      {children}
    </Button>
  );
}

export function SecondaryButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      {...props}
      secondary
      className={className}
    >
      {children}
    </Button>
  );
}

export function StatusBadge({
  value,
  children,
  tone,
  className = "",
}: {
  value?: StatusValue;
  children?: ReactNode;
  tone?: StatusTone;
  className?: string;
}) {
  const suppliedValue = children ?? value;

  const label =
    suppliedValue === null ||
    suppliedValue === undefined ||
    (typeof suppliedValue !== "object" &&
      String(suppliedValue).trim() === "")
      ? "Unknown"
      : suppliedValue;

  const normalized =
    typeof suppliedValue === "string" ||
    typeof suppliedValue === "number" ||
    typeof suppliedValue === "boolean"
      ? String(suppliedValue).trim().toLowerCase()
      : "";

  const isVerified =
    normalized.includes("verified") &&
    !normalized.includes("unverified");

  const inferredTone: StatusTone =
    normalized.includes("published") ||
    normalized.includes("converted") ||
    normalized.includes("hired") ||
    normalized.includes("completed") ||
    normalized.includes("acknowledged") ||
    normalized.includes("active") ||
    isVerified
      ? "emerald"
      : normalized.includes("failed") ||
          normalized.includes("rejected") ||
          normalized.includes("lost") ||
          normalized.includes("closed") ||
          normalized.includes("revoked") ||
          normalized.includes("disabled")
        ? "rose"
        : normalized.includes("urgent") ||
            normalized.includes("paused") ||
            normalized.includes("delayed") ||
            normalized.includes("pending") ||
            normalized.includes("action required")
          ? "amber"
          : "cyan";

  const selectedTone = tone ?? inferredTone;

  const toneClasses: Record<StatusTone, string> = {
    cyan: "qf-status-info",
    emerald: "qf-status-success",
    amber: "qf-status-warning",
    rose: "qf-status-danger",
    slate: "qf-status-neutral",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${toneClasses[selectedTone]} ${className}`}
    >
      {label}
    </span>
  );
}

export function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail?: string;
}) {
  return (
    <div className="qf-surface-muted rounded-2xl border p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-3 qf-text text-3xl font-black">
        {value}
      </p>

      {detail ? (
        <p className="mt-2 text-xs text-slate-500">
          {detail}
        </p>
      ) : null}
    </div>
  );
}

export function Empty({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="qf-border rounded-2xl border border-dashed p-10 text-center">
      <p className="qf-text font-black">{title}</p>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
        {description}
      </p>

      {action ? (
        <div className="mt-5 flex justify-center">
          {action}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Backward-compatible name required by document components.
 */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Empty
      title={title}
      description={description}
      action={action}
    />
  );
}

export function ErrorNotice({
  message,
}: {
  message: string;
}) {
  return (
    <div className="qf-status-danger rounded-xl border px-4 py-3 text-sm">
      {message}
    </div>
  );
}

export function SuccessNotice({
  message,
}: {
  message: string;
}) {
  return (
    <div className="qf-status-success rounded-xl border px-4 py-3 text-sm">
      {message}
    </div>
  );
}

export function LoadingRows({
  count = 4,
}: {
  count?: number;
}) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-16 animate-pulse rounded-2xl qf-surface-muted"
        />
      ))}
    </div>
  );
}

export function formatDate(
  value?: string | number | Date | null,
) {
  if (!value) {
    return "—";
  }

  const date = value instanceof Date
    ? value
    : new Date(value);

  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleString();
}

export function splitLines(value?: string | null): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}
export function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  const pages = paginationWindow(page, totalPages);
  return (
    <nav className="mt-5 flex flex-wrap items-center justify-end gap-2" aria-label="Pagination">
      <Button secondary disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Previous</Button>
      {pages.map((item, index) => item === "…" ? (
        <span key={`ellipsis-${index}`} className="px-1 text-sm text-slate-500">…</span>
      ) : (
        <button
          key={item}
          type="button"
          aria-current={item === page ? "page" : undefined}
          onClick={() => onPageChange(item)}
          className={`grid h-10 min-w-10 place-items-center rounded-xl border px-3 text-sm font-black transition ${
            item === page
              ? "qf-primary-button"
              : "qf-secondary-button"
          }`}
        >
          {item}
        </button>
      ))}
      <Button secondary disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Next</Button>
    </nav>
  );
}

function paginationWindow(page: number, totalPages: number): Array<number | "…"> {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);
  const pages = new Set([1, totalPages, page - 1, page, page + 1].filter((value) => value >= 1 && value <= totalPages));
  const ordered = [...pages].sort((a, b) => a - b);
  const result: Array<number | "…"> = [];
  ordered.forEach((value, index) => {
    if (index > 0 && value - ordered[index - 1]! > 1) result.push("…");
    result.push(value);
  });
  return result;
}
