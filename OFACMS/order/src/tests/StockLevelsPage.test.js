import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import StockLevelsPage from '../components/Employee/StockLevelsPage';

describe('StockLevelsPage Component', () => {
 

  test('renders the "Stock Levels by Category" chart heading', () => {
    render(
      <Router>
        <StockLevelsPage />
      </Router>
    );

    expect(screen.getByText(/Stock Levels by Category/i)).toBeInTheDocument();
  });

  test('renders the "Stock Distribution" chart heading', () => {
    render(
      <Router>
        <StockLevelsPage />
      </Router>
    );

    expect(screen.getByText(/Stock Distribution/i)).toBeInTheDocument();
  });

  test('renders the footer', () => {
    render(
      <Router>
        <StockLevelsPage />
      </Router>
    );

    expect(screen.getByText(/© [0-9]{4} Nandha Mart. All rights reserved./i)).toBeInTheDocument();
  });
});
