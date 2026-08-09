import type { Metadata } from "next";
import ListSection from "@/src/components/blog/BlogListing";
import { ContentHero } from "@/src/components/content/content-hero";

export const metadata: Metadata = {
  title: "Blog",
  description: "QuantumFinix insights on AI, automation, software engineering, research, and digital transformation.",
};

export default function BlogPage() {
  return (
    <div className="qf-content-module min-h-screen bg-[#030712]">
      <ContentHero eyebrow="QuantumFinix knowledge" title="Ideas engineered for" accent="real-world impact." description="Practical thinking on AI, product engineering, automation, cloud systems, and emerging technology." />
      <ListSection />
    </div>
  );
}
