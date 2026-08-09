import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Verify account',
  description: 'Verify your QuantumFinix account using the one-time code sent to your email.',
  robots: { index: false, follow: false },
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
