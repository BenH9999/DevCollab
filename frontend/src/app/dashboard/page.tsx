'use client';
import { AuthHeader } from '@/components/layout/AuthHeader';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name || 'User'}!</h2>
          <p className="text-gray-600 mb-4">
            This is your personal dashboard where you can manage your projects and collaborate with others.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
              <h3 className="text-lg font-medium text-indigo-800 mb-2">Recent Projects</h3>
              <p className="text-gray-600 mb-4">You don't have any projects yet.</p>
              <button className="text-indigo-600 font-medium hover:text-indigo-800">
                Create your first project
              </button>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Collaborators</h3>
              <p className="text-gray-600 mb-4">Connect with other developers to collaborate on projects.</p>
              <button className="text-blue-600 font-medium hover:text-blue-800">
                Find collaborators
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 