import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Automation and integration',
  description: 'Connect systems and automate workflows with resilient orchestration, approvals, exception handling and monitoring.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
