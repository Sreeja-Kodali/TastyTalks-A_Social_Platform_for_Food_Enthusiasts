import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';
import { STORAGE_TOKEN, STORAGE_USER } from '../utils/constants';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem(STORAGE_USER)) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem(STORAGE_TOKEN) || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(STORAGE_USER));
    const storedToken = localStorage.getItem(STORAGE_TOKEN);

    if (storedUser) {
      setCurrentUser(storedUser);
    }

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const user = response.data?.user || null;
      const tokenValue = response.data?.token || null;

      setCurrentUser(user);
      setToken(tokenValue);

      localStorage.setItem(STORAGE_USER, JSON.stringify(user));
      if (tokenValue) {
        localStorage.setItem(STORAGE_TOKEN, tokenValue);
      } else {
        localStorage.removeItem(STORAGE_TOKEN);
      }

      return user;
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      throw error;
    }
  };

  const register = async (username, email, password, role) => {
    try {
      const response = await authAPI.register({
        username,
        email,
        password,
        role
      });
      return response.data;
    } catch (error) {
      console.error('Register Error:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_TOKEN);
  };

  const updateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem(STORAGE_USER, JSON.stringify(updatedUser));
  };

  const value = {
    currentUser,
    user: currentUser,
    token,
    loading,
    login,
    logout,
    register,
    updateUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'ADMIN',
    isChef: currentUser?.role === 'CHEF' || currentUser?.role === 'ADMIN'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};