"use client"
import { JoinInitiative } from "@/components/vision/JoinInitiative";
import { VisionApproach } from "@/components/vision/VisionApproach";
import { VisionHero } from "@/components/vision/VisionHero";
import { VisionImpact } from "@/components/vision/VisionImpact";


export default function VisionPage() {  
  return (  
    <div className="overflow-hidden">  
      <VisionHero />  
      <VisionApproach />  
      <VisionImpact />  
      <JoinInitiative />  
    </div>  
  );  
}  