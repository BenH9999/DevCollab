// frontend/src/components/layout/Header.tsx
import { Button } from '../ui/Button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="py-10 bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
            DevCollab
          </Link>
          <div className="flex gap-4">
            <Button href="/auth/login" variant='primary'>Login</Button>
            <Button href="/auth/register" variant='secondary'>Signup</Button>
          </div>
        </div>
      </div>
    </header>
  );
}