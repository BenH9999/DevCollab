import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  backgroundColor: string;
  borderColor: string;
  iconBackgroundColor: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  backgroundColor,
  borderColor,
  iconBackgroundColor,
}: FeatureCardProps) {
  return (
    <div className={`p-6 rounded-xl ${backgroundColor} ${borderColor}`}>
      <div className={`w-12 h-12 ${iconBackgroundColor} text-white rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2" style={{ color: '#1F2937' }}>
        {title}
      </h3>
      <p style={{ color: '#4B5563' }}>{description}</p>
    </div>
  );
} 