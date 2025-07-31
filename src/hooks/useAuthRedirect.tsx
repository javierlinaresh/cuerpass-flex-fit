import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const useAuthRedirect = (requiredRole?: 'customer' | 'partner') => {
  const { isAuthenticated, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (requiredRole && profile?.role !== requiredRole) {
      navigate('/');
      return;
    }
  }, [isAuthenticated, profile, loading, requiredRole, navigate]);

  return { isAuthenticated, profile, loading };
};