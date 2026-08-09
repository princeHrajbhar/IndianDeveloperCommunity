import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Product development services',
  description: 'Move from product strategy to dependable software through discovery, design, engineering, testing and launch support.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
