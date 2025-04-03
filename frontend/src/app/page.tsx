// frontend/src/app/page.tsx
'use client';
import { HeroSection } from '@/components/landing/sections/HeroSection';
import { FeaturesSection } from '@/components/landing/sections/FeaturesSection';
import { HowItWorksSection } from '@/components/landing/sections/HowItWorksSection';
import { CTASection } from '@/components/landing/sections/CTASection';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { AuthHeader } from '@/components/layout/AuthHeader';
import { useAuth } from '@/context/AuthContext';

function ConditionalHeader() {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <AuthHeader /> : <Header />;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <ConditionalHeader />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}