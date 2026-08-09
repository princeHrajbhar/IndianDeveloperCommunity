import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Generative AI solutions',
  description: 'Build useful generative AI products with retrieval, integrations, permissions, evaluation and human oversight.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
