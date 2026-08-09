import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Explore QuantumFinix AI, automation and software solutions designed for modern industry workflows.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
