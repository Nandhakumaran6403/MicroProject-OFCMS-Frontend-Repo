// src/__tests__/UserFooter.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserFooter } from '../components/Footer';

describe('UserFooter Component', () => {
  test('renders the company name with the e-commerce icon', () => {
    render(<UserFooter />);

    // Check if the e-commerce icon and company name "Nandha Mart" are present
    expect(screen.getByText(/Nandha Mart/i)).toBeInTheDocument();
  });

  test('renders "About" section with correct links', () => {
    render(<UserFooter />);

    expect(screen.getByText(/About/i)).toBeInTheDocument();

    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  });

  test('renders "Product" section with correct links', () => {
    render(<UserFooter />);

    expect(screen.getByText(/Product/i)).toBeInTheDocument();

    expect(screen.getByText(/Mobile/i)).toBeInTheDocument();
    expect(screen.getByText(/Laptops/i)).toBeInTheDocument();
    expect(screen.getByText(/And More/i)).toBeInTheDocument();
  });

  test('renders "Help" section with correct links', () => {
    render(<UserFooter />);

    expect(screen.getByText(/Help/i)).toBeInTheDocument();

    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
    expect(screen.getByText(/Shipping/i)).toBeInTheDocument();
  });

  test('renders "Legal" section with correct links', () => {
    render(<UserFooter />);

    expect(screen.getByText(/Legal/i)).toBeInTheDocument();

    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms & Conditions/i)).toBeInTheDocument();
  });

  test('renders the footer copyright text', () => {
    render(<UserFooter />);

    // Check if the copyright text "Nandha Mart 2024" is present
    expect(screen.getByText(/Nandha Mart/i)).toBeInTheDocument();
    expect(screen.getByText(/2024/i)).toBeInTheDocument();
  });
});
