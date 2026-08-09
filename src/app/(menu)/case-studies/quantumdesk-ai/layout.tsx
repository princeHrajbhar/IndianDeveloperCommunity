import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'QuantumDesk AI case study',
  description: 'See how QuantumDesk AI brings governed assistance, knowledge retrieval and workflow support into one product experience.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
