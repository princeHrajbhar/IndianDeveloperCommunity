// File: app/page.tsx
'use client';

import Hero from '@/components/Hero';
import ProcessStep from '@/components/ProcessStep';
import TechStack from '@/components/TechStack';
import ProcessStepVertical from '@/components/ProcessStepsVertical'
import ServicesShowcase from '@/components/ServicesShowcase';
import ShowcaseStats from '@/components/ShowcaseStats';


export default function Landing() {
  return (
    <>
      <Hero />
       <TechStack />

       <ProcessStep/>
       <ProcessStepVertical/>
       <ServicesShowcase/>
       <ShowcaseStats/>
    </>
  );
}