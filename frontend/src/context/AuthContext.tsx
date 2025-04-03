'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getUserData, setAuthData, clearAuthData, isAuthenticated as checkAuth, refreshToken as refreshAuthToken } from '@/lib/auth';

type User = {
  id: string;
  name?: string;
  email: string;
} | null;

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  setUser: (user: User) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Check authentication status on initial load and after hydration
  useEffect(() => {
    const checkAuthentication = () => {
      const authStatus = checkAuth();
      setIsAuthenticated(authStatus);
      
      if (authStatus) {
        const userData = getUserData();
        setUser(userData);
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    };

    // Initialize auth state 
    checkAuthentication();

    // Add listener for auth state changes (e.g., when another tab logs out)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'isLoggedIn' || event.key === 'userData' || event.key === 'refresh-token') {
        checkAuthentication();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || data.error || 'Login failed' };
      }

      // Set auth data with token and refresh token
      setAuthData(data.token, data.refresh_token, {
        id: data.id,
        email: data.email,
        name: data.name
      });

      // Update context state
      setUser({
        id: data.id,
        email: data.email,
        name: data.name
      });
      
      setIsAuthenticated(true);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'An unexpected error occurred' };
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || data.error || 'Registration failed' };
      }

      // Set auth data with token and refresh token
      setAuthData(data.token, data.refresh_token, {
        id: data.id,
        email: data.email,
        name: data.name
      });

      // Update context state
      setUser({
        id: data.id,
        email: data.email,
        name: data.name
      });
      
      setIsAuthenticated(true);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'An unexpected error occurred' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Get refresh token to send to server
      const refreshToken = localStorage.getItem('refresh-token');
      
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear auth data
      clearAuthData();
      
      // Update context state
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    const success = await refreshAuthToken();
    return success;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        refreshToken,
        setUser,
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
} 