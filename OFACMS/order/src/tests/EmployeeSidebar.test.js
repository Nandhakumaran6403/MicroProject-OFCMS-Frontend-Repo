import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EmployeeSidebar from '../components/Employee/EmployeeSidebar';

describe('EmployeeSidebar Component', () => {
  test('renders the sidebar heading', () => {
    render(
      <Router>
        <EmployeeSidebar />
      </Router>
    );

    expect(screen.getByText(/Employee Dashboard/i)).toBeInTheDocument();
  });

  test('renders the "Products" link', () => {
    render(
      <Router>
        <EmployeeSidebar />
      </Router>
    );

    expect(screen.getByText(/Products/i)).toBeInTheDocument();
  });

  test('renders the "Orders" link', () => {
    render(
      <Router>
        <EmployeeSidebar />
      </Router>
    );

    expect(screen.getByText(/Orders/i)).toBeInTheDocument();
  });

  test('renders the "Returns" link', () => {
    render(
      <Router>
        <EmployeeSidebar />
      </Router>
    );

    expect(screen.getByText(/Returns/i)).toBeInTheDocument();
  });

  test('renders the "Stock Levels" link', () => {
    render(
      <Router>
        <EmployeeSidebar />
      </Router>
    );

    expect(screen.getByText(/Stock Levels/i)).toBeInTheDocument();
  });

  test('renders the "Shipments" link', () => {
    render(
      <Router>
        <EmployeeSidebar />
      </Router>
    );

    expect(screen.getByText(/Shipments/i)).toBeInTheDocument();
  });
});
