
import React from 'react';

const FilterControls = ({ onRegionChange, selectedRegion }) => {
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
  // Helper function to get region color
  const getRegionColor = (region) => {
    const colors = {
      'All': 'from-blue-500 to-purple-500',
      'Africa': 'from-yellow-500 to-amber-500',  
      'Americas': 'from-red-500 to-rose-500',
      'Asia': 'from-green-500 to-emerald-500',
      'Europe': 'from-blue-500 to-indigo-500',
      'Oceania': 'from-cyan-500 to-sky-500'
    };
    return colors[region] || 'from-blue-500 to-purple-500';
  };

  return (
    <div className="filter-container relative mb-6">
      <label htmlFor="region-select" className="block mb-2 text-sm font-medium text-gray-700 ml-1 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Filter by Region
      </label>
      
      <div className="relative group">
        <select
          id="region-select"
          value={selectedRegion || 'All'}
          onChange={(e) => onRegionChange(e.target.value)}
          className={`region-select appearance-none bg-white border-2 border-gray-200 text-gray-800 rounded-lg pl-4 pr-10 py-2.5 shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 w-full sm:w-56 cursor-pointer
            ${selectedRegion ? `focus:ring-${getRegionColor(selectedRegion).split(' ')[0].replace('from-', '')}` : 'focus:ring-blue-500'}`}
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown indicator with animation */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center 
            bg-gradient-to-r ${getRegionColor(selectedRegion || 'All')} group-hover:opacity-90 transition-all duration-300`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white transform group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Animated border on hover */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 w-0 group-hover:w-full transition-all duration-300"></div>
      </div>
      
      {/* Region indicator badges */}
      <div className="flex flex-wrap gap-2 mt-3">
        {regions.map((region) => (
          region !== 'All' && (
            <div 
              key={region}
              onClick={() => onRegionChange(region)}
              className={`region-badge cursor-pointer text-xs font-medium px-2 py-1 rounded-full flex items-center transition-all duration-300
                ${selectedRegion === region ? 'opacity-100 transform scale-110' : 'opacity-60 hover:opacity-90'}`}
              style={{
                background: `linear-gradient(to right, var(--${region.toLowerCase()}-primary), var(--${region.toLowerCase()}-secondary))`,
                boxShadow: selectedRegion === region ? `0 4px 8px rgba(var(--${region.toLowerCase()}-shadow), 0.3)` : 'none'
              }}
            >
              <span className="text-white">{region}</span>
            </div>
          )
        ))}
      </div>
      
      {/* Add custom CSS */}
      <style jsx>{`
        /* Custom region colors */
        :root {
          --africa-primary: 245, 158, 11; /* amber-500 */
          --africa-secondary: 217, 119, 6; /* amber-600 */
          --africa-shadow: 245, 158, 11;
          
          --americas-primary: 239, 68, 68; /* red-500 */
          --americas-secondary: 220, 38, 38; /* red-600 */
          --americas-shadow: 239, 68, 68;
          
          --asia-primary: 16, 185, 129; /* emerald-500 */
          --asia-secondary: 5, 150, 105; /* emerald-600 */
          --asia-shadow: 16, 185, 129;
          
          --europe-primary: 59, 130, 246; /* blue-500 */
          --europe-secondary: 37, 99, 235; /* blue-600 */
          --europe-shadow: 59, 130, 246;
          
          --oceania-primary: 14, 165, 233; /* sky-500 */
          --oceania-secondary: 2, 132, 199; /* sky-600 */
          --oceania-shadow: 14, 165, 233;
        }
        
        .region-select {
          -webkit-appearance: none;
          -moz-appearance: none;
          text-indent: 1px;
          text-overflow: '';
        }
        
        .filter-container {
          position: relative;
          z-index: 10;
        }
        
        /* Animation for badges */
        .region-badge {
          transform-origin: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .region-badge:hover {
          transform: translateY(-2px) scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default FilterControls;