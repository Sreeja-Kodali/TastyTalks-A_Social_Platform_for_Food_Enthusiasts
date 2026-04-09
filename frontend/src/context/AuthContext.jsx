import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

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
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem('token') || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    console.log("AuthContext useEffect - storedUser:", storedUser);
    console.log("AuthContext useEffect - storedToken:", storedToken);

    // Only set user if both token and user exist and user has an id
    if (storedToken && storedUser && storedUser.id) {
      setCurrentUser(storedUser);
      setToken(storedToken);
      console.log("AuthContext - Setting user from localStorage:", storedUser);
    } else {
      // Clear invalid states
      setCurrentUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log("AuthContext - Clearing invalid auth state");
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log("AuthContext login - calling authAPI.login with:", { email, password });
      const response = await authAPI.login({ email, password });
      console.log("AuthContext login - response:", response.data);
      
      const user = response.data?.user || null;
      const tokenValue = response.data?.token || null;

      console.log("AuthContext login - extracted user:", user);
      console.log("AuthContext login - extracted token:", tokenValue);

      setCurrentUser(user);
      setToken(tokenValue);

      localStorage.setItem('user', JSON.stringify(user));
      if (tokenValue) {
        localStorage.setItem('token', tokenValue);
      } else {
        localStorage.removeItem('token');
      }

      console.log("AuthContext login - state updated, returning user:", user);
      return user;
    } catch (error) {
      console.error('AuthContext login error:', error.response?.data || error);
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
      console.error('Register error:', error.response?.data || error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
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