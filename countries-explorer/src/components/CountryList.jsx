// src/components/CountryList.jsx
import React from 'react';
import CountryCard from './CountryCard';

const CountryList = ({ countries, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="spinner-border animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">No countries found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
};

export default CountryList;