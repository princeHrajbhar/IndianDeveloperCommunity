import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Technology team extension',
  description: 'Extend your delivery team with QuantumFinix engineers, product specialists and AI practitioners aligned to your workflow.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
