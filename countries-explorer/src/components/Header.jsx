// // src/components/Header.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const Header = () => {
//   const { currentUser, logout, isAuthenticated } = useAuth();

//   return (
//     <header className="bg-gray-800 text-white shadow-md">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold flex items-center">
//           <span className="mr-2">🌍</span> 
//           <span>Countries Explorer</span>
//         </Link>
        
//         <nav className="flex items-center">
//           <Link to="/" className="mx-2 hover:text-blue-300 transition-colors">
//             Home
//           </Link>
          
//           {isAuthenticated ? (
//             <div className="flex items-center">
//               <span className="mx-2">Welcome, {currentUser.username}</span>
//               <button 
//                 onClick={logout}
//                 className="ml-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <Link 
//               to="/login" 
//               className="ml-4 bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded transition-colors"
//             >
//               Login
//             </Link>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 shadow-lg py-2' 
        : 'bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-800 py-4'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-purple-500 opacity-10"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-indigo-500 opacity-10"></div>
          <div className="absolute top-1/2 left-1/3 w-12 h-12 rounded-full bg-pink-500 opacity-10"></div>
        </div>
        
        {/* Logo with animation */}
        <Link 
          to="/" 
          className="text-2xl font-extrabold flex items-center relative z-10 group"
        >
          <span className="mr-3 text-3xl inline-block transform group-hover:rotate-45 transition-transform duration-500">
            🌍
          </span> 
          <span className="logo-text bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
            Countries Explorer
          </span>
          
          {/* Animated underline on hover */}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 group-hover:w-full transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
        </Link>
        
        <nav className="flex items-center relative z-10">
          <Link 
            to="/" 
            className="mx-3 px-2 py-1 text-gray-200 hover:text-white font-medium relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center ml-4">
              <div className="hidden sm:flex items-center mr-4 bg-indigo-700/30 px-3 py-1.5 rounded-full border border-indigo-500/30">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold mr-2">
                  {currentUser.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-200 text-sm">
                  {currentUser.username}
                </span>
              </div>
              <button 
                onClick={logout}
                className="logout-btn relative overflow-hidden px-4 py-1.5 rounded-full text-white font-medium transition-all duration-300"
              >
                <span className="relative z-10">Logout</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="login-btn relative overflow-hidden px-4 py-1.5 rounded-full text-white font-medium transition-all duration-300"
            >
              <span className="relative z-10">Login</span>
            </Link>
          )}
        </nav>
      </div>
      
      {/* Add custom CSS */}
      <style jsx>{`
        .logo-text {
          animation: shimmer 3s linear infinite;
          background-size: 200% 100%;
        }
        
        .login-btn {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
        }
        
        .login-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #60a5fa, #a78bfa);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        
        .login-btn:hover::before {
          opacity: 1;
        }
        
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(59, 130, 246, 0.4);
        }
        
        .logout-btn {
          background: linear-gradient(90deg, #ef4444, #f43f5e);
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
        }
        
        .logout-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #f87171, #fb7185);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        
        .logout-btn:hover::before {
          opacity: 1;
        }
        
        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(239, 68, 68, 0.4);
        }
        
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </header>
  );
};

export default Header;