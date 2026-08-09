import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Videos and shorts',
  description: 'Watch QuantumFinix long-form videos and short explainers about AI, software, automation, research and product engineering.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
