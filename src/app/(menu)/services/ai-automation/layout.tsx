import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'AI automation services',
  description: 'Automate operational workflows with governed AI, integrations, approvals, monitoring and reliable exception handling.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
