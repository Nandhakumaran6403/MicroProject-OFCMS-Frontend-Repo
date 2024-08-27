// src/__tests__/AdminSidebar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminSidebar from '../components/Admin/AdminSidebar';

describe('AdminSidebar Component', () => {
  test('renders the sidebar heading', () => {
    render(
      <Router>
        <AdminSidebar />
      </Router>
    );

    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
  });

  test('renders the "Act as Employee" link', () => {
    render(
      <Router>
        <AdminSidebar />
      </Router>
    );

    expect(screen.getByText(/Act as Employee/i)).toBeInTheDocument();
  });

  test('renders the "Add Employee" link', () => {
    render(
      <Router>
        <AdminSidebar />
      </Router>
    );

    expect(screen.getByText(/Add Employee/i)).toBeInTheDocument();
  });

  test('renders the "Manage Employees" link', () => {
    render(
      <Router>
        <AdminSidebar />
      </Router>
    );

    expect(screen.getByText(/Manage Employees/i)).toBeInTheDocument();
  });

  test('renders the "Manage Audit Logs" link', () => {
    render(
      <Router>
        <AdminSidebar />
      </Router>
    );

    expect(screen.getByText(/Manage Audit Logs/i)).toBeInTheDocument();
  });

  test('renders the "View Customers" link', () => {
    render(
      <Router>
        <AdminSidebar />
      </Router>
    );

    expect(screen.getByText(/View Customers/i)).toBeInTheDocument();
  });
});
