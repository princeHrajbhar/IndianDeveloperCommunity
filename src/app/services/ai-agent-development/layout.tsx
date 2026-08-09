import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'AI agent development',
  description: 'Build governed AI agents with tools, permissions, evaluation, monitoring and human approval for sensitive actions.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
