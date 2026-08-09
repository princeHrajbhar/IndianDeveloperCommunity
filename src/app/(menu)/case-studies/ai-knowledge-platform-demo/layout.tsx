import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'AI knowledge platform case study',
  description: 'Explore a QuantumFinix knowledge platform designed around trusted retrieval, permissions and usable workflows.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
