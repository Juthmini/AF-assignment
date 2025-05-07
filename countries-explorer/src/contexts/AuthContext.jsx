// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load user from localStorage on initial render
  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      setError('');
      const user = authService.login(username, password);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Register function
  const register = async (username, password) => {
    try {
      setError('');
      const user = authService.register(username, password);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  // Favorite countries functions
  const addToFavorites = (countryCode) => {
    return authService.addToFavorites(countryCode);
  };

  const removeFromFavorites = (countryCode) => {
    return authService.removeFromFavorites(countryCode);
  };

  const getFavorites = () => {
    return authService.getFavorites();
  };

  const isInFavorites = (countryCode) => {
    const favorites = getFavorites();
    return favorites.includes(countryCode);
  };

  // Context value
  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    error,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    isInFavorites,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;