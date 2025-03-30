import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';

interface AuthPageProps {
  title: string;
  children: ReactNode;
}

export function AuthPage({ title, children }: AuthPageProps) {
  return (
    <>
      <Header />
      <div className='flex flex-col justify-center items-center px-6 py-20 lg:px-8'>
        <h1 className="gradient-title text-center">
          {title}
        </h1>
        <div className="mt-8">
          {children}
        </div>
      </div>
    </>
  );
} 