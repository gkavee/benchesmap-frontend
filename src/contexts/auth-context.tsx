'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = useCallback(() => {
    axios.get('/api/users/me')
      .then(response => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = (username: string, password: string) => {
    return axios.post('/api/auth/jwt/login', { username, password })
      .then(response => {
        setUser(response.data.user);
        checkAuth();
      })
      .catch(error => {
        console.error('Login error:', error);
        throw error;
      });
  };

  const register = (username: string, email: string, password: string) => {
    return axios.post('/api/auth/register', { username, email, password })
      .then(response => {
        setUser(response.data.user);
        checkAuth();
      })
      .catch(error => {
        console.error('Register error:', error);
        throw error;
      });
  };

  const logout = () => {
    axios.post('/api/auth/jwt/logout')
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        console.error('Logout error:', error);
        throw error;
      });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
