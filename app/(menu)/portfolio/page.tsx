import Contact from '@/components/portfolio/Contact'
import Edu from '@/components/portfolio/Edu'
import Landing from '@/components/portfolio/Landing'
import Project from '@/components/portfolio/Project'
import Skill from '@/components/portfolio/Skill'
import React from 'react'

const page = () => {
  return (
    <div>
      <Landing/>
      <Edu/>
      <Skill/>
      <Project/>
      <Contact/>

    </div>
  )
}

export default page
