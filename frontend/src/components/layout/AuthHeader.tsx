'use client';
import Link from 'next/link';
import { LogoutButton } from '@/components/auth';
import { useAuth } from '@/context/AuthContext';

export function AuthHeader() {
  const { user } = useAuth();
  
  return (
    <header className="py-10 bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
            DevCollab
          </Link>
          
          <div className="flex items-center gap-6">
            <nav>
              <ul className="flex gap-6">
                <li>
                  <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/editor" className="text-gray-300 hover:text-white transition-colors">
                    Editor
                  </Link>
                </li>
              </ul>
            </nav>
            
            <div className="flex items-center gap-4">
              <div className="text-gray-300">
                {user?.name && <span>Welcome, {user.name}</span>}
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 