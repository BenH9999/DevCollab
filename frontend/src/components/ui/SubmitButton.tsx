import { Button } from './Button';

interface SubmitButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function SubmitButton({ 
  isLoading = false, 
  loadingText = 'Loading...', 
  children,
  className = '',
  variant = 'primary'
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={`w-full justify-center ${className}`}
      disabled={isLoading}
      variant={variant}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
} 