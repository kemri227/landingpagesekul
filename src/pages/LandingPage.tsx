import React from 'react'
import { Header } from '../components/Layout/Header'
import { Footer } from '../components/Layout/Footer'
import { HeroSection } from '../components/Landing/HeroSection'
import { StatsSection } from '../components/Landing/StatsSection'
import { VisionMission } from '../components/Landing/VisionMission'
import { ProgramUnggulan } from '../components/Landing/ProgramUnggulan'
import { Facilities } from '../components/Landing/Facilities'
import { Announcements } from '../components/Landing/Announcements'
import { Events } from '../components/Landing/Events'
import { Testimonials } from '../components/Landing/Testimonials'

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <VisionMission />
        <ProgramUnggulan />
        <Facilities />
        <Announcements />
        <Events />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}