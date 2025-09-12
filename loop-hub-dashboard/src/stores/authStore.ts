import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';
import { TokenStorage } from '@/lib/tokenStorage';

interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  createdAt?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  otpEmail: string | null;

  // Actions
  signup: (name: string, email: string, password: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  checkTokenValidity: () => void;
  logout: () => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      otpEmail: null,

      signup: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/signup', {
            name,
            email,
            password,
          });
          
          if (response.data.message === 'OTP sent to your email') {
            set({ 
              otpEmail: email,
              isLoading: false 
            });
          }
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Signup failed',
            isLoading: false 
          });
          throw error;
        }
      },

      verifyOTP: async (email: string, otp: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/verify-otp', {
            email,
            otp,
          });
          
          if (response.data.message === 'Email verified successfully') {
            set({ 
              otpEmail: null,
              isLoading: false 
            });
          }
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'OTP verification failed',
            isLoading: false 
          });
          throw error;
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', {
            email,
            password,
          });
          
          const { token, user: userData } = response.data;
          
          // Store token in sessionStorage with expiration
          TokenStorage.setToken(token);
          
          // Use real user data from backend response
          const user: User = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            isVerified: userData.isVerified,
          };
          
          set({ 
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Login failed',
            isLoading: false 
          });
          throw error;
        }
      },

      fetchUserProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get('/auth/me');
          const { user: userData } = response.data;
          
          const user: User = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            isVerified: userData.isVerified,
            createdAt: userData.createdAt,
          };
          
          set({ 
            user,
            isLoading: false,
            error: null
          });
        } catch (error: any) {
          // Don't log out on profile fetch error, just set error
          set({ 
            error: error.response?.data?.message || 'Failed to fetch user profile',
            isLoading: false 
          });
          throw error;
        }
      },

      checkTokenValidity: () => {
        const token = TokenStorage.getToken();
        const hasValidToken = TokenStorage.hasValidToken();
        
        if (!hasValidToken && useAuthStore.getState().isAuthenticated) {
          // Token has expired, logout user
          set({ 
            user: null,
            token: null,
            isAuthenticated: false,
            error: 'Session expired. Please login again.',
            otpEmail: null
          });
        } else if (hasValidToken && !useAuthStore.getState().isAuthenticated) {
          // Valid token exists but user is not authenticated in store
          set({
            token,
            isAuthenticated: true
          });
        }
      },

      logout: () => {
        TokenStorage.removeToken();
        set({ 
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          otpEmail: null
        });
      },

      setError: (error: string | null) => set({ error }),
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useAuthStore;
