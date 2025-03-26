// frontend/src/app/page.tsx
import { HeroSection } from '@/components/landing/sections/HeroSection';
import { FeaturesSection } from '@/components/landing/sections/FeaturesSection';
import { HowItWorksSection } from '@/components/landing/sections/HowItWorksSection';
import { CTASection } from '@/components/landing/sections/CTASection';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}