

// src/components/CountryDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const CountryDetail = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, addToFavorites, removeFromFavorites, isInFavorites } = useAuth();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const data = await getCountryByCode(countryCode);
        if (data && data.length > 0) {
          setCountry(data[0]);
        } else {
          setError('Country not found');
        }
      } catch (err) {
        setError('Failed to fetch country details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryCode]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const isFavorite = isAuthenticated && country && isInFavorites(country.cca3);

  const handleFavoriteToggle = () => {
    if (!country) return;
    
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

  // Helper to get languages as a comma-separated string
  const getLanguages = (languagesObj) => {
    if (!languagesObj) return 'N/A';
    return Object.values(languagesObj).join(', ');
  };

  // Helper to get currencies as a comma-separated string
  const getCurrencies = (currenciesObj) => {
    if (!currenciesObj) return 'N/A';
    return Object.values(currenciesObj)
      .map(currency => `${currency.name} (${currency.symbol || 'N/A'})`)
      .join(', ');
  };

  // Determine region color
  const getRegionColor = (region) => {
    const regionColors = {
      'Africa': 'from-amber-500 to-orange-600',
      'Americas': 'from-blue-500 to-indigo-600',
      'Asia': 'from-red-500 to-pink-600',
      'Europe': 'from-green-500 to-emerald-600',
      'Oceania': 'from-purple-500 to-violet-600',
      'Antarctic': 'from-cyan-500 to-blue-600',
    };
    return regionColors[region] || 'from-gray-500 to-gray-700';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="spinner-border animate-spin h-16 w-16 border-8 border-indigo-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-red-50 to-pink-50 min-h-screen">
        <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-lg px-6 py-5" role="alert">
          <div className="flex items-center">
            <div className="py-1">
              <svg className="h-8 w-8 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-xl text-red-700">Error Encountered</p>
              <p className="text-red-600">{error || 'Country not found'}</p>
            </div>
          </div>
        </div>
        <button 
          onClick={handleGoBack}
          className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-5 py-3 rounded-lg shadow-md transition-all hover:shadow-lg transform hover:-translate-y-1 flex items-center font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Return to Countries
        </button>
      </div>
    );
  }

  const regionGradient = getRegionColor(country.region);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-10 px-4">
      <div className="container mx-auto">
        <button 
          onClick={handleGoBack}
          className="mb-8 bg-white hover:bg-gray-50 text-gray-800 px-5 py-2 rounded-full shadow-md transition-all hover:shadow-lg transform hover:-translate-y-1 flex items-center font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Countries
        </button>
        
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all">
          <div className={`h-3 bg-gradient-to-r ${regionGradient}`}></div>
          
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-black opacity-10 z-10"></div>
              <img 
                src={country.flags.svg} 
                alt={`Flag of ${country.name.common}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent z-20">
                <h1 className="text-4xl font-bold text-white">{country.name.common}</h1>
                <p className="text-gray-200 text-lg">{country.name.official}</p>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold mb-4">
                    {country.region}
                  </div>
                  {country.subregion && (
                    <div className="inline-block ml-2 px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm font-medium">
                      {country.subregion}
                    </div>
                  )}
                </div>
                
                {isAuthenticated && (
                  <button 
                    onClick={handleFavoriteToggle}
                    className={`text-4xl transition-all transform hover:scale-110 ${isFavorite ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorite ? '★' : '☆'}
                  </button>
                )}
              </div>
              
              <div className="mt-6 grid md:grid-cols-2 gap-8 text-gray-700">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Capital</p>
                      <p className="font-medium">{country.capital ? country.capital.join(', ') : 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Population</p>
                      <p className="font-medium">{formatPopulation(country.population)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Languages</p>
                      <p className="font-medium">{getLanguages(country.languages)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Currencies</p>
                      <p className="font-medium">{getCurrencies(country.currencies)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-medium">{formatPopulation(country.area)} km²</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Timezones</p>
                      <div className="font-medium max-h-20 overflow-y-auto">
                        {country.timezones.join(', ')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Driving Side</p>
                      <p className="font-medium capitalize">{country.car?.side || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {country.borders && country.borders.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Bordering Countries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {country.borders.map(borderCode => (
                      <Link 
                        key={borderCode}
                        to={`/country/${borderCode}`}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full transition-colors border border-gray-200 hover:border-gray-300 flex items-center"
                      >
                        <svg className="w-4 h-4 text-indigo-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                        </svg>
                        {borderCode}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {country.maps && (
                <div className="mt-10">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                    </svg>
                    Maps
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href={country.maps.googleMaps} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all hover:shadow-lg transform hover:-translate-y-1 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C7.589 2 4 5.589 4 9.995 4 15.4 12 22 12 22s8-6.6 8-12.005C20 5.589 16.411 2 12 2zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                      </svg>
                      Google Maps
                    </a>
                    <a 
                      href={country.maps.openStreetMaps} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all hover:shadow-lg transform hover:-translate-y-1 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
                      </svg>
                      OpenStreetMaps
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;