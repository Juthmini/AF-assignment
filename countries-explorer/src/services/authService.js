// src/services/authService.js
// Since we're focusing on frontend-only solution as requested, 
// we'll use localStorage for session management

// Define the USER_KEY constant at the top of the file
const USER_KEY = 'countries_app_user';

// Register a new user (in a real app, this would call an API)
export const register = (username, password) => {
  // In a real app with backend, this would make a POST request
  // Since we're frontend only, we'll save to localStorage
  
  // Check if user already exists
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userExists = users.some(user => user.username === username);
  
  if (userExists) {
    throw new Error('Username already exists');
  }
  
  // In a real app, you would NEVER store passwords in plain text
  // This is just for demo purposes
  const newUser = { username, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  return { username };
};

// Login a user
export const login = (username, password) => {
  // Check credentials
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(
    user => user.username === username && user.password === password
  );
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Store user info in localStorage (session management)
  const userInfo = { username: user.username };
  localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
  
  return userInfo;
};

// Logout user
export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

// Get current user
export const getCurrentUser = () => {
  const userItem = localStorage.getItem(USER_KEY);
  return userItem ? JSON.parse(userItem) : null;
};

// Check if user is logged in
export const isAuthenticated = () => {
  return !!getCurrentUser();
};

// Add a country to favorites
export const addToFavorites = (countryCode) => {
  const user = getCurrentUser();
  if (!user) return false;
  
  const favoritesKey = `favorites_${user.username}`;
  const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
  
  if (!favorites.includes(countryCode)) {
    favorites.push(countryCode);
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
  }
  
  return true;
};

// Remove a country from favorites
export const removeFromFavorites = (countryCode) => {
  const user = getCurrentUser();
  if (!user) return false;
  
  const favoritesKey = `favorites_${user.username}`;
  let favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
  
  favorites = favorites.filter(code => code !== countryCode);
  localStorage.setItem(favoritesKey, JSON.stringify(favorites));
  
  return true;
};

// Get user's favorite countries
export const getFavorites = () => {
  const user = getCurrentUser();
  if (!user) return [];
  
  const favoritesKey = `favorites_${user.username}`;
  return JSON.parse(localStorage.getItem(favoritesKey) || '[]');
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  addToFavorites,
  removeFromFavorites,
  getFavorites
};