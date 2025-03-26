// frontend/src/components/landing/sections/HowItWorksSection.tsx
import { StepItem } from '@/components/ui/StepItem';

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Create or Join a Document",
      description: "Start a new document or code file, or join an existing collaborative session."
    },
    {
      number: 2,
      title: "Invite Your Team",
      description: "Share a secure link with your team members to start collaborating instantly."
    },
    {
      number: 3,
      title: "Edit in Real-Time",
      description: "Make changes and see your team's edits instantly, with visual indicators showing who's working where."
    }
  ];

  return (
    <section className="py-20 bg-indigo-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16" style={{ color: '#1F2937' }}>How DevCollab Works</h2>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-2 transition-all duration-300">
          <div className="p-8">
            <div className="flex flex-col gap-8">
              {steps.map((step) => (
                <StepItem 
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 