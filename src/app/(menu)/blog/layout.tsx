import type { Metadata } from "next";
import type { ReactNode } from "react";
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read QuantumFinix articles about AI engineering, automation, software delivery, security and applied research.',
};

export default function ContentLayout({ children }: { children: ReactNode }) { return <div className="qf-content-module bg-[#030712] text-white">{children}</div>; }
