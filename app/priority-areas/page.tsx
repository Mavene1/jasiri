import React from 'react'
import PillarsPage from '@/components/pillars/PillarsPage'
import Header from '@/components/Header'
import CTASection from '@/components/home/CTASection'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PillarsPage />
      {/* <CTASection /> */}
      <Footer />
    </div>
  )
}

export default page