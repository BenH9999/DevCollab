// Helper functions for handling authentication

/**
 * Set authentication data after successful login or registration
 */
export function setAuthData(token: string, userData?: Record<string, any>) {
  // Store token in a cookie that will be accessible by the middleware
  document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
  
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