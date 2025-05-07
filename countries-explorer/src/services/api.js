// src/services/api.js
import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

// Creating an axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// API endpoints as required by the assignment
export const getCountries = async () => {
  try {
    const response = await api.get('/all');
    return response.data;
  } catch (error) {
    console.error(`Error fetching all countries:`, error);
    throw error;
  }
};

export const getCountryByName = async (name) => {
  try {
    const response = await api.get(`/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country by name (${name}):`, error);
    throw error;
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const response = await api.get(`/region/${region}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching countries by region (${region}):`, error);
    throw error;
  }
};

export const getCountryByCode = async (code) => {
  try {
    const response = await api.get(`/alpha/${code}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country by code (${code}):`, error);
    throw error;
  }
};

export default api;