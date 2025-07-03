import React from 'react'
import BlogsPage from '@/components/blogs/BlogsPage'
import Header from '@/components/Header'
import CTASection from '@/components/home/CTASection'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <BlogsPage />
      {/* <CTASection /> */}
      <Footer />
    </div>
  )
}

export default page