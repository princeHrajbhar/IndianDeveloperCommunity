import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'AI consulting',
  description: 'Identify valuable AI opportunities, validate feasibility and create a responsible implementation roadmap.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
