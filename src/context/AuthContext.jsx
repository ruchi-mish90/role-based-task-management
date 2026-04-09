import { createContext, useContext, useMemo, useState } from 'react';

const demoUser = {
  id: 'u_101',
  name: 'Aarav',
  role: 'admin',
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('rbac_user');
    return stored ? JSON.parse(stored) : demoUser;
  });

  const login = (nextUser) => {
    setUser(nextUser);
    localStorage.setItem('rbac_user', JSON.stringify(nextUser));
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
