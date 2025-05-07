// src/hooks/useCountries.js
import { useState, useEffect, useCallback } from 'react';
import { getCountries, getCountryByName, getCountriesByRegion } from '../services/api';

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  // Fetch all countries
  const fetchAllCountries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCountries();
      setCountries(data);
      setFilteredCountries(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch countries. Please try again later.');
      setCountries([]);
      setFilteredCountries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter countries by region
  const filterByRegion = useCallback(async (region) => {
    if (!region || region === 'All') {
      setFilteredCountries(countries);
      setSelectedRegion('');
      return;
    }

    try {
      setLoading(true);
      setSelectedRegion(region);
      const data = await getCountriesByRegion(region);
      setFilteredCountries(data);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch countries in ${region}. Please try again later.`);
      setFilteredCountries([]);
    } finally {
      setLoading(false);
    }
  }, [countries]);

  // Search countries by name
  const searchCountries = useCallback(async (term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      // If search term is empty, restore filtered countries based on region
      if (selectedRegion) {
        filterByRegion(selectedRegion);
      } else {
        setFilteredCountries(countries);
      }
      return;
    }

    try {
      setLoading(true);
      const data = await getCountryByName(term);
      
      // If region is selected, filter search results by region
      if (selectedRegion) {
        const regionFiltered = data.filter(country => 
          country.region.toLowerCase() === selectedRegion.toLowerCase()
        );
        setFilteredCountries(regionFiltered);
      } else {
        setFilteredCountries(data);
      }
      
      setError(null);
    } catch (err) {
      // If search fails, show a message but don't clear the list
      // This is because the API returns 404 if no match is found
      setError(`No countries found matching "${term}".`);
      setFilteredCountries([]);
    } finally {
      setLoading(false);
    }
  }, [countries, filterByRegion, selectedRegion]);

  // Initial fetch on component mount
  useEffect(() => {
    fetchAllCountries();
  }, [fetchAllCountries]);

  return {
    countries,
    filteredCountries,
    loading,
    error,
    searchTerm,
    selectedRegion,
    searchCountries,
    filterByRegion,
    fetchAllCountries
  };
};

export default useCountries;