import Detail from "@/src/components/blog/Detail";
import { ContentHero } from "@/src/components/content/content-hero";
export default function BlogDetailPage() {
  return <div className="min-h-screen bg-[#030712]"><ContentHero eyebrow="QuantumFinix blog" title="Engineering insight," accent="explained clearly." description="Deep dives, practical guidance, and technical perspectives from the QuantumFinix knowledge platform." /><Detail /></div>;
}
