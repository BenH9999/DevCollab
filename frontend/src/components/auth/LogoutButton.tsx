'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';

interface LogoutButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function LogoutButton({ variant = 'secondary', className = '' }: LogoutButtonProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
    router.refresh();
  };

  return (
    <Button
      onClick={handleLogout}
      variant={variant}
      className={className}
    >
      Logout
    </Button>
  );
} 