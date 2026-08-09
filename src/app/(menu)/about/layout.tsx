import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'About QuantumFinix',
  description: 'Learn how QuantumFinix combines AI, automation, product engineering and research to build dependable digital systems.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
