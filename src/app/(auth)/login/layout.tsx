import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in securely to your QuantumFinix account and access your profile or authorized dashboard modules.',
  robots: { index: false, follow: false },
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
