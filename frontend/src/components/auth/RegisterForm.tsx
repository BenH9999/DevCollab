// frontend/src/components/auth/RegisterForm.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, FormError, SubmitButton } from '@/components/ui';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Use the register function from AuthContext
      const result = await register(name, email, password);
      
      if (!result.success) {
        throw new Error(result.error);
      }

      // Navigate to dashboard on success
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

        <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
                id="name"
                name="name"
                type="text"
                label="Name"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

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

            <SubmitButton 
                isLoading={isLoading}
                loadingText="Registering..."
            >
                Register
            </SubmitButton>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign in here
            </Link>
        </p>
    </div>
  )
}