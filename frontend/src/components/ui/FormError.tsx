// frontend/src/components/ui/FormError.tsx
interface FormErrorProps {
  message: string;
  className?: string;
}

export function FormError({ message, className = '' }: FormErrorProps) {
  if (!message) return null;
  
  return (
    <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded ${className}`} role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
} 