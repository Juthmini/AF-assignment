

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  // Add animation effect
  useEffect(() => {
    const formEl = document.querySelector('.auth-form');
    if (formEl) {
      formEl.classList.add('form-visible');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFormSubmitted(true);
    
    // Simple validation
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }
    
    try {
      setLoading(true);
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    // Add transition effects when toggling
    const formEl = document.querySelector('.auth-form');
    if (formEl) {
      formEl.classList.add('form-transition');
      setTimeout(() => {
        setIsLogin(!isLogin);
        formEl.classList.remove('form-transition');
      }, 300);
    } else {
      setIsLogin(!isLogin);
    }
    setError('');
    setFormSubmitted(false);
  };

  return (
    <div className="auth-form p-8">
      <div className="relative">
        {/* Animated form header with gradient underline */}
        <h2 className="text-2xl font-bold text-center mb-6 relative">
          {isLogin ? 'Welcome Back' : 'Create Account'}
          <div className="h-1 w-16 mx-auto mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
        </h2>
        
        {/* Decorative icons */}
        <div className="absolute top-0 right-0 opacity-50">
          {isLogin ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          )}
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md mb-6 animate-pulse" role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              type="text"
              id="username"
              className={`pl-10 pr-3 py-2 block w-full rounded-lg border-2 transition-colors duration-200 ease-in-out ${
                formSubmitted && !username.trim() ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500' : 
                'border-gray-200 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500'
              } focus:outline-none focus:ring-2 focus:ring-opacity-20`}
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {formSubmitted && !username.trim() && (
            <p className="mt-1 text-xs text-red-500">Username is required</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type="password"
              id="password"
              className={`pl-10 pr-3 py-2 block w-full rounded-lg border-2 transition-colors duration-200 ease-in-out ${
                formSubmitted && !password.trim() ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500' : 
                'border-gray-200 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500'
              } focus:outline-none focus:ring-2 focus:ring-opacity-20`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {formSubmitted && !password.trim() && (
            <p className="mt-1 text-xs text-red-500">Password is required</p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            type="submit"
            className={`relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            <span className="relative z-10">
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </span>
            <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full hover:translate-x-0 transition-transform duration-300"></span>
          </button>
          
          <button
            type="button"
            className="text-center sm:text-right font-medium text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none focus:underline transition-colors duration-200"
            onClick={toggleForm}
          >
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      </form>
      
      {/* Decorative bottom border */}
      <div className="mt-8 flex justify-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
        <div className="w-2 h-2 rounded-full bg-pink-400"></div>
      </div>
      
      {/* Add custom CSS styles */}
      <style jsx>{`
        .auth-form {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        
        .form-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .form-transition {
          opacity: 0.5;
          transform: translateY(10px);
        }
        
        /* Fix for the button string interpolation syntax error in the original */
        button[type="submit"] {
          background-image: linear-gradient(to right, var(--tw-gradient-stops));
          --tw-gradient-from: #6366f1;
          --tw-gradient-to: #ec4899;
          --tw-gradient-stops: var(--tw-gradient-from), #a855f7, var(--tw-gradient-to);
        }
        
        button[type="submit"]:hover {
          --tw-gradient-from: #4f46e5;
          --tw-gradient-to: #db2777;
          --tw-gradient-stops: var(--tw-gradient-from), #9333ea, var(--tw-gradient-to);
        }
      `}</style>
    </div>
  );
};

export default LoginForm;