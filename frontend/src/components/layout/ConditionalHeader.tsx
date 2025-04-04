'use client';
import { useAuth } from '@/context/AuthContext';
import { AuthHeader } from './AuthHeader';
import { Header } from './Header';

export function ConditionalHeader() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <AuthHeader /> : <Header />;
}