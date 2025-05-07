// // src/components/SearchBar.jsx
// import React, { useState } from 'react';

// const SearchBar = ({ onSearch }) => {
//   const [searchValue, setSearchValue] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(searchValue);
//   };

//   const handleChange = (e) => {
//     setSearchValue(e.target.value);
//     // Optional: Implement debounced search for real-time searching
//     // For now, we'll use the form submission
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-md">
//       <div className="relative flex items-center">
//         <input
//           type="text"
//           placeholder="Search for a country..."
//           value={searchValue}
//           onChange={handleChange}
//           className="w-full p-3 pl-10 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//           🔍
//         </div>
//         <button
//           type="submit"
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
//         >
//           Search
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SearchBar;


import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Add initial animation
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add search animation effect
    if (searchValue.trim()) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        onSearch(searchValue);
      }, 300);
    } else {
      onSearch('');
    }
  };
  
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  
  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
  };
  
  const handleClear = () => {
    setSearchValue('');
    inputRef.current.focus();
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md relative">
      <div className={`search-container relative transition-all duration-300 ${
        isFocused 
          ? 'transform scale-105' 
          : ''
      } ${isAnimating ? 'animate-pulse' : ''}`}>
        {/* Search input with animated border */}
        <div className={`relative rounded-full overflow-hidden shadow-md transition-all duration-300 ${
          isFocused 
            ? 'shadow-lg ring-2 ring-indigo-300' 
            : 'hover:shadow-lg'
        }`}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for a country..."
            value={searchValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full p-3 pl-12 pr-16 rounded-full border-0 focus:outline-none text-gray-700 bg-white"
          />
          
          {/* Gradient animated border */}
          <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ${
            isFocused ? 'w-full' : 'w-0'
          }`}></div>
        </div>
        
        {/* Animated search icon */}
        <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
          isFocused ? 'text-indigo-500 rotate-12' : 'text-gray-400'
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Clear button */}
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Search button */}
        <button
          type="submit"
          className="search-button absolute right-0 top-0 h-full px-4 flex items-center justify-center rounded-r-full transition-all duration-300"
        >
          <span className="relative z-10 font-medium">Search</span>
        </button>
      </div>
      
      {/* Search suggestions - This could be implemented with actual data */}
      {isFocused && searchValue && (
        <div className="search-suggestions absolute mt-2 w-full bg-white rounded-xl shadow-xl z-20 overflow-hidden opacity-0 animate-fadeIn">
          <div className="max-h-60 overflow-y-auto py-2">
            <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Popular Searches
            </div>
            <div className="suggestion-item px-4 py-2 hover:bg-indigo-50 cursor-pointer flex items-center">
              <span className="suggestion-icon mr-2 text-indigo-500">🇺🇸</span>
              <span>United States</span>
            </div>
            <div className="suggestion-item px-4 py-2 hover:bg-indigo-50 cursor-pointer flex items-center">
              <span className="suggestion-icon mr-2 text-indigo-500">🇯🇵</span>
              <span>Japan</span>
            </div>
            <div className="suggestion-item px-4 py-2 hover:bg-indigo-50 cursor-pointer flex items-center">
              <span className="suggestion-icon mr-2 text-indigo-500">🇬🇧</span>
              <span>United Kingdom</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Add custom CSS */}
      <style jsx>{`
        .search-container {
          transform-origin: center;
        }
        
        .search-button {
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          color: white;
          overflow: hidden;
        }
        
        .search-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .search-button:hover::before {
          opacity: 1;
        }
        
        .search-suggestions {
          animation: fadeIn 0.2s ease forwards;
          transform-origin: top center;
        }
        
        .suggestion-item {
          transition: all 0.2s ease;
        }
        
        .suggestion-item:hover .suggestion-icon {
          transform: scale(1.2);
        }
        
        .suggestion-icon {
          transition: transform 0.2s ease;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </form>
  );
};

export default SearchBar;
