// File: app/page.tsx
"use client";

import Hero from "@/components/home/Hero";
import ProcessStep from "@/components/home/ProcessStep";
import TechStack from "@/components/home/TechStack";
import ProcessStepVertical from "@/components/home/ProcessStepsVertical";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import ShowcaseStats from "@/components/home/ShowcaseStats";

export default function Landing() {
  return (
    <>
      <Hero />
      <TechStack />

      <ProcessStep />

      <ServicesShowcase />
      <ShowcaseStats />
      <ProcessStepVertical />
    </>
  );
}
