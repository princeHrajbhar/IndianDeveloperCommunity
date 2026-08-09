import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'AI, automation and software services',
  description: 'Explore QuantumFinix services for AI products, automation, custom software, research and dependable digital delivery.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
