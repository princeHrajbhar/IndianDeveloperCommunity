import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Machine learning development',
  description: 'Develop machine learning systems with strong data foundations, evaluation, deployment and operational monitoring.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
