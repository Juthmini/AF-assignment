import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CountryCard = ({ country }) => {
  const { isAuthenticated, addToFavorites, removeFromFavorites, isInFavorites } = useAuth();
  const isFavorite = isAuthenticated && isInFavorites(country.cca3);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFlagHovered, setIsFlagHovered] = useState(false);
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromFavorites(country.cca3);
    } else {
      addToFavorites(country.cca3);
    }
  };

  // Format population with commas
  const formatPopulation = (population) => {
    return population.toLocaleString();
  };
  
  // Get region color
  const getRegionColor = (region) => {
    const colors = {
      'Africa': ['from-yellow-500', 'to-amber-500', 'border-yellow-300', 'text-yellow-900', 'bg-yellow-50'],
      'Americas': ['from-red-500', 'to-rose-500', 'border-red-300', 'text-red-900', 'bg-red-50'],
      'Asia': ['from-green-500', 'to-emerald-500', 'border-green-300', 'text-green-900', 'bg-green-50'],
      'Europe': ['from-blue-500', 'to-indigo-500', 'border-blue-300', 'text-blue-900', 'bg-blue-50'],
      'Oceania': ['from-cyan-500', 'to-sky-500', 'border-cyan-300', 'text-cyan-900', 'bg-cyan-50'],
      'Antarctic': ['from-indigo-500', 'to-purple-500', 'border-indigo-300', 'text-indigo-900', 'bg-indigo-50']
    };
    
    return colors[region] || ['from-purple-500', 'to-pink-500', 'border-purple-300', 'text-purple-900', 'bg-purple-50'];
  };
  
  const regionColors = getRegionColor(country.region);
  
  // Handle image load
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // First two letters of country name for loading placeholder
  const countryInitials = country.name.common
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('');

  return (
    <Link 
      to={`/country/${country.cca3}`} 
      className="block h-full transform perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`country-card relative h-full rounded-xl overflow-hidden transition-all duration-500 bg-white ${
        isHovered ? 'shadow-2xl scale-105' : 'shadow-lg hover:shadow-xl'
      }`}>
        {/* Card border with region color */}
        <div className={`absolute inset-0 rounded-xl border-2 ${regionColors[2]} opacity-30`}></div>
        
        {/* Background pattern based on region */}
        <div className="absolute inset-0 opacity-5 pattern-dots pattern-gray-500 pattern-bg-white pattern-size-2 pattern-opacity-20"></div>
        
        {/* Region badge */}
        <div className={`absolute top-2 right-2 z-20 py-1 px-2 rounded-full text-xs font-semibold ${regionColors[4]} ${regionColors[3]}`}>
          {country.region}
        </div>
        
        {/* Flag container with effects */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsFlagHovered(true)}
          onMouseLeave={() => setIsFlagHovered(false)}
        >
          {/* Flag loading placeholder */}
          <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${regionColors[0]} ${regionColors[1]} transition-opacity duration-500 ${
            isImageLoaded ? 'opacity-0' : 'opacity-100'
          }`}>
            <span className="text-white text-3xl font-bold">{countryInitials}</span>
          </div>
          
          <img 
            src={country.flags.svg} 
            alt={`Flag of ${country.name.common}`}
            className={`w-full h-48 object-cover transform transition-all duration-500 ${
              isFlagHovered ? 'scale-110' : ''
            } ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={handleImageLoad}
          />
          
          {/* Flag overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 ${
            isFlagHovered ? 'opacity-100' : ''
          } transition-opacity duration-300`}>
            <div className="absolute bottom-2 left-2 text-white font-semibold text-sm">
              View Details
            </div>
          </div>
        </div>
        
        {/* Country info */}
        <div className="p-6 relative">
          {/* Favorite button with animation */}
          {isAuthenticated && (
            <button 
              onClick={handleFavoriteClick}
              className={`absolute top-5 right-5 z-10 transform transition-all duration-300 ${
                isHovered ? 'scale-125' : ''
              }`}
            >
              <div className={`relative w-8 h-8 flex items-center justify-center rounded-full ${
                isFavorite 
                  ? 'bg-yellow-100' 
                  : isHovered ? 'bg-gray-100' : 'bg-transparent'
              } transition-colors duration-300`}>
                <span className={`text-2xl transition-all duration-300 ${
                  isFavorite 
                    ? 'text-yellow-500 animate-bounce' 
                    : isHovered ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {isFavorite ? '★' : '☆'}
                </span>
              </div>
            </button>
          )}
          
          {/* Country name with animated border on hover */}
          <div className="relative mb-4 pb-2">
            <h2 className="text-xl font-bold text-gray-800">{country.name.common}</h2>
            <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${regionColors[0]} ${regionColors[1]} transition-all duration-500 ${
              isHovered ? 'w-full' : 'w-10'
            }`}></div>
          </div>
          
          {/* Country details */}
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center">
              <div className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Capital</p>
                <p className="font-semibold">{country.capital ? country.capital.join(', ') : 'N/A'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Region</p>
                <p className="font-semibold">{country.region}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Population</p>
                <p className="font-semibold">{formatPopulation(country.population)}</p>
              </div>
            </div>
          </div>
          
          {/* View button with consistent color - MODIFIED HERE */}
          <div className={`mt-4 overflow-hidden transition-all duration-300 ${
            isHovered ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <button className={`w-full py-2 rounded-md text-white font-medium text-sm transition-transform duration-300 transform ${
              isHovered ? 'translate-y-0' : 'translate-y-4'
            } bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:from-indigo-700 active:to-purple-700`}>
              View Country Details
            </button>
          </div>
        </div>
      </div>
      
      {/* Custom CSS */}
      <style jsx>{`
        .country-card {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transform-style: preserve-3d;
        }
        
        .country-card:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(-5%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        
        .animate-bounce {
          animation: bounce 0.5s ease 1;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        /* Dot pattern */
        .pattern-dots {
          background-image: radial-gradient(currentColor 1px, transparent 1px);
        }
        
        .pattern-size-2 {
          background-size: 20px 20px;
        }
      `}</style>
    </Link>
  );
};

export default CountryCard;