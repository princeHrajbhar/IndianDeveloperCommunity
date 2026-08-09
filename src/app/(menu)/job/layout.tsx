import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Job opportunities',
  description: 'Review QuantumFinix job details and submit a secure application.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
