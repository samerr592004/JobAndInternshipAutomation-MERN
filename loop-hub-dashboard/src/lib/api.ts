import axios from 'axios';
import { TokenStorage } from './tokenStorage';

// Get API base URL from environment variables
// In development, use proxy path; in production, use full URL
const API_BASE_URL = import.meta.env.DEV ? '/api' : (import.meta.env.VITE_API_BASE_URL || '/api');

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token and logging
api.interceptors.request.use(
  (config) => {
    const token = TokenStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Enhanced error logging
    if (import.meta.env.DEV) {
      console.error('❌ API Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        url: error.config?.url,
      });
    }
    
    // Handle different error cases
    if (error.response?.status === 401) {
      // Token expired or invalid
      TokenStorage.removeToken();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    } else if (error.response?.status === 403) {
      console.error('Access forbidden - insufficient permissions');
    } else if (error.response?.status >= 500) {
      console.error('Server error - please try again later');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - please check your connection');
    }
    
    return Promise.reject(error);
  }
);

export default api;
