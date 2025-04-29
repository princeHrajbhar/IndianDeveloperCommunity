"use client"
import { TechComparison } from '@/components/techExplorer/TechComparison'
import { TechExplorerHero } from '@/components/techExplorer/TechExplorerHero'
import { TechFeatures } from '@/components/techExplorer/TechFeatures'
import TechLandingpage from '@/components/techExplorer/TechLandingpage'
import { TechRadar } from '@/components/techExplorer/TechRadar'
import React from 'react'

const page = () => {
  return (
    <div>
      <TechLandingpage/>
      <TechExplorerHero/>
      <TechFeatures/>
      <TechComparison/>
      <TechRadar/>
    </div>
  )
}

export default page
