import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Forgot password',
  description: 'Request a secure QuantumFinix password reset link.',
  robots: { index: false, follow: false },
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
