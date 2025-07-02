import Header from '@/components/Header';
import Hero from '@/components/home/HeroSection';
import About from '@/components/home/About';
import Campaigns from '@/components/home/Activities';
import Stats from '@/components/home/Stats';
import Blog from '@/components/home/Blog';
import Footer from '@/components/Footer';
import CTASection from '@/components/home/CTASection';
import PriorityAreas from '@/components/home/PriorityAreas';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <PriorityAreas />
      <Campaigns />
      <Stats />
      <Blog /> 
      <CTASection />
      <Footer />
    </div>
  );
}
