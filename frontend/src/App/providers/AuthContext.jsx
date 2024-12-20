
import React, { createContext, useState, useEffect } from 'react';
import { getUsersMe } from '../../shared/api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      (async () => {
        const { status, data } = await getUsersMe();
        if (status === 200) {
          setIsAuthenticated(true);
          setUser(data);
          setIsProfileCompleted(data.profileCompleted);
        }
      })();
    }
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setIsProfileCompleted(userData.profileCompleted);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setIsProfileCompleted(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isProfileCompleted, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
