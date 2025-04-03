import { apiRequest } from './auth';

/**
 * API client for making authenticated requests
 */
const api = {
  /**
   * Make a GET request
   */
  get: async (url: string, options: RequestInit = {}) => {
    return apiRequest(url, {
      method: 'GET',
      ...options
    });
  },
  
  /**
   * Make a POST request
   */
  post: async (url: string, data: any, options: RequestInit = {}) => {
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  },
  
  /**
   * Make a PUT request
   */
  put: async (url: string, data: any, options: RequestInit = {}) => {
    return apiRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  },
  
  /**
   * Make a DELETE request
   */
  delete: async (url: string, options: RequestInit = {}) => {
    return apiRequest(url, {
      method: 'DELETE',
      ...options
    });
  }
};

export default api; 