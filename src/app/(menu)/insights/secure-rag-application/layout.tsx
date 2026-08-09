import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'How to build a secure RAG application',
  description: 'Learn the architecture, access control, grounding, evaluation and monitoring practices behind secure retrieval-augmented generation.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
