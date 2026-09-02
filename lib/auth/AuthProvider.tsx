"use client";

import React, { createContext, useEffect, useState, useCallback } from 'react';
import { User, UserRole, AuthContextType, AuthSession } from './types';
import { mockAuthService } from './mockAuth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_STORAGE_KEY = 'forge_auth_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        try {
          const session: AuthSession = JSON.parse(stored);
          if (session.expiresAt > Date.now()) {
            setUser(session.user);
          } else {
            localStorage.removeItem(SESSION_STORAGE_KEY);
          }
        } catch (error) {
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const loggedInUser = await mockAuthService.login(email, password);
      const session: AuthSession = {
        user: loggedInUser,
        token: `token_${loggedInUser.id}`,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      setUser(loggedInUser);
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(
    async (email: string, password: string, name: string, role: UserRole) => {
      setLoading(true);
      try {
        const newUser = await mockAuthService.signup(email, password, name, role);
        const session: AuthSession = {
          user: newUser,
          token: `token_${newUser.id}`,
          expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        };
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
        setUser(newUser);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await mockAuthService.logout();
      localStorage.removeItem(SESSION_STORAGE_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
