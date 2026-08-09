import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'AI agent vs chatbot',
  description: 'Compare AI agents and chatbots, including autonomy, tools, workflow integration, risk and suitable business use cases.',
};

export default function RouteMetadataLayout({ children }: { children: ReactNode }) {
  return children;
}
