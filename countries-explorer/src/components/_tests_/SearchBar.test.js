// src/components/_tests_/SearchBar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  test('renders search input', () => {
    render(<SearchBar onSearch={() => {}} />);
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('triggers onSearch when form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(searchInput, { target: { value: 'Germany' } });
    fireEvent.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('Germany');
  });
});