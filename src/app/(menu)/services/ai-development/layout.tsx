import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'AI development services',
  description: 'Design and build production-ready AI applications with trusted data, evaluation, guardrails and measurable workflows.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
