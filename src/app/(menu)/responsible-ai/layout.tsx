import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Responsible AI',
  description: 'Review the QuantumFinix approach to responsible AI, human oversight, evaluation, security and operational control.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
