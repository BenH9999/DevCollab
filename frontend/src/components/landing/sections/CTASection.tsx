import { Button } from '@/components/ui/Button';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to collaborate smarter?</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">Join thousands of developers who are already improving their workflow with DevCollab.</p>
        <Button href="/register" variant="secondary">
          Get Started for Free
        </Button>
      </div>
    </section>
  );
} 