import type { Metadata } from "next";
import type { ReactNode } from "react";
export const metadata: Metadata = {
  title: 'Courses',
  description: 'Explore QuantumFinix courses designed to build practical AI, data, automation and software skills.',
};

export default function ContentLayout({ children }: { children: ReactNode }) { return <div className="qf-content-module bg-[#030712] text-white">{children}</div>; }
