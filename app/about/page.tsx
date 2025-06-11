import React from 'react'
import AboutPage from '@/components/about/AboutPage'
import Header from '@/components/Header'
import CTASection from '@/components/home/CTASection'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AboutPage />
      <CTASection />
      <Footer />
    </div>
  )
}

export default page