// frontend/src/components/auth/LoginForm.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, FormError, SubmitButton } from '@/components/ui';
import Link from 'next/link';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('isLoggedIn', 'true');

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <FormError message={error} className="mb-4" />
      
      <form className="space-y-6" onSubmit={handleLogin}>
        <Input
          id="email"
          name="email"
          type="email"
          label="Email address"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <SubmitButton
            isLoading={isLoading}
            loadingText="Logging in..."
          >
            Sign in
          </SubmitButton>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link href="/auth/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Register here
        </Link>
      </p>
    </div>
  );
} 