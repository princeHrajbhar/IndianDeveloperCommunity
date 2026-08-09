import type { Metadata } from "next";
import ListSection from "@/src/components/course/CourseList";
import { ContentHero } from "@/src/components/content/content-hero";

export const metadata: Metadata = {
  title: "Courses",
  description: "Explore practical QuantumFinix courses in AI, software, automation, data, and emerging technology.",
};

export default function CoursePage() {
  return (
    <div className="qf-content-module min-h-screen bg-[#030712]">
      <ContentHero eyebrow="QuantumFinix learning" title="Build future-ready" accent="technical skills." description="Structured, practical courses designed for builders, professionals, and teams working with modern technology." />
      <ListSection />
    </div>
  );
}
