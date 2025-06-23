
import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  type: 'user' | 'partner';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType?: 'user' | 'partner') => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, userType: 'user' | 'partner' = 'user') => {
    // Simulación de login - en producción esto sería una llamada a la API
    console.log('Login attempt:', { email, password, userType });
    
    const mockUser: User = {
      id: '1',
      name: userType === 'partner' ? 'Gimnasio Gold\'s' : 'Juan Pérez',
      email,
      credits: userType === 'user' ? 15 : 0,
      type: userType
    };
    
    setUser(mockUser);
    return true;
  };

  const register = async (data: any) => {
    console.log('Registration attempt:', data);
    
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name || data.businessName,
      email: data.email,
      credits: data.businessName ? 0 : 10, // Partners get 0, users get 10 welcome credits
      type: data.businessName ? 'partner' : 'user'
    };
    
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated
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
