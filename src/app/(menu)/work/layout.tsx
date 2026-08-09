import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Our work',
  description: 'Explore QuantumFinix case studies, product work and practical AI, automation and software outcomes.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
