// frontend/src/components/landing/sections/HeroSection.tsx
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <header className="container mx-auto px-4 pt-20 pb-32 md:pt-32 md:pb-40">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            DevCollab
          </h1>
          <span className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full"></span>
        </div>
        <h2 className="text-2xl md:text-3xl font-medium mb-6 max-w-2xl" style={{ color: '#374151' }}>
          Real-time collaborative editor for developers
        </h2>
        <p className="text-lg mb-8 max-w-2xl" style={{ color: '#4B5563' }}>
          Edit documents and code simultaneously with your team. Seamless collaboration, 
          powerful version control, and intuitive interface.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/editor" variant="primary">
            Try it now
          </Button>
          <Button href="#features" variant="secondary">
            Learn more
          </Button>
        </div>
      </div>
    </header>
  );
} 