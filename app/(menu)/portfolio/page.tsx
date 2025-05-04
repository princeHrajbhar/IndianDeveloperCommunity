import Contact from '@/components/portfolio/Contact'
import Edu from '@/components/portfolio/Edu'
import Project from '@/components/portfolio/Project'
import Skill from '@/components/portfolio/Skill'
import React from 'react'

const page = () => {
  return (
    <div>
      <Edu/>
      <Skill/>
      <Project/>
      <Contact/>
      
    </div>
  )
}

export default page
