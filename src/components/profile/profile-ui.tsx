"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export const inputClass = "qf-input h-12 w-full rounded-xl px-4 text-sm transition";
export const textareaClass = `${inputClass} min-h-32 resize-y py-3 leading-6`;

export function PageHeading({eyebrow,title,accent,description,action}:{eyebrow:string;title:string;accent?:string;description:string;action?:ReactNode}) {
  const reduceMotion = Boolean(useReducedMotion());
  return <motion.header initial={reduceMotion?undefined:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5,ease:[.22,1,.36,1]}} className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[var(--qf-primary-text)]">{eyebrow}</p><h1 className="qf-text mt-3 text-3xl font-black tracking-[-.045em] sm:text-4xl">{title}{accent?<span className="block text-[var(--qf-primary-text)]">{accent}</span>:null}</h1><p className="qf-muted mt-4 max-w-2xl text-sm leading-7 sm:text-base">{description}</p></div>{action?<div className="shrink-0">{action}</div>:null}</motion.header>;
}

export function Panel({children,className="",delay=0}:{children:ReactNode;className?:string;delay?:number}) {
  const reduceMotion=Boolean(useReducedMotion());
  return <motion.section initial={reduceMotion?undefined:{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.45,delay,ease:[.22,1,.36,1]}} className={`qf-surface qf-shadow overflow-hidden rounded-2xl border ${className}`}>{children}</motion.section>;
}
export function PanelHeader({title,description,action}:{title:string;description?:string;action?:ReactNode}) {return <div className="qf-border flex flex-col gap-4 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><h2 className="qf-text text-lg font-bold tracking-[-.025em]">{title}</h2>{description?<p className="qf-muted mt-1.5 text-sm leading-6">{description}</p>:null}</div>{action?<div className="shrink-0">{action}</div>:null}</div>}
export function Field({label,hint,children}:{label:string;hint?:string;children:ReactNode}) {return <label className="block"><span className="qf-text-secondary mb-2 block text-[11px] font-semibold uppercase tracking-[.13em]">{label}</span>{children}{hint?<span className="qf-muted mt-2 block text-xs leading-5">{hint}</span>:null}</label>}
export function PrimaryButton({className="",...props}:ButtonHTMLAttributes<HTMLButtonElement>) {return <button {...props} className={`qf-primary-button inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${className}`}/>}
export function SecondaryButton({className="",...props}:ButtonHTMLAttributes<HTMLButtonElement>) {return <button {...props} className={`qf-secondary-button inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition ${className}`}/>}
export function StatusBadge({children,tone="cyan"}:{children:ReactNode;tone?:"cyan"|"amber"|"emerald"|"slate"|"rose"}) {const tones={cyan:"qf-status-info",amber:"qf-status-warning",emerald:"qf-status-success",slate:"qf-status-neutral",rose:"qf-status-danger"};return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.12em] ${tones[tone]}`}>{children}</span>}
export function EmptyState({title,description,action}:{title:string;description:string;action?:ReactNode}) {return <div className="px-6 py-14 text-center"><span className="qf-border mx-auto block h-10 w-10 rounded-full border border-dashed"/><h3 className="qf-text mt-5 font-bold">{title}</h3><p className="qf-muted mx-auto mt-2 max-w-md text-sm leading-6">{description}</p>{action?<div className="mt-6">{action}</div>:null}</div>}
