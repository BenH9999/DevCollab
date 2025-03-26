// frontend/src/components/layout/Footer.tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 bg-gray-800" style={{ color: '#D1D5DB' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-white">DevCollab</h3>
            <p className="mt-2">Real-time collaborative editor</p>
          </div>
          <div className="flex gap-8">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} DevCollab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 