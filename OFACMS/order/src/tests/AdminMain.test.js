import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminMain from '../components/Admin/AdminMain';

const renderWithRouter = (ui) => render(<Router>{ui}</Router>);

describe('AdminMain Component', () => {

  test('renders admin sections', () => {
    renderWithRouter(<AdminMain />);
    
    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
    expect(screen.getByText(/View Users/i)).toBeInTheDocument();

    expect(screen.getByText(/Employee Management/i)).toBeInTheDocument();
    expect(screen.getByText(/View Employees/i)).toBeInTheDocument();

    expect(screen.getByText(/Audit Management/i)).toBeInTheDocument();
    expect(screen.getByText(/View All Audits/i)).toBeInTheDocument();
  });

  test('renders analytics charts', () => {
    renderWithRouter(<AdminMain />);
    
    expect(screen.getByText(/Sales Over Time/i)).toBeInTheDocument();
    
    expect(screen.getByText(/Order Distribution/i)).toBeInTheDocument();
    
    expect(screen.getByText(/User Status/i)).toBeInTheDocument();
  });

  test('renders footer', () => {
    renderWithRouter(<AdminMain />);
    
    expect(screen.getByText(/Nandha Mart. All rights reserved./i)).toBeInTheDocument();
  });
});
