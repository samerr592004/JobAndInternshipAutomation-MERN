import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';
import { TokenStorage } from '@/lib/tokenStorage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user, checkTokenValidity, fetchUserProfile } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // Check token validity on component mount and periodically
    checkTokenValidity();
    
    // Set up periodic token validity checking (every minute)
    const interval = setInterval(() => {
      checkTokenValidity();
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [checkTokenValidity]);

  useEffect(() => {
    // If we have a valid token but no user data, try to fetch user profile
    const token = TokenStorage.getToken();
    if (token && !user && isAuthenticated) {
      fetchUserProfile().catch((error) => {
        console.error('Failed to fetch user profile:', error);
      });
    }
  }, [user, isAuthenticated, fetchUserProfile]);

  // Check if we have a valid token
  const hasValidToken = TokenStorage.hasValidToken();
  
  // If no valid token or not authenticated, redirect to login with return URL
  if (!hasValidToken || !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is not verified, they shouldn't access protected routes
  if (user && !user.isVerified) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but still loading user data, show loading state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
