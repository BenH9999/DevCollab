// frontend/src/components/layout/Header.tsx
import { Button } from '../ui/Button';

export function Header() {
  return (
    <header className="py-10 bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">DevCollab</h1>
          <div className="flex gap-4">
            <Button href="/auth/login" variant='primary'>Login</Button>
            <Button href="/auth/signup" variant='secondary'>Signup</Button>
          </div>
        </div>
      </div>
    </header>
  );
}