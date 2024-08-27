import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductsPage from '../components/Employee/ProductsPage';

describe('ProductsPage Component', () => {
  test('renders the page heading', () => {
    render(
      <Router>
        <ProductsPage />
      </Router>
    );

    expect(screen.getByText(/Sales Over Time/i)).toBeInTheDocument();
    expect(screen.getByText(/Sales by Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Stock Status/i)).toBeInTheDocument();
  });

 

  test('renders the "Product Management" section', () => {
    render(
      <Router>
        <ProductsPage />
      </Router>
    );

    expect(screen.getByText(/Product Management/i)).toBeInTheDocument();
    expect(screen.getByText(/View and manage your existing products./i)).toBeInTheDocument();
    expect(screen.getByText(/View All Products/i)).toBeInTheDocument();
  });

  test('renders the footer', () => {
    render(
      <Router>
        <ProductsPage />
      </Router>
    );

    expect(screen.getByText(/© [0-9]{4} Nandha Mart. All rights reserved./i)).toBeInTheDocument();
  });
});
