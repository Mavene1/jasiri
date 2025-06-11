import Header from '@/components/Header';
import Hero from '@/components/HeroSection';
import About from '@/components/About';
import Pillars from '@/components/Pillars';
import Campaigns from '@/components/Activities';
import Stats from '@/components/Stats';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Pillars />
      <Campaigns />
      <Stats />
      <Blog /> 
      <CTASection />
      <Footer />
    </div>
  );
}
