import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Generative AI development',
  description: 'Create generative AI applications with secure retrieval, evaluation, integrations and practical user experiences.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
