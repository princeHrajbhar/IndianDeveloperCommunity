// app/(menu)/about/page.tsx
"use client"

import dynamic from 'next/dynamic'
import React from 'react'

// Dynamically import components with no SSR to prevent hydration errors
const Hero = dynamic(() => import('@/components/about/Hero'), { ssr: false })
const Timeline = dynamic(() => import('@/components/about/Timeline'), { ssr: false })

const AboutPage = () => {
  return (
    <div>
      <Hero />
      <Timeline />
    </div>
  )
}

export default AboutPage