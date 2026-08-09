import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Create a QuantumFinix account to manage your profile, applications, courses and platform activity.',
  robots: { index: false, follow: false },
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
