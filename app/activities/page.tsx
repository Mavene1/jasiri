import React from 'react'
import ActivitiesPage from '@/components/activities/ActivitiesPage'
import Header from '@/components/Header'
import CTASection from '@/components/home/CTASection'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ActivitiesPage /> 
      {/* <CTASection /> */}
      <Footer />
    </div>
  )
}

export default page