import type { Metadata } from "next";
// File: app/page.tsx
import AICinematicShell from "@/src/components/background/AICinematicShell";
import StartupCredibility from "@/src/components/home/StartupCredibility";
import TechnologyTrustStrip from "@/src/components/home/TechnologyTrustStrip";
import ProblemsOutcomes from "@/src/components/home/ProblemsOutcomes";
import CoreServices from "@/src/components/home/CoreServices";
import FeaturedCaseStudies from "@/src/components/home/FeaturedCaseStudies";
import RemainingHomeSections from "@/src/components/home/RemainingHomeSections";
import Hero from "@/src/components/home/Hero";
import ControlledAIImplementation from "@/src/components/home/test/ControlledAIImplementation";
import DifferentDevelopmentPartner from "@/src/components/home/test/DifferentDevelopmentPartner";
import EngineeringKnowledge from "@/src/components/home/test/EngineeringKnowledge";
import FoundingYearTransparency from "@/src/components/home/test/FoundingYearTransparency";
import FrequentlyAskedQuestions from "@/src/components/home/test/FrequentlyAskedQuestions";
import IndustrySolutionPathways from "@/src/components/home/test/IndustrySolutionPathways";
import LongTermMission from "@/src/components/home/test/LongTermMission";
import ProjectConversationsOpen from "@/src/components/home/test/ProjectConversationsOpen";
import VisibleDeliverySystem from "@/src/components/home/test/VisibleDeliverySystem";


export const metadata: Metadata = {
  title: "AI, automation and software engineering",
  description: "QuantumFinix builds responsible AI products, workflow automation, custom software and research-led digital systems for modern organizations.",
};

export default function Landing() {
  return (
    <>
      <Hero />
       <AICinematicShell showLogoWatermark>
      <TechnologyTrustStrip />

      <StartupCredibility/>
        {/* <ProblemsOutcomes /> */}
   <CoreServices />
 {/* <FeaturedCaseStudies /> */}
  {/* <RemainingHomeSections /> */}
  <ControlledAIImplementation/>
{/* <DifferentDevelopmentPartner/> */}
{/* <EngineeringKnowledge/> */}

<IndustrySolutionPathways/>
<ProjectConversationsOpen/>
<VisibleDeliverySystem/>
<FoundingYearTransparency/>
<FrequentlyAskedQuestions/>
{/* <LongTermMission/> */}






    </AICinematicShell>
     
    </>
  );
}
