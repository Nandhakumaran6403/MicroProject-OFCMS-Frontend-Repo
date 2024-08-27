import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShipmentsPage from '../components/Employee/ShipmentsPage';

describe('ShipmentsPage Component', () => {
  test('renders the "Order Management" section', () => {
    render(
      <Router>
        <ShipmentsPage />
      </Router>
    );

    expect(screen.getByText(/Order Management/i)).toBeInTheDocument();
    expect(screen.getByText(/View and update status of the orders./i)).toBeInTheDocument();
    expect(screen.getByText(/Manage Orders/i)).toBeInTheDocument();
  });

  test('renders the "Shipments Over Time" chart heading', () => {
    render(
      <Router>
        <ShipmentsPage />
      </Router>
    );

    expect(screen.getByText(/Shipments Over Time/i)).toBeInTheDocument();
  });

  test('renders the "Shipments Status" chart heading', () => {
    render(
      <Router>
        <ShipmentsPage />
      </Router>
    );

    expect(screen.getByText(/Shipments Status/i)).toBeInTheDocument();
  });

  test('renders the footer', () => {
    render(
      <Router>
        <ShipmentsPage />
      </Router>
    );

    expect(screen.getByText(/© [0-9]{4} Nandha Mart. All rights reserved./i)).toBeInTheDocument();
  });
});
