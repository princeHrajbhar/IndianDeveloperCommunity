import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Security',
  description: 'Learn how QuantumFinix approaches application security, data protection, access control and resilient delivery.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
