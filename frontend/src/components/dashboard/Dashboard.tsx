'use client'
import { useAuth } from '@/context/AuthContext';
import { Projects } from '@/components/dashboard/Projects';
import { Collaborators } from '@/components/dashboard/Collaborators';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name || 'User'}!</h2>
        <p className="text-gray-600 mb-4">
          This is your personal dashboard where you can manage your projects and collaborate with others.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Projects />
          <Collaborators />
        </div>
      </div>
    </main>
  )
}
