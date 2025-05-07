// src/components/_tests_/FilterControls.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterControls from '../FilterControls';

describe('FilterControls Component', () => {
  test('renders region dropdown with options', () => {
    render(<FilterControls onRegionChange={() => {}} selectedRegion="" />);
    
    const dropdown = screen.getByLabelText(/filter by region/i);
    expect(dropdown).toBeInTheDocument();
    
    // Check if it contains the region options
    expect(screen.getByText('Africa')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('Oceania')).toBeInTheDocument();
  });

  test('calls onRegionChange when region is selected', () => {
    const mockOnRegionChange = jest.fn();
    render(<FilterControls onRegionChange={mockOnRegionChange} selectedRegion="" />);
    
    const dropdown = screen.getByLabelText(/filter by region/i);
    fireEvent.change(dropdown, { target: { value: 'Europe' } });
    
    expect(mockOnRegionChange).toHaveBeenCalledWith('Europe');
  });
});