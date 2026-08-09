import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Quantum Research Network case study',
  description: 'Explore a research collaboration platform designed to organize knowledge, contributors and technical discovery.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
