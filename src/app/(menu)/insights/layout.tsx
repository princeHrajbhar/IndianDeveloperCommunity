import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'AI and software insights',
  description: 'Practical QuantumFinix guidance on AI systems, secure knowledge applications and custom software delivery.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
