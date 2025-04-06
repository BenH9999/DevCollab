'use client';
import { AuthHeader } from '@/components/layout/AuthHeader';
import { Dashboard } from '@/components/dashboard/Dashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />
      <Dashboard />
    </div>
  );
} 
