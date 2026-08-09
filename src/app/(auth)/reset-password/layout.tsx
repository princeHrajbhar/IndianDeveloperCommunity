import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Set a new secure password for your QuantumFinix account.',
  robots: { index: false, follow: false },
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
