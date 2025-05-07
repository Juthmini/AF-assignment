

import React, { useEffect, useRef } from 'react';
import useCountries from '../hooks/useCountries';
import SearchBar from '../components/SearchBar';
import FilterControls from '../components/FilterControls';
import CountryList from '../components/CountryList';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { 
    filteredCountries, 
    loading, 
    error, 
    searchCountries, 
    filterByRegion, 
    selectedRegion 
  } = useCountries();
  
  const { isAuthenticated } = useAuth();
  
  // Create refs for scrolling
  const countriesRef = useRef(null);
  
  // Add animation effect when component mounts
  useEffect(() => {
    // Animation for title when page loads
    const title = document.querySelector('.hero-title');
    if (title) {
      title.classList.add('animate-in');
    }
  }, []);

  // Function to handle explore button click
  const handleExploreClick = () => {
    // Scroll to countries section
    if (countriesRef.current) {
      countriesRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Add pulse animation to countries container
      countriesRef.current.classList.add('pulse-animation');
      
      // Remove animation class after it completes
      setTimeout(() => {
        countriesRef.current.classList.remove('pulse-animation');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section with Animation */}
        <div className="relative mb-16 p-8 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl transform hover:scale-[1.01] transition-all duration-300 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-white"></div>
          </div>
          
          <h1 className="hero-title text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Explore Our Amazing World
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl opacity-90 mb-6">
            Discover fascinating information about countries, their cultures, flags, populations, and more.
            {isAuthenticated && " Create your personal collection of favorite countries for easy reference."}
          </p>
          
          {/* Enhanced call-to-action button with active state */}
          <button 
            className="explore-btn bg-white text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 px-6 py-3 rounded-full font-bold shadow-md transform hover:translate-y-[-2px] active:translate-y-0 transition-all duration-300 relative overflow-hidden"
            onClick={handleExploreClick}
          >
            <span className="relative z-10">Start Exploring Now</span>
            <span className="btn-shine"></span>
          </button>
          
          {/* World map decorative SVG in background */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-20 hidden lg:block">
            <svg width="200" height="200" viewBox="0 0 512 512" fill="white">
              <path d="M256,0C114.8,0,0,114.8,0,256s114.8,256,256,256s256-114.8,256-256S397.2,0,256,0z M111.9,384c-0.7-3.4-1.4-6.9-1.9-10.5
                c-4.3-28.1,2.3-57.5,17.5-80.6c-1.7-3.2-3.8-6.7-5.1-9.4c-0.9-1.9-1.3-3.9-1.1-6c0.1-1.1,0.5-2.4,1.2-3.6c1.1-2,3.9-4.7,16.9-8.8
                c11-3.4,17.7-5.9,37.9-5.9c12.5,0,25.3,0.9,36.8,2c-1.1-24.8-2.3-50.7-2.3-75.5c0-8.2,0.5-16.2,1.4-24
                c-39.7,9.8-75.6,30.1-104,58.5c-38.7,38.7-62.2,91.5-62.2,150.4c0,4.4,0.2,8.8,0.5,13.1C76.7,384,111.9,384,111.9,384z M256,448
                c-51.1,0-97.2-21.1-130.3-54.9c0,0,33.2,0,62.2,0c1.7-7,6.3-21.5,21.3-28.5c5.7-2.7,15.1-5.9,31.7-7.8c24.2-2.8,39.3-0.5,47.1,2.1
                c16.3,5.7,25.1,20.4,27.5,32.6l1.5,12.1c4.7,4.7,9.9,8.9,15.6,12.6c3.3,2.2,7.5,4.2,12.2,5.8c3,1,5.8,1.6,8.3,2
                C332.5,440.6,295.3,448,256,448z M391,410.5c-2-0.4-4.3-0.9-6.9-1.7c-6.9-2.1-12.9-5.1-17.8-8.4c-7.8-5.2-14.9-11.5-21.4-18.3
                l-0.7-5.2c-2.9-15.5-14.5-36.7-39.5-45.1c-12.5-4.4-31.8-7.1-61-3.7c-19.1,2.2-31.3,6.1-39.2,9.9c-4.1,2-11.5,6.3-16.4,15.5
                c0.5-1.8,1-3.8,1.4-5.4c1.5-6.1,5.7-18.5,17.8-27.1c7.3-5.1,16.7-8.3,27.5-9.3c15.9-1.4,22.9-4.2,26.9-7.5c5.5-4.5,8.2-12.1,8.2-23.2
                c0-14.7-5.7-28.1-11.2-41c-4-9.4-7.8-18.3-9.3-26.3c-1.8-9.5-0.5-17.2,4-23.2c4.6-6.1,12.1-10.2,22.3-12.1c10.1-1.9,21.9-2,38.3-0.3
                c14.7,1.5,25.2,1.2,32.1-0.9c3.9-1.2,7-3,9.1-5.1c1-1,1.8-2.1,2.3-3.4c0.4-1,0.6-2.1,0.6-3.1c-0.1-3.9-4.8-10-22.6-18.4
                c-16.2-7.7-33.4-13.1-50-19c-5.3-1.9-10.5-3.8-15.7-5.7c4.6-1.6,9.3-3.1,14.1-4.3c8.7-2.2,17.1-4.6,25.5-6.4
                c12.5-2.7,24.9-4.1,37.2-4.1c6.9,0,13.8,0.5,20.5,1.5c18.5,2.6,35.9,8.6,51.5,17.2c-5.7,1.3-11.7,2.2-17.8,2.2
                c-24.2,0-38.6-14.4-38.9-14.7c-1.5-1.5-3.5-2.3-5.6-2.3c-0.7,0-1.4,0.1-2.1,0.3c-2.8,0.8-4.9,3.1-5.4,5.9c-4.9,24.8,3.9,34.9,10.5,41.8
                c4.2,4.4,8.4,7.5,10.1,8.5c0.6,0.4,1.2,0.7,1.9,0.9c-1.7,8.4-2.4,16.9-2,25.6c0.5,9.2,3.9,18.8,11.4,26c7.4,7.1,17.4,11.3,27.5,12.2
                c6.7,0.6,13.5-0.5,19.8-3.1c6.8-2.8,11.5-6.9,13.5-11.5c0-0.1,0.1-0.1,0.1-0.2C426.8,319.8,415.5,369.7,391,410.5z M435.2,202.1
                c-4.9,0.8-9.2,2.5-12.8,4.8c-3.5,2.2-6.3,5.1-8.5,8.5c-2.7,4.3-4.2,9.5-4.3,15.2c0,0.7-0.1,1.4-0.1,2.1c-0.3,8.4,1.8,16.1,4.1,21.7
                c1.6,3.9,3.4,6.9,4.7,8.6c0.1,0.1,0.2,0.2,0.3,0.4c0.1,0.1,0.3,0.3,0.4,0.4c0.6,0.6,1.3,1.1,2,1.5c-0.3,0.1-0.7,0.3-1,0.4
                c-3.9,1.6-8.7,2.4-14,2.2c-5.9-0.5-11.9-2.8-16.3-6.9c-4.3-4.1-6.2-9.3-6.5-15.1c-0.3-6.7,0.3-13.2,1.5-19.7c0.1-0.6,0.2-1.2,0.2-1.8
                c0-1.1-0.2-2.2-0.7-3.3c-1.3-2.7-4.3-4.3-7.3-3.8c-0.3,0-0.6,0.1-0.9,0.2c-0.3,0.1-0.6,0.2-0.9,0.3c-13.3,6.8-24.7,15.8-34.2,26.4
                c-1.4,1.6-2.9,3.2-4.3,4.8c-0.7-0.6-1.5-1.1-2.2-1.7c-0.9-0.7-1.7-1.4-2.6-2.1c-3.1-2.6-5.6-6.1-7.5-10.2c-4.5-9.6-5.1-21.6-1.8-34.5
                c2-8,5.3-16.1,9.3-23.9c1.7-3.3,3.4-6.5,5.3-9.7c3.1-5.2,6.3-10.3,9.8-15.2C407.7,175.4,421.9,199.8,435.2,202.1z M369.6,99.9
                c7.8,3.7,15.1,8.1,22,13c-4.6,1.9-9.1,3.8-13.7,5.6c-8.4,3.3-17.6,7-25.9,12.1c-3.2,1.9-6.2,4.1-8.8,6.6c-0.7,0.6-1.3,1.3-1.9,2
                c-0.1,0.1-0.3,0.3-0.4,0.5c-2,2.5-3.5,5.2-4.7,8c-1.5,3.5-2.5,7-2.8,10.1c-0.1,0.1-0.2,0.2-0.2,0.3c-1.9,2.9-3.8,6-3.7,10.2
                c0,0.9,0.2,1.9,0.4,2.8c-2.1,1.9-4.3,4.1-5.6,6.8c-1.2,2.4-1.5,5.2-0.9,8.4c1.1,5.9,5.3,12.7,14.3,18.3c0.6,0.4,1.2,0.6,1.9,0.8
                c-0.4,0.6-0.8,1.2-1.2,1.8c-9.8,16.5-15.2,33.5-16.2,50.5c-0.4,7.1,0.7,14.3,3.9,20.8c3.1,6.3,7.9,11.9,15.3,16
                c-0.7-0.2-1.4-0.5-2.1-0.9c-1.7-1-6-4.2-10.1-8.5c-6.6-6.9-15.4-17-10.5-41.8c0.6-2.9,2.7-5.1,5.4-5.9c0.7-0.2,1.4-0.3,2.1-0.3
                c2.1,0,4.1,0.8,5.6,2.3c0.3,0.3,14.7,14.7,38.9,14.7c6.1,0,12.1-0.8,17.8-2.2c3.9-0.9,7.7-2.1,11.5-3.6c2.9-1.1,5.8-2.4,8.6-3.9
                c9.4-4.8,18-11.1,25.8-18.5c1.8-1.8,3.7-3.6,5.5-5.4c0.1-0.1,0.2-0.2,0.3-0.3c0.2-0.2,0.3-0.4,0.5-0.6c0.2-0.2,0.4-0.4,0.6-0.6
                c9.7-11.3,17.5-24.3,22.9-38.4c4.5-11.8,7.5-24.6,8.4-38c0.9-12.7-0.1-26-3.8-39c-0.1-0.3-0.2-0.6-0.3-0.9c-0.6-1.2-1.6-2.2-2.8-2.8
                c-0.6-0.3-1.2-0.4-1.9-0.4c-0.9,0-1.8,0.2-2.6,0.6c-1.1,0.6-2,1.6-2.5,2.8c-0.1,0.3-0.2,0.6-0.3,0.9c-1.1,5-2.5,10-4.2,14.8
                c-0.4,1.2-0.8,2.4-1.3,3.6c-0.5,1.1-1.1,2.2-1.6,3.3c-6.5-2.3-20.8-26.7-47.9-50.4c0.1-0.1,0.1-0.2,0.2-0.3c7-9,14.7-17.2,23.3-24.5
                C357.7,93.4,363.5,96.9,369.6,99.9z"/>
            </svg>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="backdrop-blur-sm bg-white/60 rounded-xl p-6 mb-10 shadow-lg border border-purple-100 transform hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <SearchBar onSearch={searchCountries} />
            <FilterControls onRegionChange={filterByRegion} selectedRegion={selectedRegion} />
          </div>
        </div>
        
        {/* Country List with enhanced styling */}
        <div className="countries-container" ref={countriesRef}>
          <CountryList 
            countries={filteredCountries} 
            loading={loading} 
            error={error} 
          />
        </div>
        
        {/* Footer with decorative gradient */}
        <div className="mt-16 text-center pt-8 pb-4 border-t border-purple-100">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="h-1 w-10 rounded bg-indigo-500 mx-2"></span>
            <span className="h-1 w-10 rounded bg-purple-500 mx-2"></span>
            <span className="h-1 w-10 rounded bg-pink-500 mx-2"></span>
          </div>
          <p className="text-gray-600 text-sm">
            Explore the beauty and diversity of our world. Made with ❤ for educational purposes.
          </p>
        </div>
      </div>
      
      {/* Enhanced CSS styles */}
      <style jsx>{`
        .hero-title {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .hero-title.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .countries-container {
          transition: all 0.3s ease;
        }
        
        /* Enhanced card hover effect */
        :global(.country-card) {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: translateY(0);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        :global(.country-card:hover) {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        /* Add shine effect to button */
        .explore-btn {
          position: relative;
          overflow: hidden;
        }
        
        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          animation: shine-effect 3s infinite;
        }
        
        @keyframes shine-effect {
          0% {
            left: -100%;
          }
          20% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }
        
        /* Add pulse animation for countries container when button is clicked */
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(124, 58, 237, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(124, 58, 237, 0);
          }
        }
        
        .pulse-animation {
          animation: pulse 1s 1;
        }
        
        /* Add a subtle floating animation to decorative elements */
        :global(.decorative-element) {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;