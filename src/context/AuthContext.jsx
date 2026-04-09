import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('rbac_user');
    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored);
    } catch (error) {
      console.warn('Invalid rbac_user in localStorage, resetting auth state');
      localStorage.removeItem('rbac_user');
      return null;
    }
  });

  const login = (nextUser) => {
    setUser(nextUser);
    localStorage.setItem('rbac_user', JSON.stringify(nextUser));

    if (nextUser?.token) {
      localStorage.setItem('rbac_token', nextUser.token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rbac_user');
    localStorage.removeItem('rbac_token');
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
