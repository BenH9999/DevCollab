// Helper functions for handling authentication

/**
 * Set authentication data after successful login or registration
 */
export function setAuthData(token: string, refreshToken: string, userData?: Record<string, any>) {
  // Store token in a cookie that will be accessible by the middleware
  document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
  
  // Store refresh token
  localStorage.setItem('refresh-token', refreshToken);
  
  // For client-side check
  localStorage.setItem('isLoggedIn', 'true');
  
  // Store user data if provided
  if (userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
}

/**
 * Clear authentication data on logout
 */
export function clearAuthData() {
  // Clear the auth token cookie
  document.cookie = 'auth-token=; path=/; max-age=0';
  
  // Clear local storage
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userData');
  localStorage.removeItem('refresh-token');
}

/**
 * Check if user is authenticated on client-side
 */
export function isAuthenticated() {
  if (typeof window === 'undefined') {
    return false; // Not authenticated when running on server
  }
  
  return localStorage.getItem('isLoggedIn') === 'true';
}

/**
 * Get stored user data
 */
export function getUserData() {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const userData = localStorage.getItem('userData');
  if (!userData) {
    return null;
  }
  
  try {
    return JSON.parse(userData);
  } catch (e) {
    console.error('Failed to parse user data', e);
    return null;
  }
}

/**
 * Get JWT token from cookies
 */
export function getToken() {
  if (typeof document === 'undefined') {
    return null;
  }
  
  const value = `; ${document.cookie}`;
  const parts = value.split('; auth-token=');
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  
  return null;
}

/**
 * Get refresh token from localStorage
 */
export function getRefreshToken() {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem('refresh-token');
}

/**
 * Refresh the JWT token using the refresh token
 */
export async function refreshToken() {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    return false;
  }
  
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    
    const data = await response.json();
    
    if (data.success && data.token) {
      // Update just the JWT token
      document.cookie = `auth-token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return false;
  }
}

/**
 * Make an authenticated API request
 */
export async function apiRequest(url: string, options: RequestInit = {}) {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };
  
  try {
    let response = await fetch(url, {
      ...options,
      headers,
    });
    
    // If unauthorized, try to refresh the token
    if (response.status === 401) {
      const refreshed = await refreshToken();
      
      if (refreshed) {
        // Get the new token
        const newToken = getToken();
        
        // Update headers with new token
        const newHeaders = {
          'Content-Type': 'application/json',
          ...(newToken && { 'Authorization': `Bearer ${newToken}` }),
          ...options.headers,
        };
        
        // Retry the request
        return fetch(url, {
          ...options,
          headers: newHeaders,
        });
      } else {
        // If refresh failed, clear auth and return the original response
        clearAuthData();
      }
    }
    
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
} 