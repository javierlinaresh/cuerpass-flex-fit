
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, RegisterData } from '@/types';
import { authAPI, tokenManager, APIError } from '@/services/api';
import { logger } from '@/utils/logger';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType?: 'user' | 'partner') => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = tokenManager.getToken();
      if (token) {
        try {
          const currentUser = await authAPI.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          logger.error('Failed to get current user', error);
          tokenManager.clearAll();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, userType: 'user' | 'partner' = 'user') => {
    try {
      setIsLoading(true);
      const response = await authAPI.login({ email, password, userType });
      setUser(response.user);
      logger.log('Login successful', { email, userType });
      return true;
    } catch (error) {
      logger.error('Login failed', error);
      if (error instanceof APIError) {
        throw new Error(error.message);
      }
      throw new Error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      const response = await authAPI.register(data);
      setUser(response.user);
      logger.log('Registration successful', { email: data.email });
      return true;
    } catch (error) {
      logger.error('Registration failed', error);
      if (error instanceof APIError) {
        throw new Error(error.message);
      }
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      logger.error('Logout failed', error);
    } finally {
      setUser(null);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
