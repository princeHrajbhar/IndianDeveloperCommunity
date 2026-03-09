"use client"
import dynamic from 'next/dynamic'
import React from 'react'

// Dynamically import components with SSR disabled
const Hero = dynamic(() => import('@/components/service/Hero'), { ssr: false })
const Project = dynamic(() => import('@/components/service/Project'), { ssr: false })

const ServicesPage = () => {
  return (
    <div>
      <Hero/>
      <Project/>
    </div>
  )
}

export default ServicesPage