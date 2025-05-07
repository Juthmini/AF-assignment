// src/components/_tests_/CountryCard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import CountryCard from '../CountryCard';

// Mock the auth context
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
    isInFavorites: jest.fn(() => false)
  }),
  AuthProvider: ({ children }) => <div>{children}</div>
}));

const mockCountry = {
  name: { common: 'Germany', official: 'Federal Republic of Germany' },
  capital: ['Berlin'],
  region: 'Europe',
  population: 83240000,
  flags: { svg: 'https://example.com/germany.svg' },
  cca3: 'DEU'
};

describe('CountryCard Component', () => {
  test('renders country information correctly', () => {
    render(
      <Router>
        <CountryCard country={mockCountry} />
      </Router>
    );
    
    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.getByText(/capital:/i)).toHaveTextContent('Berlin');
    expect(screen.getByText(/region:/i)).toHaveTextContent('Europe');
    expect(screen.getByText(/population:/i)).toBeInTheDocument();
  });
});